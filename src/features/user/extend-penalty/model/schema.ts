import { z } from "zod";

export const extendUserPenaltySchema = z.object({
  days: z.number().int().min(1, "연장 일수는 1일 이상이어야 합니다.").max(30, "연장 일수는 30일 이내여야 합니다."),
});

export type ExtendUserPenaltyFormValues = z.infer<typeof extendUserPenaltySchema>;
