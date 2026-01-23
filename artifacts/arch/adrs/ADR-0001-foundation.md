# ADR-0001: Foundation Choices

## Status
Accepted

## Context
PST Coaching requires a stable React Native foundation that supports offline-first content delivery, Material 3 UI, and analytics. The app has multiple tabs, deep content flows, and strict accessibility requirements. We need to choose navigation, state management, networking, caching, and i18n approaches that reduce complexity while enabling offline behavior.

## Decisions

### Navigation
- **Decision:** React Navigation (native-stack + bottom-tabs) with react-native-screens and react-native-gesture-handler.
- **Rationale:** Widely supported, flexible for tab + stack + modal patterns, and consistent with Material 3 behaviors.
- **Trade-offs:** Additional setup and native dependencies; slight complexity for deep linking and guard logic.

### State Management
- **Decision:** Zustand for client state + TanStack Query for server state.
- **Rationale:** Clear separation of concerns, minimal boilerplate, strong caching/invalidation, and good offline support.
- **Trade-offs:** Requires conventions to avoid duplicating server state in client stores.

### Networking
- **Decision:** Axios with typed API client + interceptors for auth and error mapping.
- **Rationale:** Consistent error handling and request configuration; supports request cancellation and retries.
- **Trade-offs:** Extra dependency; must ensure interceptors do not leak sensitive data.

### Caching & Persistence
- **Decision:** SQLite for content + progress; MMKV for settings and lightweight flags.
- **Rationale:** Content-heavy app needs reliable offline storage; SQLite supports queries and pagination.
- **Trade-offs:** Requires schema migrations and background sync strategy.

### Internationalization (i18n)
- **Decision:** i18next + react-i18next with locale detection and persisted language setting.
- **Rationale:** Strong RN ecosystem support, pluralization, and runtime language switching.
- **Trade-offs:** Requires careful key management and localization workflow.

## Consequences
- Enables offline-first UX, consistent caching, and a clean separation between server data and client state.
- Introduces responsibility for data migrations and cache invalidation policies.
- Provides a stable base for Material 3 theming and accessibility features.

## Alternatives Considered
- **Redux Toolkit:** robust but heavier boilerplate for simple app state.
- **MobX:** reactive but less standardized across teams.
- **Realm/WatermelonDB:** powerful offline databases but higher setup and vendor lock-in.
- **React Intl:** good for web, less optimized for RN compared to i18next.
