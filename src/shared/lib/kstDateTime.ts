// 백엔드는 timezone 없는 LocalDateTime(한국 시간)을 내려준다.
// 실행 환경의 timezone과 관계없이 같은 시각으로 해석 · 표시되도록 한국 시간을 명시한다.
const SERVICE_TIME_ZONE = "Asia/Seoul";
const KST_OFFSET = "+09:00";
const HAS_OFFSET = /(Z|[+-]\d{2}:?\d{2})$/i;

export function parseKstDateTime(value: string | null): Date | null {
  if (!value) return null;

  const date = new Date(
    HAS_OFFSET.test(value) ? value : `${value}${KST_OFFSET}`,
  );
  return Number.isNaN(date.getTime()) ? null : date;
}

// "15:05"
export function formatKstClock(value: string | null): string | null {
  const date = parseKstDateTime(value);
  if (!date) return null;

  return date.toLocaleTimeString("ko-KR", {
    timeZone: SERVICE_TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

// "2026. 10. 8. 오후 3:05:00"
export function formatKstDateTime(value: string | null): string | null {
  const date = parseKstDateTime(value);
  if (!date) return null;

  return date.toLocaleString("ko-KR", { timeZone: SERVICE_TIME_ZONE });
}
