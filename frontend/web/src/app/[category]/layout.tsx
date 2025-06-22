import { ReactNode } from "react";
import CategoryLayoutClient from "@/components/layout/CategoryLayoutClient";

export default function CategoryLayout({ children }: { children: ReactNode }) {
  return <CategoryLayoutClient>{children}</CategoryLayoutClient>;
}
