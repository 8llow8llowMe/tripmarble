import { RefObject, useEffect } from "react";

export function useCanvasInitialScroll(
  canvasRef: RefObject<HTMLCanvasElement>,
  wrapperRef: RefObject<HTMLDivElement>
) {
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!canvas || !wrapper) return;

    // Center the canvas content within the wrapper on initial mount
    const centerScroll = () => {
      const left = Math.max(
        0,
        Math.floor((canvas.width - wrapper.clientWidth) / 2)
      );
      const top = Math.max(
        0,
        Math.floor((canvas.height - wrapper.clientHeight) / 2)
      );
      wrapper.scrollLeft = left;
      wrapper.scrollTop = top;
    };

    // Defer to ensure wrapper sizes are measured
    const id = requestAnimationFrame(centerScroll);
    return () => cancelAnimationFrame(id);
  }, [canvasRef, wrapperRef]);
}
