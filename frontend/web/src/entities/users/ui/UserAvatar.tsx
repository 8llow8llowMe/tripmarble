import Image from "next/image";
import { useAppSelector } from "@/entities/users/model";
import { Logo } from "@/shared/assets/images";
import styles from "./UserAvatar.module.scss";

const UserAvatar = () => {
  const user = useAppSelector((state) => state.user.user);
  // user.profileImageUrl 같은 값이 있으면 그걸 사용, 없으면 기본 로고
  const profileImage = user?.profileImage || Logo;

  return (
    <div className={styles.avatar}>
      <Image src={profileImage} alt="User Avatar" width={200} height={200} />
    </div>
  );
};

export default UserAvatar;
