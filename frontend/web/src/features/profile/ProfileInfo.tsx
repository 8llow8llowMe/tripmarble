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
import ProfileEditForm from "./edit";
import useLogout from "@/entities/users/hooks/useLogout";
import Button from "@/shared/ui/common/Button/Button";

export const ProfileInfo = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { logoutMutate } = useLogout();
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
          <div className={styles.actions}>
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={handleModProfile}
              className={styles.editButton}
            >
              프로필 수정
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleLogout}
              className={styles.logoutButton}
            >
              로그아웃
            </Button>
          </div>
        </div>
      </div>
      <ProfileEditForm isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};
