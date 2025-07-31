"use client";

import styles from "./GameDetail.module.scss";

type TimelineItem = {
  index: number;
  title: string;
  date?: string;
  mission?: string;
  reviewImageUrl?: string;
  reviewContent?: string;
  isSelected?: boolean;
};

type Props = {
  gameId: string;
  boardImageUrl?: string;
  timeline: TimelineItem[];
  selectedBlock?: TimelineItem;
  onBlockSelect?: (item: TimelineItem) => void;
};

import React, { useState } from "react";

const GameDetail = ({
  gameId,
  boardImageUrl = "/images/board-example.png", // 더미 이미지
  timeline,
  selectedBlock,
  onBlockSelect,
}: Props) => {
  const [activeTab, setActiveTab] = useState<"timeline" | "detail">("timeline");

  return (
    <div className={styles.detailWrapper}>
      <div className={styles.header}>종료된 게임</div>
      {/* 보드판 이미지 */}
      <div className={styles.boardContainer}>
        <img
          src={boardImageUrl}
          alt="게임 보드"
          className={styles.boardImage}
        />
        {/* TODO: 보드판 위 블록 선택, 진행표시 등 SVG로 오버레이 구현 가능 */}
      </div>
      {/* 탭 바 */}
      <div className={styles.tabBar}>
        <button
          className={`${styles.tab} ${
            activeTab === "timeline" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("timeline")}
          type="button"
        >
          타임라인
        </button>
        <button
          className={`${styles.tab} ${
            activeTab === "detail" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("detail")}
          type="button"
        >
          상세 정보
        </button>
      </div>
      {/* 탭 컨텐츠 */}
      <div className={styles.tabContent}>
        {activeTab === "timeline" && (
          <div className={styles.timelineTabContent}>
            <div className={styles.timelineBox}>
              <div className={styles.timelineTitle}>타임라인</div>
              <ul className={styles.timelineList}>
                {timeline.map((item) => (
                  <li
                    key={item.index}
                    className={`${styles.timelineItem} ${
                      item.isSelected ? styles.active : ""
                    }`}
                    onClick={() => onBlockSelect && onBlockSelect(item)}
                  >
                    <span className={styles.timelineDot} />
                    <span className={styles.timelineText}>{item.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {activeTab === "detail" && (
          <div className={styles.detailTabContent}>
            <div className={styles.blockDetailWrapper}>
              {selectedBlock ? (
                <div className={styles.blockDetail}>
                  <div className={styles.blockHeader}>
                    <div className={styles.blockTitle}>
                      {selectedBlock.title}{" "}
                      <span className={styles.blockBadge}>미션 인증여부</span>
                    </div>
                    <div className={styles.blockDate}>{selectedBlock.date}</div>
                  </div>
                  <div className={styles.blockMission}>
                    {selectedBlock.mission}
                  </div>
                  <div className={styles.reviewSection}>
                    <div className={styles.reviewImage}>
                      {selectedBlock.reviewImageUrl ? (
                        <img
                          src={selectedBlock.reviewImageUrl}
                          alt="리뷰 이미지"
                        />
                      ) : (
                        <div className={styles.noImage}>리뷰 이미지</div>
                      )}
                    </div>
                    <div className={styles.reviewContent}>
                      {selectedBlock.reviewContent || (
                        <span className={styles.placeholder}>리뷰 내용 글</span>
                      )}
                    </div>
                  </div>
                  <div className={styles.buttonRow}>
                    <button className={styles.actionBtn}>다시 떠나기</button>
                    <button className={styles.actionBtnSecondary}>
                      공유하기
                    </button>
                  </div>
                </div>
              ) : (
                <div className={styles.blockDetailEmpty}>
                  타임라인에서 미션을 선택해 상세 내용을 확인해보세요.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameDetail;
