import Link from "next/link";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">TripMarble</Link>
      </div>
      <nav className={styles.nav}>
        <Link href="/search">검색</Link>
        <Link href="/spots">여행지 목록</Link>
        <Link href="/game">게임 목록</Link>
        <Link href="/mypage">마이페이지</Link>
        <Link href="/login">로그인</Link>
      </nav>
    </header>
  );
};

export default Header;
