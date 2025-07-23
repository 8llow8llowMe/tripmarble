import TripSpotDetailPage from "@/pages/spots/trip-spot-detail/TripSpotDetail";

type Props = {
  params: {
    id: string;
  };
};

export default function TripSpotDetail({ params }: Props) {
  return <TripSpotDetailPage spotId={params.id} />;
}
