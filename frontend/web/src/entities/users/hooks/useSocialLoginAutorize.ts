import { authApiClient } from "@/shared/lib/api/client";
import { useQuery } from "@tanstack/react-query";

export const socialLoginAutorize = (provider: string) =>
  authApiClient.get(`/auth/${provider}/authorize`);

const useSocialLoginAutorize = (provider: string) => {
  const { data } = useQuery({
    queryKey: ["socialLoginAutorize"],
    queryFn: () => socialLoginAutorize(provider),
  });
  return { data };
};
export default useSocialLoginAutorize;
