"use client";
import { useState, useMemo, useCallback } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/entities/users/model";
import {
  resetGameForm,
  updateGameField,
} from "@/features/game/create-game/model/createGameSlice";
import styles from "./CreateGameModal.module.scss";
import Modal from "@/shared/ui/common/Modal";
import { useCreateTripGame } from "@/entities/games/hooks/useGames";

const steps = [
  { key: "title", label: "게임 제목", placeholder: "예: 여름 제주도 여행" },
  {
    key: "difficulty",
    label: "난이도",
    options: ["EASY", "NORMAL", "HARD"],
  },
  { key: "startedAt", label: "여행 시작일", type: "date" },
  { key: "endedAt", label: "여행 종료일", type: "date" },
  {
    key: "representativeRegionId",
    label: "대표 지역",
    placeholder: "대표 지역 ID를 입력하세요",
    type: "number",
  },
  {
    key: "tripThemeIds",
    label: "여행 테마",
    placeholder: "테마 ID를 ,로 구분하여 입력하세요",
  },
];
interface CreateGameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateGameModal({
  isOpen,
  onClose,
}: CreateGameModalProps) {
  const dispatch = useAppDispatch();
  const form = useAppSelector((state) => state.createGame);
  const [step, setStep] = useState(0);
  const [hasError, setHasError] = useState(false);

  const { mutate } = useCreateTripGame();

  const current = useMemo(() => steps[step], [step]);
  const value = useMemo(
    () => form[current.key as keyof typeof form],
    [form, current.key]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      let parsedValue: string | number | number[] = e.target.value;
      if (current.key === "representativeRegionId") {
        parsedValue = parseInt(e.target.value, 10) || 0;
      } else if (current.key === "tripThemeIds") {
        parsedValue = e.target.value
          .split(",")
          .map((id) => parseInt(id.trim(), 10));
      }
      dispatch(
        updateGameField({ key: current.key as any, value: parsedValue })
      );
    },
    [dispatch, current.key]
  );

  const validateInput = () => {
    // Add validation logic for each step if needed
    return true;
  };

  const nextStep = () => {
    if (!validateInput()) {
      setHasError(true);
      return;
    }
    setHasError(false);
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      mutate(form, {
        onSuccess: () => {
          toast.success("게임이 생성되었습니다!");
          dispatch(resetGameForm());
        },
        onError: (error) => {
          console.error("게임 생성 실패:", error);
          toast.error("게임 생성에 실패했습니다.");
        },
      });
    }
  };

  const renderInput = () => {
    if (current.key === "difficulty") {
      return (
        <select
          className={styles.input}
          value={value as string}
          onChange={handleChange}
        >
          {(current.options as string[]).map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        className={styles.input}
        type={current.type || "text"}
        placeholder={current.placeholder}
        value={Array.isArray(value) ? value.join(", ") : (value as string)}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") nextStep();
        }}
      />
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.container}>
        <div className={styles.progress}>
          <div className={styles.barWrapper}>
            <div
              className={styles.bar}
              style={{ width: `${((step + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        <div className={styles.titleDiv}>
          <div className={styles.info}>{current.label} 입력하기</div>
          {step + 1} / {steps.length}
        </div>

        <div className={styles.contentContainer}>
          <label className={styles.label}>{current.label}</label>
          {renderInput()}
          {hasError && (
            <div style={{ color: "red", fontSize: "0.85rem" }}>
              올바른 {current.label}을 입력해주세요.
            </div>
          )}
          <div className={styles.ButtonDiv}>
            {step > 0 && (
              <button
                className={styles.beforeButton}
                onClick={() => setStep(step - 1)}
                type="button"
              >
                {"뒤로"}
              </button>
            )}
            <button
              className={styles.nextButton}
              onClick={nextStep}
              style={step === 0 ? { width: "100%" } : undefined}
              type="button"
            >
              {step !== steps.length - 1 ? "계속하기" : "게임 생성하기"}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
