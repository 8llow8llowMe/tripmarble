"use client";
import Image from "next/image";
import styles from "./Login.module.scss";
import { google, kakao, naver } from "@/assets/images/social-logo";

export default function LoginPage() {
  return (
    <div className={styles.loginWrapper}>
      <h1 className={styles.title}>TripMarble 로그인</h1>
      <div className={styles.card}>
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
            <span>네이버 로그인</span>
          </div>
          <div className={styles.socialItem}>
            <Image src={kakao} alt="kakao" width={50} height={24} />
            <span>카카오 로그인</span>
          </div>
          <div className={styles.socialItem}>
            <Image src={google} alt="google" width={24} height={24} />
            <span>구글 로그인</span>
          </div>
        </div>
        <div className={styles.footer}>
          회원 가입하고 <strong>게임을 시작해보세요!</strong>
          <a href="#">회원가입</a>
        </div>
      </div>
    </div>
  );
}
