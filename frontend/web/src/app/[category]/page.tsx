"use client";

import { notFound, useParams } from "next/navigation";
import { convertingToString } from "@/utils/common";
import SearchPage from "@/app/[category]/(search)/SearchPage";
import ProfilePage from "@/app/[category]/(user)/(profile)/ProfilePage";
import AuthLayout from "@/app/[category]/(auth)/layout";
import LoginForm from "@/app/[category]/(auth)/(login)/LoginForm";
import SignUpForm from "@/app/[category]/(auth)/(signup)/SignUpForm";

const categoryComponentMap: Record<string, React.ComponentType> = {
  search: SearchPage,
  // plan: PlanPage,
  profile: ProfilePage,
  login: () => (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  ),
  signup: () => (
    <AuthLayout>
      <SignUpForm />
    </AuthLayout>
  ),
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
