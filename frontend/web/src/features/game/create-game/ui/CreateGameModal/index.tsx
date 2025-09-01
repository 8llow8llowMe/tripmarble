"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/entities/users/model";
import { toast } from "react-toastify";
import {
  GameFormState,
  resetGameForm,
  updateGameField,
} from "@/features/game/create-game/model/createGameSlice";
import styles from "./CreateGameModal.module.scss";
import Modal from "@/shared/ui/common/Modal";

// Step 컴포넌트 import
import TitleStep from "./steps/TitleStep/TitleStep";
import DifficultyStep from "./steps/DifficultyStep/DifficultyStep";
import DateStep from "./steps/DateStep/DateStep";
import RegionStep from "./steps/ResionStep/RegionStep";
import ThemeStep from "./steps/ThemeStep/ThemeStep";
import useCreateTripGame from "@/entities/games/hooks/useCreateTripGame";

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
  content: string;
  Component: React.ComponentType<any>;
}

interface CreateGameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const steps: StepConfig[] = [
  {
    key: "title",
    label: "게임 제목",
    content: "게임 제목을 입력해주세요.",
    Component: TitleStep,
  },
  {
    key: "representativeRegionId",
    label: "여행지",
    content: "방문 예정인 여행지가 있으신가요?",
    Component: RegionStep,
  },
  {
    key: "tripThemeIds",
    label: "여행 테마",
    content: "이번 여행의 테마는 무엇인가요?",
    Component: ThemeStep,
  },
  {
    key: "tripPeriod",
    label: "여행 기간",
    content: "어느 날짜로 계획 중 이신가요?",
    Component: DateStep,
  },
  {
    key: "difficulty",
    label: "난이도",
    content: "일정에 알맞는 난이도를 선택하세요!",
    Component: DifficultyStep,
  },
];

export default function CreateGameModal({
  isOpen,
  onClose,
}: CreateGameModalProps) {
  const dispatch = useAppDispatch();
  const form = useAppSelector((state) => state.createGame);
  const [step, setStep] = useState(0);
  const [hasError, setHasError] = useState(false);
  const { createGame } = useCreateTripGame();

  const [isScrollingByButton, setIsScrollingByButton] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 다음 스텝 이동 (버튼 클릭)
  const nextStep = () => {
    setHasError(false);
    if (step < steps.length - 1) {
      const next = step + 1;
      setStep(next);

      if (containerRef.current && stepRefs.current[next]) {
        setIsScrollingByButton(true);
        const targetTop = stepRefs.current[next]!.offsetTop - 90;
        containerRef.current.scrollTo({
          top: targetTop,
          behavior: "smooth",
        });

        setTimeout(() => {
          setIsScrollingByButton(false);
        }, 500);
      }
    } else {
      createGame(form, {
        onSuccess: () => {
          toast.success("게임이 생성되었습니다!");
          dispatch(resetGameForm());
          onClose();
        },
        onError: () => toast.error("게임 생성에 실패했습니다."),
      });
    }
  };

  // 이전 스텝 이동 (버튼 클릭)
  const prevStep = () => {
    const prev = Math.max(0, step - 1);
    setStep(prev);

    if (containerRef.current && stepRefs.current[prev]) {
      setIsScrollingByButton(true);
      const targetTop = stepRefs.current[prev]!.offsetTop - 90;
      containerRef.current.scrollTo({
        top: targetTop,
        behavior: "smooth",
      });
      setTimeout(() => {
        setIsScrollingByButton(false);
      }, 500);
    }
  };

  // 입력값 변경 처리
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

  // 모달 닫기 시 초기화
  const handleClose = () => {
    dispatch(resetGameForm());
    setStep(0);
    onClose();
  };

  // 스텝 변경에 따른 부드러운 스크롤 이동
  useEffect(() => {
    if (stepRefs.current[step] && containerRef.current) {
      const targetTop = stepRefs.current[step]!.offsetTop - 90;
      containerRef.current.scrollTo({
        top: targetTop,
        behavior: "smooth",
      });
    }
  }, [step]);

  // 스크롤 시 현재 위치 기반으로 스텝 자동 업데이트
  const onScroll = useCallback(() => {
    if (!containerRef.current || isScrollingByButton) return; // 버튼 스크롤 중엔 무시

    const scrollTop = containerRef.current.scrollTop;

    let closestStep = 0;
    let minDistance = Infinity;

    for (let i = 0; i < stepRefs.current.length; i++) {
      const el = stepRefs.current[i];
      if (el) {
        const offsetTop = el.offsetTop - 90;
        const distance = Math.abs(scrollTop - offsetTop);
        if (distance < minDistance) {
          minDistance = distance;
          closestStep = i;
        }
      }
    }

    if (closestStep !== step) {
      setStep(closestStep);
      setHasError(false);
    }
  }, [step, isScrollingByButton]);

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className={styles.container}>
        {/* 진행 바 */}
        <div className={styles.progress}>
          <div className={styles.barWrapper}>
            <div
              className={styles.bar}
              style={{ width: `${((step + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* 제목 및 스텝 인디케이터 */}
        <div className={styles.titleDiv}>
          <div className={styles.info}>{steps[step].label} 선택</div>
          {step + 1} / {steps.length}
        </div>

        {/* 스텝 컨텐츠 스크롤 컨테이너 */}
        <div
          className={styles.contentContainer}
          ref={containerRef}
          onScroll={onScroll}
        >
          {steps.map((stepItem, index) => {
            const StepComp = stepItem.Component;
            const stepValue =
              stepItem.key === "tripPeriod"
                ? [form.startedAt, form.endedAt]
                : (form[
                    stepItem.key as keyof typeof form
                  ] as StepValueTypeMap[typeof stepItem.key]);

            return (
              <div
                key={stepItem.key}
                ref={(el) => {
                  stepRefs.current[index] = el;
                }}
                className={styles.stepComponent}
              >
                <StepComp
                  value={stepValue}
                  onChange={(value: any) => handleChange(stepItem.key, value)}
                  label={stepItem.label}
                  form={form}
                  step={step}
                  setHasError={setHasError}
                  nextStep={nextStep}
                />
              </div>
            );
          })}
          {hasError && (
            <div style={{ color: "red", fontSize: "0.85rem" }}>
              올바른 {steps[step].label}을 입력해주세요.
            </div>
          )}
        </div>

        {/* 버튼 영역 */}
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
    </Modal>
  );
}
