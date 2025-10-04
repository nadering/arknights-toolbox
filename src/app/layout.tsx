import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import {
  Header,
  BackToTopButton,
  BackToMainButton,
  GoToBottomButton,
} from "@/app/_common";
import Providers from "./providers";
import LocalStorageSetter from "./local-storage-setter";
import "./globals.css";

/** Next.js에서 제공하는 localFont 기능으로, 폰트는 Pretendard 사용 */
const pretendard = localFont({
  src: "./_fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

/** 웹 메타 데이터 */
export const metadata: Metadata = {
  title: "Arknights-Toolbox",
  description: "Arknights-Toolbox for Calculating Materials",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} font-pretendard antialiased`}>
        <Analytics />
        <SpeedInsights />
        <Providers>
          <LocalStorageSetter />
          <div className="relative w-full h-full min-h-screen bg-dark">
            <Header />
            <div className="flex flex-col w-full max-w-3xl h-full min-h-screen bg-dark py-12 mx-auto">
              {children}
            </div>
            <BackToTopButton />
            <GoToBottomButton />
            <BackToMainButton />
          </div>
        </Providers>
      </body>
    </html>
  );
}
