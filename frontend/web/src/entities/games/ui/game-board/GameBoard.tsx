import React, { useRef, useEffect, useState } from "react";
import styles from "./GameBoard.module.scss";
import { useCanvasDrag } from "@/entities/games/ui/game-board/useCanvasDrag";
import { drawGameBoard3D } from "@/entities/games/ui/game-board/drawGameBoard3D";
import { useCanvasInitialScroll } from "@/entities/games/ui/game-board/useCanvasInitialScroll";
import { createDummyBoardData } from "@/entities/games/ui/game-board/createDummyBoardData";
import { drawPiece } from "@/entities/games/ui/game-board/drawPiece";

type GameBoardProps = {
  count?: number;
};

const CELL_SIZE = 80;
export default function GameBoard({ count = 5 }: GameBoardProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boardData = createDummyBoardData(count);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMoving, setIsMoving] = useState(false);

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

    // === 말(Piece) 그리기 ===
    const currentCell = boardData[currentIndex];
    if (currentCell) {
      const x = currentCell.col * CELL_SIZE + CELL_SIZE / 2 + 10;
      const y = currentCell.row * CELL_SIZE + CELL_SIZE / 2;
      drawPiece(ctx, x, y, CELL_SIZE);
    }
  }, [boardData, count, currentIndex]);

  const handleMove = (step: number) => {
    if (isMoving) return;
    setIsMoving(true);
    let i = 0;
    function animate() {
      setCurrentIndex((prev) => (prev + 1) % boardData.length);
      i++;
      if (i < step) {
        setTimeout(animate, 250); // 0.25초마다 이동, 프레임 조정 가능
      } else {
        setIsMoving(false);
      }
    }
    animate();
  };

  return (
    <div className={styles.boardWrapper} ref={wrapperRef}>
      <canvas
        ref={canvasRef}
        width={CELL_SIZE * count}
        height={CELL_SIZE * count}
        className={styles.canvas}
      />
      <button onClick={() => handleMove(Math.floor(Math.random() * 6) + 1)}>
        이동
      </button>
    </div>
  );
}
