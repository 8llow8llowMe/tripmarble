import "@/app/globals.scss";
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body className="layoutWrapper">
        <main>{children}</main>
      </body>
    </html>
  );
}
