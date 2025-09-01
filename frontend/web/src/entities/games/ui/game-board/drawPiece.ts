export function drawPiece(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  cellSize: number,
  pieceImage: HTMLImageElement | null
) {
  const imgToUse = pieceImage || null;
  // 이미지가 준비돼 있으면 이미지로 렌더 (바닥 중앙 정렬)
  if (imgToUse && imgToUse.complete) {
    ctx.save();
    const scaleFactor = 2; // Offscreen canvas scale factor for higher resolution
    const targetW = cellSize * 0.8; // 말 너비(칸의 80%)
    const aspect =
      imgToUse.naturalHeight && imgToUse.naturalWidth
        ? imgToUse.naturalHeight / imgToUse.naturalWidth
        : 1;
    const targetH = targetW * aspect;

    // Create offscreen canvas at 2x resolution
    const offscreenCanvas = document.createElement("canvas");
    offscreenCanvas.width = targetW * scaleFactor;
    offscreenCanvas.height = targetH * scaleFactor;
    const offscreenCtx = offscreenCanvas.getContext("2d");
    if (offscreenCtx) {
      offscreenCtx.imageSmoothingEnabled = true;
      offscreenCtx.imageSmoothingQuality = "high";
      offscreenCtx.clearRect(
        0,
        0,
        offscreenCanvas.width,
        offscreenCanvas.height
      );
      // Draw image at higher resolution to offscreen canvas
      offscreenCtx.drawImage(
        imgToUse,
        0,
        0,
        offscreenCanvas.width,
        offscreenCanvas.height
      );

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      const dx = Math.round(x - targetW / 2);
      const dy = Math.round(y - 6 - targetH);
      // Draw scaled down from offscreen canvas to main canvas for better anti-aliasing
      ctx.drawImage(
        offscreenCanvas,
        0,
        0,
        offscreenCanvas.width,
        offscreenCanvas.height,
        dx,
        dy,
        targetW,
        targetH
      );
    } else {
      // Fallback: draw directly if offscreen context not available
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      const dx = Math.round(x - targetW / 2);
      const dy = Math.round(y - 6 - targetH);
      ctx.drawImage(imgToUse, dx, dy, targetW, targetH);
    }
    ctx.restore();
    return;
  }

  // Fallback: 원형 말
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y - 18, cellSize * 0.1, 0, 2 * Math.PI); // y-18로 약간 위에
  ctx.fillStyle = "#36bffa";
  ctx.shadowColor = "#1199ff";
  ctx.shadowBlur = 12;
  ctx.fill();
  ctx.strokeStyle = "#085d99";
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.restore();

  // 말 머리 장식 (예시, 하얀 점)
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y - 22, cellSize * 0.02, 0, 2 * Math.PI);
  ctx.fillStyle = "#fff";
  ctx.fill();
  ctx.restore();
}
