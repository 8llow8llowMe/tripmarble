import React from "react";
import styles from "./Filter.module.scss";
import { CheckIcon } from "@/shared/assets/icons";
import { FilterOption } from "@/shared/ui/common/Filter/types";

type FilterProps = {
  options: FilterOption[];
  selected: string[]; // 선택된 contentTypeId 리스트
  onChange: (selected: string[]) => void;
};

const Filter: React.FC<FilterProps> = ({ options, selected, onChange }) => {
  const handleToggle = (id: string) => {
    // if (selected.includes(id)) {
    //   onChange(selected.filter((item) => item !== id));
    // } else {
    //   onChange([...selected, id]);
    // }
    onChange([id]);
  };

  return (
    <div className={styles.filterWrap}>
      {options.map((option) => (
        <button
          key={option.contentTypeId}
          className={`${styles.filterBtn} ${
            selected.includes(option.contentTypeId) ? styles.active : ""
          }`}
          type="button"
          aria-pressed={selected.includes(option.contentTypeId)}
          onClick={() => handleToggle(option.contentTypeId)}
        >
          <span className={styles.checkCircle} aria-hidden>
            {selected.includes(option.contentTypeId) && <CheckIcon />}
          </span>
          <span className={styles.label}>{option.contentTypeName}</span>
        </button>
      ))}
    </div>
  );
};

export default Filter;
