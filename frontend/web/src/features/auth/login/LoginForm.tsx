"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

import styles from "./LoginForm.module.scss";
import { kakao, naver } from "@/shared/assets/images/social-logo";
import Button from "@/shared/ui/common/Button/Button";
import useLogin from "@/entities/users/hooks/useLogin";
import { authApiClient } from "@/shared/lib/api/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [saveEmail, setSaveEmail] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("saveEmail") === "true";
    const storedEmail = localStorage.getItem("email") || "";
    setSaveEmail(saved);
    setEmail(saved ? storedEmail : "");
  }, []);

  const { loginMutate } = useLogin();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMutate({ email, password });

    if (saveEmail) {
      localStorage.setItem("saveEmail", "true");
      localStorage.setItem("email", email);
    } else {
      localStorage.removeItem("saveEmail");
      localStorage.removeItem("email");
    }
  };

  // 소셜 로그인
  const handleSocialLogin = async (provider: "KAKAO" | "NAVER") => {
    try {
      const res = await authApiClient.get(`/auth/${provider}/authorize`);
      const authUrl = res.data?.dataBody;

      if (authUrl) {
        window.location.href = authUrl;
      } else {
        console.warn(`${provider} 로그인 URL이 없습니다.`);
      }
    } catch (error) {
      console.error(`${provider} 로그인 URL 요청 실패`, error);
    }
  };

  const naverIcon = typeof naver === "string" ? naver : naver.src;
  const kakaoIcon = typeof kakao === "string" ? kakao : kakao.src;
  // const googleIcon = typeof google === "string" ? google : google.src;

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="login-email">
            이메일
          </label>
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            placeholder="이메일"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="login-password">
            비밀번호
          </label>
          <input
            id="login-password"
            type="password"
            autoComplete="current-password"
            placeholder="영문, 숫자, 특수문자 조합 8~30자"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.options}>
          <label>
            <input
              type="checkbox"
              checked={saveEmail}
              onChange={(e) => setSaveEmail(e.target.checked)}
            />
            이메일 저장
          </label>
        </div>
        <Button type="submit" variant="primary" size="md" block>
          로그인
        </Button>
      </form>

      {/* ✅ 소셜 로그인 */}
      <div className={styles.socialLogin}>
        <Button
          type="button"
          variant="secondary"
          size="md"
          className={styles.socialItem}
          onClick={() => handleSocialLogin("NAVER")}
          leadingIcon={<img src={naverIcon} alt="" width={24} height={24} />}
        >
          <span className={styles.socialWord}>네이버 로그인</span>
        </Button>

        <Button
          type="button"
          variant="secondary"
          size="md"
          className={styles.socialItem}
          onClick={() => handleSocialLogin("KAKAO")}
          leadingIcon={<img src={kakaoIcon} alt="" width={32} height={24} />}
        >
          <span className={styles.socialWord}>카카오 로그인</span>
        </Button>

        {/* <button type="button" className={styles.socialItem}>
          <img src={googleIcon} alt="google" width={24} height={24} />
          <div className={styles.socialWord}>
            <span>구글</span>
            <span>로그인</span>
          </div>
        </button> */}
      </div>

      <div className={styles.footer}>
        회원 가입하고 <strong>게임을 시작해보세요!</strong>
        <Link href="/signup">회원가입</Link>
      </div>
    </>
  );
}
