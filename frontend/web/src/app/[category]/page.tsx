"use client";

import { notFound, useParams } from "next/navigation";
import { convertingToString } from "@/utils/common";
import SearchPage from "@/app/[category]/(search)/SearchPage";
import SpotsPage from "@/app/[category]/(spots)/SpotsPage";
import LoginPage from "@/app/[category]/(user)/(login)/LoginPage";
import ProfilePage from "@/app/[category]/(user)/(profile)/ProfilePage";

const categoryComponentMap: Record<string, React.ComponentType> = {
  search: SearchPage,
  // plan: PlanPage,
  spots: SpotsPage,
  login: LoginPage,
  profile: ProfilePage,
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
