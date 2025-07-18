import React from "react";
import styles from "./Filter.module.scss";
import { FilterOption } from "@/types/componentsType";
import { CheckIcon } from "@/assets/icons";

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
          onClick={() => handleToggle(option.contentTypeId)}
        >
          <div className={styles.checkCircle}>
            {selected.includes(option.contentTypeId) && <CheckIcon />}
          </div>
          <div className={styles.label}>{option.contentTypeName}</div>
        </button>
      ))}
    </div>
  );
};

export default Filter;
