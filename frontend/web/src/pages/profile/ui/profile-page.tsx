"use client";
import { ProfileInfo } from "@/features/profile/ProfileInfo";

import styles from "./Profile.module.scss";
import HorizontalList from "@/shared/ui/common/HorizontalList/HorizontalList";
import { spotsData } from "@/shared/constants/spots";

export const ProfilePage = () => (
  <div className={styles.profileWrapper}>
    <ProfileInfo />
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
