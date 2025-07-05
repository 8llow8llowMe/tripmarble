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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> f975d6c ([FE/web] feat: profile 페이지 퍼블리싱)
          <Image src={Logo} alt="User Avatar" width={150} height={150} />
=======
          <Image src={Logo} alt="User Avatar" width={200} height={200} />
>>>>>>> dfeb421 ([FE/web] feat: profile 페이지 퍼블리싱)
<<<<<<< HEAD
=======
          <Image src={Logo} alt="User Avatar" width={200} height={200} />
>>>>>>> 6556e65 ([FE/web] feat: profile 페이지 퍼블리싱)
=======
>>>>>>> f975d6c ([FE/web] feat: profile 페이지 퍼블리싱)
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
          baseHref="/spots"
=======
>>>>>>> dfeb421 ([FE/web] feat: profile 페이지 퍼블리싱)
=======
>>>>>>> 6556e65 ([FE/web] feat: profile 페이지 퍼블리싱)
=======
          baseHref="/spots"
=======
>>>>>>> dfeb421 ([FE/web] feat: profile 페이지 퍼블리싱)
>>>>>>> f975d6c ([FE/web] feat: profile 페이지 퍼블리싱)
          itemWidth={300}
          itemHeight={180}
        />
        <HorizontalList
          title="내가 쓴 리뷰"
          items={spotsData}
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
          baseHref="/spots"
=======
>>>>>>> dfeb421 ([FE/web] feat: profile 페이지 퍼블리싱)
=======
>>>>>>> 6556e65 ([FE/web] feat: profile 페이지 퍼블리싱)
=======
          baseHref="/spots"
=======
>>>>>>> dfeb421 ([FE/web] feat: profile 페이지 퍼블리싱)
>>>>>>> f975d6c ([FE/web] feat: profile 페이지 퍼블리싱)
          itemWidth={300}
          itemHeight={180}
        />
      </div>
    </div>
  );
}
