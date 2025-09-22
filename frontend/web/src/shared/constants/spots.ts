import {
  busan,
  seoul,
  seoul2,
  jeju,
  jeju2,
  gyeongju,
} from "@/shared/assets/images/places";

const getImageSrc = (asset: string | { src: string }) =>
  (typeof asset === "string" ? asset : asset.src) || "";

export const spotsData = [
  { id: 1, name: "서울", imgUrl: getImageSrc(seoul) },
  { id: 3, name: "부산", imgUrl: getImageSrc(busan) },
  { id: 6, name: "경주", imgUrl: getImageSrc(gyeongju) },
  { id: 4, name: "제주", imgUrl: getImageSrc(jeju) },
  { id: 2, name: "서울", imgUrl: getImageSrc(seoul2) },
  { id: 5, name: "제주2", imgUrl: getImageSrc(jeju2) },
];
