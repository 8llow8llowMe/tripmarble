import React from "react";
import styles from "./TileInfoModal.module.scss";
import { GameInfoDataBody } from "@/entities/games/model/gameInfoDummy";
import Modal from "@/shared/ui/common/Modal";

type Tile = GameInfoDataBody["tripGameTileViews"][number];

interface TileInfoModalProps {
  tile: Tile;
  isOpen: boolean;
  onClose: () => void;
}

const TileInfoModal = ({ tile, isOpen, onClose }: TileInfoModalProps) => {
  if (!tile) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.blockDetail}>
        <div className={styles.blockHeader}>
          <div className={styles.blockTitle}>
            {tile.tripSpotName}
            <span className={styles.blockBadge}>
              {tile.missionTypeDescription}
            </span>
          </div>
        </div>

        <div className={styles.blockMission}>미션: 해당 장소에서 사진 찍기</div>

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
    </Modal>
  );
};

export default TileInfoModal;
