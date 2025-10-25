"use client";

import { ReactNode } from "react";
import { useParams, usePathname } from "next/navigation";
import Header from "@/widgets/header/Header";
import Footer from "@/widgets/footer/Footer";
import { convertingToString } from "@/shared/lib/common";

export default function CategoryLayoutClient({
  children,
}: {
  children: ReactNode;
}) {
  const params = useParams();
  const pathname = usePathname();
  const categoryName = convertingToString(params?.category) as string;

  const isSpotsRoute = !!pathname && pathname.startsWith("/spots");
  const showFooter = categoryName !== "someOtherCategoryWithoutHeader" && !isSpotsRoute;

  return (
    <>
      {<Header />}
      <main>{children}</main>
      {showFooter && <Footer />}
    </>
  );
}
