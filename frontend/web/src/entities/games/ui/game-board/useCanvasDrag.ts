import { RefObject, useEffect, useRef } from "react";

export function useCanvasDrag(
  canvasRef: RefObject<HTMLCanvasElement>,
  wrapperRef: RefObject<HTMLDivElement>
) {
  const isDragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function onPointerDown(e: PointerEvent) {
      if (!canvas) return;
      if (e.target !== canvas) return;
      isDragging.current = true;
      lastPos.current = { x: e.clientX, y: e.clientY };
    }

    function onPointerMove(e: PointerEvent) {
      if (!isDragging.current || !canvas) return;
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      if (wrapperRef.current) {
        wrapperRef.current.scrollLeft -= dx;
        wrapperRef.current.scrollTop -= dy;
      }
      lastPos.current = { x: e.clientX, y: e.clientY };
    }

    function endDrag() {
      if (!canvas) return;
      isDragging.current = false;
    }

    // keep default cursor; GameBoard manages pointer on tiles
    canvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", endDrag);

    return () => {
      canvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", endDrag);
    };
  }, [canvasRef, wrapperRef]);
}
