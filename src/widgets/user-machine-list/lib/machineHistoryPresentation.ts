import type { MachineHistoryItemDTO } from "../../../entities/machine/model/types.ts";

export type MachineHistoryStatusLabel =
  | "예약중"
  | "사용중"
  | "사용 완료"
  | "취소됨";

export interface MachineHistoryDayGroup {
  label: "오늘" | "어제";
  items: MachineHistoryItemDTO[];
}

const STATUS_LABELS: Record<
  MachineHistoryItemDTO["status"],
  MachineHistoryStatusLabel
> = {
  RESERVED: "예약중",
  RUNNING: "사용중",
  COMPLETED: "사용 완료",
  CANCELLED: "취소됨",
};

const KST_OFFSET = "+09:00";
const HAS_OFFSET = /(Z|[+-]\d{2}:?\d{2})$/i;

export function getMachineHistoryStatusLabel(
  status: MachineHistoryItemDTO["status"],
): MachineHistoryStatusLabel {
  return STATUS_LABELS[status];
}

function getKstDateKey(value: string): string | null {
  const date = new Date(
    HAS_OFFSET.test(value) ? value : `${value}${KST_OFFSET}`,
  );
  if (Number.isNaN(date.getTime())) return null;

  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const values = Object.fromEntries(
    parts
      .filter(({ type }) => type !== "literal")
      .map(({ type, value: partValue }) => [type, partValue]),
  ) as Record<string, string>;

  return `${values.year}-${values.month}-${values.day}`;
}

export function groupMachineHistoryByDay(
  items: MachineHistoryItemDTO[],
  range: { startDate: string; endDate: string },
): MachineHistoryDayGroup[] {
  const yesterday = range.startDate.slice(0, 10);
  const today = range.endDate.slice(0, 10);
  const itemsByDate = new Map<string, MachineHistoryItemDTO[]>();

  for (const item of items) {
    const dateKey = getKstDateKey(item.startTime ?? item.createdAt);
    if (!dateKey) continue;
    itemsByDate.set(dateKey, [...(itemsByDate.get(dateKey) ?? []), item]);
  }

  return [
    { label: "오늘" as const, items: itemsByDate.get(today) ?? [] },
    { label: "어제" as const, items: itemsByDate.get(yesterday) ?? [] },
  ].filter(({ items: groupItems }) => groupItems.length > 0);
}
