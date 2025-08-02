import { RefObject, useEffect } from "react";

export function useCanvasInitialScroll(
  canvasRef: RefObject<HTMLCanvasElement>,
  wrapperRef: RefObject<HTMLDivElement>
) {
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (wrapper && canvasRef.current) {
      wrapper.scrollLeft = canvasRef.current.width + 10 - wrapper.clientWidth;
      wrapper.scrollTop = canvasRef.current.height - wrapper.clientHeight;
    }
  }, [canvasRef, wrapperRef]);
}
