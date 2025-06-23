"use client";

import { useParams } from "next/navigation";

const SpotDetailPage = () => {
  const params = useParams();
  const spotId = params.id;

  return <div>여행지 ID: {spotId}</div>;
};

export default SpotDetailPage;
