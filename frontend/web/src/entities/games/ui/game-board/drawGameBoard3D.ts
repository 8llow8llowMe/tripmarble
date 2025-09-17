import { BoardCell } from "./types";
import { getCell3DColors } from "./cellColor";

// ---- color utils: safely apply alpha to hex colors (#RGB, #RRGGBB, #RRGGBBAA) ----
function hexToRgba(hex: string, alpha: number): string {
  if (!hex || typeof hex !== "string") return `rgba(0,0,0,${alpha})`;
  const m = hex.trim();
  if (!m.startsWith("#")) return `rgba(0,0,0,${alpha})`;
  let h = m.slice(1);
  if (h.length === 3) {
    h = h
      .split("")
      .map((ch) => ch + ch)
      .join("");
  }
  if (h.length === 8) {
    h = h.slice(0, 6);
  }
  if (h.length !== 6) return `rgba(0,0,0,${alpha})`;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const a = Math.max(0, Math.min(1, alpha));
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

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
  // grad.addColorStop(0.25, mainColor + "cc");
  // grad.addColorStop(1, mainColor + "88");
  grad.addColorStop(0.25, hexToRgba(mainColor, 0.8));
  grad.addColorStop(1, hexToRgba(mainColor, 0.53));
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
  cellSize: number,
  heightScale: number = 1.3
) {
  const H = cellSize * heightScale;
  const yOf = (row: number) => row * H;

  ctx.imageSmoothingEnabled = true; // images only; harmless for text

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
      yOf(row),
      cellSize,
      H,
      main,
      bottom,
      18,
      16 * heightScale
    );

    // Special START cell: big GO + bottom arrow
    if (cell.type === "start-go") {
      const cx = Math.round(col * cellSize + cellSize / 2 + 10);
      const cy = Math.round(yOf(row) + H / 2 + 5);

      ctx.save();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // GO label (no shadow blur -> crisper)
      ctx.font = '800 28px "Pretendard Variable", Pretendard, -apple-system, system-ui, "Segoe UI", Roboto, Arial, sans-serif';
      ctx.fillStyle = "rgba(10,132,83,0.96)";
      ctx.shadowBlur = 0;
      ctx.shadowColor = "transparent";
      ctx.fillText("GO", cx, cy - 6);

      // Bottom arrow text
      ctx.font = '700 14px "Pretendard Variable", Pretendard, -apple-system, system-ui, "Segoe UI", Roboto, Arial, sans-serif';
      ctx.fillStyle = "rgba(10,132,83,0.96)";
      ctx.shadowBlur = 0;
      ctx.shadowColor = "transparent";
      ctx.fillText("<---", cx, Math.round(yOf(row) + H - 14));

      ctx.restore();
      return; // skip normal title rendering
    }

    // 텍스트 그리기 (중앙, 선명하게)
    ctx.save();
    // 그림자/블러 끄기 (번짐 방지)
    ctx.shadowBlur = 0;
    ctx.shadowColor = "transparent";
    // HiDPI에서 글꼴이 로딩되지 않았을 때 기본 폰트로도 선명하게 보이도록 폰트 스택 구성
    ctx.font =
      '700 13px "Pretendard Variable", Pretendard, -apple-system, system-ui, "Segoe UI", Roboto, Arial, sans-serif';
    ctx.fillStyle = "rgba(0,0,0,0.9)";
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
    const baseX = Math.round(col * cellSize + cellSize / 2 + 10);
    const baseY = Math.round(yOf(row) + H / 2 + 5);
    const lineHeight = 16; // 줄간 간격 (px)
    const totalHeight = (lines.length - 1) * lineHeight;
    lines.forEach((line, idx) => {
      ctx.fillText(line, baseX, baseY - totalHeight / 2 + idx * lineHeight);
    });
    ctx.restore();
  });
}
