"use client";

import CategoryErrorPage from "@/pages/error/ErrorPage";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return <CategoryErrorPage error={error} reset={reset} />;
}
