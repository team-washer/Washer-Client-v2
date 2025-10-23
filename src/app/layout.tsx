import type { Metadata } from "next";
import "@/shared/styles/globals.css";
import TanStackProvider from "@/shared/lib/TanStackProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        <TanStackProvider>
          {children}
          <ToastContainer />
        </TanStackProvider>
      </body>
    </html>
  );
}
