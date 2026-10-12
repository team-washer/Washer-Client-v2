import { firebaseConfig } from "@/shared/lib/firebaseConfig";

export const dynamic = "force-dynamic";

export function GET() {
  const config = JSON.stringify(firebaseConfig);
  const script = `
importScripts("https://www.gstatic.com/firebasejs/11.10.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/11.10.0/firebase-messaging-compat.js");

firebase.initializeApp(${config});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  // FCM displays notification payloads automatically in the background.
  // Manually displaying them here would create a duplicate notification.
  if (payload.notification) return;

  const notification = payload.data || {};
  const title = notification.title || "Washer 알림";
  const options = {
    body: notification.body || "새로운 알림이 도착했습니다.",
    icon: "/icons/washer-drop.svg",
    data: { url: "/notifications" },
  };

  self.registration.showNotification(title, options);
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data?.url || "/notifications"),
  );
});
`;

  return new Response(script, {
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "application/javascript; charset=utf-8",
    },
  });
}
