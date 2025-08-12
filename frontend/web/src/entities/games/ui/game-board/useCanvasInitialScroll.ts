import { RefObject, useEffect } from "react";

export function useCanvasInitialScroll(
  canvasRef: RefObject<HTMLCanvasElement>,
  wrapperRef: RefObject<HTMLDivElement>
) {
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!canvas || !wrapper) return;

    wrapper.scrollLeft = canvas.width + 10 - wrapper.clientWidth;
    wrapper.scrollTop = canvas.height - wrapper.clientHeight;
  }, [canvasRef, wrapperRef]);
}
