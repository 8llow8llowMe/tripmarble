"use client";
import SpotDetailPage from "./SpotDetailPage";

export default function SpotDetailWrapper({ params }: { params: { id: string } }) {
  return <SpotDetailPage spotId={params.id} />;
}