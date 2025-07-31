import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./DateStep.module.scss";
import { ko } from "date-fns/locale";
import { isSameDay } from "date-fns";

// 한글 월 표시용
const monthNames = [
  "1월",
  "2월",
  "3월",
  "4월",
  "5월",
  "6월",
  "7월",
  "8월",
  "9월",
  "10월",
  "11월",
  "12월",
];

interface DateStepProps {
  value: [string, string];
  onChange: (value: [string, string]) => void;
  label: string;
}

export default function DateStep({ value, onChange, label }: DateStepProps) {
  const [start, end] = value || [null, null];

  return (
    <div>
      <DatePicker
        locale={ko}
        calendarClassName={styles.customCalendar}
        selected={start ? new Date(start) : null}
        onChange={(dates: [Date | null, Date | null]) => {
          const [startDate, endDate] = dates;
          onChange([
            startDate ? startDate.toISOString().slice(0, 10) : "",
            endDate ? endDate.toISOString().slice(0, 10) : "",
          ]);
        }}
        startDate={start ? new Date(start) : null}
        endDate={end ? new Date(end) : null}
        selectsRange
        inline
        dateFormat="yyyy-MM-dd"
        placeholderText={`${label}을 선택하세요`}
        // === 헤더 커스텀 ===
        renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
          <div className={styles.customCalendarHeader}>
            <button
              onClick={decreaseMonth}
              className={styles.customCalendarButton}
              aria-label="이전 달"
              type="button"
            >
              ‹
            </button>
            <span>
              {date.getFullYear()}년 {monthNames[date.getMonth()]}
            </span>
            <button
              onClick={increaseMonth}
              className={styles.customCalendarButton}
              aria-label="다음 달"
              type="button"
            >
              ›
            </button>
          </div>
        )}
        // === 날짜 셀 커스텀 ===
        dayClassName={(date) => {
          if (start && end) {
            const s = new Date(start);
            const e = new Date(end);
            if (isSameDay(date, s) || isSameDay(date, e)) {
              return styles.selectedRangeStrong; // 진한 네모
            }
            if (date > s && date < e) {
              return styles.selectedRangeLight; // 연한 네모
            }
          }
          return "";
        }}
      />
    </div>
  );
}
