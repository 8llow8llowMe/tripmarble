"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
// style
import styles from "./Profile.module.scss";
// component
import HorizontalList from "@/shared/ui/common/HorizontalList/HorizontalList";
// data
import { spotsData } from "@/shared/constants/spots";
// image
import Image from "next/image";
import { Logo } from "@/shared/assets/images";
// store
import { useAppDispatch } from "@/entities/users/model";
// api
import { useLogout } from "@/entities/users/hooks/useUsers";
import { logout } from "@/entities/users/model/user/userSlice";

export const ProfilePage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { mutate: logoutMutate } = useLogout();

  const handleLogout = () => {
    logoutMutate(undefined, {
      onSuccess: () => {
        localStorage.removeItem("accessToken");
        dispatch(logout());
        router.push("/");
        toast.success("로그아웃되었습니다.", {
          position: "top-right",
          autoClose: 1200,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
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
};
// import ProfileInfo from "@/features/profile/ProfileInfo";
// import MyGamesHorizontal from "@/entities/games/ui/MyGamesHorizontal";
// import ReviewHorizontalList from "@/entities/review/ui/ReviewHorizontalList";
// import styles from "./ProfileWidget.module.scss";

// export const ProfilePage = () => (
//   <div className={styles.profileWrapper}>
//     <ProfileInfo />
//     <div className={styles.lists}>
//       <MyGamesHorizontal />
//       <ReviewHorizontalList />
//     </div>
//   </div>
// );
