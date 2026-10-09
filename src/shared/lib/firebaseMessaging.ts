"use client";

import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";
import { firebaseConfig, hasFirebaseConfig } from "./firebaseConfig";
import { getPushSupportState } from "./pushSupport";

export const FIREBASE_MESSAGING_SW_PATH = "/firebase-messaging-sw.js";

function getFirebaseApp() {
  if (!hasFirebaseConfig()) return null;
  return getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
}

export async function requestPushPermission(): Promise<string | null> {
  const isBrowser = typeof window !== "undefined";
  const hasNotificationApi =
    isBrowser && typeof window.Notification !== "undefined";
  const permission = hasNotificationApi
    ? window.Notification.permission
    : "default";
  const firebaseApp = getFirebaseApp();

  let isFirebaseSupported = false;
  if (firebaseApp) {
    try {
      isFirebaseSupported = await isSupported();
    } catch {
      isFirebaseSupported = false;
    }
  }

  const supportState = getPushSupportState({
    isBrowser,
    hasNotificationApi,
    permission,
    isFirebaseSupported,
    hasVapidKey: Boolean(process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY),
  });

  if (supportState !== "ready") return null;

  const nextPermission = await window.Notification.requestPermission();
  if (nextPermission !== "granted" || !firebaseApp) return null;

  try {
    const registration = await navigator.serviceWorker.register(
      FIREBASE_MESSAGING_SW_PATH,
    );
    const messaging = getMessaging(firebaseApp);
    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
      serviceWorkerRegistration: registration,
    });

    if (!token) return null;
    return token;
  } catch (error) {
    console.error("웹 FCM 토큰 발급 실패", error);
    return null;
  }
}
