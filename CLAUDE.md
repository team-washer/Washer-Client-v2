# Washer-Client-v2

Admin frontend for Washer, a dormitory laundry (washer/dryer) reservation service. Admins monitor machine status, manage reservations, handle malfunction reports, and manage users and penalties.

## Stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS 4, shadcn-style UI primitives in `src/shared/ui`, `sonner` toasts
- TanStack Query + Axios (`src/shared/lib/axios.ts`, base URL `/api`, 401 refresh interceptor)
- React Hook Form + Zod
- Biome (lint/format), pnpm

## Commands

```bash
pnpm dev          # dev server
pnpm lint         # biome lint
pnpm format       # biome format --write
pnpm lint:fix     # biome check --write
pnpm check-types  # tsc --noEmit
pnpm build        # production build
```

## Architecture

Feature-Sliced Design. Import direction only downward:

```text
app -> widgets -> features -> entities -> shared
```

- `src/app`: routes — `(admin)` group (dashboard, machines, reports, reservations, users), `sign-in`, `api/callback`. Auth guard lives in `src/proxy.ts`.
- `src/widgets`: page compositions (`*-page`) and the shared admin layout (`layout`).
- `src/features`: user actions (`auth/sign-in`).
- `src/entities`: `machine`, `reservation`, `report`, `user`, `dashboard` — query/mutation hooks in `api`, types in `model`, public exports through `index.ts`.
- `src/shared`: `api` (apiUrls, http helpers, queryKeys, types), `lib`, `ui`, `hooks`, `constants`, `utils`, `styles`.

Detailed conventions are path-scoped rules in `.claude/rules/*.md` — follow them for architecture, UI, API/data, debugging, and Git work.

## Harness Triggers

- Implementation tasks (features, fixes, refactors, UI, data): use the `orchestrator` skill to route work to the agent team.
- Architecture or layering decisions: `frontend-architecture` skill.
- UI work: `ui-implementation` skill. API/data work: `api-data-flow` skill.
- Verification after changes: `quality-gate` skill (`pnpm format`, `pnpm lint`, `pnpm build`).
- Bugs or failing builds: `systematic-debugging` skill before attempting fixes.
- Code review requests: `code-review` skill.
- Explicit Git requests only: `commit` (commits), `write-pr` (PR creation), `review-pr` (review replies). Never push or create PRs unprompted.

## Working Rules

- Respond to the user in Korean. Keep harness docs and code identifiers in English.
- Commit messages: Conventional Commits with Korean descriptions (see `.claude/rules/git-workflow.md`). Commit at the end of each completed task; do not push.
- Default branch for PRs and branch reviews: `main`.
- Make the smallest change that satisfies the request; do not refactor adjacent code uninvited.

## Harness Changelog

Record harness changes in `.claude/CHANGELOG.md`, not here.
