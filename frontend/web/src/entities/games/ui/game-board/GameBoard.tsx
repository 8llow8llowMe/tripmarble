import React, {
  useRef,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import styles from "./GameBoard.module.scss";
import { useCanvasDrag } from "@/entities/games/ui/game-board/useCanvasDrag";
import { drawGameBoard3D } from "@/entities/games/ui/game-board/drawGameBoard3D";
import { useCanvasInitialScroll } from "@/entities/games/ui/game-board/useCanvasInitialScroll";
import { drawPiece } from "@/entities/games/ui/game-board/drawPiece";
import { getCustomPosition } from "@/entities/games/ui/game-board/getCustomPosition";
import type { TripGameTileView } from "@/entities/games/model/gameInfoDummy";
import Piece from "@/shared/assets/images/Piece.png";
import DiceView from "@/entities/games/ui/game-board/diceView";

const CELL_SIZE = 100;

const getAssetSrc = (asset: string | { src: string }) =>
  (typeof asset === "string" ? asset : asset.src) || "";

type Props = {
  count?: number;
  tiles: TripGameTileView[];
  onCellClick?: (tile: TripGameTileView, index: number) => void;
  onDiceChange?: (value: number | null) => void;
  onMoveComplete?: (tile: TripGameTileView | null, tileIndex: number) => void;
  visitedMarks?: { tripGameTileId: string; order: number; status: string }[];
  initialStepNo?: number; // 0 = GO, 1 = first tile
};

export type GameBoardHandle = {
  animateMove: (steps: number) => void;
};

const GameBoard = forwardRef<GameBoardHandle, Props>(function GameBoard(
  {
    count = 5,
    tiles,
    onCellClick,
    onDiceChange,
    onMoveComplete,
    visitedMarks,
    initialStepNo = 0,
  }: Props,
  ref
) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pieceImageRef = useRef<HTMLImageElement | null>(null);
  const [imgReadyTick, setImgReadyTick] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (pieceImageRef.current) return; // 이미 생성됨

    const img = new Image() as HTMLImageElement;
    img.src = getAssetSrc(Piece);

    const onReady = () => setImgReadyTick((t) => t + 1);

    if ("decode" in img && typeof (img as any).decode === "function") {
      (img as any)
        .decode()
        .then(onReady)
        .catch(() => {
          img.addEventListener("load", onReady, { once: true });
        });
    } else {
      img.addEventListener("load", onReady, { once: true });
    }

    pieceImageRef.current = img;
  }, []);

  // --- Build two position lists ---
  // 1) renderPositions: row-major border order (good for painter's algorithm / overlaps)
  const renderPositions: { row: number; col: number }[] = [];
  for (let row = 0; row < count; row++) {
    for (let col = 0; col < count; col++) {
      if (row === 0 || row === count - 1 || col === 0 || col === count - 1) {
        renderPositions.push({ row, col });
      }
    }
  }

  // 2) logicalPositions: start at right-bottom and go clockwise
  const logicalPositions: { row: number; col: number }[] = [];
  const max = count - 1;

  // 1) bottom row: right -> left  (포함: RB..LB)
  for (let c = max; c >= 0; c--) logicalPositions.push({ row: max, col: c });

  // 2) left col: bottom-1 -> top   (제외: LB)
  for (let r = max - 1; r >= 0; r--) logicalPositions.push({ row: r, col: 0 });

  // 3) top row: left+1 -> right    (제외: LT)
  for (let c = 1; c <= max; c++) logicalPositions.push({ row: 0, col: c });

  // 4) right col: top+1 -> bottom-1 (제외: RT, RB)
  for (let r = 1; r <= max - 1; r++)
    logicalPositions.push({ row: r, col: max });
  // Map coordinate -> tile payload (clockwise assignment)
  type CoordKey = string;
  const toKey = (rc: { row: number; col: number }): CoordKey =>
    `${rc.row},${rc.col}`;
  const coordToTile = new Map<
    CoordKey,
    { index: number; type: string; title: string }
  >();

  // Reserve start cell (right-bottom) as GO marker, then place tiles from the next cell clockwise
  //  - Start cell key
  const startKey = toKey(logicalPositions[0]);
  coordToTile.set(startKey, { index: -1, type: "start-go", title: "GO" });

  //  - Assign tiles offset by +1 position (clockwise)
  for (let i = 0; i < tiles.length; i++) {
    const pos = logicalPositions[(i + 1) % logicalPositions.length];
    const tile = tiles[i];
    if (!tile) continue;
    const type =
      tile.missionTypeCode === "PHOTO"
        ? "PHOTO"
        : tile.missionTypeCode === "REVIEW"
        ? "REVIEW"
        : tile.missionTypeCode === "CHECKIN_GPS"
        ? "CHECKIN_GPS"
        : "normal";
    coordToTile.set(toKey(pos), {
      index: i,
      type,
      title: tile.tripSpotName,
    });
  }

  // Finally, build boardData in the SAFE render order, but pulling tile info by coordinate
  const boardData = renderPositions.map((pos) => {
    const payload = coordToTile.get(toKey(pos));
    // console.log(payload?.type);
    return {
      index: payload?.index ?? -1,
      row: pos.row,
      col: pos.col,
      type: payload?.type ?? "normal",
      title: payload?.title ?? "",
    };
  });

  const [piecePos, setPiecePos] = useState({ x: 0, y: 0 });
  const [currentIndex, setCurrentIndex] = useState(
    initialStepNo % (count * 4 - 4)
  );
  const [isMoving, setIsMoving] = useState(false);
  const [diceValue, setDiceValue] = useState<number | null>(null);
  const [diceVisible, setDiceVisible] = useState(false);

  useEffect(() => {
    onDiceChange?.(diceValue);
  }, [diceValue, onDiceChange]);

  useCanvasInitialScroll(canvasRef, wrapperRef);
  useCanvasDrag(canvasRef, wrapperRef);

  const cellRectsRef = useRef<
    { index: number; x: number; y: number; w: number; h: number }[]
  >([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const HEIGHT_SCALE = 1.3;
    const X_OFFSET = 10; // same horizontal offset as drawGameBoard3D
    const EXTRA_TOP = 18; // room for rounded corners/shadow at top
    const EXTRA_BOTTOM = 16 * HEIGHT_SCALE; // height of the bottom side face

    const cssWidth = CELL_SIZE * count + X_OFFSET * 2 + 5; // true drawn width + small margin
    const cssHeight =
      CELL_SIZE * count * HEIGHT_SCALE + EXTRA_TOP + EXTRA_BOTTOM + 10; // true drawn height + paddings

    canvas.width = Math.floor(cssWidth * dpr);
    canvas.height = Math.floor(cssHeight * dpr);
    // Keep CSS size in CSS pixels for layout
    canvas.style.width = cssWidth + "px";
    canvas.style.height = cssHeight + "px";
    const ctx2d = ctx; // rename for clarity
    ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx2d.translate(0, EXTRA_TOP);
    ctx2d.shadowBlur = 0;
    ctx2d.shadowColor = "transparent";

    // cache clickable rects (top faces only) - stretch top/bottom rows like drawGameBoard3D
    const STRETCH = 1.15;
    cellRectsRef.current = boardData.map((cell) => {
      const isTop = cell.row === 0;
      const isBottom = cell.row === count - 1;

      const w = CELL_SIZE; // width not scaled horizontally
      let h = CELL_SIZE * HEIGHT_SCALE; // base height scaled vertically

      const x = cell.col * CELL_SIZE + X_OFFSET; // match draw X
      let y = EXTRA_TOP + cell.row * CELL_SIZE * HEIGHT_SCALE; // include top padding

      if (isTop) {
        h = Math.floor(CELL_SIZE * STRETCH * HEIGHT_SCALE);
      } else if (isBottom) {
        h = Math.floor(CELL_SIZE * STRETCH * HEIGHT_SCALE);
        y =
          EXTRA_TOP +
          cell.row * CELL_SIZE * HEIGHT_SCALE -
          (h - CELL_SIZE * HEIGHT_SCALE);
      }

      return { index: cell.index, x, y, w, h };
    });

    ctx2d.clearRect(0, 0, canvas.width, canvas.height);
    ctx2d.fillStyle = "#fff";
    ctx2d.fillRect(0, 0, canvas.width, canvas.height);
    drawGameBoard3D(ctx2d, boardData, count, CELL_SIZE, 1.3);

    // === 말(스프라이트/원) 그리는 함수 ===
    drawPiece(
      ctx2d,
      piecePos.x,
      piecePos.y,
      CELL_SIZE,
      pieceImageRef.current as HTMLImageElement
    );

    // === 방문 순서 마커 그리기 ===
    if (visitedMarks && visitedMarks.length > 0) {
      visitedMarks.forEach((mark) => {
        const idx = tiles.findIndex(
          (t) => t.tripGameTileId === mark.tripGameTileId
        );
        if (idx < 0) return;
        // cellRectsRef에 계산된(스트레치 반영) top-face 사각형을 그대로 사용해 좌표 일치 보장
        const rect = cellRectsRef.current.find((r) => r.index === idx);
        if (!rect) return;
        const cx = rect.x + 18;
        const cy = rect.y - EXTRA_TOP + 18; // subtract because context was translated by EXTRA_TOP

        let color = "#5cc58a"; // success 기본
        if (mark.status === "PENDING") color = "#ff9f43";
        else if (mark.status === "FAILED") color = "#f05252";
        else if (mark.status === "SKIPPED") color = "#aab4c6";

        // 원형 배지
        ctx2d.beginPath();
        ctx2d.fillStyle = color;
        ctx2d.arc(cx, cy, 14, 0, Math.PI * 2);
        ctx2d.fill();

        // 텍스트
        ctx2d.fillStyle = "#fff";
        ctx2d.font = "bold 12px sans-serif";
        ctx2d.textAlign = "center";
        ctx2d.textBaseline = "middle";
        ctx2d.fillText(String(mark.order), cx, cy + 1);
      });
    }
  }, [boardData, count, piecePos, imgReadyTick, visitedMarks, tiles]);

  // 초기 말 위치 설정 (최초 1회 혹은 count/currentIndex 변경 시)
  useEffect(() => {
    if (!canvasRef.current) return;
    // 이미 설정되어 있으면 스킵 (0,0은 초기값으로 간주)
    if (piecePos.x !== 0 || piecePos.y !== 0) return;

    const start = getCustomPosition(currentIndex, count);
    const x = start.customX * CELL_SIZE + CELL_SIZE / 2 + 10;
    const y = start.customY * CELL_SIZE * 1.3 + (CELL_SIZE * 1.3) / 2 + 30;
    setPiecePos({ x, y });
  }, [count, currentIndex, piecePos.x, piecePos.y]);

  // 외부에서 초기 스텝이 바뀌면 반영
  useEffect(() => {
    const idx = (initialStepNo ?? 0) % (count * 4 - 4);
    setCurrentIndex(idx);
    const start = getCustomPosition(idx, count);
    const x = start.customX * CELL_SIZE + CELL_SIZE / 2 + 10;
    const y = start.customY * CELL_SIZE * 1.3 + (CELL_SIZE * 1.3) / 2 + 30;
    setPiecePos({ x, y });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialStepNo, count]);

  function getParabolaPoint(
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    height: number,
    t: number
  ) {
    const cpX = (startX + endX) / 2;
    const cpY = Math.min(startY, endY) - height;

    const x = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * cpX + t * t * endX;
    const y = (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * cpY + t * t * endY;

    return { x, y };
  }
  // Adjust piece Y center for stretched top/bottom rows
  const STRETCH = 1.15;
  const centerForRow = (row: number) => {
    let center = row * CELL_SIZE + CELL_SIZE / 2 + 30;
    if (row === 0) center += ((STRETCH - 1) * CELL_SIZE) / 2;
    else if (row === count - 1) center -= ((STRETCH - 1) * CELL_SIZE) / 2;
    return center;
  };

  const animateMove = (steps: number) => {
    if (isMoving) return;
    setIsMoving(true);
    setDiceValue(steps);
    setDiceVisible(true);

    let currentStep = 0;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    function animateStep(fromIndex: number, toIndex: number) {
      const fromPos = getCustomPosition(fromIndex, count);
      const toPos = getCustomPosition(toIndex, count);
      const from = {
        x: fromPos.customX * CELL_SIZE + CELL_SIZE / 2 + 10,
        y: centerForRow(fromPos.customY),
      };
      const to = {
        x: toPos.customX * CELL_SIZE + CELL_SIZE / 2 + 10,
        y: centerForRow(toPos.customY),
      };

      let startTime: number | null = null;
      const duration = 250;

      function step(timestamp: number) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const t = Math.min(elapsed / duration, 1);

        const { x, y } = getParabolaPoint(
          from.x,
          from.y * 1.3,
          to.x,
          to.y * 1.3,
          50,
          t
        );

        setPiecePos({ x, y });

        if (t < 1) {
          requestAnimationFrame(step);
        } else {
          currentStep++;
          if (currentStep < steps) {
            animateStep(
              (fromIndex + 1) % boardData.length,
              (toIndex + 1) % boardData.length
            );
          } else {
            setIsMoving(false);
            const finalIndex = toIndex % boardData.length;
            setCurrentIndex(finalIndex);
            // notify move completion with the landed tile (if any)
            const landedTileIdx = boardData[finalIndex]?.index ?? -1;
            const landedTile = landedTileIdx >= 0 ? tiles[landedTileIdx] : null;
            onMoveComplete?.(landedTile ?? null, landedTileIdx);
          }
        }
      }

      requestAnimationFrame(step);
    }

    // Delay the piece movement to allow dice animation to play first
    setTimeout(() => {
      animateStep(currentIndex, (currentIndex + 1) % boardData.length);
    }, 4000);
  };

  useImperativeHandle(ref, () => ({
    animateMove,
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left; // CSS pixels
      const y = e.clientY - rect.top; // CSS pixels
      const hit = cellRectsRef.current.find(
        (r) => x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h
      );

      if (hit && hit.index !== -1 && onCellClick) {
        onCellClick(tiles[hit.index], hit.index);
      }
    };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left; // CSS pixels
      const y = e.clientY - rect.top; // CSS pixels
      const hit = cellRectsRef.current.find(
        (r) => x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h
      );
      if (hit && hit.index !== -1) {
        canvas.style.cursor = "pointer";
      } else {
        canvas.style.cursor = "default";
      }
    };
    canvas.addEventListener("click", handleClick);
    canvas.addEventListener("mousemove", handleMouseMove);
    return () => {
      canvas.removeEventListener("click", handleClick);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [tiles, onCellClick, count]);

  return (
    <>
      <div className={styles.boardWrapper} ref={wrapperRef}>
        <canvas
          ref={canvasRef}
          width={CELL_SIZE * count}
          height={CELL_SIZE * count * 1.3 + 25}
          className={styles.canvas}
        />
      </div>
      <DiceView
        visible={diceVisible}
        value={diceValue}
        onFinish={() => setDiceVisible(false)}
      />
    </>
  );
});

export default GameBoard;
