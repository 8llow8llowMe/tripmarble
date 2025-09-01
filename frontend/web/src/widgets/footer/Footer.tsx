import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <span className={styles.copy}>
          © 2025 TripMarble. All rights reserved.
        </span>
        <nav className={styles.nav}>
          <a href="#">이용약관</a>
          <a href="#">개인정보처리방침</a>
          <a href="#">문의하기</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
