"use client";

import React, { useMemo, useState, useRef, useEffect } from "react";
import GameBoard, {
  GameBoardHandle,
} from "@/entities/games/ui/game-board/GameBoard";
import styles from "./GamePlay.module.scss";
import {
  TripGameTileView,
  TripGameView,
} from "@/entities/games/model/gameInfoDummy";
import MissionModal from "@/entities/games/ui/mission-modal/MissionModal";
import useGameDiceMutation from "@/entities/games/hooks/useGameDice";
import formatDate from "@/shared/hooks/formatDate";
import useGetMoveLogs from "@/entities/games/hooks/useGetMoveLogs";
import useReviewMission from "@/entities/games/hooks/useReviewMission";
import { uploadTripSpotReviewPhotos } from "@/entities/trips/hooks/useUploadTripSpotReviewPhotos";
import useMoveLogFail from "@/entities/games/hooks/useMoveLogFail";
import useMoveLogSkip from "@/entities/games/hooks/useMoveLogSkip";
import useGetGameDetail from "@/entities/games/hooks/useGetGameDetail";
import useGameEndMutation from "@/entities/games/hooks/useGameEnd";
import { useQueryClient } from "@tanstack/react-query";
import { DotThreeIcon } from "@/shared/assets/icons";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Button from "@/shared/ui/common/Button/Button";

type Props = {
  tripGameView: TripGameView;
  tripGameTileViews: TripGameTileView[];
  initialStepNo?: number;
};

const GamePlay = ({
  tripGameView,
  tripGameTileViews,
  initialStepNo = 0,
}: Props) => {
  const { mutateAsync: rollDice, isPending: isRolling } = useGameDiceMutation();
  const queryClient = useQueryClient();
  const { data: moveLogsRes, refetch: refetchMoveLogs } = useGetMoveLogs(
    tripGameView.tripGameId
  );
  const { data: gameDetailRes, refetch: refetchGameDetail } = useGetGameDetail(
    tripGameView.tripGameId
  );
  const { mutateAsync: endGame, isPending: isEnding } = useGameEndMutation();
  const { mutateAsync: submitReview, isPending: isSubmittingReview } =
    useReviewMission();
  const { mutateAsync: markFail, isPending: isMarkingFail } = useMoveLogFail();
  const { mutateAsync: markSkip, isPending: isMarkingSkip } = useMoveLogSkip();
  const router = useRouter();
  const dateRange = useMemo(
    () =>
      `${formatDate(new Date(tripGameView.startedAt))} - ${formatDate(
        new Date(tripGameView.endedAt)
      )}`,
    [tripGameView.startedAt, tripGameView.endedAt]
  );

  // 보드 크기를 난이도에 따라 유동 할당 (모바일과 동일 로직)
  const boardCount = useMemo(() => {
    const code = tripGameView.difficultyCode as
      | "EASY"
      | "NORMAL"
      | "HARD"
      | string;
    return code === "EASY"
      ? 4
      : code === "NORMAL"
      ? 5
      : code === "HARD"
      ? 6
      : 5;
  }, [tripGameView.difficultyCode]);

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

  const boardRef = useRef<GameBoardHandle | null>(null);
  const [activeSection, setActiveSection] = useState<"timeline" | "help">(
    "timeline"
  );
  const [canRollDice, setCanRollDice] = useState(true);
  const [pendingMoveLogId, setPendingMoveLogId] = useState<string | null>(null);
  const [expectedLandedTileId, setExpectedLandedTileId] = useState<
    string | null
  >(null);
  const [missionReadyTileId, setMissionReadyTileId] = useState<string | null>(
    null
  );
  const missionEnabled = Boolean(
    pendingMoveLogId && missionReadyTileId === expectedLandedTileId
  );

  // 정렬된 이동 로그 (시간순)
  const sortedLogs = useMemo(() => {
    const rows = moveLogsRes?.data?.dataBody ?? [];

    try {
      return [...rows].sort(
        (a, b) =>
          new Date(a.arrivedAt).getTime() - new Date(b.arrivedAt).getTime()
      );
    } catch {
      return rows;
    }
  }, [moveLogsRes?.data?.dataBody]);

  const isDetailEnded = useMemo(() => {
    try {
      return Boolean(gameDetailRes?.data?.dataBody?.endTypeCode);
    } catch {
      return false;
    }
  }, [gameDetailRes]);
  const isGameEnd = useMemo(() => {
    const byLogs =
      sortedLogs[sortedLogs.length - 1]?.missionResultCode === "GAME_END";
    return byLogs || isDetailEnded;
  }, [sortedLogs, isDetailEnded]);

  const formatKST = (iso: string) => {
    try {
      const d = new Date(iso);
      if (isNaN(d.getTime())) return iso;
      const pad = (n: number) => String(n).padStart(2, "0");
      const yyyy = d.getFullYear();
      const mm = pad(d.getMonth() + 1);
      const dd = pad(d.getDate());
      const hh = pad(d.getHours());
      const min = pad(d.getMinutes());
      return `${yyyy}.${mm}.${dd} ${hh}:${min}`;
    } catch {
      return iso;
    }
  };

  // Initialize pending mission state from move logs (if any)
  useEffect(() => {
    const logs = sortedLogs;
    const last = logs[logs.length - 1];
    if (last?.missionResultCode === "PENDING") {
      setPendingMoveLogId(last.tripGameMoveLogId);
      setExpectedLandedTileId(last.tripGameTileId);
      setMissionReadyTileId(last.tripGameTileId);
      setCanRollDice(false);
    } else if (last?.missionResultCode === "GAME_END") {
      setPendingMoveLogId(null);
      setExpectedLandedTileId(null);
      setMissionReadyTileId(null);
      setCanRollDice(false);
    } else {
      setPendingMoveLogId(null);
      setExpectedLandedTileId(null);
      setMissionReadyTileId(null);
      setCanRollDice(true);
    }
  }, [sortedLogs]);

  const handleModProfile = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalTile(null);
  };

  // Options menu (three-dot) state
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const menuBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      if (menuRef.current?.contains(target)) return;
      if (menuBtnRef.current?.contains(target)) return;
      setMenuOpen(false);
    };
    if (menuOpen) document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [menuOpen]);

  const confirmEndGame = async () => {
    setMenuOpen(false);
    const ok = window.confirm("게임을 종료할까요? 종료하면 되돌릴 수 없어요.");
    if (!ok) return;
    try {
      await endGame(tripGameView.tripGameId);
      toast.success("게임이 종료되었습니다.");
      try {
        await Promise.all([refetchMoveLogs(), refetchGameDetail()]);
      } catch (_) {}
      router.push("/game/list");
    } catch (e) {
      toast.error("게임 종료 중 오류가 발생했어요. 잠시 후 다시 시도해주세요.");
    }
  };

  const handleRollDice = async () => {
    // 최종 확인: 서버의 최신 로그 기준으로 PENDING 유무 재확인
    const refreshed = await refetchMoveLogs();
    const latestLogs =
      refreshed.data?.data?.dataBody ?? moveLogsRes?.data?.dataBody ?? [];
    const last = latestLogs[latestLogs.length - 1];
    if (last?.missionResultCode === "PENDING") {
      setPendingMoveLogId(last.tripGameMoveLogId);
      setExpectedLandedTileId(last.tripGameTileId);
      setMissionReadyTileId(last.tripGameTileId);
      setCanRollDice(false);
      return;
    }
    if (!canRollDice) return;
    const audio = document.getElementById(
      "mouse-click"
    ) as HTMLAudioElement | null;
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }

    const res = await rollDice(tripGameView.tripGameId);
    const dice = res?.dataBody?.diceValue ?? Math.floor(Math.random() * 6) + 1;
    const landedTileId = res?.dataBody?.landedTileId ?? null;
    const moveLogId = res?.dataBody?.tripGameMoveLogId ?? null;
    setExpectedLandedTileId(landedTileId);
    setPendingMoveLogId(moveLogId);
    // 도착 타일을 즉시 허용하여 모달/타일 클릭으로 바로 인증 가능
    setMissionReadyTileId(landedTileId);
    setCanRollDice(false);
    // 이동/미션 UI는 이동 완료 시(onMoveComplete) 리패치하여 동기화
    // 4초 후에 이동 시작
    // setTimeout(() => {
    boardRef.current?.animateMove(dice);
    // }, 4000);
  };

  const handleMissionReviewSubmit = async ({
    rating,
    content,
    files,
  }: {
    rating: number;
    content: string;
    files?: File[];
  }) => {
    if (!pendingMoveLogId || !missionReadyTileId) return;
    const tile = tripGameTileViews.find(
      (t) => t.tripGameTileId === missionReadyTileId
    );
    if (!tile) return;
    // 1) 사진이 있다면 임시 업로드하여 URL 획득
    let photoUrls: string[] | undefined = undefined;
    try {
      if (files && files.length > 0) {
        const res = await uploadTripSpotReviewPhotos(
          String(tile.tripSpotId),
          files
        );
        const temps = res?.data?.dataBody ?? [];
        photoUrls = temps
          .map((t) => t.tempPhotoUrl)
          .filter(Boolean) as string[];
      }
    } catch (e) {
      // 업로드 실패 시 사용자에게 알리고 리뷰 제출 중단
      toast.error("사진 업로드에 실패했어요. 잠시 후 다시 시도해주세요.");
      return;
    }

    // 2) 리뷰 제출 (사진 URL 포함)
    await submitReview({
      tripGameId: tripGameView.tripGameId,
      tripGameMoveLogId: pendingMoveLogId,
      tripSpotId: tile.tripSpotId,
      rating,
      content,
      photoUrls,
    });
    await Promise.all([
      queryClient.invalidateQueries({
        queryKey: ["getMoveLogs", tripGameView.tripGameId],
      }),
      queryClient.invalidateQueries({
        queryKey: ["getGameDetail", tripGameView.tripGameId],
      }),
    ]);
    await Promise.all([refetchMoveLogs(), refetchGameDetail()]);
    setPendingMoveLogId(null);
    setExpectedLandedTileId(null);
    setMissionReadyTileId(null);
    setCanRollDice(true);
    setIsModalOpen(false);
    handleCloseModal();
  };

  const handleMissionFail = async () => {
    if (!pendingMoveLogId) return;
    await markFail({
      tripGameId: tripGameView.tripGameId,
      tripGameMoveLogId: pendingMoveLogId,
    });
    await Promise.all([
      queryClient.invalidateQueries({
        queryKey: ["getMoveLogs", tripGameView.tripGameId],
      }),
      queryClient.invalidateQueries({
        queryKey: ["getGameDetail", tripGameView.tripGameId],
      }),
    ]);
    await Promise.all([refetchMoveLogs(), refetchGameDetail()]);
    setPendingMoveLogId(null);
    setExpectedLandedTileId(null);
    setMissionReadyTileId(null);
    setCanRollDice(true);
  };

  const handleMissionSkip = async () => {
    if (!pendingMoveLogId) return;
    await markSkip({
      tripGameId: tripGameView.tripGameId,
      tripGameMoveLogId: pendingMoveLogId,
    });
    await Promise.all([
      queryClient.invalidateQueries({
        queryKey: ["getMoveLogs", tripGameView.tripGameId],
      }),
      queryClient.invalidateQueries({
        queryKey: ["getGameDetail", tripGameView.tripGameId],
      }),
    ]);
    await Promise.all([refetchMoveLogs(), refetchGameDetail()]);
    setPendingMoveLogId(null);
    setExpectedLandedTileId(null);
    setMissionReadyTileId(null);
    setCanRollDice(true);
    setIsModalOpen(false);
  };

  return (
    <div className={`${styles.detailWrapper} appPage`}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.title}>
            {tripGameView.representativeRegionName} 여행
          </div>
          {!isGameEnd && (
            <div className={styles.headerActions}>
              <button
                ref={menuBtnRef}
                className={styles.moreBtn}
                aria-label="옵션 메뉴 열기"
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
              >
                <DotThreeIcon size={22} />
              </button>
              {menuOpen && (
                <div className={styles.menu} ref={menuRef} role="menu">
                  <button
                    className={styles.menuItem}
                    onClick={confirmEndGame}
                    disabled={isEnding}
                    role="menuitem"
                    type="button"
                  >
                    게임 종료하기
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className={styles.metaRow}>
        <div className={styles.tripDate}>{dateRange}</div>
        <div className={styles.badge}>{tripGameView.difficultyDescription}</div>
      </div>
      <div className={styles.themeRow}>
        {(tripGameView.tripThemeNames || []).join(" · ")}
      </div>
      {/* Content two columns */}
      <div className={styles.content}>
        {/* Board */}
        <div className={styles.boardContainer}>
          <GameBoard
            ref={boardRef}
            count={boardCount}
            tiles={tripGameTileViews}
            initialStepNo={isGameEnd ? 0 : initialStepNo}
            visitedMarks={sortedLogs.map((log, i) => ({
              tripGameTileId: log.tripGameTileId,
              order: i + 1,
              status: log.missionResultCode,
            }))}
            onCellClick={(tile) => {
              setActiveStep(tile.stepNo);
              setModalTile(tile);
              handleModProfile();
            }}
            onMoveComplete={async (tile) => {
              // Enable mission only when we actually land on the expected tile
              if (
                tile?.tripGameTileId &&
                tile.tripGameTileId === expectedLandedTileId
              ) {
                setMissionReadyTileId(tile.tripGameTileId);
              }
              // 도착 후에도 로그를 최신화하여 UI와 동기화
              try {
                await refetchMoveLogs();
              } catch (_) {}
            }}
          />
        </div>

        {modalTile && (
          <MissionModal
            tile={modalTile}
            isOpen={isModalOpen}
            allowMission={
              missionEnabled && modalTile.tripGameTileId === missionReadyTileId
            }
            submitting={isSubmittingReview}
            skipping={isMarkingSkip}
            failing={isMarkingFail}
            onClose={handleCloseModal}
            onSubmitReview={handleMissionReviewSubmit}
            onSkip={handleMissionSkip}
            onFail={handleMissionFail}
            onRequestEndGame={confirmEndGame}
          />
        )}

        <audio id="mouse-click" src="/sounds/mouse-click.mp3" preload="auto" />

        {/* 큰 버튼: 종료 시 비활성, 아니면 주사위/미션 중 하나 */}
        {isGameEnd ? (
          <div className={styles.endedGameText}>게임이 종료되었습니다.</div>
        ) : canRollDice ? (
          <Button
            className={styles.moveButton}
            variant="primary"
            size="lg"
            onClick={handleRollDice}
            disabled={!canRollDice || isRolling}
            isLoading={isRolling}
            title={
              !canRollDice
                ? "미션 인증 후에 주사위를 던질 수 있어요"
                : "주사위 던지기"
            }
          >
            주사위 던지기
          </Button>
        ) : (
          <Button
            className={styles.moveButton}
            variant="secondary"
            size="lg"
            onClick={() => {
              const landed = tripGameTileViews.find(
                (t) => t.tripGameTileId === missionReadyTileId
              );
              if (landed) setModalTile(landed);
              setIsModalOpen(true);
            }}
            disabled={!missionEnabled}
            title={
              missionEnabled
                ? "도착 칸 미션 인증"
                : "주사위를 굴려 도착해야 인증 가능"
            }
          >
            미션 인증
          </Button>
        )}

        {/* 하단 세그먼트 */}
        <div className={styles.segmented}>
          <button
            className={`${styles.segBtn} ${
              activeSection === "timeline" ? styles.segActive : ""
            }`}
            onClick={() => setActiveSection("timeline")}
            type="button"
          >
            타임 라인
          </button>
          <button
            className={`${styles.segBtn} ${
              activeSection === "help" ? styles.segActive : ""
            }`}
            onClick={() => setActiveSection("help")}
            type="button"
          >
            게임 방법
          </button>
        </div>

        {activeSection === "help" && (
          <div className={styles.timelineBox}>
            <div className={styles.timelineTitle}>게임 방법</div>
            <ul className={styles.timelineList}>
              <li className={styles.timelineItem}>
                <div className={styles.timelineDot} />
                <div className={styles.timelineText}>
                  step1 게임 시작 후 주사위를 던집니다.
                </div>
              </li>
              <li className={styles.timelineItem}>
                <div className={styles.timelineDot} />
                <div className={styles.timelineText}>
                  step2 도착한 칸의 여행지 미션을 확인합니다.
                </div>
              </li>
              <li className={styles.timelineItem}>
                <div className={styles.timelineDot} />
                <div className={styles.timelineText}>
                  step3 리뷰 또는 인증을 남기면 다음 턴이 열립니다.
                </div>
              </li>
            </ul>
          </div>
        )}

        {activeSection === "timeline" && (
          <div className={styles.timelineBox}>
            <div className={styles.timelineTitle}>타임 라인</div>
            {sortedLogs.length > 0 ? (
              <ul className={styles.timelineList}>
                {sortedLogs.map((log) => (
                  <li
                    key={log.tripGameMoveLogId}
                    className={styles.timelineItem}
                  >
                    <div className={styles.timelineDot} />
                    <div className={styles.timelineText}>
                      {`${log.diceValueAtRoll}칸 이동 · ${
                        log.missionResultDescription
                      } · ${formatKST(log.arrivedAt)}`}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.timelineEmpty}>게임을 시작해보세요!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GamePlay;
