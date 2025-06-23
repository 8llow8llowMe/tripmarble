"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>예상치 못한 오류가 발생했습니다.</h2>
      <p>{error.message}</p>
      <button onClick={reset}>다시 시도하기</button>
    </div>
  );
}
