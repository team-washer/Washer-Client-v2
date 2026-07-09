---
name: api-data-flow
description: 'Implement and review Washer-Client-v2 API/data flow: apiUrls, http helpers, Axios client with token refresh, TanStack Query hooks, query keys, Zod schemas, response types, auth cookies, and client/server data boundaries. Use whenever a task touches backend contracts, requests, mutations, forms, or domain data.'
---

# Washer API Data Flow

Use this skill for any work that touches data contracts, requests, mutations, validation, or query state.

## Standard Paths

- API URL constants: `src/shared/api/apiUrls.ts`
- HTTP helpers (`get`/`post`/`patch`/`put`/`del`): `src/shared/api/http.ts`
- Client Axios instance and interceptors: `src/shared/lib/axios.ts`
- Query keys: `src/shared/api/queryKeys.ts`
- Shared response types: `src/shared/api/types.ts`
- Domain query/mutation hooks: `src/entities/*/api`
- Domain types and status maps: `src/entities/*/model`
- Feature API calls and UI: `src/features/*/<action>/api`, `src/features/*/<action>/ui`

## Client Request Rules

- Use the `get`/`post`/`patch`/`put`/`del` helpers from `src/shared/api/http.ts`; do not create ad-hoc axios instances.
- `axiosInstance` uses base URL `/api` (proxied); pass paths from `apiUrls`, not absolute hosts.
- Rely on the request interceptor for access-token injection from cookies.
- The response interceptor unwraps `response.data` and handles 401 refresh-token retry; preserve this behavior unless the task is specifically about auth.
- Keep API functions thin: URL, payload, and typed response.

## Query Rules

- Use method-based hook names such as `useGetMachines`, `useDeleteMachine`, and `useUpdateMachineStatus`, exported through the entity's `api/index.ts`.
- Keep query keys stable and centralized in `src/shared/api/queryKeys.ts`.
- Use mutation invalidation only for data that can be stale after the mutation.

## Schema and Type Rules

- Keep Zod schemas aligned with rendered form fields and API payload types.
- Use `z.infer<typeof schema>` for form request types.
- Compare API response wrappers with UI consumption. A compile pass is not enough if a hook casts an incompatible shape.
- Preserve nullable fields from domain types unless the backend contract changes.

## Integration Review

For every data-flow change, map:

```text
apiUrls -> API function -> query/mutation hook -> component consumer -> UI state
```

If one link is missing or mismatched, treat it as a bug to resolve or explicitly report.
