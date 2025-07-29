import { useAppSelector } from "@/entities/users/model";
import styles from "./UserInfo.module.scss";

const UserInfo = () => {
  const user = useAppSelector((state) => state.user.user);

  return (
    <>
      <h2 className={styles.username}>{user?.name || "트립마블"}</h2>
      <p className={styles.socialInfo}>이메일 로그인</p>
    </>
  );
};

export default UserInfo;
