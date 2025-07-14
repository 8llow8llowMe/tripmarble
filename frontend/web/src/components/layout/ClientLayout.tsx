"use client";

import { ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchMe } from "@/store/user";

export default function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hasHeader = pathname !== "/";

  // user 값 store에서 읽기
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // user가 없고, 에러도 아닐 때만 fetchMe 실행
    if (!user) {
      dispatch(fetchMe());
    }
  }, [user, dispatch]);

  return (
    <div className={`layoutWrapper ${hasHeader ? " hasHeader" : ""}`}>
      {children}
    </div>
  );
}
