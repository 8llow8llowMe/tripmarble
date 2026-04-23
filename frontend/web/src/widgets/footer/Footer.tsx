import Link from "next/link";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <span className={styles.copy}>
          © 2025 TripMarble. All rights reserved.
        </span>
        <nav className={styles.nav}>
          <Link href="/policy/terms">이용약관</Link>
          <Link href="/policy/privacy">개인정보처리방침</Link>
          <a
            href="mailto:followfollowme@gmail.com?subject=TripMarble%20문의"
            rel="noopener noreferrer"
          >
            문의하기
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
