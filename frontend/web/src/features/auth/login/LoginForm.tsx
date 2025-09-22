"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

// style
import styles from "./LoginForm.module.scss";
// icon
import { google, kakao, naver } from "@/shared/assets/images/social-logo";
// api
import useLogin from "@/entities/users/hooks/useLogin";
import useSocialLoginAutorize from "@/entities/users/hooks/useSocialLoginAutorize";

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

  const { data } = useSocialLoginAutorize("KAKAO");

  const naverIcon = typeof naver === "string" ? naver : naver.src;
  const kakaoIcon = typeof kakao === "string" ? kakao : kakao.src;
  const googleIcon = typeof google === "string" ? google : google.src;

  function handleKakaoLogin(provider: string) {
    try {
      const kakaoAuthUrl = data?.data.dataBody;
      if (kakaoAuthUrl) {
        window.location.href = kakaoAuthUrl;
      }
    } catch (error) {
      console.error("카카오 로그인 URL 요청 실패", error);
    }
  }

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* <label className={styles.label}>로그인</label> */}
        <input
          type="text"
          placeholder="이메일"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호 (영문, 숫자, 특수문자 조합 8~30자)"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className={styles.options}>
          <label>
            <input
              type="checkbox"
              checked={saveEmail}
              onChange={(e) => setSaveEmail(e.target.checked)}
            />
            이메일 저장
          </label>
          {/* <div className={styles.links}>
              <a href="#">아이디 찾기</a>
              <span> · </span>
              <a href="#">비밀번호 찾기</a>
            </div> */}
        </div>
        <button type="submit" className={styles.loginButton}>
          로그인
        </button>
      </form>
      <div className={styles.socialLogin}>
        <div className={styles.socialItem}>
          <img src={naverIcon} alt="naver" width={24} height={24} />
          <div className={styles.socialWord}>
            <a>네이버</a>
            <a>로그인</a>
          </div>
        </div>
        <div
          className={styles.socialItem}
          onClick={() => handleKakaoLogin("KAKAO")}
        >
          <img src={kakaoIcon} alt="kakao" width={50} height={24} />
          <div className={styles.socialWord}>
            <a>카카오</a>
            <a>로그인</a>
          </div>
        </div>
        <div className={styles.socialItem}>
          <img src={googleIcon} alt="google" width={24} height={24} />
          <div className={styles.socialWord}>
            <a>구글</a>
            <a>로그인</a>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        회원 가입하고 <strong>게임을 시작해보세요!</strong>
        <Link href="/signup">회원가입</Link>
      </div>
    </>
  );
}
