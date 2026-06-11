export function formatDateTime(date: string | null): string | undefined {
  if (!date) return undefined;

  const value = new Date(date);

  if (Number.isNaN(value.getTime())) {
    return undefined;
  }

  return value.toLocaleString("ko-KR", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}
