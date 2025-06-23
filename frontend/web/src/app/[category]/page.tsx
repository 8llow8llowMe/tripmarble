"use client";

import { notFound, useParams } from "next/navigation";
import { convertingToString } from "@/utils/common";
import SearchPage from "@/app/[category]/(search)/SearchPage";
import SpotsPage from "@/app/[category]/(spots)/SpotsPage";
<<<<<<< HEAD
<<<<<<< HEAD
import LoginPage from "@/app/[category]/(user)/page";
=======
>>>>>>> ad9ee0b ([FE/web] feat: 여행지 목록 페이지 제작)
=======
import LoginPage from "@/app/[category]/(user)/page";
>>>>>>> 93359cc ([FE/web] feat: 로그인 화면 퍼블리싱)

const categoryComponentMap: Record<string, React.ComponentType> = {
  search: SearchPage,
  // plan: PlanPage,
  spots: SpotsPage,
<<<<<<< HEAD
<<<<<<< HEAD
  login: LoginPage,
=======
>>>>>>> ad9ee0b ([FE/web] feat: 여행지 목록 페이지 제작)
=======
  login: LoginPage,
>>>>>>> 93359cc ([FE/web] feat: 로그인 화면 퍼블리싱)
};

export default function CategoryPage() {
  const params = useParams();
  const categoryName = convertingToString(params?.category);

  if (!categoryName || !(categoryName in categoryComponentMap)) {
    notFound();
  }

  const PageComponent =
    categoryComponentMap[categoryName as keyof typeof categoryComponentMap];
  return <PageComponent />;
}
