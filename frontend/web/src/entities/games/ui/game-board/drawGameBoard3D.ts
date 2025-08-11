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
  // grad.addColorStop(0, "rgba(255,255,255,0.25)");
  grad.addColorStop(0.25, mainColor + "cc");
  grad.addColorStop(1, mainColor + "88");
  ctx.fillStyle = grad;
  ctx.shadowColor = "rgba(160,200,255,0.13)";
  ctx.shadowBlur = 18;
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
    const [main, bottom] =
      cell.type === "start-go"
        ? ["#d4f6da", "#7edb8a"]
        : getCell3DColors(cell.type);

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

    // Special START cell: big GO + bottom arrow
    if (cell.type === "start-go") {
      const cx = col * cellSize + cellSize / 2 + 10;
      const cy = row * cellSize + cellSize / 2 + 5;

      ctx.save();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // GO label
      ctx.font = "800 28px pretendard";
      ctx.fillStyle = "#0a8453";
      ctx.shadowColor = "#ffffffaa";
      ctx.shadowBlur = 6;
      ctx.fillText("GO", cx, cy - 6);

      // Bottom arrow text
      ctx.font = "700 14px pretendard";
      ctx.fillStyle = "#0a8453";
      ctx.shadowBlur = 0;
      ctx.fillText("<---", cx, row * cellSize + cellSize - 14);

      ctx.restore();
      return; // skip normal title rendering
    }

    // 텍스트 그리기 (중앙, 약간 아래)
    ctx.save();
    ctx.font = "400 14px pretendard";
    ctx.fillStyle = "#222";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // 표시할 문자열
    const title = cell.title || "";

    // 줄바꿈 처리 (텍스트 픽셀 너비 기반)
    let lines: string[] = [];
    if (title.length === 0) {
      lines = [title];
    } else {
      // 최대 텍스트 폭 (셀 크기의 80%)
      const maxWidth = cellSize * 0.8;
      let currentLine = "";
      for (let i = 0; i < title.length; i++) {
        const testLine = currentLine + title[i];
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && currentLine.length > 0) {
          lines.push(currentLine);
          currentLine = title[i];
        } else {
          currentLine = testLine;
        }
      }
      if (currentLine.length > 0) {
        lines.push(currentLine);
      }
    }

    // 텍스트 위치 계산 (여러 줄 지원)
    const baseX = col * cellSize + cellSize / 2 + 10;
    const baseY = row * cellSize + cellSize / 2 + 5;
    const lineHeight = 16; // 줄간 간격 (px)
    const totalHeight = (lines.length - 1) * lineHeight;
    lines.forEach((line, idx) => {
      ctx.fillText(line, baseX, baseY - totalHeight / 2 + idx * lineHeight);
    });
    ctx.restore();
  });
}
