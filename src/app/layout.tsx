import { OAuthProvider } from "@themoment-team/datagsm-oauth-react";
import type { Metadata } from "next";
import "@/shared/styles/globals.css";
import { Toaster } from "sonner";
import TanStackProvider from "@/shared/lib/TanStackProvider";
export const metadata: Metadata = {
  title: "washer",
  description: "광주소프트웨어마이스터고 세탁건조기 관리 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <OAuthProvider
          clientId={process.env.NEXT_PUBLIC_DATAGSM_CLIENT_ID || ""}
          redirectUri={process.env.NEXT_PUBLIC_DATAGSM_REDIRECT_URI || ""}
          authMode="STANDARD"
        >
          <TanStackProvider>{children}</TanStackProvider>
        </OAuthProvider>
        <Toaster position="top-right" closeButton richColors />
      </body>
    </html>
  );
}
