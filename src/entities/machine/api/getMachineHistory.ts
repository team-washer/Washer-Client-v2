import { get, machineUrl, normalizeApiError } from "@/shared/api";
import type { BaseResponseType } from "@/shared/api/types";
import type { MachineHistoryPage } from "../model/types";
import { machineHistoryPageSchema } from "./schemas";

export async function getMachineHistory(
  id: number,
  params: { page: number; size?: number },
): Promise<MachineHistoryPage> {
  try {
    const response = await get<BaseResponseType<unknown>>(
      machineUrl.getMachineHistory(id),
      { params },
    );

    return machineHistoryPageSchema.parse(response.data);
  } catch (error) {
    throw normalizeApiError(error);
  }
}
