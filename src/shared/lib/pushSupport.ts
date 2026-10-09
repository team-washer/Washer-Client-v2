export type PushSupportState =
  | "ready"
  | "denied"
  | "not-configured"
  | "unsupported";

interface PushSupportInput {
  isBrowser: boolean;
  hasNotificationApi: boolean;
  permission: NotificationPermission | "default";
  isFirebaseSupported: boolean;
  hasVapidKey: boolean;
}

export function getPushSupportState({
  isBrowser,
  hasNotificationApi,
  permission,
  isFirebaseSupported,
  hasVapidKey,
}: PushSupportInput): PushSupportState {
  if (!isBrowser || !hasNotificationApi || !isFirebaseSupported) {
    return "unsupported";
  }

  if (!hasVapidKey) return "not-configured";
  if (permission === "denied") return "denied";

  return "ready";
}
