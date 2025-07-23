"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import styles from "./Header.module.scss";
import { useAppSelector } from "@/entities/users/model";

const Header = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(pathname !== "/");
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLDivElement>(null);
  const user = useAppSelector((state) => state.user.user);

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

  useEffect(() => {
    if (pathname !== "/") {
      setScrolled(true);
      return;
    }

    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  const isActive = (path: string) => (pathname === path ? styles.active : "");

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.logo}>
        <Link href="/">TripMarble</Link>
      </div>

      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
        <Link href="/search" className={isActive("/search")}>
          검색
        </Link>
        <Link href="/spots" className={isActive("/spots")}>
          여행지 목록
        </Link>
        <Link href="/game" className={isActive("/game")}>
          게임 목록
        </Link>
        {user ? (
          <Link href="/profile" className={isActive("/profile")}>
            마이페이지
          </Link>
        ) : (
          <Link href="/login" className={isActive("/login")}>
            로그인
          </Link>
        )}
      </nav>

      <div
        className={`${styles.hamburger} ${scrolled ? styles.scrolled : ""}`}
        ref={hamburgerRef}
        onClick={toggleMenu}
      >
        ☰
      </div>

      {isOpen && (
        <div className={styles.mobileMenu} ref={menuRef}>
          <Link href="/search" className={isActive("/search")}>
            검색
          </Link>
          <Link href="/spots" className={isActive("/spots")}>
            여행지 목록
          </Link>
          <Link href="/game" className={isActive("/game")}>
            게임 목록
          </Link>
          {user ? (
            <Link href="/profile" className={isActive("/profile")}>
              마이페이지
            </Link>
          ) : (
            <Link href="/login" className={isActive("/login")}>
              로그인
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
