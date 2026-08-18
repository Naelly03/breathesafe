# Graph Report - breathesafe  (2026-08-14)

## Corpus Check
- 80 files · ~14,586 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 735 nodes · 791 edges · 91 communities (41 shown, 50 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 37 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `7603e3ef`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Community 40|Community 40]]
- [[_COMMUNITY_Community 41|Community 41]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 44|Community 44]]
- [[_COMMUNITY_Community 45|Community 45]]
- [[_COMMUNITY_Community 46|Community 46]]
- [[_COMMUNITY_Community 47|Community 47]]
- [[_COMMUNITY_Community 48|Community 48]]
- [[_COMMUNITY_Community 49|Community 49]]
- [[_COMMUNITY_Community 50|Community 50]]
- [[_COMMUNITY_Community 51|Community 51]]
- [[_COMMUNITY_Community 52|Community 52]]
- [[_COMMUNITY_Community 54|Community 54]]
- [[_COMMUNITY_Community 55|Community 55]]
- [[_COMMUNITY_Community 56|Community 56]]
- [[_COMMUNITY_Community 57|Community 57]]
- [[_COMMUNITY_Community 58|Community 58]]
- [[_COMMUNITY_Community 59|Community 59]]
- [[_COMMUNITY_Community 60|Community 60]]
- [[_COMMUNITY_Community 61|Community 61]]
- [[_COMMUNITY_Community 62|Community 62]]
- [[_COMMUNITY_Community 67|Community 67]]
- [[_COMMUNITY_Community 68|Community 68]]
- [[_COMMUNITY_Community 69|Community 69]]
- [[_COMMUNITY_Community 70|Community 70]]
- [[_COMMUNITY_Community 71|Community 71]]
- [[_COMMUNITY_Community 72|Community 72]]
- [[_COMMUNITY_Community 73|Community 73]]
- [[_COMMUNITY_Community 74|Community 74]]
- [[_COMMUNITY_Community 75|Community 75]]
- [[_COMMUNITY_Community 76|Community 76]]
- [[_COMMUNITY_Community 77|Community 77]]
- [[_COMMUNITY_Community 78|Community 78]]
- [[_COMMUNITY_Community 79|Community 79]]
- [[_COMMUNITY_Community 80|Community 80]]
- [[_COMMUNITY_Community 81|Community 81]]
- [[_COMMUNITY_Community 82|Community 82]]
- [[_COMMUNITY_Community 83|Community 83]]
- [[_COMMUNITY_Community 84|Community 84]]
- [[_COMMUNITY_Community 85|Community 85]]
- [[_COMMUNITY_Community 87|Community 87]]

## God Nodes (most connected - your core abstractions)
1. `imports` - 17 edges
2. `imports` - 17 edges
3. `expo` - 14 edges
4. `expo` - 14 edges
5. `BreatheSafe — Backend` - 11 edges
6. `ThemedText()` - 9 edges
7. `useThemeColor()` - 9 edges
8. `BreatheSafe — Frontend` - 9 edges
9. `scripts` - 8 edges
10. `scripts` - 8 edges

## Surprising Connections (you probably didn't know these)
- `RootLayout()` --calls--> `useColorScheme()`  [INFERRED]
  breathesafe-front/_layout.tsx → front/src/hooks/useColorScheme.web.ts
- `AdonisJS App Config` --conceptually_related_to--> `AuthMiddleware`  [AMBIGUOUS]
  adonisrc.ts → app/middleware/auth_middleware.ts
- `Docker Compose (Postgres Service)` --conceptually_related_to--> `Database Config (Postgres/Lucid)`  [INFERRED]
  breathesafe-back/docker-compose.yml → breathesafe-back/config/database.ts
- `Login` --semantically_similar_to--> `Registre (new account)`  [INFERRED] [semantically similar]
  breathesafe-front/app/(tabs)/login.tsx → breathesafe-front/app/(tabs)/new_account.tsx
- `breathesafe Monorepo` --references--> `breathesafe-front README`  [INFERRED]
  CLAUDE.md → breathesafe-front/README.md

## Hyperedges (group relationships)
- **REST CRUD Controller Pattern** — readings_controller_ReadingsController, sensors_controller_SensorsController, users_controller_UsersController [INFERRED 0.85]
- **VineJS Schema Validator Pattern** — reading_validator_createReadingValidator, sensor_validator_createSensorValidator, session_validator_createSessionValidator, user_validator_createUserValidator [INFERRED 0.80]
- **User-Sensor-Reading Data Hierarchy** — user_User, sensor_Sensor, reading_Reading [EXTRACTED 1.00]
- **Shared Ignitor Bootstrap Pattern** — console_entrypoint, server_entrypoint, test_entrypoint, env_start [INFERRED 0.85]
- **Users -> Sensors -> Readings FK Chain** — create_users_table_migration, create_sensors_table_migration, create_readings_table_migration [INFERRED 0.95]
- **Ordered Seed Pipeline Respecting FK Dependencies** — user_seeder, sensor_seeder, reading_seeder [INFERRED 0.85]
- **User Onboarding & Authentication Flow** — index_Index, welcome_LoginScreen, login_Login, newaccount_Registre, guest_Dashboard [INFERRED 0.85]
- **CO Sensor Setup & Monitoring Flow** — guest_Dashboard, registersensor_RegisterSensor, connection_ConnectDeviceScreen, monitoring_RealTimeMonitoring, config_ConfigurationsScreen, history_HistoryScreen [INFERRED 0.85]
- **Duplicated Axios Auth Error-Handling Pattern** — login_Login, newaccount_Registre, registersensor_RegisterSensor [INFERRED 0.80]
- **Expo/React Native platform-specific module resolution (.ios/.web suffix convention)** — iconsymbol_ios_iconsymbol, iconsymbol_iconsymbol, tabbarbackground_ios_usebottomtaboverflow, tabbarbackground_web_usebottomtaboverflow, usecolorscheme_native_usecolorscheme, usecolorscheme_web_usecolorscheme [INFERRED 0.85]
- **Light/Dark theming flow (Colors -> useColorScheme -> useThemeColor -> Themed components)** — colors_colors, usecolorscheme_native_usecolorscheme, usethemecolor_usethemecolor, themedtext_themedtext, themedview_themedview [INFERRED 0.85]
- **RTK + Caveman + Graphify token-saving toolchain** — claudemd_rtk, claudemd_caveman, claudemd_graphify, claudemd_token_economy_ecosystem [EXTRACTED 1.00]

## Communities (91 total, 50 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.08
Nodes (24): RootLayout(), Collapsible(), styles, HapticTab(), HelloWave(), styles, ParallaxScrollView(), Props (+16 more)

### Community 1 - "Community 1"
Cohesion: 0.05
Nodes (37): dependencies, axios, @babel/runtime, expo, expo-blur, expo-constants, expo-font, expo-haptics (+29 more)

### Community 2 - "Community 2"
Cohesion: 0.05
Nodes (42): dependencies, @adonisjs/auth, @adonisjs/core, @adonisjs/cors, @adonisjs/lucid, luxon, pg, reflect-metadata (+34 more)

### Community 3 - "Community 3"
Cohesion: 0.11
Nodes (19): api, ApiResponse, Login(), LoginData, styles, TokenData, RealTimeMonitoring(), SensorData (+11 more)

### Community 4 - "Community 4"
Cohesion: 0.09
Nodes (22): backgroundColor, foregroundImage, adaptiveIcon, typedRoutes, expo, android, experiments, icon (+14 more)

### Community 5 - "Community 5"
Cohesion: 0.09
Nodes (22): devDependencies, @babel/core, jest, jest-expo, @types/jest, @types/react, @types/react-test-renderer, typescript (+14 more)

### Community 6 - "Community 6"
Cohesion: 0.11
Nodes (19): Ace CLI Entrypoint, AdonisJS App Config, AuthMiddleware, ESLint Config, Package Manifest, Reading Model, createReadingValidator, ReadingsController (+11 more)

### Community 7 - "Community 7"
Cohesion: 0.11
Nodes (18): devDependencies, @adonisjs/assembler, @adonisjs/eslint-config, @adonisjs/prettier-config, @adonisjs/tsconfig, eslint, hot-hook, @japa/api-client (+10 more)

### Community 8 - "Community 8"
Cohesion: 0.05
Nodes (42): dependencies, @adonisjs/auth, @adonisjs/core, @adonisjs/cors, @adonisjs/lucid, luxon, pg, reflect-metadata (+34 more)

### Community 9 - "Community 9"
Cohesion: 0.19
Nodes (17): Expo App Config, ConfigurationsScreen, ConnectDeviceScreen, Dashboard (guest.tsx), HapticTab, HistoryScreen, Index (splash redirect), RootLayout (+9 more)

### Community 10 - "Community 10"
Cohesion: 0.21
Nodes (13): App Config (HTTP/AppKey), Create Readings Table Migration, Create Sensors Table Migration, Create Users Table Migration, Database Config (Postgres/Lucid), Docker Compose (Postgres Service), Environment Variables Schema, Hash Config (Scrypt) (+5 more)

### Community 11 - "Community 11"
Cohesion: 0.22
Nodes (11): Colors constants, HelloWave, ParallaxScrollView, useBottomTabOverflow (iOS, blur-aware), useBottomTabOverflow (web/Android shim), ThemedText, ThemedText snapshot test, ThemedView (+3 more)

### Community 12 - "Community 12"
Cohesion: 0.27
Nodes (4): Reading, Sensor, AuthFinder, User

### Community 13 - "Community 13"
Cohesion: 0.43
Nodes (6): fs, moveDirectories(), newDirPath, oldDirs, path, root

### Community 14 - "Community 14"
Cohesion: 0.29
Nodes (6): compilerOptions, paths, strict, extends, include, @/*

### Community 18 - "Community 18"
Cohesion: 0.33
Nodes (6): Caveman (compact response plugin), Graphify (project knowledge graph), breathesafe Monorepo, RTK (Rust Token Killer, shell filter), Token-Saving Ecosystem, breathesafe-front README

### Community 19 - "Community 19"
Cohesion: 0.43
Nodes (4): middleware, ReadingsController(), SensorsController(), UsersController()

### Community 20 - "Community 20"
Cohesion: 0.40
Nodes (4): compilerOptions, outDir, rootDir, extends

### Community 21 - "Community 21"
Cohesion: 0.40
Nodes (5): Auth Config (API Tokens Guard), Body Parser Config, CORS Config, HTTP Kernel (Middleware Registration), Application Routes

### Community 22 - "Community 22"
Cohesion: 0.60
Nodes (3): authConfig, Authenticators, EventsList

### Community 23 - "Community 23"
Cohesion: 0.60
Nodes (3): configureSuite(), plugins, runnerHooks

### Community 26 - "Community 26"
Cohesion: 0.60
Nodes (3): HistoryItem, HistoryScreen(), styles

### Community 76 - "Community 76"
Cohesion: 0.05
Nodes (37): dependencies, axios, @babel/runtime, expo, expo-blur, expo-constants, expo-font, expo-haptics (+29 more)

### Community 77 - "Community 77"
Cohesion: 0.09
Nodes (22): backgroundColor, foregroundImage, adaptiveIcon, typedRoutes, expo, android, experiments, icon (+14 more)

### Community 78 - "Community 78"
Cohesion: 0.09
Nodes (22): devDependencies, @babel/core, jest, jest-expo, @types/jest, @types/react, @types/react-test-renderer, typescript (+14 more)

### Community 79 - "Community 79"
Cohesion: 0.10
Nodes (19): Autenticação, BreatheSafe — Backend, code:bash (pnpm dev        # node ace serve --hmr), code:block2 (back/), code:ts (guards: {), code:block4 (GET  /            → mensagem de boas-vindas (público)), code:ts ({ enabled: true, origin: true, credentials: true, methods: [), CORS (`config/cors.ts`) (+11 more)

### Community 80 - "Community 80"
Cohesion: 0.11
Nodes (18): devDependencies, @adonisjs/assembler, @adonisjs/eslint-config, @adonisjs/prettier-config, @adonisjs/tsconfig, eslint, hot-hook, @japa/api-client (+10 more)

### Community 81 - "Community 81"
Cohesion: 0.14
Nodes (13): Autenticação (client-side), BreatheSafe — Frontend, code:bash (pnpm start          # expo start), code:block2 (front/), code:ts (const api = axios.create({ baseURL: process.env.EXPO_PUBLIC_), code:block4 (index (splash, redireciona após 3s)), Configuração de API, Estrutura de pastas (+5 more)

### Community 82 - "Community 82"
Cohesion: 0.22
Nodes (8): code:bash (npm install), code:bash (npx expo start), code:bash (npm run reset-project), Get a fresh project, Get started, Join the community, Learn more, Welcome to your Expo app 👋

### Community 83 - "Community 83"
Cohesion: 0.29
Nodes (6): compilerOptions, paths, strict, extends, include, @/*

### Community 84 - "Community 84"
Cohesion: 0.40
Nodes (4): compilerOptions, outDir, rootDir, extends

### Community 85 - "Community 85"
Cohesion: 0.50
Nodes (3): Boas práticas, breathesafe, Ecossistema de economia de tokens

## Ambiguous Edges - Review These
- `AdonisJS App Config` → `AuthMiddleware`  [AMBIGUOUS]
  adonisrc.ts · relation: conceptually_related_to
- `ReadingsController` → `createReadingValidator`  [AMBIGUOUS]
  app/validators/reading.ts · relation: references
- `SensorsController` → `updateSensorValidator`  [AMBIGUOUS]
  app/controllers/sensors_controller.ts · relation: references

## Knowledge Gaps
- **337 isolated node(s):** `name`, `version`, `private`, `type`, `license` (+332 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **50 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `AdonisJS App Config` and `AuthMiddleware`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `ReadingsController` and `createReadingValidator`?**
  _Edge tagged AMBIGUOUS (relation: references) - confidence is low._
- **What is the exact relationship between `SensorsController` and `updateSensorValidator`?**
  _Edge tagged AMBIGUOUS (relation: references) - confidence is low._
- **Why does `dependencies` connect `Community 76` to `Community 78`?**
  _High betweenness centrality (0.005) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Community 1` to `Community 5`?**
  _High betweenness centrality (0.005) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `Community 80` to `Community 8`?**
  _High betweenness centrality (0.003) - this node is a cross-community bridge._
- **What connects `name`, `version`, `private` to the rest of the system?**
  _339 weakly-connected nodes found - possible documentation gaps or missing edges._