import { useAppSelector } from "@/entities/users/model";
import { Logo } from "@/shared/assets/images";
import styles from "./UserAvatar.module.scss";

const UserAvatar = () => {
  const user = useAppSelector((state) => state.user.user);
  // user.profileImageUrl 같은 값이 있으면 그걸 사용, 없으면 기본 로고
  const fallbackLogo = typeof Logo === "string" ? Logo : Logo.src;
  const profileImage = user?.profileImage || fallbackLogo;

  return (
    <div className={styles.avatar}>
      <img src={profileImage} alt="User Avatar" width={50} height={50} />
    </div>
  );
};

export default UserAvatar;
