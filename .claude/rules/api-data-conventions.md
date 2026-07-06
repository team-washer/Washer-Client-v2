---
description: 'API URL, Axios, TanStack Query, Zod schema, and data contract conventions for Washer data-flow files.'
paths:
  - 'src/shared/api/**/*'
  - 'src/shared/lib/axios.ts'
  - 'src/entities/**/*'
  - 'src/features/**/model/**/*'
---

# API and Data Flow Conventions

Use these rules for API, query, schema, and domain data changes.

## Standard Locations

- API URL constants belong in `src/shared/api/apiUrls.ts`.
- Requests use the `get`/`post`/`patch`/`put`/`del` helpers in `src/shared/api/http.ts`, backed by `src/shared/lib/axios.ts`.
- Query keys belong in `src/shared/api/queryKeys.ts`.
- Domain query/mutation hooks belong under `src/entities/*/api`, exported through the entity's `index.ts`.
- Feature-specific API calls and schemas belong under `src/features/*`.

## Query and Mutation Rules

- Use method-based TanStack Query hook names: `useGet*`, `usePost*`, `useUpdate*`, and `useDelete*`.
- Keep server data in TanStack Query; do not mirror it into separate client state.
- Invalidate only the query keys affected by a mutation.

## Type and Schema Rules

- Keep API response wrappers aligned with the UI consumer.
- Compare API function return types with hook generic types and component field usage.
- Use `z.infer<typeof schema>` for schema-derived form request types.
- Keep form default values, rendered fields, and Zod schema fields in sync.
- Preserve nullable fields from backend contracts unless the contract changes.
