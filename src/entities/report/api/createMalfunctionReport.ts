import { normalizeApiError, post, reportUrl } from "@/shared/api";

// 백엔드 검증과 같은 신고 내용 최대 길이
export const MALFUNCTION_DESCRIPTION_MAX_LENGTH = 200;

export interface CreateMalfunctionReportRequest {
  machineId: number;
  description: string;
}

export async function createMalfunctionReport(
  request: CreateMalfunctionReportRequest,
): Promise<void> {
  try {
    await post(reportUrl.createMalfunctionReport(), request);
  } catch (error) {
    throw normalizeApiError(error);
  }
}
