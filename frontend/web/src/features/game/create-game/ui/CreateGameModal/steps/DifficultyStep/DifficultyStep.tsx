import React, { useMemo, useState, useEffect } from "react";
import styles from "./DifficultyStep.module.scss";

interface DifficultyStepProps {
  value: string;
  onChange: (value: string) => void;
}

const META: Record<
  string,
  {
    board: string;
    dice: string;
    turns: string;
    hours: string;
    period: string;
    note?: string;
  }
> = {
  EASY: {
    board: "4×4",
    dice: "1개",
    turns: "6턴",
    hours: "3시간",
    period: "반나절",
    note: "가볍게 즐기기 좋아요",
  },
  NORMAL: {
    board: "5×5",
    dice: "1개",
    turns: "8턴",
    hours: "6시간",
    period: "당일치기 ~ 1박2일",
    note: "대부분의 일정에 추천",
  },
  HARD: {
    board: "6×6",
    dice: "2개",
    turns: "10턴",
    hours: "8+시간",
    period: "1박2일 ~ 2박3일",
    note: "여행을 깊이 있게 즐길 수 있어요",
  },
};

const levels = [
  { code: "EASY", description: "쉬움" },
  { code: "NORMAL", description: "보통" },
  { code: "HARD", description: "어려움" },
];

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className={styles.row}>
      <span className={styles.rowKey}>{k}</span>
      <span className={styles.rowSep}>:</span>
      <span className={styles.rowVal}>{v}</span>
    </div>
  );
}

export default function DifficultyStep({
  value,
  onChange,
}: DifficultyStepProps) {
  const [activeCode, setActiveCode] = useState(value || "NORMAL");

  useEffect(() => {
    if (value) {
      setActiveCode(value);
    }
  }, [value]);

  const meta = useMemo(() => META[activeCode] ?? META.NORMAL, [activeCode]);

  return (
    <div className={styles.difficultyContainer}>
      <div className={styles.title}>여행 난이도 선택</div>
      <div className={styles.subtitle}>일정에 알맞는 난이도를 선택하세요!</div>

      <div className={styles.segmentWrap}>
        {levels.map((lvl) => (
          <button
            key={lvl.code}
            type="button"
            onClick={() => onChange(lvl.code)}
            onMouseEnter={() => setActiveCode(lvl.code)}
            className={`${styles.segmentItem} ${
              activeCode === lvl.code ? styles.segmentItemActive : ""
            } ${value === lvl.code ? styles.selected : ""}`}
          >
            {lvl.description}
            {lvl.code === "NORMAL" && (
              <span className={styles.recoBadge}>추천</span>
            )}
          </button>
        ))}
      </div>

      <div className={styles.detailCard}>
        <Row k="게임판 크기" v={meta.board} />
        <Row k="주사위 개수" v={meta.dice} />
        <Row k="평균 소요 턴 수" v={meta.turns} />
        <Row k="평균 소요 시간" v={meta.hours} />
        <Row k="권장 여행 기간" v={meta.period} />
        {meta.note && <div className={styles.note}>※ {meta.note}</div>}
      </div>
    </div>
  );
}
