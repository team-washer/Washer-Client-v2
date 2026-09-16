import { z } from "zod";

export const extendUserPenaltySchema = z.object({
  days: z
    .number({ error: "연장 일수를 입력해주세요." })
    .int("연장 일수는 정수로 입력해주세요.")
    .min(1, "연장 일수는 1일 이상이어야 합니다.")
    .max(30, "연장 일수는 30일 이하여야 합니다."),
});

export type ExtendUserPenaltyFormValues = z.infer<
  typeof extendUserPenaltySchema
>;
