import { useAppSelector } from "@/entities/users/model";

const UserInfo = () => {
  const user = useAppSelector((state) => state.user.user);

  if (!user) return null;

  return (
    <div>
      <h2 style={{ fontSize: "1.5rem", fontWeight: 600 }}>
        {user.name || "익명"}
      </h2>
      <p style={{ color: "#666" }}>이메일 로그인</p>
    </div>
  );
};

export default UserInfo;
