type AvailabilityStatus = "IN_USE" | "RESERVED" | "AVAILABLE" | "UNAVAILABLE";

export function mapAvailabilityDeviceStatus(
  availability: AvailabilityStatus,
): string | undefined {
  switch (availability) {
    case "IN_USE":
      return "사용 중";
    case "RESERVED":
      return "예약됨";
    case "AVAILABLE":
      return "사용 가능";
    case "UNAVAILABLE":
      return "사용 불가";
    default:
      return undefined;
  }
}