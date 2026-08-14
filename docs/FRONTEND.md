# BreatheSafe — Frontend

App Expo/React Native (TypeScript) para cadastro/conexão de sensores de CO e monitoramento em tempo real das leituras.

Diretório: `front/`

## Stack

| Categoria | Tecnologia | Versão |
|---|---|---|
| Framework | Expo | ^53.0.0 |
| Runtime | React 19 / React Native | 19.0.0 / 0.79.2 |
| Roteamento | `expo-router` (rotas por arquivo, tipadas) | ~5.0.6 |
| Navegação | `@react-navigation/*` (bottom-tabs, native, stack) | ^7.x |
| HTTP | `axios` | ^1.8.4 |
| Persistência local | `@react-native-async-storage/async-storage` | ^2.1.2 |
| Gráficos | `react-native-chart-kit` (+ `react-native-svg`) | ^6.12.5 / ^15.11.2 |
| UI kit | `react-native-paper` | ^5.12.5 |
| Ícones | `@expo/vector-icons`, `react-native-vector-icons` | — |
| Date picker | `@react-native-community/datetimepicker` | 8.3.0 |
| Testes | Jest + `jest-expo` | ^29.x / ~52.0.2 |

## Scripts

```bash
npm start          # expo start
npm run android    # expo start --android
npm run ios        # expo start --ios
npm run web         # expo start --web
npm test              # jest --watchAll
npm run lint           # expo lint
npm run reset-project   # node ./scripts/reset-project.js (volta ao boilerplate padrão do Expo)
```

## Estrutura de pastas

```
front/
├── app/(tabs)/          # telas, roteadas por nome de arquivo (expo-router)
├── src/
│   ├── components/       # ThemedText, ThemedView, Collapsible, Header, ui/IconSymbol, ui/TabBarBackground...
│   ├── hooks/              # useColorScheme, useThemeColor
│   ├── constants/           # Colors.ts (paleta light/dark)
│   ├── services/             # api.ts (instância axios)
│   └── types/                 # env.d.ts
└── scripts/reset-project.js
```

## Configuração de API

`src/services/api.ts`:

```ts
const api = axios.create({ baseURL: process.env.EXPO_PUBLIC_API_URL });
```

`baseURL` vem de variável de ambiente pública do Expo (`EXPO_PUBLIC_API_URL`). Autenticação é feita manualmente por tela — cada chamada protegida injeta `Authorization: Bearer <token>` lido do `AsyncStorage` (não há interceptor global do axios para isso).

## Autenticação (client-side)

- Token e dados do usuário são persistidos em `AsyncStorage` sob as chaves `userToken` e `userData` após login (`login.tsx`).
- Não há refresh de token nem interceptor de resposta 401 centralizado — cada tela que faz request autenticada (`register_sensor.tsx`, `monitoring.tsx`) trata 401 manualmente: remove o token e redireciona pra `/login`. Padrão duplicado em pelo menos 2 telas.

## Fluxo de telas (`app/(tabs)/`)

Todas as rotas ficam dentro do grupo `(tabs)`, roteadas pelo nome do arquivo via `expo-router`.

```
index (splash, redireciona após 3s)
  → welcome (Login vs. Acessar sem Login)
      → login → guest (dashboard)
      → new_account → login
      → connection (acesso sem login)

guest (dashboard)
  → register_sensor → connection
  → monitoring → config
              → history
```

| Tela | Arquivo | Função |
|---|---|---|
| Splash | `index.tsx` | Mostra logo, redireciona para `/welcome` após 3s (`setTimeout`, sem checar se já há sessão salva) |
| Boas-vindas | `welcome.tsx` | Escolha entre "Fazer Login" e "Acessar sem Login" |
| Login | `login.tsx` | `POST /session`, salva token+dados no `AsyncStorage`, navega pra `/guest` |
| Cadastro | `new_account.tsx` | `POST /user`, trata erro 422 (validação) extraindo primeira mensagem de `errors` |
| Esqueci a senha | `forgot_password.tsx` | **Arquivo vazio** — rota existe mas sem implementação |
| Dashboard (guest) | `guest.tsx` | Atalhos para "Cadastrar Sensor" e "Monitorar Dados" |
| Cadastro de sensor | `register_sensor.tsx` | `POST /sensor` autenticado, date picker nativo, trata 401/422 |
| Conexão | `connection.tsx` | Botões WiFi/Bluetooth — **apenas `Alert.alert`, sem lógica real de pareamento** |
| Monitoramento | `monitoring.tsx` | `GET /readings` autenticado, exibe concentração atual + gráfico de histórico (`LineChart`) |
| Configurações | `config.tsx` | Notificações, nível de alerta, unidade de medida — **todo state é local, nada persiste ou é enviado ao backend** |
| Histórico | `history.tsx` | Lista de leituras — **dados mockados em `setTimeout`, não chama a API** |

## Theming

Fluxo: `Colors` (constantes light/dark) → `useColorScheme` (nativo detecta tema do SO) → `useThemeColor` (resolve cor por tema, com override opcional via props) → componentes `ThemedText`/`ThemedView`.

Na prática, a maioria das telas de fluxo (login, cadastro, dashboard, monitoramento etc.) **não usa o sistema de theming** — usa `StyleSheet` com cores fixas (`#1C7C7D`, `#F2F6F8`...). O sistema `Themed*` só é usado nos componentes de boilerplate do template Expo original (`Collapsible`, `ParallaxScrollView`, `HelloWave`).

## Pendências / pontos de atenção identificados

1. **`forgot_password.tsx` vazio** — rota existe, arquivo sem conteúdo algum.
2. **`connection.tsx`** não implementa conexão real (WiFi/Bluetooth) — só `Alert`.
3. **`history.tsx`** usa dados mockados fixos, nunca chama `GET /readings`.
4. **`config.tsx`** não persiste nem envia configurações ao backend — perdido ao fechar o app.
5. **`_layout.tsx` das tabs** referencia uma rota `"explore"` (`Tabs.Screen name="explore"`) que **não existe** em `app/(tabs)/` — resíduo do boilerplate padrão do Expo Router, tab quebrada se essa navegação por abas estiver realmente em uso (o fluxo real do app parece usar `router.push` entre telas, não as tabs).
6. **Sem verificação de sessão na splash** (`index.tsx`) — sempre manda pra `/welcome`, mesmo com token salvo válido; usuário logado tem que logar de novo a cada abertura do app.
7. **Tratamento de erro 401 duplicado** entre `register_sensor.tsx` e `monitoring.tsx` — candidato a extrair em hook (`useAuthenticatedRequest` ou interceptor axios global).
8. **Mismatch de payload em `register_sensor.tsx`** — envia `installation-date` (kebab-case) enquanto validator do backend espera `installation_date` (snake_case); campo provavelmente ignorado pela API.
