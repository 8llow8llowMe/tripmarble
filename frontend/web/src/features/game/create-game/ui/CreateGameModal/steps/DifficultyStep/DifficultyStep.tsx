import useTripGameDifficulties from "@/entities/games/hooks/useTripGameDifficulties";
import styles from "./DifficultyStep.module.scss";

interface DifficultyStepProps {
  value: string;
  onChange: (value: string) => void;
}

interface DifficultiesType {
  code: string;
  description: string;
}

export default function DifficultyStep({
  value,
  onChange,
}: DifficultyStepProps) {
  const { data } = useTripGameDifficulties();
  const dummyData = [
    { code: "EASY", description: "쉬움" },
    { code: "NORMAL", description: "보통" },
    { code: "HARD", description: "어려움" },
  ];
  const difficulties: DifficultiesType[] = data?.data?.dataBody || dummyData;

  return (
    <div className={styles.difficultyGroup}>
      {difficulties.map((diff) => (
        <button
          key={diff.code}
          type="button"
          className={`${styles.button} ${
            value === diff.code ? styles.selected : ""
          }`}
          onClick={() => onChange(diff.code)}
        >
          {diff.description}
        </button>
      ))}
    </div>
  );
}
