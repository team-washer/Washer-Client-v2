---
name: frontend-architecture
description: 'Plan and review Washer-Client-v2 architecture, Feature-Sliced Design layering, route ownership, public exports, import direction, client/server boundaries, and minimal implementation scope. Use for any Washer feature, refactor, routing, dependency, or architecture decision.'
---

# Washer Frontend Architecture

Use this skill to keep changes aligned with the repository's layered structure and to prevent unnecessary refactors.

## Repository Shape

Washer-Client-v2 is a Next.js App Router frontend using:

- Next.js 16, React 19, TypeScript
- Tailwind CSS 4
- Axios and TanStack Query
- React Hook Form and Zod

Layer order:

```text
app -> widgets -> features -> entities -> shared
```

Imports must move downward through this stack. Do not add same-layer imports.

## Planning Workflow

1. Identify the user-visible behavior.
2. Locate the route entrypoint in `src/app` (including the `(admin)` route group).
3. Locate page composition in `src/widgets/*-page` and shared layout in `src/widgets/layout`.
4. Locate user actions in `src/features`.
5. Locate domain types, hooks, and entity UI in `src/entities`.
6. Locate shared infrastructure in `src/shared`.
7. Choose the smallest layer that should own the change.

## Ownership Rules

- `app`: route files, layouts, metadata, and the `api/callback` route handler; route protection lives in `src/proxy.ts`.
- `widgets`: page-level compositions (`machines-page`, `main-page`, `reports-page`, `reservations-page`, `sign-in-page`, `users-page`) and the shared admin layout (`layout`).
- `features`: user actions such as sign-in.
- `entities`: machine, reservation, report, user, and dashboard domain models, API calls, query hooks, and domain UI.
- `shared`: api clients (`apiUrls`, `http`, `queryKeys`), hooks, utilities, styles, constants, and UI primitives.

## Decision Rules

- Add a new abstraction only when it removes repeated complexity or matches an existing pattern.
- Prefer existing exports over direct deep imports when a public index exists.
- Do not move files only to make the structure look cleaner.
- Keep server data in TanStack Query; do not mirror it into separate client state.

## Output

Write a short plan that includes:

- Required layer changes
- Files likely to change
- Boundary risks
- Assumptions
- Validation steps

Avoid long file inventories unless the task spans many modules.
