"use client";

import React, { useMemo, useState } from "react";
import GameBoard from "@/entities/games/ui/game-board/GameBoard";
import styles from "./GamePlay.module.scss";
import {
  TripGameTileView,
  TripGameView,
} from "@/entities/games/model/gameInfoDummy";
import TileInfoModal from "@/entities/games/ui/tile-info-modal/TileInfoModal";

type Props = {
  tripGameView: TripGameView;
  tripGameTileViews: TripGameTileView[];
};

const formatDate = (d?: string) => {
  if (!d) return "";
  try {
    const date = new Date(d);
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${y}.${m}.${day}`;
  } catch {
    return d;
  }
};

const GamePlay = ({ tripGameView, tripGameTileViews }: Props) => {
  const dateRange = useMemo(
    () =>
      `${formatDate(tripGameView.startedAt)} - ${formatDate(
        tripGameView.endedAt
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

  const handleModProfile = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalTile(null);
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
            count={5}
            tiles={tripGameTileViews}
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
          <button className={styles.actionBtn}>미션을 인증해주세요!</button>
          <button className={styles.actionBtnSecondary}>주사위 던지기</button>
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
