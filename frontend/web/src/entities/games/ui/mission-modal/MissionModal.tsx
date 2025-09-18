"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import Image from "next/image";
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
    files?: File[];
  }) => Promise<void> | void;
  onSkip: () => Promise<void> | void;
  onFail: () => Promise<void> | void;
  submitting?: boolean;
  skipping?: boolean;
  failing?: boolean;
  onRequestEndGame?: () => void;
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
  const MAX_FILES = 5;
  const [tab, setTab] = useState<"info" | "mission">(
    allowMission ? "mission" : "info"
  );
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const missionRef = useRef<HTMLDivElement | null>(null);
  const [fixedHeight, setFixedHeight] = useState<number | undefined>(undefined);

  // 모달이 닫힐 때 입력값 초기화
  useEffect(() => {
    if (!isOpen) {
      setRating(0);
      setContent("");
      setFiles([]);
    }
  }, [isOpen]);

  const onAddFiles = (list: FileList | null) => {
    if (!list) return;
    const incoming = Array.from(list);
    if (incoming.length === 0) return;
    setFiles((prev) => {
      const room = MAX_FILES - prev.length;
      const next = room > 0 ? prev.concat(incoming.slice(0, room)) : prev;
      return next;
    });
  };

  const removeAt = (idx: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const canSubmit = useMemo(
    () => allowMission && rating > 0 && content.trim().length >= 20,
    [allowMission, rating, content]
  );

  // 미션 탭 콘텐츠 높이를 측정하여 본문 최소 높이로 고정
  useEffect(() => {
    if (!isOpen) return;
    const measure = () => {
      const h = missionRef.current?.scrollHeight ?? 0;
      if (h > 0) setFixedHeight(h);
    };
    // 첫 렌더 이후 한 프레임 뒤 측정 (레이아웃 안정화)
    const id = requestAnimationFrame(measure);
    // 리사이즈 시에도 재측정
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", measure);
    };
  }, [isOpen, allowMission, tile]);

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

        <div
          className={styles.body}
          style={fixedHeight ? { minHeight: fixedHeight } : undefined}
          ref={bodyRef}
        >
          {/* 미션 탭 패널 (항상 렌더링, 비활성 시 화면 밖에서 측정) */}
          <div
            ref={missionRef}
            className={`${styles.tabPanel} ${
              tab === "mission" ? styles.tabVisible : styles.tabHidden
            }`}
          >
            <div>
              <div className={styles.row}>
                <div className={styles.label}>별점*</div>
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
                <div className={styles.label}>리뷰(최소 20자)*</div>
                <textarea
                  className={styles.textarea}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="여기에 방문 후기를 작성해주세요."
                />
              </div>
              <div className={styles.row}>
                <div className={styles.label}>사진 첨부 (최대 5장)</div>
                <div className={styles.uploadGrid}>
                  {files.map((f, i) => {
                    const url = URL.createObjectURL(f);
                    return (
                      <div key={i} className={styles.thumb}>
                        <Image
                          src={url}
                          alt={`uploaded-${i}`}
                          fill
                          sizes="96px"
                          style={{ objectFit: "cover" }}
                          unoptimized
                          onLoad={() => URL.revokeObjectURL(url)}
                        />
                        <button
                          type="button"
                          className={styles.removeBtn}
                          onClick={() => removeAt(i)}
                          aria-label="사진 삭제"
                        >
                          ×
                        </button>
                      </div>
                    );
                  })}
                  {files.length < MAX_FILES && (
                    <label className={styles.uploadTile} aria-label="사진 추가">
                      +
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        style={{ display: "none" }}
                        onChange={(e) => {
                          onAddFiles(e.target.files);
                          e.currentTarget.value = "";
                        }}
                      />
                    </label>
                  )}
                </div>
              </div>
              <div className={styles.footer}>
                <button
                  className={`${styles.primary} ${
                    !canSubmit || submitting ? styles.disabled : ""
                  }`}
                  disabled={!canSubmit || submitting}
                  onClick={async () => {
                    if (!canSubmit) return;
                    await onSubmitReview({ rating, content, files });
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
          </div>

          {/* 정보 탭 패널 */}
          <div
            className={`${styles.tabPanel} ${
              tab === "info" ? styles.tabVisible : styles.tabHidden
            }`}
          >
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
          </div>
        </div>
      </div>
    </Modal>
  );
}
