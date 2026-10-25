# 로그인 화면 반응형 구현 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 로그인 카드가 모바일 화면 너비를 넘지 않으면서 데스크톱의 기존 최대 폭과 스타일을 유지하도록 만든다.

**Architecture:** `AuthLayout`이 화면 전체 너비와 반응형 좌우·상하 여백을 제공하고, `SignInForm`이 `w-full max-w-110`으로 카드 최대 폭을 제한한다. OAuth 동작과 인증 API는 변경하지 않는다.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, Biome, TypeScript.

**Spec:** `docs/superpowers/specs/2026-10-25-sign-in-responsive-design.md`

## Global Constraints

- 로그인 화면의 OAuth 인증 흐름은 변경하지 않는다.
- 모바일 카드가 viewport를 넘지 않아야 한다.
- 데스크톱 카드 최대 폭은 `max-w-110`으로 유지한다.
- 네트워크 재시도·오프라인 캐시·서비스 워커는 이번 범위에 포함하지 않는다.

## Review Focus

- 320px 폭에서 카드와 버튼이 수평 overflow를 만들지 않는지 확인한다.
- 짧은 모바일 viewport에서 콘텐츠가 잘리지 않고 세로 스크롤 가능한지 확인한다.
- 640px 이상 화면에서 카드 최대 폭과 기존 데스크톱 여백이 유지되는지 확인한다.
- OAuth 버튼이 카드 너비에 맞춰 계속 표시되는지 확인한다.

### Task 1: 반응형 로그인 레이아웃

**Files:**
- Create: `tests/sign-in-responsive.test.mjs`
- Modify: `src/widgets/layout/auth-layout/ui/AuthLayout/index.tsx`
- Modify: `src/features/auth/sign-in/ui/SignInForm/index.tsx`

**Interfaces:**
- Consumes: existing `AuthLayout` children contract and `OAuthLoginButton` component.
- Produces: an auth layout with full-width content area and a sign-in card that is full width up to `max-w-110`.

- [ ] **Step 1: Write the failing test**

  Add source-contract tests named `uses a viewport-safe auth layout` and `uses a responsive sign-in card` that assert the layout source contains `min-h-dvh`, `w-full`, responsive padding classes, and the form source contains `w-full max-w-110` plus mobile/desktop padding classes.

- [ ] **Step 2: Run test to verify it fails**

  Run: `node --test tests/sign-in-responsive.test.mjs`

  Expected: FAIL because the current layout uses `min-h-screen` without a full-width content contract and the form uses fixed `w-110`.

- [ ] **Step 3: Implement the responsive layout**

  In `AuthLayout`, use `min-h-dvh` on the main container and make the content section `w-full` with `px-4 py-6 sm:px-6 sm:py-10`. In `SignInForm`, replace the fixed card width with `w-full max-w-110`, use `px-5 py-8 sm:px-7 sm:py-10`, and use smaller default button padding with the existing desktop padding restored at `sm`.

- [ ] **Step 4: Run the focused test**

  Run: `node --test tests/sign-in-responsive.test.mjs`

  Expected: PASS with 2 tests and 0 failures.

- [ ] **Step 5: Run project verification**

  Run: `pnpm check-types; pnpm lint; pnpm build`

  Expected: all commands exit with code 0.

- [ ] **Step 6: Commit**

  ```bash
  git add docs/superpowers/specs/2026-10-25-sign-in-responsive-design.md docs/superpowers/plans/2026-10-25-sign-in-responsive.md tests/sign-in-responsive.test.mjs src/widgets/layout/auth-layout/ui/AuthLayout/index.tsx src/features/auth/sign-in/ui/SignInForm/index.tsx
  git commit -m "fix: make sign-in layout responsive"
  ```
