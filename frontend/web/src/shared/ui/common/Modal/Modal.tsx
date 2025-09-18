import React, { PropsWithChildren } from "react";
import styles from "./Modal.module.scss";
import { CloseIcon } from "@/shared/assets/icons";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({
  isOpen,
  onClose,
  children,
}: PropsWithChildren<ModalProps>) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <CloseIcon />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
