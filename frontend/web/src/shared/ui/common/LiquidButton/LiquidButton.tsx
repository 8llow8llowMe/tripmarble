import styles from "./LiquidButton.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  paddingSize?: "sm" | "md" | "lg" | "xl";
  radius?: "sm" | "md" | "lg";
  bgColor?: "primary" | "secondary" | "accent";
  width?: string;
  height?: string;
  /**
   * glass(기본) | solid: 유리 질감 vs 기존 솔리드 버튼
   */
  variant?: "glass" | "solid";
  /**
   * 광택 스윕 효과
   */
  shine?: boolean;
  fontSize?: string;
}

const LiquidButton = ({
  children,
  paddingSize,
  radius,
  bgColor,
  width,
  height,
  fontSize,
  variant,
  shine,
  ...props
}: ButtonProps) => {
  const style: React.CSSProperties = {};
  if (width) style.width = width;
  if (height) style.height = height;
  if (fontSize) style.fontSize = fontSize;

  const handleMouseMove: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--mx", `${x}%`);
    e.currentTarget.style.setProperty("--my", `${y}%`);
  };

  const handleMouseLeave: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.currentTarget.style.setProperty("--mx", `50%`);
    e.currentTarget.style.setProperty("--my", `50%`);
  };

  return (
    <button
      className={`${styles.button} ${variant === "solid" ? styles.solid : styles.glass} ${shine ? styles.shine : ""} ${radius && styles[`rounded-${radius}`]} 
      ${paddingSize && styles[`padding-${paddingSize}`]} 
      ${variant === "solid" && bgColor ? styles[`bg-${bgColor}`] : ""}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
      style={Object.keys(style).length > 0 ? style : undefined}
    >
      {children}
    </button>
  );
};

export default LiquidButton;
