"use client";
import Image from "next/image";
import styles from "./Login.module.scss";
import { google, kakao, naver } from "@/assets/images/social-logo";
import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <form className={styles.form}>
        <label className={styles.label}>로그인</label>
        <input type="text" placeholder="아이디" className={styles.input} />
        <input
          type="password"
          placeholder="비밀번호 (영문, 숫자, 특수문자 조합 8~30자)"
          className={styles.input}
        />
        <div className={styles.options}>
          <label>
            <input type="checkbox" />
            아이디 저장
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
          <Image src={naver} alt="naver" width={24} height={24} />
          <div className={styles.socialWord}>
            <a>네이버</a>
            <a>로그인</a>
          </div>
        </div>
        <div className={styles.socialItem}>
          <Image src={kakao} alt="kakao" width={50} height={24} />
          <div className={styles.socialWord}>
            <a>카카오</a>
            <a>로그인</a>
          </div>
        </div>
        <div className={styles.socialItem}>
          <Image src={google} alt="google" width={24} height={24} />
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
