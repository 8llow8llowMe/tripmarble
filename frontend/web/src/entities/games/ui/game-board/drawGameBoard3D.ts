import { BoardCell } from "./types";
import { getCell3DColors } from "./cellColor";

/**
 * 입체(3D) 셀 하나를 그림
 */
function draw3DCell(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  mainColor: string,
  bottomColor: string,
  radius = 18,
  sideHeight = 16
) {
  // 1. 아래(옆면)
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x + radius, y + h);
  ctx.lineTo(x + w - radius, y + h);
  ctx.quadraticCurveTo(x + w, y + h, x + w, y + h - radius);
  ctx.lineTo(x + w, y + h + sideHeight - radius);
  ctx.quadraticCurveTo(
    x + w,
    y + h + sideHeight,
    x + w - radius,
    y + h + sideHeight
  );
  ctx.lineTo(x + radius, y + h + sideHeight);
  ctx.quadraticCurveTo(x, y + h + sideHeight, x, y + h + sideHeight - radius);
  ctx.lineTo(x, y + h - radius);
  ctx.quadraticCurveTo(x, y + h, x + radius, y + h);
  ctx.closePath();
  ctx.fillStyle = bottomColor;
  ctx.globalAlpha = 0.9;
  ctx.shadowColor = bottomColor + "77";
  ctx.shadowBlur = 3;
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.restore();

  // 2. 메인(위) 사각형
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + w - radius, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
  ctx.lineTo(x + w, y + h - radius);
  ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
  ctx.lineTo(x + radius, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  ctx.fillStyle = mainColor;
  ctx.shadowColor = "#fff5";
  ctx.shadowBlur = 4;
  ctx.fill();
  ctx.restore();
}

/**
 * 보드 전체를 그림 (각 셀 3D)
 */
export function drawGameBoard3D(
  ctx: CanvasRenderingContext2D,
  cells: BoardCell[],
  count: number,
  cellSize: number
) {
  cells.forEach((cell) => {
    const row = cell.row;
    const col = cell.col;
    const [main, bottom] = getCell3DColors(cell.type);

    // draw 3D cell
    draw3DCell(
      ctx,
      col * cellSize + 10,
      row * cellSize,
      cellSize,
      cellSize,
      main,
      bottom,
      18,
      16
    );

    // 텍스트 그리기 (중앙, 약간 아래)
    ctx.save();
    ctx.font = "bold 18px sans-serif";
    ctx.fillStyle = "#222";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = "#fff6";
    ctx.shadowBlur = 4;
    ctx.fillText(
      cell.title,
      col * cellSize + cellSize / 2 + 10,
      row * cellSize + cellSize / 2 + 5
    );
    ctx.restore();
  });
}
