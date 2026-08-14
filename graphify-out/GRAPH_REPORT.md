# Graph Report - .  (2026-08-14)

## Corpus Check
- Corpus is ~12,826 words - fits in a single context window. You may not need a graph.

## Summary
- 458 nodes · 432 edges · 76 communities (32 shown, 44 thin omitted)
- Extraction: 91% EXTRACTED · 8% INFERRED · 1% AMBIGUOUS · INFERRED: 36 edges (avg confidence: 0.86)
- Token cost: 246,495 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Themed UI Components|Themed UI Components]]
- [[_COMMUNITY_Frontend npm Dependencies|Frontend npm Dependencies]]
- [[_COMMUNITY_Backend npm Dependencies|Backend npm Dependencies]]
- [[_COMMUNITY_Auth & Sensor Screens + API|Auth & Sensor Screens + API]]
- [[_COMMUNITY_Expo App Config|Expo App Config]]
- [[_COMMUNITY_Frontend Dev Dependencies|Frontend Dev Dependencies]]
- [[_COMMUNITY_Backend Core Domain|Backend Core Domain]]
- [[_COMMUNITY_Backend Dev Dependencies|Backend Dev Dependencies]]
- [[_COMMUNITY_AdonisJS Import Aliases|AdonisJS Import Aliases]]
- [[_COMMUNITY_Screen Entry Points|Screen Entry Points]]
- [[_COMMUNITY_Backend Bootstrap & Seeding|Backend Bootstrap & Seeding]]
- [[_COMMUNITY_Themed UI Hooks|Themed UI Hooks]]
- [[_COMMUNITY_Lucid Models|Lucid Models]]
- [[_COMMUNITY_Reset Project Script|Reset Project Script]]
- [[_COMMUNITY_Frontend tsconfig|Frontend tsconfig]]
- [[_COMMUNITY_ReadingsController Methods|ReadingsController Methods]]
- [[_COMMUNITY_SensorsController Methods|SensorsController Methods]]
- [[_COMMUNITY_UsersController Methods|UsersController Methods]]
- [[_COMMUNITY_Project Documentation|Project Documentation]]
- [[_COMMUNITY_Kernel & Routes Wiring|Kernel & Routes Wiring]]
- [[_COMMUNITY_Backend tsconfig|Backend tsconfig]]
- [[_COMMUNITY_Backend Config Bundle|Backend Config Bundle]]
- [[_COMMUNITY_Auth Config|Auth Config]]
- [[_COMMUNITY_Test Bootstrap|Test Bootstrap]]
- [[_COMMUNITY_SessionController|SessionController]]
- [[_COMMUNITY_HTTP Exception Handler|HTTP Exception Handler]]
- [[_COMMUNITY_History Screen|History Screen]]
- [[_COMMUNITY_Force JSON Response Middleware|Force JSON Response Middleware]]
- [[_COMMUNITY_Sensor Validator|Sensor Validator]]
- [[_COMMUNITY_User Validator|User Validator]]
- [[_COMMUNITY_Console Entrypoint|Console Entrypoint]]
- [[_COMMUNITY_Server Entrypoint|Server Entrypoint]]
- [[_COMMUNITY_Test Entrypoint|Test Entrypoint]]
- [[_COMMUNITY_App Config Keys|App Config Keys]]
- [[_COMMUNITY_Config Screen|Config Screen]]
- [[_COMMUNITY_Connection Screen|Connection Screen]]
- [[_COMMUNITY_Guest Dashboard|Guest Dashboard]]
- [[_COMMUNITY_Index Screen|Index Screen]]
- [[_COMMUNITY_WelcomeLogin Screen|Welcome/Login Screen]]
- [[_COMMUNITY_ExternalLink Component|ExternalLink Component]]
- [[_COMMUNITY_Header Component|Header Component]]
- [[_COMMUNITY_Hash Config|Hash Config]]
- [[_COMMUNITY_Logger Config|Logger Config]]
- [[_COMMUNITY_AuthMiddleware|AuthMiddleware]]
- [[_COMMUNITY_ContainerBindingsMiddleware|ContainerBindingsMiddleware]]
- [[_COMMUNITY_Bodyparser Config|Bodyparser Config]]
- [[_COMMUNITY_CORS Config|CORS Config]]
- [[_COMMUNITY_Database Config|Database Config]]
- [[_COMMUNITY_API Base URL|API Base URL]]
- [[_COMMUNITY_IconSymbol (duplicate)|IconSymbol (duplicate)]]
- [[_COMMUNITY_RegisterSensor Error Handling|RegisterSensor Error Handling]]
- [[_COMMUNITY_Test Bootstrap Entry|Test Bootstrap Entry]]
- [[_COMMUNITY_Reading Validator|Reading Validator]]
- [[_COMMUNITY_Session Validator|Session Validator]]
- [[_COMMUNITY_HttpExceptionHandler Class|HttpExceptionHandler Class]]
- [[_COMMUNITY_ContainerBindingsMiddleware Class|ContainerBindingsMiddleware Class]]
- [[_COMMUNITY_ForceJsonResponseMiddleware Class|ForceJsonResponseMiddleware Class]]
- [[_COMMUNITY_Console Entrypoint Class|Console Entrypoint Class]]
- [[_COMMUNITY_tsconfig.json Node|tsconfig.json Node]]
- [[_COMMUNITY_Collapsible Component|Collapsible Component]]
- [[_COMMUNITY_ExternalLink Class|ExternalLink Class]]
- [[_COMMUNITY_Header Class|Header Class]]
- [[_COMMUNITY_iOS TabBar Blur|iOS TabBar Blur]]

## God Nodes (most connected - your core abstractions)
1. `imports` - 17 edges
2. `expo` - 14 edges
3. `scripts` - 8 edges
4. `scripts` - 8 edges
5. `Package Manifest` - 7 edges
6. `ReadingsController` - 6 edges
7. `SensorsController` - 6 edges
8. `UsersController` - 6 edges
9. `useColorScheme()` - 6 edges
10. `useThemeColor()` - 6 edges

## Surprising Connections (you probably didn't know these)
- `AdonisJS App Config` --conceptually_related_to--> `AuthMiddleware`  [AMBIGUOUS]
  adonisrc.ts → app/middleware/auth_middleware.ts
- `Docker Compose (Postgres Service)` --conceptually_related_to--> `Database Config (Postgres/Lucid)`  [INFERRED]
  breathesafe-back/docker-compose.yml → breathesafe-back/config/database.ts
- `Login` --semantically_similar_to--> `Registre (new account)`  [INFERRED] [semantically similar]
  breathesafe-front/app/(tabs)/login.tsx → breathesafe-front/app/(tabs)/new_account.tsx
- `breathesafe Monorepo` --references--> `breathesafe-front README`  [INFERRED]
  CLAUDE.md → breathesafe-front/README.md
- `RootLayout()` --calls--> `useColorScheme()`  [INFERRED]
  breathesafe-front/_layout.tsx → breathesafe-front/src/hooks/useColorScheme.web.ts

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

## Communities (76 total, 44 thin omitted)

### Community 0 - "Themed UI Components"
Cohesion: 0.09
Nodes (22): RootLayout(), Collapsible(), styles, HapticTab(), styles, ParallaxScrollView(), Props, styles (+14 more)

### Community 1 - "Frontend npm Dependencies"
Cohesion: 0.05
Nodes (37): dependencies, axios, @babel/runtime, expo, expo-blur, expo-constants, expo-font, expo-haptics (+29 more)

### Community 2 - "Backend npm Dependencies"
Cohesion: 0.08
Nodes (25): dependencies, @adonisjs/auth, @adonisjs/core, @adonisjs/cors, @adonisjs/lucid, luxon, pg, reflect-metadata (+17 more)

### Community 3 - "Auth & Sensor Screens + API"
Cohesion: 0.08
Nodes (15): api, ApiResponse, LoginData, styles, TokenData, SensorData, styles, ApiError (+7 more)

### Community 4 - "Expo App Config"
Cohesion: 0.09
Nodes (22): backgroundColor, foregroundImage, adaptiveIcon, typedRoutes, expo, android, experiments, icon (+14 more)

### Community 5 - "Frontend Dev Dependencies"
Cohesion: 0.09
Nodes (22): devDependencies, @babel/core, jest, jest-expo, @types/jest, @types/react, @types/react-test-renderer, typescript (+14 more)

### Community 6 - "Backend Core Domain"
Cohesion: 0.12
Nodes (19): Ace CLI Entrypoint, AdonisJS App Config, AuthMiddleware, ESLint Config, Package Manifest, Reading Model, createReadingValidator, ReadingsController (+11 more)

### Community 7 - "Backend Dev Dependencies"
Cohesion: 0.11
Nodes (18): devDependencies, @adonisjs/assembler, @adonisjs/eslint-config, @adonisjs/prettier-config, @adonisjs/tsconfig, eslint, hot-hook, @japa/api-client (+10 more)

### Community 8 - "AdonisJS Import Aliases"
Cohesion: 0.12
Nodes (17): imports, #abilities/*, #config/*, #controllers/*, #database/*, #events/*, #exceptions/*, #listeners/* (+9 more)

### Community 9 - "Screen Entry Points"
Cohesion: 0.19
Nodes (17): Expo App Config, ConfigurationsScreen, ConnectDeviceScreen, Dashboard (guest.tsx), HapticTab, HistoryScreen, Index (splash redirect), RootLayout (+9 more)

### Community 10 - "Backend Bootstrap & Seeding"
Cohesion: 0.21
Nodes (13): App Config (HTTP/AppKey), Create Readings Table Migration, Create Sensors Table Migration, Create Users Table Migration, Database Config (Postgres/Lucid), Docker Compose (Postgres Service), Environment Variables Schema, Hash Config (Scrypt) (+5 more)

### Community 11 - "Themed UI Hooks"
Cohesion: 0.22
Nodes (11): Colors constants, HelloWave, ParallaxScrollView, useBottomTabOverflow (iOS, blur-aware), useBottomTabOverflow (web/Android shim), ThemedText, ThemedText snapshot test, ThemedView (+3 more)

### Community 12 - "Lucid Models"
Cohesion: 0.29
Nodes (4): Reading, Sensor, AuthFinder, User

### Community 13 - "Reset Project Script"
Cohesion: 0.29
Nodes (5): fs, newDirPath, oldDirs, path, root

### Community 14 - "Frontend tsconfig"
Cohesion: 0.29
Nodes (6): compilerOptions, paths, strict, extends, include, @/*

### Community 18 - "Project Documentation"
Cohesion: 0.33
Nodes (6): Caveman (compact response plugin), Graphify (project knowledge graph), breathesafe Monorepo, RTK (Rust Token Killer, shell filter), Token-Saving Ecosystem, breathesafe-front README

### Community 20 - "Backend tsconfig"
Cohesion: 0.40
Nodes (4): compilerOptions, outDir, rootDir, extends

### Community 21 - "Backend Config Bundle"
Cohesion: 0.40
Nodes (5): Auth Config (API Tokens Guard), Body Parser Config, CORS Config, HTTP Kernel (Middleware Registration), Application Routes

### Community 22 - "Auth Config"
Cohesion: 0.50
Nodes (3): authConfig, Authenticators, EventsList

## Ambiguous Edges - Review These
- `AdonisJS App Config` → `AuthMiddleware`  [AMBIGUOUS]
  adonisrc.ts · relation: conceptually_related_to
- `ReadingsController` → `createReadingValidator`  [AMBIGUOUS]
  app/validators/reading.ts · relation: references
- `SensorsController` → `updateSensorValidator`  [AMBIGUOUS]
  app/controllers/sensors_controller.ts · relation: references

## Knowledge Gaps
- **242 isolated node(s):** `name`, `version`, `private`, `type`, `license` (+237 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **44 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `AdonisJS App Config` and `AuthMiddleware`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `ReadingsController` and `createReadingValidator`?**
  _Edge tagged AMBIGUOUS (relation: references) - confidence is low._
- **What is the exact relationship between `SensorsController` and `updateSensorValidator`?**
  _Edge tagged AMBIGUOUS (relation: references) - confidence is low._
- **Why does `dependencies` connect `Frontend npm Dependencies` to `Frontend Dev Dependencies`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `Backend Dev Dependencies` to `Backend npm Dependencies`?**
  _High betweenness centrality (0.008) - this node is a cross-community bridge._
- **Why does `imports` connect `AdonisJS Import Aliases` to `Backend npm Dependencies`?**
  _High betweenness centrality (0.008) - this node is a cross-community bridge._
- **What connects `name`, `version`, `private` to the rest of the system?**
  _244 weakly-connected nodes found - possible documentation gaps or missing edges._