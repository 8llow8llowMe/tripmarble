import React, { useRef, useEffect, useState } from "react";
import styles from "./GameBoard.module.scss";
import { useCanvasDrag } from "@/entities/games/ui/game-board/useCanvasDrag";
import { drawGameBoard3D } from "@/entities/games/ui/game-board/drawGameBoard3D";
import { useCanvasInitialScroll } from "@/entities/games/ui/game-board/useCanvasInitialScroll";
import { drawPiece } from "@/entities/games/ui/game-board/drawPiece";
import { getCustomPosition } from "@/entities/games/ui/game-board/getCustomPosition";
import type { TripGameTileView } from "@/entities/games/model/gameInfoDummy";

const CELL_SIZE = 100;

type Props = {
  count?: number;
  tiles: TripGameTileView[];
  onCellClick?: (tile: TripGameTileView, index: number) => void;
};

export default function GameBoard({ count = 5, tiles, onCellClick }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    console.log(payload?.type);
    return {
      index: payload?.index ?? -1,
      row: pos.row,
      col: pos.col,
      type: payload?.type ?? "normal",
      title: payload?.title ?? "",
    };
  });

  const [piecePos, setPiecePos] = useState({ x: 0, y: 0 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [diceValue, setDiceValue] = useState<number | null>(null);

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

    canvas.width = CELL_SIZE * count + 15;
    canvas.height = CELL_SIZE * count + 15;

    // cache clickable rects (top faces only)
    cellRectsRef.current = boardData.map((cell) => ({
      index: cell.index,
      x: cell.col * CELL_SIZE + 10,
      y: cell.row * CELL_SIZE,
      w: CELL_SIZE,
      h: CELL_SIZE,
    }));

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ecf1fe";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    console.log(boardData);
    drawGameBoard3D(ctx, boardData, count, CELL_SIZE);
    drawPiece(ctx, piecePos.x, piecePos.y, CELL_SIZE);
  }, [boardData, count, piecePos]);

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

  const animateMove = (steps: number) => {
    if (isMoving) return;
    setIsMoving(true);
    setDiceValue(steps);

    let currentStep = 0;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    function animateStep(fromIndex: number, toIndex: number) {
      const fromPos = getCustomPosition(fromIndex, count);
      const toPos = getCustomPosition(toIndex, count);
      const from = {
        x: fromPos.customX * CELL_SIZE + CELL_SIZE / 2 + 10,
        y: fromPos.customY * CELL_SIZE + CELL_SIZE / 2 + 30,
      };
      const to = {
        x: toPos.customX * CELL_SIZE + CELL_SIZE / 2 + 10,
        y: toPos.customY * CELL_SIZE + CELL_SIZE / 2 + 30,
      };

      let startTime: number | null = null;
      const duration = 250;

      function step(timestamp: number) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const t = Math.min(elapsed / duration, 1);

        const { x, y } = getParabolaPoint(from.x, from.y, to.x, to.y, 50, t);

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
            setCurrentIndex(toIndex % boardData.length);
          }
        }
      }

      requestAnimationFrame(step);
    }

    animateStep(currentIndex, (currentIndex + 1) % boardData.length);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      const x = (e.clientX - rect.left) * scaleX;
      const y = (e.clientY - rect.top) * scaleY;
      const hit = cellRectsRef.current.find(
        (r) => x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h
      );

      if (hit && hit.index !== -1 && onCellClick) {
        onCellClick(tiles[hit.index], hit.index);
      }
    };
    canvas.addEventListener("click", handleClick);
    return () => canvas.removeEventListener("click", handleClick);
  }, [tiles, onCellClick, count]);

  return (
    <>
      <div className={styles.boardWrapper} ref={wrapperRef}>
        <canvas
          ref={canvasRef}
          width={CELL_SIZE * count}
          height={CELL_SIZE * count}
          className={styles.canvas}
        />
      </div>
      <div className={styles.boardText}>
        {diceValue !== null
          ? `주사위 결과: ${diceValue}`
          : "주사위를 굴려주세요"}
      </div>
      <audio id="mouse-click" src="/sounds/mouse-click.mp3" preload="auto" />
      <button
        className={styles.moveButton}
        onClick={() => {
          const audio = document.getElementById(
            "mouse-click"
          ) as HTMLAudioElement | null;
          if (audio) {
            audio.currentTime = 0; // 반복 클릭도 항상 처음부터
            audio.play();
          }
          animateMove(Math.floor(Math.random() * 6) + 1);
        }}
      >
        이동
      </button>
    </>
  );
}
