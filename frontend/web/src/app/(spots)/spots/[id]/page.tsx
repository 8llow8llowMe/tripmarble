import SpotDetailPage from "@/pages/spots/spot-detail/SpotDetailPage";

type Props = {
  params: {
    id: string;
  };
};

export default function SpotDetail({ params }: Props) {
  return <SpotDetailPage spotId={params.id} />;
}
