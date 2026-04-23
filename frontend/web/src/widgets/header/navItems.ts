export type HeaderNavItem = {
  id: string;
  label: string;
  href: string;
  requiresAuth?: boolean;
  activePaths?: string[];
};

const primaryNavItems: HeaderNavItem[] = [
  {
    id: "search",
    label: "검색",
    href: "/search",
  },
  {
    id: "spots",
    label: "여행지 목록",
    href: "/spots",
  },
  {
    id: "game",
    label: "게임 목록",
    href: "/game",
    requiresAuth: true,
    activePaths: ["/game"],
  },
];

const signedInNavItem: HeaderNavItem = {
  id: "profile",
  label: "마이페이지",
  href: "/profile",
  activePaths: ["/profile"],
};

const signedOutNavItem: HeaderNavItem = {
  id: "login",
  label: "로그인",
  href: "/login",
  activePaths: ["/login", "/signup"],
};

export const getHeaderNavItems = (isSignedIn: boolean): HeaderNavItem[] => [
  ...primaryNavItems,
  isSignedIn ? signedInNavItem : signedOutNavItem,
];
