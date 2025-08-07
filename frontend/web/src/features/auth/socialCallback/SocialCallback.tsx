import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
// api
import useSocialLogin from "@/entities/users/hooks/useSocialLogin";

const SocialCallback = () => {
  const params = useParams();
  const rawProvider = params.provider;
  const provider =
    typeof rawProvider === "string"
      ? rawProvider.toUpperCase()
      : Array.isArray(rawProvider) && rawProvider.length > 0
      ? rawProvider[0].toUpperCase()
      : "";

  const { socialLoginMutate } = useSocialLogin();
  const searchParams = useSearchParams();
  const called = useRef(false);

  useEffect(() => {
    if (called.current) return; // 이미 실행했으면 skip
    called.current = true;

    const code = searchParams.get("code");
    if (code && provider) {
      socialLoginMutate({ provider, code });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>로그인 처리중...</div>;
};

export default SocialCallback;
