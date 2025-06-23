import { ReactNode } from "react";
export default function SpotsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <h1>여행지 상세</h1>
      {children}
    </>
  );
}
