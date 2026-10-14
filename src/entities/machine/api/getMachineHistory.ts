import { get, machineUrl, normalizeApiError } from "@/shared/api";
import type { BaseResponseType } from "@/shared/api/types";
import type {
  MachineHistoryPage,
  MachineHistoryParamsType,
} from "../model/types";
import { machineHistoryPageSchema } from "./schemas";

export async function getMachineHistory(
  id: number,
  params: MachineHistoryParamsType & { page: number },
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
