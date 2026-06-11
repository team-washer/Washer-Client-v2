import type { MachineStatusOption } from "../model/types";

export const MACHINE_STATUS_OPTIONS: MachineStatusOption[] = [
  {
    value: "NORMAL",
    title: "정상 (NORMAL)",
    description: "기기가 정상적으로 작동하는 상태입니다.",
  },
  {
    value: "MALFUNCTION",
    title: "고장 (MALFUNCTION)",
    description: "기기 점검 및 수리가 필요한 상태입니다.",
  },
];
