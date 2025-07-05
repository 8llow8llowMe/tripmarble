"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import styles from "./Header.module.scss";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">TripMarble</Link>
      </div>

      <nav className={styles.nav}>
        <Link href="/search">검색</Link>
        <Link href="/spots">여행지 목록</Link>
        <Link href="/game">게임 목록</Link>
        <Link href="/profile">마이페이지</Link>
        <Link href="/login">로그인</Link>
      </nav>

      <div className={styles.hamburger} ref={hamburgerRef} onClick={toggleMenu}>
        ☰
      </div>

      {isOpen && (
        <div className={styles.mobileMenu} ref={menuRef}>
          <Link href="/search">검색</Link>
          <Link href="/spots">여행지 목록</Link>
          <Link href="/game">게임 목록</Link>
          <Link href="/profile">마이페이지</Link>
          <Link href="/login">로그인</Link>
        </div>
      )}
    </header>
  );
};

export default Header;
