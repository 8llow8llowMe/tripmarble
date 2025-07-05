"use client";

import Image from "next/image";
import styles from "./Profile.module.scss";
import HorizontalList from "@/components/common/HorizontalList/HorizontalList";
import { spotsData } from "@/constants/spots";
import { Logo } from "@/assets/images";

export default function ProfilePage() {
  return (
    <div className={styles.profileWrapper}>
      <div className={styles.profileHeader}>
        <div className={styles.avatar}>
          <Image src={Logo} alt="User Avatar" width={150} height={150} />
        </div>
        <div className={styles.profileInfo}>
          <h2 className={styles.username}>트립마블</h2>
          <p className={styles.socialInfo}>카카오 로그인</p>
          <button className={styles.editButton}>프로필 수정</button>
        </div>
      </div>

      <div className={styles.lists}>
        <HorizontalList
          title="나의 게임 기록"
          items={spotsData}
          baseHref="/spots"
          itemWidth={300}
          itemHeight={180}
        />
        <HorizontalList
          title="내가 쓴 리뷰"
          items={spotsData}
          baseHref="/spots"
          itemWidth={300}
          itemHeight={180}
        />
      </div>
    </div>
  );
}
