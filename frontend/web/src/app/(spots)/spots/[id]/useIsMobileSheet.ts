import { useEffect, useState } from "react";

const MOBILE_SHEET_MAX_WIDTH = 800;

export function useIsMobileSheet() {
  const [isMobileSheet, setIsMobileSheet] = useState(false);

  useEffect(() => {
    const update = () =>
      setIsMobileSheet(window.innerWidth <= MOBILE_SHEET_MAX_WIDTH);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return isMobileSheet;
}
