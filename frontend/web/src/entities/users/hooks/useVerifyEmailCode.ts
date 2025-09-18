import { authApiClient } from "@/shared/lib/api/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

type VerifyCodePayload = { email: string; code: string };

export const verifyEmailCode = (payload: VerifyCodePayload) =>
  authApiClient.post("/auth/mail/verify-code", payload);

const useVerifyEmailCode = () => {
  const { mutate: verifyCodeMutate, isPending: isVerifying } = useMutation({
    mutationFn: verifyEmailCode,
    onSuccess: () => {
      toast.success("이메일이 인증되었습니다.");
    },
    onError: (err: any) => {
      const msg = err?.response?.data?.dataHeader?.resultMessage || "인증에 실패했어요.";
      toast.error(msg);
    },
  });

  return { verifyCodeMutate, isVerifying };
};

export default useVerifyEmailCode;

