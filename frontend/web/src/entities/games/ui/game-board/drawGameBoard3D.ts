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
  radius = 24,
  sideHeight = 16
) {
  // 1. 옆면(아래)
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
  ctx.globalAlpha = 0.8;
  ctx.fillStyle = bottomColor;
  ctx.shadowColor = bottomColor + "77";
  ctx.shadowBlur = 8;
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.restore();

  // 2. 메인(위)
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

  // 배경 밝기(그라데이션, 글래스 베이스)
  const grad = ctx.createLinearGradient(x, y, x + w, y + h);
  // grad.addColorStop(0, "rgba(255,255,255,0.35)");
  grad.addColorStop(0.5, mainColor + "cc");
  grad.addColorStop(1, mainColor + "88");
  ctx.fillStyle = grad;
  ctx.shadowColor = "rgba(160,200,255,0.13)";
  ctx.shadowBlur = 18;
  ctx.fill();

  // 하이라이트(굵고 밝은 곡선 하이라이트) - 메인
  ctx.save();
  ctx.globalAlpha = 0.45;
  ctx.beginPath();
  ctx.ellipse(
    x + w * 0.38,
    y + h * 0.29,
    w * 0.24,
    h * 0.11,
    Math.PI / 8,
    0,
    2 * Math.PI
  );
  ctx.fillStyle = "white";
  ctx.filter = "blur(3px)";
  ctx.fill();
  ctx.restore();

  // 작은 물방울 하이라이트
  ctx.save();
  ctx.globalAlpha = 0.2;
  ctx.beginPath();
  ctx.ellipse(
    x + w * 0.62,
    y + h * 0.44,
    w * 0.1,
    h * 0.06,
    Math.PI / 5,
    0,
    2 * Math.PI
  );
  ctx.fillStyle = "#fff";
  ctx.filter = "blur(1.2px)";
  ctx.fill();
  ctx.restore();

  // 곡면/오팔(은은한 파란 느낌, 내부 광택)
  // let opal = ctx.createRadialGradient(
  //   x + w * 0.82,
  //   y + h * 0.8,
  //   w * 0.05,
  //   x + w * 0.82,
  //   y + h * 0.8,
  //   w * 0.19
  // );
  // opal.addColorStop(0, "rgba(160,190,255,0.12)");
  // opal.addColorStop(1, "rgba(255,255,255,0.0)");
  // ctx.globalAlpha = 0.5;
  // ctx.fillStyle = opal;
  // ctx.fill();
  // ctx.globalAlpha = 1;

  // // 테두리(유리 느낌)
  // ctx.strokeStyle = "rgba(255,255,255,0.78)";
  // ctx.lineWidth = 2.5;
  // ctx.shadowColor = "rgba(255,255,255,0.13)";
  // ctx.shadowBlur = 2;
  // ctx.stroke();
  // ctx.restore();
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
    ctx.font = "700 8px pretendard";
    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    // ctx.shadowColor = "#fff6";
    // ctx.shadowBlur = 4;
    ctx.fillText(
      cell.title,
      col * cellSize + cellSize / 2 + 10,
      row * cellSize + cellSize / 2 + 5
    );
    ctx.restore();
  });
}
