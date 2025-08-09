import GameHistory from "@/entities/games/ui/game-history/GameHistory";
type TimelineItem = {
  index: number;
  title: string;
  date?: string;
  mission?: string;
  reviewImageUrl?: string;
  reviewContent?: string;
  isSelected?: boolean;
};

const dummyTimeline: TimelineItem[] = [
  {
    index: 1,
    title: "1. 방문한 지역",
    date: "2025.05.15",
    mission: "광한루원 앞에서 사진찍기",
    reviewImageUrl: "",
    reviewContent: "정말 즐거운 미션이었어요!",
    isSelected: true,
  },
  {
    index: 2,
    title: "2. 방문한 지역",
    date: "2025.05.16",
    mission: "전주 한옥마을 인증샷",
    reviewImageUrl: "",
    reviewContent: "",
    isSelected: false,
  },
  // ... 원하는 만큼 추가
];
type Props = {
  params: {
    id: string;
  };
};

export default function GameHistoryPage({ params }: Props) {
  return (
    <GameHistory
      gameId={params.id}
      timeline={dummyTimeline}
      selectedBlock={dummyTimeline.find((item) => item.isSelected)}
      // onBlockSelect={setSelectedBlock} 등 추가 예정
    />
  );
}
