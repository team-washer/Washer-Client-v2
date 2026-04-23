export function formatRemainingTime(
  targetTime: string,
  nowTimestamp: number = Date.now(),
): string {
  const target = new Date(targetTime);
  const diff = target.getTime() - nowTimestamp;

  if (Number.isNaN(target.getTime()) || diff <= 0) {
    return "00시간 00분";
  }

  const totalMinutes = Math.floor(diff / 1000 / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${String(hours).padStart(2, "0")}시간 ${String(minutes).padStart(
    2,
    "0",
  )}분`;
}