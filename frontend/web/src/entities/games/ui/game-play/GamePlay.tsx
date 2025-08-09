"use client";

import React, { useMemo, useState } from "react";
import GameBoard from "@/entities/games/ui/game-board/GameBoard";
import styles from "./GamePlay.module.scss";
import { GameInfoDataBody } from "@/entities/games/model/gameInfoDummy";
import { ApiResponse } from "@/shared/types";

type Props = {
  gameData: ApiResponse<GameInfoDataBody>;
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

const GamePlay = ({ gameData }: Props) => {
  const { tripGameView, tripGameTileViews } = gameData.dataBody;

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

  const [modalTile, setModalTile] = useState<typeof tripGameTileViews[number] | null>(null);

  return (
    <div className={styles.detailWrapper}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.title}>
          {tripGameView.representativeRegionName} 여행
        </div>
        <div className={styles.tripDate}>{dateRange}</div>
      </div>

      <div
        style={{
          marginBottom: 6,
          width: "100%",
          color: "#666",
          fontSize: "0.95rem",
        }}
      >
        현재 위치 :{" "}
        <span role="img" aria-label="pin">
          📍
        </span>{" "}
        {tripGameView.representativeRegionName}
      </div>

      {/* Content two columns */}
      <div className={styles.content}>
        {/* LEFT: Board + Timeline */}
        <div className={styles.leftPanel}>
          {/* Board */}
          <div className={styles.boardContainer}>
            <GameBoard
              count={5}
              tiles={tripGameTileViews}
              onCellClick={(tile) => {
                setActiveStep(tile.stepNo);
                setModalTile(tile);
              }}
            />
          </div>

          {modalTile && (
            <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.35)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:50}} onClick={()=>setModalTile(null)}>
              <div style={{background:'#fff', borderRadius:12, padding:'18px 20px', width:'min(520px, 92vw)'}} onClick={(e)=>e.stopPropagation()}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
                  <strong style={{fontSize:'1.15rem'}}>{modalTile.tripSpotName}</strong>
                  <button onClick={()=>setModalTile(null)} style={{border:'none', background:'transparent', fontSize:'1.2rem', cursor:'pointer'}}>✕</button>
                </div>
                <div style={{color:'#5d6b7b', marginBottom:8}}>
                  단계: step{modalTile.stepNo} · {modalTile.tileTypeDescription}
                </div>
                <div style={{fontSize:'0.95rem'}}>tripSpotId: {modalTile.tripSpotId}</div>
              </div>
            </div>
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

          {/* Active block details */}
          <div className={styles.blockDetail} style={{ marginTop: 18 }}>
            <div className={styles.blockHeader}>
              <div className={styles.blockTitle}>
                {activeTile.tripSpotName}
                <span className={styles.blockBadge}>
                  {activeTile.tileTypeDescription}
                </span>
              </div>
              <div className={styles.blockDate}>{dateRange}</div>
            </div>

            <div className={styles.blockMission}>
              미션: 해당 장소에서 사진 찍기 (예시)
            </div>

            <div className={styles.reviewSection}>
              <div className={styles.reviewImage}>
                <div className="noImage">이미지</div>
              </div>
              <div className={styles.reviewContent}>
                <span className={styles.placeholder}>
                  여기에 플레이 기록/메모가 표시됩니다.
                </span>
              </div>
            </div>

            <div className={styles.buttonRow}>
              <button className={styles.actionBtnSecondary}>미션 보기</button>
              <button className={styles.actionBtn}>미션 인증</button>
            </div>
          </div>
        </div>

        {/* RIGHT: Detail of active tile */}
        {/* <div className={styles.rightPanel}>
          <div className={styles.tabBar}>
            <button className={`${styles.tab} ${styles.activeTab}`}>
              타임라인
            </button>
            <button className={styles.tab}>상세</button>
          </div>

          <div className={styles.timelineTabContent}>
            <ul className={styles.timelineList}>
              {tripGameTileViews.map((tile) => (
                <li
                  key={tile.tripGameTileId}
                  className={`${styles.timelineItem} ${
                    activeStep === tile.stepNo ? "active" : ""
                  }`}
                  onClick={() => setActiveStep(tile.stepNo)}
                >
                  <div className={styles.timelineDot} />
                  <div className={styles.timelineText}>
                    <strong style={{ marginRight: 6 }}>
                      step{tile.stepNo}
                    </strong>
                    <span style={{ color: "#5d6b7b" }}>
                      {tile.tileTypeDescription}
                    </span>
                    <span style={{ margin: "0 8px", color: "#c4ccd6" }}>·</span>
                    {tile.tripSpotName}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default GamePlay;
