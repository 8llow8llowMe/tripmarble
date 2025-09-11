import styles from "./ThemeStep.module.scss";

interface TitleStepProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  nextStep: () => void;
}

export default function TitleStep({
  value,
  onChange,
  label,
  nextStep,
}: TitleStepProps) {
  return (
    <input
      className={styles.input}
      type="text"
      placeholder={`예: ${label}`}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          e.stopPropagation();
          nextStep();
        }
      }}
      autoFocus
    />
  );
}
