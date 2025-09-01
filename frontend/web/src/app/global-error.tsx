"use client";
import ErrorPage from "@/shared/ui/ErrorView/ErrorView";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return <ErrorPage error={error} reset={reset} />;
}
