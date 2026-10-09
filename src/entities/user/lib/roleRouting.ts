import type { UserRole } from "../model/types";

export type UserHomeKind = "admin" | "user";

export type RoleBasedLayoutState = "loading" | "error" | UserHomeKind;

interface RoleBasedLayoutStateInput {
  isPending: boolean;
  isError: boolean;
  role?: UserRole;
}

export const getUserHomeKind = (role: UserRole): UserHomeKind | null => {
  if (role === "USER") return "user";
  if (role === "ADMIN" || role === "DORMITORY_COUNCIL") return "admin";
  return null;
};

export const getRoleBasedLayoutState = ({
  isPending,
  isError,
  role,
}: RoleBasedLayoutStateInput): RoleBasedLayoutState => {
  if (isPending) return "loading";
  if (isError || !role) return "error";
  return getUserHomeKind(role) ?? "error";
};
