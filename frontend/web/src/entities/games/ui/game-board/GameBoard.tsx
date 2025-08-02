import React, { useRef, useEffect, useState } from "react";
import styles from "./GameBoard.module.scss";
import { useCanvasDrag } from "@/entities/games/ui/game-board/useCanvasDrag";
import { drawGameBoard3D } from "@/entities/games/ui/game-board/drawGameBoard3D";
import { useCanvasInitialScroll } from "@/entities/games/ui/game-board/useCanvasInitialScroll";
import { createDummyBoardData } from "@/entities/games/ui/game-board/createDummyBoardData";
import { drawPiece } from "@/entities/games/ui/game-board/drawPiece";
import { getCustomPosition } from "@/entities/games/ui/game-board/getCustomPosition";

const CELL_SIZE = 80;

export default function GameBoard({ count = 5 }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boardData = createDummyBoardData(count);

  const [piecePos, setPiecePos] = useState({ x: 0, y: 0 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [diceValue, setDiceValue] = useState<number | null>(null);

  useCanvasInitialScroll(canvasRef, wrapperRef);
  useCanvasDrag(canvasRef, wrapperRef);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = CELL_SIZE * count + 15;
    canvas.height = CELL_SIZE * count + 15;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

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
      <button
        className={styles.moveButton}
        onClick={() => animateMove(Math.floor(Math.random() * 6) + 1)}
      >
        이동
      </button>
    </>
  );
}
