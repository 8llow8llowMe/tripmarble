"use client";

import { ReactNode, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/entities/users/model";
import { fetchMe } from "@/entities/users/model/user/userSlice";

export default function ClientLayout({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // user 값 store에서 읽기
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setAccessToken(token);
  }, []);

  useEffect(() => {
    // user가 없고, 에러도 아닐 때만 fetchMe 실행
    if (accessToken && !user) {
      dispatch(fetchMe());
    }
  }, [accessToken, user, dispatch]);

  return <>{children}</>;
}
