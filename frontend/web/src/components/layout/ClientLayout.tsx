"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hasHeader = pathname !== "/";

  return (
    <div className={`layoutWrapper ${hasHeader ? " hasHeader" : ""}`}>
      {children}
    </div>
  );
}
