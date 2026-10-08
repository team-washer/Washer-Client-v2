import type { UserRole } from "../model/types";

export type UserHomeKind = "admin" | "user";

export const getUserHomeKind = (role: UserRole): UserHomeKind =>
  role === "USER" ? "user" : "admin";
