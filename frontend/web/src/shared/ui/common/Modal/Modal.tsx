import {
  KeyboardEvent,
  MouseEvent,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useId,
  useRef,
} from "react";
import styles from "./Modal.module.scss";
import { CloseIcon } from "@/shared/assets/icons";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
  ariaLabel?: string;
  footer?: ReactNode;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  panelClassName?: string;
  bodyClassName?: string;
  size?: "sm" | "md" | "lg";
}

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

const Modal = ({
  isOpen,
  onClose,
  title,
  ariaLabel,
  footer,
  closeOnBackdrop = true,
  closeOnEscape = true,
  showCloseButton = true,
  panelClassName,
  bodyClassName,
  size = "md",
  children,
}: PropsWithChildren<ModalProps>) => {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousActiveElement = document.activeElement as HTMLElement | null;
    const previousBodyOverflow = document.body.style.overflow;
    const focusable = panelRef.current?.querySelector<HTMLElement>(
      FOCUSABLE_SELECTOR
    );

    document.body.style.overflow = "hidden";

    const frameId = requestAnimationFrame(() => {
      (focusable ?? panelRef.current)?.focus();
    });

    return () => {
      cancelAnimationFrame(frameId);
      document.body.style.overflow = previousBodyOverflow;
      previousActiveElement?.focus?.();
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleOverlayClick = () => {
    if (closeOnBackdrop) {
      onClose();
    }
  };

  const handlePanelClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape" && closeOnEscape) {
      event.preventDefault();
      onClose();
      return;
    }

    if (event.key !== "Tab") return;

    const focusable = Array.from(
      panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR) ?? []
    ).filter((element) => element.offsetParent !== null);

    if (!focusable.length) {
      event.preventDefault();
      panelRef.current?.focus();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const panelClasses = [
    styles.panel,
    styles[`size-${size}`],
    panelClassName,
  ].filter(Boolean).join(" ");

  const bodyClasses = [
    styles.body,
    !title && styles.bodyOffset,
    bodyClassName,
  ].filter(Boolean).join(" ");

  return (
    <div
      className={styles.overlay}
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
    >
      <div
        ref={panelRef}
        className={panelClasses}
        onClick={handlePanelClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-label={title ? undefined : ariaLabel}
        tabIndex={-1}
      >
        {(title || showCloseButton) && (
          <div className={styles.header}>
            {title ? (
              <h2 id={titleId} className={styles.title}>
                {title}
              </h2>
            ) : (
              <span aria-hidden="true" />
            )}
            {showCloseButton && (
              <button
                className={styles.closeButton}
                type="button"
                onClick={onClose}
                aria-label="닫기"
              >
                <CloseIcon />
              </button>
            )}
          </div>
        )}
        <div className={bodyClasses}>{children}</div>
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;
