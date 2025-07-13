import "@/app/globals.scss";
import QueryProvider from "@/app/providers/QueryProvider";
import CategoryLayoutClient from "@/components/layout/CategoryLayoutClient";
import ClientLayout from "@/components/layout/ClientLayout";
import StoreProvider from "@/store/StoreProvider";
import { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "TripMarble - 여행을 게임으로!",
  description: "대한민국 여행지 정보를 게임처럼 즐겨보세요.",
  keywords: ["TripMarble", "여행", "게임", "대한민국"],
  openGraph: {
    title: "TripMarble",
    description: "여행지를 게임처럼 즐기는 대한민국 여행 플랫폼.",
    url: "https://tripmarble.com",
    siteName: "TripMarble",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TripMarble",
    description: "여행지를 게임처럼 즐기는 대한민국 여행 플랫폼.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <QueryProvider>
          <StoreProvider>
            <ClientLayout>
              <CategoryLayoutClient>{children}</CategoryLayoutClient>
            </ClientLayout>
          </StoreProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
