"use client";

import React, { useMemo, useState, useRef } from "react";
import GameBoard, {
  GameBoardHandle,
} from "@/entities/games/ui/game-board/GameBoard";
import styles from "./GamePlay.module.scss";
import {
  TripGameTileView,
  TripGameView,
} from "@/entities/games/model/gameInfoDummy";
import TileInfoModal from "@/entities/games/ui/tile-info-modal/TileInfoModal";
import useGameDiceMutation from "@/entities/games/hooks/useGameDice";
import formatDate from "@/shared/hooks/formatDate";

type Props = {
  tripGameView: TripGameView;
  tripGameTileViews: TripGameTileView[];
};

const GamePlay = ({ tripGameView, tripGameTileViews }: Props) => {
  const { mutateAsync: rollDice, isPending: isRolling } = useGameDiceMutation();
  const dateRange = useMemo(
    () =>
      `${formatDate(new Date(tripGameView.startedAt))} - ${formatDate(
        new Date(tripGameView.endedAt)
      )}`,
    [tripGameView.startedAt, tripGameView.endedAt]
  );

  const [activeStep, setActiveStep] = useState<number>(1);
  const activeTile = useMemo(
    () =>
      tripGameTileViews.find((t) => t.stepNo === activeStep) ??
      tripGameTileViews[0],
    [activeStep, tripGameTileViews]
  );

  const [modalTile, setModalTile] = useState<
    (typeof tripGameTileViews)[number] | null
  >(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const boardRef = useRef<GameBoardHandle | null>(null);
  const [diceValue, setDiceValue] = useState<number | null>(null);

  const handleModProfile = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalTile(null);
  };

  const handleRollDice = async () => {
    const audio = document.getElementById(
      "mouse-click"
    ) as HTMLAudioElement | null;
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }

    const res = await rollDice(tripGameView.tripGameId);
    console.log(res);
    const steps = res?.dataBody?.diceValue ?? Math.floor(Math.random() * 6) + 1;
    // 4초 후에 이동 시작
    setTimeout(() => {
      boardRef.current?.animateMove(steps);
    }, 4000);
  };

  return (
    <div className={styles.detailWrapper}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.title}>
          {tripGameView.representativeRegionName} 여행
        </div>
        <div className={styles.tripDate}>{dateRange}</div>
      </div>

      {/* Content two columns */}
      <div className={styles.content}>
        {/* Board */}
        <div className={styles.boardContainer}>
          <GameBoard
            ref={boardRef}
            count={5}
            tiles={tripGameTileViews}
            onDiceChange={setDiceValue}
            onCellClick={(tile) => {
              setActiveStep(tile.stepNo);
              setModalTile(tile);
              handleModProfile();
            }}
          />
        </div>

        {modalTile && (
          <TileInfoModal
            tile={modalTile}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />
        )}

        {/* CTA Buttons */}
        <div className={styles.buttonRow}>
          <div className={styles.boardText}>
            {diceValue !== null
              ? `주사위 결과: ${diceValue}`
              : "주사위를 굴려주세요"}
          </div>
          <audio
            id="mouse-click"
            src="/sounds/mouse-click.mp3"
            preload="auto"
          />
          <button className={styles.moveButton} onClick={handleRollDice}>
            이동
          </button>
          {/* <button className={styles.actionBtn}>미션을 인증해주세요!</button>
          <button className={styles.actionBtnSecondary}>주사위 던지기</button> */}
        </div>

        {/* Timeline */}
        <div className={styles.timelineBox}>
          <div className={styles.timelineTitle}>게임 방법</div>
          <ul className={styles.timelineList}>
            <li className={styles.timelineItem}>
              <div className={styles.timelineDot} />
              <div className={styles.timelineText}>
                {`step1 "게임 시작하기" 버튼을 눌러 트립마블 시작`}
              </div>
            </li>
            <li className={styles.timelineItem}>
              <div className={styles.timelineDot} />
              <div className={styles.timelineText}>
                step2 주사위를 던져 나온 수만큼 말 이동
              </div>
            </li>
            <li className={styles.timelineItem}>
              <div className={styles.timelineDot} />
              <div className={styles.timelineText}>
                step3 해당 칸에서 미션 확인 후 미션 인증
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GamePlay;
