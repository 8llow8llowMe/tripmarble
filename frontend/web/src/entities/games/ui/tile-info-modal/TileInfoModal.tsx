import React from "react";
import styles from "./TileInfoModal.module.scss";
import { GameInfoDataBody } from "@/entities/games/model/gameInfoDummy";

type Tile = GameInfoDataBody["tripGameTileViews"][number];

interface TileInfoModalProps {
  tile: Tile;
  onClose: () => void;
}

const TileInfoModal: React.FC<TileInfoModalProps> = ({ tile, onClose }) => {
  if (!tile) return null;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <strong className={styles.title}>{tile.tripSpotName}</strong>
          <button className={styles.closeBtn} onClick={onClose}>
            ✕
          </button>
        </div>
        <div className={styles.meta}>
          단계: step{tile.stepNo} · {tile.missionTypeDescription}
        </div>
        <div className={styles.id}>tripSpotId: {tile.tripSpotId}</div>
      </div>
    </div>
  );
};

export default TileInfoModal;
