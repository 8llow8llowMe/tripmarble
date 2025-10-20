"use client";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import useSocialLogin from "@/entities/users/hooks/useSocialLogin";

const SocialCallback = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const { socialLoginMutate } = useSocialLogin();
  const called = useRef(false);

  useEffect(() => {
    if (called.current) return;
    called.current = true;

    const rawProvider = params.provider;
    const provider =
      typeof rawProvider === "string"
        ? rawProvider.toUpperCase()
        : Array.isArray(rawProvider) && rawProvider.length > 0
        ? rawProvider[0].toUpperCase()
        : "";

    const code = searchParams.get("code");

    if (!provider || !code) {
      console.warn("❌ Missing provider or code", { provider, code });
      return;
    }

    socialLoginMutate({ provider, code }); // 소셜 로그인
  }, [params, searchParams, socialLoginMutate]);

  return <div>로그인 처리중...</div>;
};

export default SocialCallback;
