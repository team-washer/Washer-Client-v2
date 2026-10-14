const SEOUL_TIME_ZONE = "Asia/Seoul";

export function getRecentMachineHistoryRange(now = new Date()): {
  startDate: string;
  endDate: string;
} {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: SEOUL_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const values = Object.fromEntries(
    parts
      .filter(({ type }) => type !== "literal")
      .map(({ type, value }) => [type, value]),
  ) as Record<string, string>;
  const today = new Date(
    Date.UTC(Number(values.year), Number(values.month) - 1, Number(values.day)),
  );
  const yesterday = new Date(today);
  yesterday.setUTCDate(yesterday.getUTCDate() - 1);

  const formatDate = (date: Date) => date.toISOString().slice(0, 10);

  return {
    startDate: `${formatDate(yesterday)}T00:00:00`,
    endDate: `${formatDate(today)}T23:59:59`,
  };
}
