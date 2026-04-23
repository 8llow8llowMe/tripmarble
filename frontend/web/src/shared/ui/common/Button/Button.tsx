import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.scss";

type ButtonVariant = "primary" | "secondary" | "ghost" | "link" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  block?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  isLoading?: boolean;
}

const Button = ({
  children,
  variant = "primary",
  size = "md",
  block = false,
  leadingIcon,
  trailingIcon,
  isLoading = false,
  className,
  disabled,
  type = "button",
  ...props
}: ButtonProps) => {
  const classes = [
    styles.button,
    styles[`variant-${variant}`],
    styles[`size-${size}`],
    block && styles.block,
    isLoading && styles.loading,
    className
  ].filter(Boolean).join(" ");

  return (
    <button
      className={classes}
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      {...props}
    >
      {isLoading && <span className={styles.spinner} aria-hidden="true" />}
      {leadingIcon && !isLoading && (
        <span className={styles.icon} aria-hidden="true">
          {leadingIcon}
        </span>
      )}
      <span className={styles.label}>{children}</span>
      {trailingIcon && (
        <span className={styles.icon} aria-hidden="true">
          {trailingIcon}
        </span>
      )}
    </button>
  );
};

export default Button;
