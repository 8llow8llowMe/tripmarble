import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
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

  const { mutate, isError, error, data } = useSocialLogin();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const code = searchParams.get("code");
    if (code && provider) {
      mutate(
        { provider, code },
        {
          onSuccess: (res) => {
            localStorage.setItem("accessToken", res.accessToken);
            router.push("/");
            toast.success("환영합니다! 로그인되었습니다.", {
              position: "top-right",
              autoClose: 1200,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: false,
              progress: undefined,
            });
          },
          onError: (err) => {
            console.error(err);
          },
        }
      );
    }
    // mutate의 의존성에 provider/code 넣지 않음 (한 번만 실행)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider, searchParams, mutate, router]);

  if (isError) return <div>로그인 실패: {(error as Error)?.message}</div>;

  return <div>로그인 처리중...</div>;
};

export default SocialCallback;
