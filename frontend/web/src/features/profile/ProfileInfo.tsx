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
import { logout } from "@/entities/users/model/user/userSlice";

import UserAvatar from "@/entities/users/ui/UserAvatar";
import UserInfo from "@/entities/users/ui/UserInfo";
import { useLogout } from "@/entities/users/hooks/useUsers";

export const ProfileInfo = () => {
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
    <div>
      <UserAvatar />
      <UserInfo />
    </div>
  );
};
