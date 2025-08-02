// === 말(원) 그리는 함수 ===
export function drawPiece(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  cellSize: number
) {
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
