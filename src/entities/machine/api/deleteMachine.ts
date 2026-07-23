import { del, machineUrl, normalizeApiError } from "@/shared/api";

export async function deleteMachine(id: number): Promise<void> {
  try {
    await del(machineUrl.deleteMachine(id));
  } catch (error) {
    throw normalizeApiError(error);
  }
}
