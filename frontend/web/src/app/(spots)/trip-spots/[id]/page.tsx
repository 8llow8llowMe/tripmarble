"use client";

import useTripSpotById from "@/entities/trips/hooks/useTripSpotById";
import styles from "./TripSpotDetail.module.scss";
import Image from "next/image";
import { useMemo } from "react";

type Props = {
  params: {
    id: string;
  };
};

const dummySpot = {
  tripSpotName: "[백년가게] 더미데이터입니다",
  contentTypeName: "음식점",
  description:
    "1980년부터 행상에서 곰장어 장사를 시작하여 현재 3층 규모의 자가 건물을 보유하고 있다고 하니 그동안의 고객의 사랑을 얼마나 받았을지 가늠이 간다. 부모님 추천 맛집이라는 수식어가 붙을 정도로 오래된 단골 고객들이 많은 곳이다. 특유의 매우면서 묘한 양념 맛이 구수한 곰장어와 어울려 감탄을 자아내는데, 민락동 중앙수산에서 구매한 신선한 곰장어와 국내산 고춧가루를 사용하는 것이 맛에 한몫하는 듯하다. 전국 택배 배송도 가능해, 집에서도 온천 입구 기장 곰장어 맛을 맛볼 수 있다.",
  phoneNumber: "051-555-6093",
  address: "부산광역시 동래구 시실로 20 (명륜동)",
  imageUrl: "/images/no-image.png",
};

export default function TripSpotDetail({ params }: Props) {
  const { data, isLoading, isError } = useTripSpotById(params.id);

  const spot = useMemo(() => {
    // 정상 데이터 있으면 반환, 아니면 더미 반환
    return data?.data?.dataBody ?? dummySpot;
  }, [data]);

  return (
    <>
      <div className={styles.detailPage}>
        {/* {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>오류가 발생했습니다.</div>
      ) : ( */}
        <div className={styles.imageWrapper}>
          <Image
            src={spot.imageUrl || "/images/no-image.png"}
            alt="여행지 대표 이미지"
            width={600}
            height={400}
            style={{ objectFit: "cover", width: "100%" }}
            priority
          />
        </div>
        <div className={styles.contentWrapper}>
          <p className={styles.spotType}>{spot.contentTypeName}</p>
          <h1 className={styles.spotName}>{spot.tripSpotName}</h1>
          <p className={styles.address}>📍 {spot.address}</p>
          <p className={styles.description}>{spot.description}</p>
          <div className={styles.buttonRow}>
            <button className={styles.scheduleButton}>일정 만들기</button>
          </div>
        </div>
        {/* )} */}
      </div>
    </>
  );
}
