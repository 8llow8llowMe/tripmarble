import { TripThemesResponse } from "@/entities/games/model/gamesType";
import styles from "./ThemeStep.module.scss";
import useTripThemes from "@/entities/games/hooks/useTripThemes";

interface ThemeStepProps {
  value: number[];
  onChange: (value: number[]) => void;
}

export default function ThemeStep({ value, onChange }: ThemeStepProps) {
  const { data } = useTripThemes();
  const dummyData = [
    { tripThemeId: 1, tripThemeName: "여행" },
    { tripThemeId: 2, tripThemeName: "맛집" },
    { tripThemeId: 3, tripThemeName: "관광지" },
    { tripThemeId: 4, tripThemeName: "힐링" },
  ];
  const themes: TripThemesResponse[] = data?.data?.dataBody || dummyData;

  const toggleTheme = (id: number) => {
    if (Array.isArray(value) && value.includes(id)) {
      onChange(value.filter((v) => v !== id));
    } else {
      onChange([...(Array.isArray(value) ? value : []), id]);
    }
  };

  const showWarning = Array.isArray(value) && value.length < 2;

  return (
    <div className={styles.themeContainer}>
      <div className={styles.themeList}>
        {themes.map((theme: TripThemesResponse) => (
          <button
            key={theme.tripThemeId}
            type="button"
            onClick={() => toggleTheme(theme.tripThemeId)}
            className={
              Array.isArray(value) && value.includes(theme.tripThemeId)
                ? `${styles.themeButton} ${styles.selected}`
                : styles.themeButton
            }
          >
            {theme.tripThemeName}
          </button>
        ))}
      </div>
      {showWarning && (
        <p className={styles.warningText}>테마를 두 개 이상 선택해주세요.</p>
      )}
    </div>
  );
}
