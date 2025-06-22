"use client";

import { useParams } from "next/navigation";
import { convertingToString } from "@/utils/common";
import SearchPage from "@/app/[category]/(search)/SearchPage";
import NotFound from "@/app/[category]/(not-found)/not-found";

const categoryComponentMap: Record<string, React.ComponentType> = {
  search: SearchPage,
  // plan: PlanPage,
  default: NotFound,
};

export default function CategoryPage() {
  const params = useParams();
  const categoryName = convertingToString(params?.category) as string;
  const PageComponent =
    categoryComponentMap[categoryName] || categoryComponentMap["default"];

  return <PageComponent />;
}
