export type RouteLayoutMode = "default" | "immersive" | "map-heavy" | "auth" | "game-play";

export type RouteLayoutConfig = {
  mode: RouteLayoutMode;
  headerOffset: boolean;
  showFooter: boolean;
};

type RouteLayoutRule = RouteLayoutConfig & {
  match: (pathname: string) => boolean;
};

const routeLayoutRules: RouteLayoutRule[] = [
  {
    mode: "immersive",
    headerOffset: false,
    showFooter: true,
    match: (pathname) => pathname === "/",
  },
  {
    mode: "auth",
    headerOffset: true,
    showFooter: false,
    match: (pathname) =>
      pathname === "/login" ||
      pathname === "/signup" ||
      pathname.startsWith("/auth/"),
  },
  {
    mode: "map-heavy",
    headerOffset: false,
    showFooter: false,
    match: (pathname) => pathname === "/spots" || pathname.startsWith("/spots/"),
  },
  {
    mode: "game-play",
    headerOffset: true,
    showFooter: false,
    match: (pathname) =>
      pathname.startsWith("/game/") && pathname !== "/game/list",
  },
];

const defaultLayout: RouteLayoutConfig = {
  mode: "default",
  headerOffset: true,
  showFooter: true,
};

export const getRouteLayout = (pathname: string | null): RouteLayoutConfig => {
  const currentPath = pathname ?? "/";
  const matchedRule = routeLayoutRules.find((rule) => rule.match(currentPath));
  return matchedRule ?? defaultLayout;
};
