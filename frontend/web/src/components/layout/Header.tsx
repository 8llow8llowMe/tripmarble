import Link from "next/link";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">TripMarble</Link>
      </div>
      <nav className={styles.nav}>
        <Link href="/search">Search</Link>
        <Link href="/about">About</Link>
        <Link href="/travel">Travel</Link>
        <Link href="/mypage">My Page</Link>
      </nav>
    </header>
  );
};

export default Header;
