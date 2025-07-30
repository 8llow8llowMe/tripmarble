import styles from "./Button.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  paddingSize?: "sm" | "md" | "lg";
  radius?: "sm" | "md" | "lg";
  bgColor?: "primary" | "secondary" | "accent";
  width?: "auto" | "100px" | "200px";
  height?: "auto" | "50px";
}

const Button = ({
  children,
  paddingSize,
  radius,
  bgColor,
  width,
  height,
  ...props
}: ButtonProps) => {
  const style: React.CSSProperties = {};
  if (width) style.width = width;
  if (height) style.height = height;

  return (
    <button
      className={`${styles.button} ${radius && styles[`rounded-${radius}`]} 
      ${paddingSize && styles[`padding-${paddingSize}`]} 
      ${bgColor && styles[`bg-${bgColor}`]}`}
      {...props}
      style={Object.keys(style).length > 0 ? style : undefined}
    >
      {children}
    </button>
  );
};

export default Button;
