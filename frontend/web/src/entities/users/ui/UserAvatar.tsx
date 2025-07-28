// src/entities/user/ui/UserAvatar.tsx

import Image from "next/image";
import { useAppSelector } from "@/entities/users/model";
import { Logo } from "@/shared/assets/images"; // 기본 아바타

const UserAvatar = () => {
  const user = useAppSelector((state) => state.user.user);
  // user.profileImageUrl 같은 값이 있으면 그걸 사용, 없으면 기본 로고
  const profileImage = user?.profileImage || Logo;

  return (
    <div
      style={{
        width: 120,
        height: 120,
        borderRadius: "50%",
        overflow: "hidden",
      }}
    >
      <Image
        src={profileImage}
        alt="User Avatar"
        width={120}
        height={120}
        style={{ objectFit: "cover" }}
      />
    </div>
  );
};

export default UserAvatar;
