"use client";

import Link from "next/link";
import type { MouseEvent, RefObject } from "react";
import type { HeaderNavItem } from "./navItems";
import styles from "./Header.module.scss";

type MobileNavMenuProps = {
  id: string;
  isOpen: boolean;
  items: HeaderNavItem[];
  menuRef: RefObject<HTMLDivElement>;
  isActive: (item: HeaderNavItem) => boolean;
  onItemClick: (
    event: MouseEvent<HTMLAnchorElement>,
    item: HeaderNavItem
  ) => void;
};

export default function MobileNavMenu({
  id,
  isOpen,
  items,
  menuRef,
  isActive,
  onItemClick,
}: MobileNavMenuProps) {
  if (!isOpen) return null;

  return (
    <div
      id={id}
      className={styles.mobileMenu}
      ref={menuRef}
      aria-label="모바일 주 메뉴"
    >
      <nav className={styles.mobileNav} aria-label="모바일 주 메뉴">
        {items.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={`${styles.mobileLink} ${
              isActive(item) ? styles.active : ""
            }`}
            onClick={(event) => onItemClick(event, item)}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
