"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Header from "@/widgets/header/Header";
import Footer from "@/widgets/footer/Footer";
import { getRouteLayout } from "@/widgets/layout/routeLayout";

export default function CategoryLayoutClient({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const routeLayout = getRouteLayout(pathname);

  return (
    <div
      className={`layoutWrapper ${
        routeLayout.headerOffset ? "hasHeader" : ""
      }`}
      data-layout-mode={routeLayout.mode}
    >
      <Header />
      <main>{children}</main>
      {routeLayout.showFooter && <Footer />}
    </div>
  );
}
