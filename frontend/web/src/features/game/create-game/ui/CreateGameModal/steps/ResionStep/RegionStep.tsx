import { useRepresentativeRegions } from "@/entities/trips/hooks/useTrips";
import { RegionsRepresentativeResponse } from "@/entities/trips/model/tripsType";
import styles from "./RegionStep.module.scss";

interface RegionStepProps {
  value: number;
  onChange: (value: number) => void;
}

export default function RegionStep({ value, onChange }: RegionStepProps) {
  const { data } = useRepresentativeRegions();
  const regions: RegionsRepresentativeResponse[] = data?.data?.dataBody || [];

  return (
    <div className={styles.regionStepWrapper}>
      <div className={styles.title}>인기있는 여행지로 떠나보세요!</div>
      <div className={styles.regionGrid}>
        {regions.map((region) => (
          <button
            type="button"
            key={region.representativeRegionId}
            className={`${styles.regionCard} ${
              value === region.representativeRegionId ? styles.selected : ""
            }`}
            onClick={() => onChange(region.representativeRegionId)}
          >
            <div className={styles.circle} />
            <div className={styles.regionName}>
              {region.representativeRegionName}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
