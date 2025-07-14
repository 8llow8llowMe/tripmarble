"use client";

import { ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchMe } from "@/store/user";
import { useCookies } from "react-cookie";

export default function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hasHeader = pathname !== "/";

  const [cookies] = useCookies(["accessToken"]);
  const accessToken = cookies.accessToken;
  // user 값 store에서 읽기
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // user가 없고, 에러도 아닐 때만 fetchMe 실행
    if (accessToken && !user) {
      dispatch(fetchMe());
    }
  }, [accessToken, user, dispatch]);

  return (
    <div className={`layoutWrapper ${hasHeader ? " hasHeader" : ""}`}>
      {children}
    </div>
  );
}
