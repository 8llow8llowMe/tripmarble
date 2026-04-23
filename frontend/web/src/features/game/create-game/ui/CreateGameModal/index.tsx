"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "@/entities/users/model";
import { toast } from "react-toastify";
import {
  GameFormState,
  resetGameForm,
  updateGameField,
} from "@/features/game/create-game/model/createGameSlice";
import styles from "./CreateGameModal.module.scss";
import Modal from "@/shared/ui/common/Modal";
import Button from "@/shared/ui/common/Button/Button";

// Step 컴포넌트 import
import TitleStep from "./steps/TitleStep/TitleStep";
import DifficultyStep from "./steps/DifficultyStep/DifficultyStep";
import DateStep from "./steps/DateStep/DateStep";
import RegionStep from "./steps/ResionStep/RegionStep";
import ThemeStep from "./steps/ThemeStep/ThemeStep";
import useCreateTripGame from "@/entities/games/hooks/useCreateTripGame";
import { useRouter } from "next/navigation";
import { fetchGameStart } from "@/entities/games/hooks/useGameStart";

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
  const router = useRouter();
  const dispatch = useAppDispatch();
  const form = useAppSelector((state) => state.createGame);
  const [step, setStep] = useState(0);
  const [hasError, setHasError] = useState(false);
  const { createGame } = useCreateTripGame();
  const queryClient = useQueryClient();

  const containerRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScroll = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Effect to scroll to the current step
  useEffect(() => {
    if (containerRef.current) {
      const targetTop = containerRef.current.clientHeight * step;
      if (containerRef.current.scrollTop !== targetTop) {
        isProgrammaticScroll.current = true;
        containerRef.current.scrollTo({
          top: targetTop,
          behavior: "smooth",
        });

        // Reset the flag after the scroll animation is likely to have finished
        const scrollFinishTimer = setTimeout(() => {
          isProgrammaticScroll.current = false;
        }, 1000); // Corresponds to scroll-behavior animation time

        return () => clearTimeout(scrollFinishTimer);
      }
    }
  }, [step]);

  // nextStep and prevStep just update the step state
  const nextStep = useCallback(() => {
    setHasError(false);
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      createGame(form, {
        onSuccess: async (res: any) => {
          try {
            // 다양한 응답 포맷을 안전하게 처리
            const gameId = res?.data?.dataBody?.tripGameId ?? null;
            toast.success("게임이 생성되었습니다!");
            queryClient.invalidateQueries({ queryKey: ["myGameListInfinite"] });
            dispatch(resetGameForm());
            onClose();

            if (gameId != null) {
              await fetchGameStart(gameId);
              router.push(`/game/${gameId}`);
            } else {
              // 혹시 id를 못 찾으면 목록으로 폴백
              router.push("/game");
            }
          } finally {
            setStep(0);
          }
        },
        onError: () => toast.error("게임 생성에 실패했습니다."),
      });
    }
  }, [step, createGame, form, queryClient, dispatch, onClose, router]);

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  // onScroll handler to update step from manual scrolling
  const onScroll = () => {
    if (isProgrammaticScroll.current) {
      return;
    }

    if (containerRef.current) {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      scrollTimeout.current = setTimeout(() => {
        const { scrollTop, clientHeight } = containerRef.current!;
        if (clientHeight > 0) {
          const currentStep = Math.round(scrollTop / clientHeight);
          if (currentStep !== step) {
            setStep(currentStep);
          }
        }
      }, 150);
    }
  };

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

  const handleClose = useCallback(() => {
    dispatch(resetGameForm());
    setStep(0);
    onClose();
  }, [dispatch, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        const ae = document.activeElement as HTMLElement | null;
        const isTyping =
          ae &&
          (ae.tagName === "INPUT" ||
            ae.tagName === "TEXTAREA" ||
            (ae as HTMLElement).isContentEditable);

        if (!isTyping) {
          e.preventDefault();
          nextStep(); // 전역은 “입력 중이 아닐 때”에만 동작
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, nextStep]);

  const canNext = !hasError;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="게임 만들기"
      size="lg"
      panelClassName={styles.modalPanel}
      bodyClassName={styles.modalBody}
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.progress}>
            <div className={styles.barWrapper}>
              <div
                className={styles.bar}
                style={{ width: `${((step + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>
          <div className={styles.titleDiv}>
            <div className={styles.info}>
              <span className={styles.stepBadge}>{step + 1}</span>
              {steps[step].label} 선택
            </div>
            <div className={styles.counter}>
              {step + 1} / {steps.length}
            </div>
          </div>
        </div>

        <div
          className={styles.contentContainer}
          ref={containerRef}
          onScroll={onScroll}
        >
          {steps.map((stepItem) => {
            const StepComp = stepItem.Component;
            const stepValue =
              stepItem.key === "tripPeriod"
                ? [form.startedAt, form.endedAt]
                : (form[
                    stepItem.key as keyof typeof form
                  ] as StepValueTypeMap[typeof stepItem.key]);

            return (
              <div key={stepItem.key} className={styles.stepComponent}>
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
        </div>

        <div className={styles.footer}>
          {step > 0 && (
            <Button
              className={styles.secondary}
              onClick={prevStep}
              type="button"
              variant="secondary"
              size="md"
            >
              뒤로
            </Button>
          )}
          <Button
            className={styles.primary}
            onClick={nextStep}
            disabled={!canNext}
            type="button"
            variant="primary"
            size="md"
          >
            {step !== steps.length - 1 ? "계속하기" : "게임 생성하기"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
