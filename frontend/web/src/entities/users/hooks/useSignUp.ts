import { authApiClient } from "@/shared/lib/api/client";
import { useMutation } from "@tanstack/react-query";

export const signUp = (data: {
  email: string;
  password: string;
  name: string;
  nickname: string;
}) => {
  return authApiClient.post("/members/signup", data);
};

const useSignUp = () => {
  const { mutate: signUpMutate, isPending: isSigningUp } = useMutation({
    mutationFn: signUp,
    onError: (error) => {
      console.log("signUp 에러", error);
    },
  });
  return { signUpMutate, isSigningUp };
};
export default useSignUp;
