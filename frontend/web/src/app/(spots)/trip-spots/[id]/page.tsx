"use client";

import TripSpotDetailPage from "@/app/(spots)/trip-spots/[id]/TripSpotDetail";

export default function SpotDetailWrapper({
  params,
}: {
  params: { id: string };
}) {
  return <TripSpotDetailPage spotId={params.id} />;
}
