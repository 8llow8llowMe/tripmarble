"use client";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import useSocialLogin from "@/entities/users/hooks/useSocialLogin";
import AuthStatusView from "@/features/auth/ui/AuthStatusView";
import Button from "@/shared/ui/common/Button/Button";

const SocialCallback = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const {
    socialLoginMutate,
    isSocialLoginPending,
    isSocialLoginError,
  } = useSocialLogin();
  const called = useRef(false);
  const [callbackError, setCallbackError] = useState(false);

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
      setCallbackError(true);
      return;
    }

    socialLoginMutate({ provider, code });
  }, [params, searchParams, socialLoginMutate]);

  if (callbackError || isSocialLoginError) {
    return (
      <AuthStatusView
        title="로그인할 수 없습니다."
        description="다시 로그인해 주세요."
        action={
          <Button
            type="button"
            variant="primary"
            size="md"
            block
            onClick={() => {
              window.location.href = "/login";
            }}
          >
            로그인으로 이동
          </Button>
        }
      />
    );
  }

  return (
    <AuthStatusView
      title="로그인 중입니다."
      description="잠시만 기다려 주세요."
      action={
        <Button
          type="button"
          variant="secondary"
          size="md"
          block
          isLoading={isSocialLoginPending || !isSocialLoginError}
        >
          계정 확인 중
        </Button>
      }
    />
  );
};

export default SocialCallback;
