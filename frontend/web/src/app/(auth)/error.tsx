"use client";

import AuthStatusView from "@/features/auth/ui/AuthStatusView";
import Button from "@/shared/ui/common/Button/Button";

export default function Error({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <AuthStatusView
      title="요청을 완료할 수 없습니다."
      description="잠시 후 다시 시도해 주세요."
      action={
        <Button type="button" variant="primary" size="md" block onClick={reset}>
          다시 시도
        </Button>
      }
    />
  );
}
