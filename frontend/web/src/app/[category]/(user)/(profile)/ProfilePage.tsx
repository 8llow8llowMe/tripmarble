"use client";

import { Cookies } from "react-cookie";
import { useRouter } from "next/navigation";
// style
import styles from "./Profile.module.scss";
// component
import HorizontalList from "@/components/common/HorizontalList/HorizontalList";
// data
import { spotsData } from "@/constants/spots";
// image
import Image from "next/image";
import { Logo } from "@/assets/images";
// store
import { useAppDispatch } from "@/store/hooks";
// api
import { useLogout } from "@/hooks/queries/useUsers";
import { logout } from "@/store/user/userSlice";

export default function ProfilePage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { mutate: logoutMutate } = useLogout();

  const handleLogout = () => {
    logoutMutate(undefined, {
      onSuccess: () => {
        const cookies = new Cookies();
        cookies.remove("accessToken", { path: "/" });
        dispatch(logout());
        router.push("/");
      },
    });
  };

  return (
    <div className={styles.profileWrapper}>
      <div className={styles.profileHeader}>
        <div className={styles.avatar}>
          <Image src={Logo} alt="User Avatar" width={200} height={200} />
        </div>
        <div className={styles.profileInfo}>
          <h2 className={styles.username}>트립마블</h2>
          <p className={styles.socialInfo}>카카오 로그인</p>
          <button className={styles.editButton}>프로필 수정</button>
          <div onClick={handleLogout} className={styles.logoutButton}>
            로그아웃
          </div>
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
