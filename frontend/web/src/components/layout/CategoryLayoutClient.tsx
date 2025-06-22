"use client";

import { ReactNode } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { convertingToString } from "@/utils/common";

export default function CategoryLayoutClient({
  children,
}: {
  children: ReactNode;
}) {
  const params = useParams();
  const categoryName = convertingToString(params?.category) as string;

  const showHeaderAndFooter = categoryName !== "someOtherCategoryWithoutHeader";

  return (
    <>
      {showHeaderAndFooter && <Header />}
      <main>{children}</main>
      {showHeaderAndFooter && <Footer />}
    </>
  );
}
