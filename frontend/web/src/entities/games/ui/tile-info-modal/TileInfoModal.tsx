import React from "react";
import styles from "./TileInfoModal.module.scss";
import { GameInfoDataBody } from "@/entities/games/model/gameInfoDummy";
import Modal from "@/shared/ui/common/Modal";
import Button from "@/shared/ui/common/Button/Button";

type Tile = GameInfoDataBody["tripGameTileViews"][number];

interface TileInfoModalProps {
  tile: Tile;
  isOpen: boolean;
  onClose: () => void;
}

const TileInfoModal = ({ tile, isOpen, onClose }: TileInfoModalProps) => {
  if (!tile) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      title={
        <span className={styles.titleWrap}>
          {tile.tripSpotName}
          <span className={styles.blockBadge}>
            {tile.missionTypeDescription}
          </span>
        </span>
      }
      footer={
        <>
          <Button type="button" variant="secondary" size="md">
            미션 보기
          </Button>
          <Button type="button" variant="primary" size="md">
            미션 인증
          </Button>
        </>
      }
    >
      <div className={styles.blockDetail}>
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
      </div>
    </Modal>
  );
};

export default TileInfoModal;
