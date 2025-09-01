import useRepresentativeRegions, {
  RegionsRepresentativeResponse,
} from "@/entities/trips/hooks/useRepresentativeRegions";
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
