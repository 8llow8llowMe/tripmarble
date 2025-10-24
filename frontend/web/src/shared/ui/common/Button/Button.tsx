import styles from "./Button.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  paddingSize?: "sm" | "md" | "lg" | "xl";
  radius?: "sm" | "md" | "lg";
  bgColor?: "primary" | "secondary" | "accent";
  width?: string;
  height?: string;
  fontSize?: string;
}

const Button = ({
  children,
  paddingSize,
  radius,
  bgColor,
  width,
  height,
  fontSize,
  className,
  ...props
}: ButtonProps) => {
  const style: React.CSSProperties = {};
  if (width) style.width = width;
  if (height) style.height = height;
  if (fontSize) style.fontSize = fontSize;

  const classes = [
    styles.button,
    radius && styles[`rounded-${radius}`],
    paddingSize && styles[`padding-${paddingSize}`],
    bgColor && styles[`bg-${bgColor}`],
    className
  ].filter(Boolean).join(" ");

  return (
    <button
      className={classes}
      {...props}
      style={Object.keys(style).length > 0 ? style : undefined}
    >
      {children}
    </button>
  );
};

export default Button;
