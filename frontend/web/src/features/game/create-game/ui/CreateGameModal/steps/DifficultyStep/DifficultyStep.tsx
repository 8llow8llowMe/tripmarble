import styles from "./DifficultyStep.module.scss";

interface DifficultyStepProps {
  value: string;
  onChange: (value: string) => void;
}

const difficulties = ["EASY", "NORMAL", "HARD"];
export default function DifficultyStep({
  value,
  onChange,
}: DifficultyStepProps) {
  return (
    <div className={styles.difficultyGroup}>
      {difficulties.map((diff) => (
        <button
          key={diff}
          type="button"
          className={`${styles.button} ${
            value === diff ? styles.selected : ""
          }`}
          onClick={() => onChange(diff)}
        >
          {diff}
        </button>
      ))}
    </div>
  );
}
