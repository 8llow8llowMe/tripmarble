import "@/shared/styles/globals.scss";
import QueryProvider from "@/app/providers/QueryProvider";
import CategoryLayoutClient from "@/widgets/layout/CategoryLayoutClient";
import ClientLayout from "@/widgets/layout/ClientLayout";
import StoreProvider from "@/app/providers/StoreProvider";
import { ToastContainer } from "react-toastify";
import { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tripmarble.com";

export const metadata: Metadata = {
  // Base URL for resolving canonical/OG/Twitter absolute URLs
  metadataBase: new URL(SITE_URL),

  // Title handling (default + template)
  title: {
    default: "TripMarble - 여행을 게임으로!",
    template: "%s | TripMarble",
  },
  description: "대한민국 여행지 정보를 게임처럼 즐겨보세요.",
  keywords: ["TripMarble", "여행", "게임", "대한민국"],

  // Canonical URL (resolved against metadataBase)
  alternates: {
    canonical: "/",
  },

  // Open Graph
  openGraph: {
    title: "TripMarble",
    description: "여행지를 게임처럼 즐기는 대한민국 여행 플랫폼.",
    url: "/",
    siteName: "TripMarble",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "ko_KR",
    type: "website",
  },

  // Twitter Cards
  twitter: {
    card: "summary_large_image",
    title: "TripMarble",
    description: "여행지를 게임처럼 즐기는 대한민국 여행 플랫폼.",
    images: ["/og-image.png"],
  },

  // Robots/crawling
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Icons
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <head>
        {/* 카카오 SDK */}
        <Script
          src="https://developers.kakao.com/sdk/js/kakao.js"
          strategy="beforeInteractive" // 페이지 인터렉션 전에 로드
        />
      </head>
      <body>
        <QueryProvider>
          <StoreProvider>
            <ClientLayout>
              <ToastContainer
                position="top-right"
                autoClose={1200}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={false}
                theme="light"
              />
              <CategoryLayoutClient>{children}</CategoryLayoutClient>
            </ClientLayout>
          </StoreProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
