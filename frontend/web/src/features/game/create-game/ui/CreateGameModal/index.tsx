"use client";
import { useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/entities/users/model";
import { toast } from "react-toastify";
import {
  GameFormState,
  resetGameForm,
  updateGameField,
} from "@/features/game/create-game/model/createGameSlice";
import styles from "./CreateGameModal.module.scss";
import Modal from "@/shared/ui/common/Modal";
import { useCreateTripGame } from "@/entities/games/hooks/useGames";

// Step 컴포넌트 import
import TitleStep from "./steps/TitleStep/TitleStep";
import DifficultyStep from "./steps/DifficultyStep/DifficultyStep";
import DateStep from "./steps/DateStep/DateStep";
import RegionStep from "./steps/ResionStep/RegionStep";
import ThemeStep from "./steps/ThemeStep/ThemeStep";

type StepKey =
  | "title"
  | "difficulty"
  | "tripPeriod"
  | "representativeRegionId"
  | "tripThemeIds";

type StepValueTypeMap = {
  title: string;
  difficulty: string;
  tripPeriod: [string, string];
  representativeRegionId: number;
  tripThemeIds: number[];
};
interface StepConfig<K extends StepKey = StepKey> {
  key: K;
  label: string;
  Component: React.ComponentType<any>;
}
interface CreateGameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// step config
const steps: StepConfig[] = [
  { key: "title", label: "게임 제목", Component: TitleStep },
  { key: "difficulty", label: "난이도", Component: DifficultyStep },
  { key: "tripPeriod", label: "여행 기간", Component: DateStep },
  { key: "representativeRegionId", label: "대표 지역", Component: RegionStep },
  { key: "tripThemeIds", label: "여행 테마", Component: ThemeStep },
];

export default function CreateGameModal({
  isOpen,
  onClose,
}: CreateGameModalProps) {
  const dispatch = useAppDispatch();
  const form = useAppSelector((state) => state.createGame);
  const [step, setStep] = useState(0);
  const [hasError, setHasError] = useState(false);
  const { mutate } = useCreateTripGame();

  const currentStep = steps[step];
  const StepComponent = currentStep.Component as React.ComponentType<any>;
  const value =
    currentStep.key === "tripPeriod"
      ? [form.startedAt, form.endedAt]
      : (form[
          currentStep.key as keyof typeof form
        ] as StepValueTypeMap[typeof currentStep.key]);

  // 다음 스텝 이동
  const nextStep = () => {
    setHasError(false);
    if (step < steps.length - 1) setStep(step + 1);
    else {
      mutate(form, {
        onSuccess: () => {
          toast.success("게임이 생성되었습니다!");
          dispatch(resetGameForm());
        },
        onError: () => toast.error("게임 생성에 실패했습니다."),
      });
    }
  };

  // 이전 스텝 이동
  const prevStep = () => setStep((s) => Math.max(0, s - 1));

  // step별 field 값 변경
  const handleChange = useCallback(
    (key: StepKey, value: StepValueTypeMap[typeof key]) => {
      if (key === "tripPeriod" && Array.isArray(value)) {
        dispatch(updateGameField({ key: "startedAt", value: value[0] }));
        dispatch(updateGameField({ key: "endedAt", value: value[1] }));
      } else {
        dispatch(updateGameField({ key: key as keyof GameFormState, value }));
      }
    },
    [dispatch]
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.container}>
        {/* 진행바/타이틀 */}
        <div className={styles.progress}>
          <div className={styles.barWrapper}>
            <div
              className={styles.bar}
              style={{ width: `${((step + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>
        <div className={styles.titleDiv}>
          <div className={styles.info}>{currentStep.label} 입력하기</div>
          {step + 1} / {steps.length}
        </div>
        <div className={styles.contentContainer}>
          {/* STEP별 컴포넌트 */}
          <StepComponent
            value={value}
            onChange={(value: any) =>
              handleChange(currentStep.key as any, value)
            }
            label={currentStep.label}
            form={form}
            step={step}
            setHasError={setHasError}
            nextStep={nextStep}
          />
          {hasError && (
            <div style={{ color: "red", fontSize: "0.85rem" }}>
              올바른 {currentStep.label}을 입력해주세요.
            </div>
          )}
          <div className={styles.ButtonDiv}>
            {step > 0 && (
              <button
                className={styles.beforeButton}
                onClick={prevStep}
                type="button"
              >
                뒤로
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
