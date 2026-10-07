// v1 사용자 웹과 같은 작업 상태 표시. SmartThings jobState 원본 값을 키로 사용한다.
import type { MachineType } from "../model/types";

export interface JobStateInfo {
  text: string;
  color: string;
  icon: string;
  description: string;
}

type WasherJobState =
  | "airWash"
  | "aIRinse"
  | "aISpin"
  | "aIWash"
  | "cooling"
  | "delayWash"
  | "drying"
  | "finish"
  | "none"
  | "preWash"
  | "rinse"
  | "spin"
  | "wash"
  | "weightSensing"
  | "wrinklePrevent"
  | "freezeProtection";

type DryerJobState =
  | "cooling"
  | "delayWash"
  | "drying"
  | "finished"
  | "none"
  | "refreshing"
  | "weightSensing"
  | "wrinklePrevent"
  | "dehumidifying"
  | "aIDrying"
  | "sanitizing"
  | "internalCare"
  | "freezeProtection"
  | "continuousDehumidifying"
  | "thawingFrozenInside";

const washerJobStateMap: Record<WasherJobState, JobStateInfo> = {
  none: {
    text: "대기 중",
    color: "bg-gray-50 text-gray-700 border-gray-200",
    icon: "⏸️",
    description: "현재 작업 상태가 없습니다",
  },
  airWash: {
    text: "에어워시 중",
    color: "bg-sky-50 text-sky-700 border-sky-200",
    icon: "💨",
    description: "에어워시 모드로 작동 중입니다",
  },
  aIRinse: {
    text: "AI 헹굼 중",
    color: "bg-violet-50 text-violet-700 border-violet-200",
    icon: "🤖",
    description: "AI 헹굼 모드로 작동 중입니다",
  },
  aISpin: {
    text: "AI 탈수 중",
    color: "bg-violet-50 text-violet-700 border-violet-200",
    icon: "🤖",
    description: "AI 탈수 모드로 작동 중입니다",
  },
  aIWash: {
    text: "AI 세탁 중",
    color: "bg-violet-50 text-violet-700 border-violet-200",
    icon: "🤖",
    description: "AI 세탁 모드로 작동 중입니다",
  },
  cooling: {
    text: "냉각 중",
    color: "bg-sky-50 text-sky-700 border-sky-200",
    icon: "❄️",
    description: "세탁 완료 후 냉각하고 있습니다",
  },
  delayWash: {
    text: "예약 대기",
    color: "bg-orange-50 text-orange-700 border-orange-200",
    icon: "⏰",
    description: "예약된 시간을 기다리고 있습니다",
  },
  drying: {
    text: "건조 중",
    color: "bg-red-50 text-red-700 border-red-200",
    icon: "🔥",
    description: "건조 작업을 진행하고 있습니다",
  },
  finish: {
    text: "완료",
    color: "bg-green-50 text-green-700 border-green-200",
    icon: "✅",
    description: "세탁이 완료되었습니다",
  },
  preWash: {
    text: "예비세탁 중",
    color: "bg-cyan-50 text-cyan-700 border-cyan-200",
    icon: "🫧",
    description: "예비세탁을 진행하고 있습니다",
  },
  rinse: {
    text: "헹굼 중",
    color: "bg-teal-50 text-teal-700 border-teal-200",
    icon: "💧",
    description: "헹굼 작업을 진행하고 있습니다",
  },
  spin: {
    text: "탈수 중",
    color: "bg-indigo-50 text-indigo-700 border-indigo-200",
    icon: "🌀",
    description: "탈수 작업을 진행하고 있습니다",
  },
  wash: {
    text: "세탁 중",
    color: "bg-blue-50 text-blue-700 border-blue-200",
    icon: "🌊",
    description: "세탁 작업을 진행하고 있습니다",
  },
  weightSensing: {
    text: "무게 감지 중",
    color: "bg-purple-50 text-purple-700 border-purple-200",
    icon: "⚖️",
    description: "세탁물의 무게를 감지하고 있습니다",
  },
  wrinklePrevent: {
    text: "구김 방지 중",
    color: "bg-pink-50 text-pink-700 border-pink-200",
    icon: "👔",
    description: "구김 방지 모드가 작동 중입니다",
  },
  freezeProtection: {
    text: "동결 방지 중",
    color: "bg-blue-50 text-blue-700 border-blue-200",
    icon: "🧊",
    description: "동결 방지 모드가 작동 중입니다",
  },
};

const dryerJobStateMap: Record<DryerJobState, JobStateInfo> = {
  none: {
    text: "대기 중",
    color: "bg-gray-50 text-gray-700 border-gray-200",
    icon: "⏸️",
    description: "현재 작업 상태가 없습니다",
  },
  cooling: {
    text: "냉각 중",
    color: "bg-sky-50 text-sky-700 border-sky-200",
    icon: "❄️",
    description: "건조 완료 후 냉각하고 있습니다",
  },
  delayWash: {
    text: "예약 대기",
    color: "bg-orange-50 text-orange-700 border-orange-200",
    icon: "⏰",
    description: "예약된 시간을 기다리고 있습니다",
  },
  drying: {
    text: "건조 중",
    color: "bg-red-50 text-red-700 border-red-200",
    icon: "🔥",
    description: "건조 작업을 진행하고 있습니다",
  },
  finished: {
    text: "완료",
    color: "bg-green-50 text-green-700 border-green-200",
    icon: "✅",
    description: "건조가 완료되었습니다",
  },
  refreshing: {
    text: "리프레쉬 중",
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    icon: "🌿",
    description: "탈취 또는 리프레쉬 작업 중입니다",
  },
  weightSensing: {
    text: "무게 감지 중",
    color: "bg-purple-50 text-purple-700 border-purple-200",
    icon: "⚖️",
    description: "세탁물의 무게를 감지하고 있습니다",
  },
  wrinklePrevent: {
    text: "구김 방지 중",
    color: "bg-pink-50 text-pink-700 border-pink-200",
    icon: "👔",
    description: "구김 방지 모드가 작동 중입니다",
  },
  dehumidifying: {
    text: "제습 중",
    color: "bg-amber-50 text-amber-700 border-amber-200",
    icon: "💨",
    description: "제습 모드가 작동 중입니다",
  },
  aIDrying: {
    text: "AI 건조 중",
    color: "bg-violet-50 text-violet-700 border-violet-200",
    icon: "🤖",
    description: "AI 건조 기능이 작동 중입니다",
  },
  sanitizing: {
    text: "살균 중",
    color: "bg-lime-50 text-lime-700 border-lime-200",
    icon: "🦠",
    description: "살균 모드가 작동 중입니다",
  },
  internalCare: {
    text: "내부 관리 중",
    color: "bg-slate-50 text-slate-700 border-slate-200",
    icon: "🔧",
    description: "내부 관리(통세척 등) 작업 중입니다",
  },
  freezeProtection: {
    text: "동결 방지 중",
    color: "bg-blue-50 text-blue-700 border-blue-200",
    icon: "🧊",
    description: "동결 방지 모드가 작동 중입니다",
  },
  continuousDehumidifying: {
    text: "지속 제습 중",
    color: "bg-amber-50 text-amber-700 border-amber-200",
    icon: "💨",
    description: "지속 제습 모드가 작동 중입니다",
  },
  thawingFrozenInside: {
    text: "해동 중",
    color: "bg-orange-50 text-orange-700 border-orange-200",
    icon: "🔥",
    description: "내부 결빙을 해동하고 있습니다",
  },
};

export function getJobStateInfo(
  type: MachineType,
  jobState: string | null,
): JobStateInfo {
  if (type === "WASHER") {
    return (
      washerJobStateMap[(jobState ?? "none") as WasherJobState] ??
      washerJobStateMap.none
    );
  }

  return (
    dryerJobStateMap[(jobState ?? "none") as DryerJobState] ??
    dryerJobStateMap.none
  );
}
