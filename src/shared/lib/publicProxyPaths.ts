const PUBLIC_PROXY_PATHS = new Set([
  "/sign-in",
  "/app-download",
  "/manifest.webmanifest",
  "/firebase-messaging-sw.js",
]);

export function isPublicProxyPath(pathname: string) {
  return pathname.startsWith("/api/") || PUBLIC_PROXY_PATHS.has(pathname);
}
