import styles from "./Button.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  paddingSize?: "sm" | "md" | "lg";
  radius?: "sm" | "md" | "lg";
  bgColor?: "primary" | "secondary" | "accent";
  width?: "auto" | "100px";
}

const Button = ({
  children,
  paddingSize,
  radius,
  bgColor,
  width,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`${styles.button} ${radius && styles[`rounded-${radius}`]} ${
        paddingSize && styles[`padding-${paddingSize}`]
      } ${bgColor && styles[`bg-${bgColor}`]}`}
      {...props}
      style={width ? { width } : undefined}
    >
      {children}
    </button>
  );
};

export default Button;
