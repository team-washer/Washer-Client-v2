import { z } from "zod";

export const applyUserPenaltySchema = z.object({
  reason: z.string().trim().min(1, "부과 사유를 입력해주세요.").max(200, "부과 사유는 200자 이내로 입력해주세요."),
});

export type ApplyUserPenaltyFormValues = z.infer<typeof applyUserPenaltySchema>;
