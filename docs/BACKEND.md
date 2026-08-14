# BreatheSafe — Backend

API REST em AdonisJS 6 (TypeScript) responsável por autenticação de usuários, cadastro de sensores de CO (monóxido de carbono) e registro/consulta de leituras desses sensores.

Diretório: `back/`

## Stack

| Categoria | Tecnologia | Versão |
|---|---|---|
| Framework | `@adonisjs/core` | ^6.17.2 |
| Autenticação | `@adonisjs/auth` (guard de access tokens) | ^9.3.1 |
| ORM | `@adonisjs/lucid` | ^21.6.0 |
| Banco de dados | PostgreSQL (`pg`) | ^8.14.1 |
| CORS | `@adonisjs/cors` | ^2.2.1 |
| Validação | `@vinejs/vine` | ^3.0.0 |
| Datas | `luxon` | ^3.5.0 |
| Testes | Japa (`@japa/runner`, `@japa/api-client`, `@japa/assert`, `@japa/plugin-adonisjs`) | ^4.x |
| Lint/format | `@adonisjs/eslint-config`, `@adonisjs/prettier-config` | — |
| Dev/HMR | `hot-hook` (recarrega controllers/middleware sem reiniciar) | ^0.4.0 |
| Infra local | Docker Compose (serviço Postgres) | — |

Módulo ESM (`"type": "module"`). Imports internos usam subpath imports do Node (`#controllers/*`, `#models/*`, `#validators/*`, `#middleware/*`, `#config/*`, `#database/*`, `#start/*`, etc.), mapeados em `package.json` → `imports`.

## Scripts

```bash
npm run dev        # node ace serve --hmr
npm run build      # node ace build
npm start          # node bin/server.js (produção, após build)
npm test           # node ace test (Japa)
npm run lint       # eslint .
npm run format     # prettier --write .
npm run typecheck  # tsc --noEmit
```

## Estrutura de pastas

```
back/
├── app/
│   ├── controllers/    # lógica de rota (Readings, Sensors, Session, Users)
│   ├── models/         # Lucid ORM (User, Sensor, Reading)
│   ├── validators/     # schemas VineJS
│   ├── middleware/     # auth, container bindings, force JSON
│   └── exceptions/     # handler global de exceções
├── config/              # auth, cors, database, hash, logger, bodyparser, app
├── database/
│   └── migrations/      # ordem: users → access_tokens → sensors → readings
├── start/
│   ├── routes.ts         # definição de rotas
│   └── kernel.ts         # registro de middleware
├── bin/                  # entrypoints (server, console, test)
└── docker-compose.yml    # serviço Postgres local
```

## Modelo de domínio

Hierarquia **User → Sensor → Reading** (1:N:N), com integridade referencial via FK nas migrations, nessa ordem de criação:

1. `create_users_table`
2. `create_access_tokens_table`
3. `create_sensors_table`
4. `create_readings_table`

### User (`app/models/user.ts`)

- Autenticação via mixin `withAuthFinder` (login por `email`, hash `scrypt`).
- Tokens de acesso via `DbAccessTokensProvider` (tabela `access_tokens` separada).
- Campos: `id`, `name`, `email`, `password` (`serializeAs: null` — nunca aparece na resposta JSON), `token` (nullable), `createdAt`.
- Relação `hasMany` com `Sensor`.

### Sensor (`app/models/sensor.ts`)

- Campos: `id`, `model`, `status` (boolean), `installation_date`, `userId` (FK).
- Relação `belongsTo` com `User`.

### Reading (`app/models/reading.ts`)

- Campos: `id`, `coConcentration` (mapeado para coluna `co_concentration`), `coLevel` (→ `co_level`), `dateHour` (→ `date_hour`), `sensorId` (FK), `createdAt`.
- Relação `belongsTo` com `Sensor`.

## Autenticação

Guard único, `api`, baseado em access tokens (`config/auth.ts`):

```ts
guards: {
  api: tokensGuard({
    provider: tokensUserProvider({ tokens: 'accessTokens', model: () => import('#models/user') }),
  }),
}
```

Fluxo de login (`SessionController.store`):
1. Valida `email`/`password` (`createSessionValidator`).
2. `User.verifyCredentials(email, password)`.
3. Cria access token (`User.accessTokens.create(user)`).
4. Retorna o `user` serializado com o token embutido.

Logout (`SessionController.destroy`): revoga o token corrente (`User.accessTokens.delete`).

Rotas protegidas usam `middleware.auth()` (grupo em `routes.ts`), que por sua vez chama `ctx.auth.authenticateUsing(...)` (`auth_middleware.ts`).

## Rotas (`start/routes.ts`)

```
GET  /            → mensagem de boas-vindas (público)
POST /session      → login (público)
POST /user          → cadastro de usuário (público)

--- grupo protegido (Authorization: Bearer <token>) ---
resource user      (except store) → index, show, update, destroy
resource sensor     (apiOnly)      → index, store, show, update, destroy
resource readings   (apiOnly)      → index, store, show, update, destroy
```

`router.resource(...).apiOnly()` gera as 5 rotas REST padrão (sem `create`/`edit`, que são de views HTML). `ReadingsController` também expõe um método `latest(sensor_id)` que **não tem rota registrada** — código morto ou rota faltando (ver seção de pendências).

## Middleware (`start/kernel.ts`)

Stack de servidor (roda em toda requisição, mesmo sem rota casada):
1. `container_bindings_middleware`
2. `force_json_response_middleware` (força `Accept: application/json`)
3. `@adonisjs/cors/cors_middleware`

Stack de router (roda apenas em rotas casadas):
1. `bodyparser_middleware`
2. `@adonisjs/auth/initialize_auth_middleware`

Middleware nomeado disponível para grupos de rota: `auth` → `auth_middleware.ts`.

## Validação (VineJS)

Um schema por recurso em `app/validators/`:

| Arquivo | Validators | Regras notáveis |
|---|---|---|
| `user.ts` | `createUserValidator`, `updateUserValidator` | email único (checa `users` table), senha mínimo 6 |
| `session.ts` | `createSessionValidator` | email + senha (min 6) |
| `sensor.ts` | `createSensorValidator`, `updateSensorValidator` | `model`, `status` (bool), `installation_date` opcional — **os dois schemas são idênticos**, sem schema de update parcial |
| `reading.ts` | `createReadingValidator` | `co_concentration`, `co_level`, `date_hour` — **não usado no controller** (`ReadingsController.store` lê via `request.only()` em vez de `request.validateUsing()`) |

## CORS (`config/cors.ts`)

```ts
{ enabled: true, origin: true, credentials: true, methods: ['GET','HEAD','POST','PUT','DELETE'], maxAge: 90 }
```

`origin: true` reflete qualquer origem que fizer a requisição — permissivo, adequado para desenvolvimento; revisar antes de produção.

## Pendências / pontos de atenção identificados

1. **Falta de checagem de ownership em Sensor** — `SensorsController.show/update/destroy` buscam por `Sensor.findByOrFail('id', params.id)` sem validar que o sensor pertence ao usuário autenticado (`auth.user.id`). Qualquer usuário autenticado pode ler/editar/apagar sensor de outro.
2. **`ReadingsController.latest`** não possui rota registrada em `routes.ts` — endpoint inacessível ou rota esquecida.
3. **`UsersController.update`** usa `User.findBy('id', params.id)` (retorna `null` se não encontrar) e acessa `user!.merge(...)` sem checar null — gera erro 500 não tratado se o `id` não existir, em vez de 404.
4. **Token duplicado** — o token de acesso é salvo tanto na tabela `access_tokens` (via `DbAccessTokensProvider`) quanto na coluna `user.token` (`SessionController.store`), redundante.
5. **`createReadingValidator` não é usado** — `ReadingsController.store` usa `request.only([...])` sem validação de schema, então dados malformados chegam direto ao `Reading.create`.
6. **`ReadingsController.store` não checa ownership do sensor** — qualquer usuário autenticado pode enviar leitura para `sensorId` de outro usuário.
