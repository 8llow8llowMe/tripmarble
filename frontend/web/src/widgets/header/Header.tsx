"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import styles from "./Header.module.scss";
import { useAppSelector } from "@/entities/users/model";
import { toast } from "react-toastify";
import MobileNavMenu from "./MobileNavMenu";
import { getHeaderNavItems, type HeaderNavItem } from "./navItems";

const MOBILE_MENU_ID = "tripmarble-mobile-navigation";

const Header = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const user = useAppSelector((state) => state.user.user);
  const router = useRouter();
  const navItems = getHeaderNavItems(Boolean(user));

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target as Node)
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
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const handleNavClick = (
    event: ReactMouseEvent<HTMLAnchorElement>,
    item: HeaderNavItem
  ) => {
    if (item.requiresAuth && !user) {
      event.preventDefault();
      toast.info("로그인 후 이용해보세요!");
      router.push("/login");
    }
  };

  const handleMobileNavClick = (
    event: ReactMouseEvent<HTMLAnchorElement>,
    item: HeaderNavItem
  ) => {
    handleNavClick(event, item);
    setIsOpen(false);
  };

  const isActive = (item: HeaderNavItem) => {
    const activePaths = item.activePaths ?? [item.href];
    return activePaths.some(
      (path) => pathname === path || pathname.startsWith(`${path}/`)
    );
  };

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          TripMarble
        </Link>

        <nav className={styles.nav} aria-label="주 메뉴">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`${styles.navLink} ${
                isActive(item) ? styles.active : ""
              }`}
              onClick={(event) => handleNavClick(event, item)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <button
            type="button"
            className={`${styles.menuButton} ${isOpen ? styles.open : ""}`}
            ref={menuButtonRef}
            onClick={toggleMenu}
            aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={isOpen}
            aria-controls={MOBILE_MENU_ID}
          >
            <span className={styles.menuIcon} aria-hidden="true">
              <span className={styles.menuLine} />
              <span className={styles.menuLine} />
              <span className={styles.menuLine} />
            </span>
          </button>
        </div>
      </div>

      <MobileNavMenu
        id={MOBILE_MENU_ID}
        isOpen={isOpen}
        items={navItems}
        menuRef={menuRef}
        isActive={isActive}
        onItemClick={handleMobileNavClick}
      />
    </header>
  );
};

export default Header;
