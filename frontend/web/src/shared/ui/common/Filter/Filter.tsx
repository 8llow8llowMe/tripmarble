import React, { useMemo, useState } from "react";
import styles from "./Filter.module.scss";
import { ArrowUpIcon, CheckIcon } from "@/shared/assets/icons";
import { FilterOption } from "@/shared/ui/common/Filter/types";

type FilterProps = {
  options: FilterOption[];
  selected: string[]; // 선택된 contentTypeId 리스트
  onChange: (selected: string[]) => void;
};

const Filter: React.FC<FilterProps> = ({ options, selected, onChange }) => {
  const handleToggle = (id: string) => {
    // 단일 선택 (요구사항 유지)
    onChange([id]);
  };

  const [expanded, setExpanded] = useState(false);
  const VISIBLE_COUNT = 4;

  const visibleOptions = useMemo(
    () => (expanded ? options : options.slice(0, VISIBLE_COUNT)),
    [expanded, options]
  );

  const hasMore = options.length > VISIBLE_COUNT;

  return (
    <div
      className={styles.filterWrap}
      role="listbox"
      aria-multiselectable={false}
      aria-label="콘텐츠 유형 필터"
    >
      {visibleOptions.map((option) => {
        const isActive = selected.includes(option.contentTypeId);
        return (
          <button
            key={option.contentTypeId}
            className={`${styles.filterBtn} ${isActive ? styles.active : ""}`}
            type="button"
            role="option"
            aria-selected={isActive}
            data-active={isActive ? "true" : "false"}
            onClick={() => handleToggle(option.contentTypeId)}
            title={option.contentTypeName}
          >
            <span className={styles.checkCircle} aria-hidden>
              {isActive && <CheckIcon />}
            </span>
            <span className={styles.label}>{option.contentTypeName}</span>
          </button>
        );
      })}

      {hasMore && !expanded && (
        <button
          type="button"
          className={`${styles.filterBtn} ${styles.iconBtn}`}
          aria-label="더 보기"
          onClick={() => setExpanded(true)}
        >
          …
        </button>
      )}

      {hasMore && expanded && (
        <button
          type="button"
          className={`${styles.filterBtn} ${styles.iconBtn}`}
          aria-label="접기"
          onClick={() => setExpanded(false)}
        >
          <ArrowUpIcon />
        </button>
      )}
    </div>
  );
};

export default Filter;
