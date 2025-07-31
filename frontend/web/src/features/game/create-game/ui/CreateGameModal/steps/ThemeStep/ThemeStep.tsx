import { useTripThemes } from "@/entities/games/hooks/useGames";
import { TripThemesResponse } from "@/entities/games/model/gamesType";
import styles from "./ThemeStep.module.scss";

interface ThemeStepProps {
  value: number[];
  onChange: (value: number[]) => void;
}

export default function ThemeStep({ value, onChange }: ThemeStepProps) {
  const { data } = useTripThemes();
  const dummyData = [
    { tripThemeId: 1, tripThemeName: "여행위주" },
    { tripThemeId: 2, tripThemeName: "맛집위주" },
    { tripThemeId: 3, tripThemeName: "관광지위주" },
    { tripThemeId: 4, tripThemeName: "힐링위주" },
  ];
  const themes: TripThemesResponse[] = data?.data.data || dummyData;

  const toggleTheme = (id: number) => {
    if (Array.isArray(value) && value.includes(id)) {
      onChange(value.filter((v) => v !== id));
    } else {
      onChange([...(Array.isArray(value) ? value : []), id]);
    }
  };
  return (
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
  );
}
