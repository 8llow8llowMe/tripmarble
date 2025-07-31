import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./DateStep.module.scss";

interface DateStepProps {
  value: [string, string];
  onChange: (value: [string, string]) => void;
  label: string;
}
export default function DateStep({ value, onChange, label }: DateStepProps) {
  // value: [start, end]
  const [start, end] = value || [null, null];
  return (
    <div>
      <DatePicker
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
        calendarClassName={styles.customCalendar}
        dayClassName={(date) =>
          start && end && date >= new Date(start) && date <= new Date(end)
            ? styles.selectedRange
            : ""
        }
      />
    </div>
  );
}
