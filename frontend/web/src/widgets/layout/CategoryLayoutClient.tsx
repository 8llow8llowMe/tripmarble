"use client";

import { ReactNode } from "react";
import { useParams } from "next/navigation";
import Header from "@/widgets/header/Header";
import Footer from "@/widgets/footer/Footer";
import { convertingToString } from "@/shared/lib/common";

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
