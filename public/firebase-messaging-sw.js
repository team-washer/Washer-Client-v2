importScripts("/firebase-config.js");
importScripts(
  "https://www.gstatic.com/firebasejs/11.10.0/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/11.10.0/firebase-messaging-compat.js",
);

firebase.initializeApp(self.firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notification = payload.notification || payload.data || {};
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
