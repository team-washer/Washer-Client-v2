import { normalizeApiError, put, reportUrl } from "@/shared/api";
import type { BaseResponseType } from "@/shared/api/types";
import type { ReportStatusType } from "../model/types";

type UpdateReportStatusParams = {
  id: number;
  status: ReportStatusType;
};

export async function updateReportStatus({
  id,
  status,
}: UpdateReportStatusParams): Promise<void> {
  try {
    await put<BaseResponseType<null>>(
      reportUrl.updateMalfunctionReportStatus(id),
      {
        status,
      },
    );
  } catch (error) {
    throw normalizeApiError(error);
  }
}
