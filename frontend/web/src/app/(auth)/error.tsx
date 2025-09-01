"use client";

import CategoryErrorPage from "@/shared/ui/ErrorView/ErrorView";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return <CategoryErrorPage error={error} reset={reset} />;
}
