import { authApiClient } from "@/shared/lib/api/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

type SendCodePayload = { email: string };

export const sendEmailCode = ({ email }: SendCodePayload) =>
  // API spec: send-code expects email as query param, not JSON body
  authApiClient.post("/auth/mail/send-code", null, { params: { email } });

const useSendEmailCode = () => {
  const { mutate: sendCodeMutate, isPending: isSending } = useMutation({
    mutationFn: sendEmailCode,
    onSuccess: () => {
      toast.success("인증코드를 이메일로 전송했어요.");
    },
    onError: (err: any) => {
      const msg =
        err?.response?.data?.dataHeader?.resultMessage || "전송에 실패했어요.";
      toast.error(msg);
    },
  });

  return { sendCodeMutate, isSending };
};

export default useSendEmailCode;
