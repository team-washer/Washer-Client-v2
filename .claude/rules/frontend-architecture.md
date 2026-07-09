---
description: 'Feature-Sliced Design layering, project structure, ownership, and client/server architecture rules for Washer frontend source files.'
paths:
  - 'src/**/*'
  - 'CLAUDE.md'
  - 'AGENTS.md'
---

# Frontend Architecture Rules

Use these rules as the authoritative Washer frontend architecture checklist.

## Layering

Follow this dependency direction:

```text
app -> widgets -> features -> entities -> shared
```

- Higher layers may import lower layers.
- Lower layers must not import higher layers.
- Same-layer imports are not allowed.
- Prefer each slice's public `index.ts` export when it exists.

## Ownership

- `src/app`: route entrypoints, layouts, metadata, and the `(admin)` route group; route protection lives in `src/proxy.ts`.
- `src/widgets`: page-level compositions (`*-page`) and shared layout sections (`layout`).
- `src/features`: user actions.
- `src/entities`: domain types, API functions, query hooks, and entity UI.
- `src/shared`: api clients, hooks, lib helpers, styles, constants, UI primitives, and utilities.

## Change Scope

- Make the smallest change that satisfies the user request.
- Do not refactor adjacent code unless the current change makes it necessary.
- Add abstractions only when they remove real duplication or match an existing local pattern.
- Do not move files just to make the structure look cleaner.

## Client and Server Boundaries

- Mark components with `use client` only when they need hooks, browser APIs, event handlers, or client state.
- Do not import `server-only` modules into client components.
- Use the `get`/`post`/`patch`/`put`/`del` helpers from `src/shared/api/http.ts` (wrapping `axiosInstance`, base URL `/api`) for client requests; do not create ad-hoc axios instances.
