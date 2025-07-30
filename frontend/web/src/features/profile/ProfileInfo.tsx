"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useState } from "react";
// style
import styles from "./ProfileInfo.module.scss";
// store
import { useAppDispatch } from "@/entities/users/model";
import { logout } from "@/entities/users/model/user/userSlice";

import UserAvatar from "@/entities/users/ui/UserAvatar";
import UserInfo from "@/entities/users/ui/UserInfo";
import { useLogout } from "@/entities/users/hooks/useUsers";
import ProfileEditForm from "./edit";

export const ProfileInfo = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { mutate: logoutMutate } = useLogout();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModProfile = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
        <UserAvatar />

        <div className={styles.profileInfo}>
          <UserInfo />
          <button onClick={handleModProfile} className={styles.editButton}>
            프로필 수정
          </button>
          <div onClick={handleLogout} className={styles.logoutButton}>
            로그아웃
          </div>
        </div>
      </div>
      <ProfileEditForm isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};
