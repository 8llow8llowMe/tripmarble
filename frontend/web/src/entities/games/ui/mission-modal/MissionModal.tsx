"use client";

import React, { useMemo, useState, useEffect } from "react";
import Modal from "@/shared/ui/common/Modal";
import styles from "./MissionModal.module.scss";
import type { TripGameTileView } from "@/entities/games/model/gameInfoDummy";

type Props = {
  tile: TripGameTileView | null;
  isOpen: boolean;
  allowMission: boolean;
  onClose: () => void;
  onSubmitReview: (params: {
    rating: number;
    content: string;
  }) => Promise<void> | void;
  onSkip: () => Promise<void> | void;
  onFail: () => Promise<void> | void;
  submitting?: boolean;
  skipping?: boolean;
  failing?: boolean;
};

export default function MissionModal({
  tile,
  isOpen,
  onClose,
  allowMission,
  onSubmitReview,
  onSkip,
  onFail,
  submitting,
  skipping,
  failing,
}: Props) {
  const [tab, setTab] = useState<"info" | "mission">(
    allowMission ? "mission" : "info"
  );
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");

  // 모달이 닫힐 때 입력값 초기화
  useEffect(() => {
    if (!isOpen) {
      setRating(0);
      setContent("");
    }
  }, [isOpen]);

  const canSubmit = useMemo(
    () => allowMission && rating > 0 && content.trim().length >= 20,
    [allowMission, rating, content]
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.sheet}>
        <div className={styles.header}>
          <div className={styles.title}>
            {tile?.tripSpotName ?? "미션 상세"}
          </div>
          <div className={styles.tabs}>
            <button
              className={`${styles.tabBtn} ${
                tab === "info" ? styles.tabActive : ""
              }`}
              onClick={() => setTab("info")}
            >
              정보
            </button>
            <button
              className={`${styles.tabBtn} ${
                tab === "mission" ? styles.tabActive : ""
              }`}
              onClick={() => setTab("mission")}
              disabled={!allowMission}
            >
              미션 인증
            </button>
          </div>
        </div>

        <div className={styles.body}>
          {tab === "info" && (
            <div>
              <div className={styles.row}>
                <div className={styles.label}>미션 유형</div>
                <div>{tile?.missionTypeDescription ?? "-"}</div>
              </div>
              <div className={styles.row}>
                <div className={styles.label}>단계</div>
                <div>{tile?.stepNo ?? "-"}</div>
              </div>
            </div>
          )}

          {tab === "mission" && (
            <div>
              <div className={styles.row}>
                <div className={styles.label}>별점</div>
                <div className={styles.stars}>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <span
                      key={n}
                      className={`${styles.star} ${
                        n <= rating ? styles.starActive : ""
                      }`}
                      onClick={() => setRating(n)}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.label}>리뷰(최소 20자)</div>
                <textarea
                  className={styles.textarea}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="여기에 방문 후기를 작성해주세요..."
                />
              </div>
              <div className={styles.footer}>
                <button
                  className={`${styles.primary} ${
                    !canSubmit || submitting ? styles.disabled : ""
                  }`}
                  disabled={!canSubmit || submitting}
                  onClick={async () => {
                    if (!canSubmit) return;
                    await onSubmitReview({ rating, content });
                  }}
                >
                  {submitting ? "제출 중…" : "제출"}
                </button>
                <button
                  className={`${styles.secondary} ${
                    skipping ? styles.disabled : ""
                  }`}
                  disabled={!!skipping}
                  onClick={() => onSkip()}
                >
                  {skipping ? "건너뛰는 중…" : "건너뛰기"}
                </button>
                {/* <button className={`${styles.secondary} ${failing ? styles.disabled : ""}`} disabled={!!failing} onClick={() => onFail()}> {failing ? "실패 처리 중…" : "실패"} </button> */}
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
