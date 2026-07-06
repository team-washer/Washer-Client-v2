# Washer Git Scope Guide

Use this guide when selecting branch names, commit scopes, PR title scopes, and logical commit groups.

## Runtime Discovery

Prefer changed files over guesses:

```bash
bash "${CLAUDE_SKILL_DIR}/scripts/discover-changed-areas.sh" auto
```

Use `staged` when the user specifically asks about staged changes:

```bash
bash "${CLAUDE_SKILL_DIR}/scripts/discover-changed-areas.sh" staged
```

## Scope Priority

Choose the most specific meaningful scope:

1. Feature/domain area such as `machine`, `reservation`, `report`, `user`, `auth`, or `admin`
2. FSD layer such as `features`, `entities`, `widgets`, or `shared`
3. Cross-cutting scope such as `harness`, `docs`, `ci`, `config`, or `global`

## Common Scope Mapping

| Changed Area                                     | Preferred Scope | When to Use                                                    |
| ------------------------------------------------ | --------------- | -------------------------------------------------------------- |
| `src/features/auth`, `src/app/sign-in`, `src/app/api/callback`, `src/widgets/sign-in-page` | `auth` | Sign-in flow, OAuth callback, auth cookies |
| `src/entities/machine`, `src/widgets/machines-page` | `machine`    | Machine types, API, hooks, cards, status display               |
| `src/entities/reservation`, `src/widgets/reservations-page` | `reservation` | Reservation types, API, hooks, list/detail UI          |
| `src/entities/report`, `src/widgets/reports-page` | `report`       | Report types, API, hooks, list/detail UI                       |
| `src/entities/user`, `src/widgets/users-page`    | `user`          | User info type/API/query changes, user management UI           |
| `src/entities/dashboard`, `src/widgets/main-page` | `dashboard`    | Dashboard summary data and main page UI                        |
| `src/app/(admin)`, `src/widgets/layout`          | `admin`         | Admin route group, shared admin layout, tabs, guards           |
| `.claude/**`                                     | `harness`       | Agent, skill, rule, hook, or settings changes                  |
| `.github/**`                                     | `ci`            | Workflow or PR template changes                                |
| `docs/**`, `README.md`, `CLAUDE.md`, `AGENTS.md` | `docs`          | Documentation-only changes                                     |
| Tooling config                                   | `config`        | TypeScript, Biome, Next, package config             |

## Commit Type Selection

| Type       | Use For                                              |
| ---------- | ---------------------------------------------------- |
| `feat`     | User-visible capability or new app behavior          |
| `fix`      | Bug fix or regression fix                            |
| `refactor` | Internal restructuring without behavior change       |
| `style`    | Visual styling or formatting-only UI changes         |
| `chore`    | Harness, tooling, dependency, or maintenance changes |
| `docs`     | Documentation-only changes                           |
| `test`     | Test-only changes                                    |
| `ci`       | GitHub Actions or CI changes                         |

## Examples

```text
chore(harness): Git 워크플로 자동화 추가
fix(reservation): 예약 폼 기본값을 스키마와 일치시킴
feat(machine): 기기 상태 필터 추가
docs: 설치 안내 문서 업데이트
```
