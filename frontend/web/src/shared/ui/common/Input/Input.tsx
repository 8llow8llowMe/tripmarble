import { ChangeEvent, FormEvent } from "react";
import Button from "@/shared/ui/common/Button/Button";
import styles from "./Input.module.scss";

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
  isLoading?: boolean;
}

const Input = ({
  value,
  onChange,
  onSubmit,
  placeholder = "여행지를 입력하세요",
  isLoading = false,
}: InputProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit?.();
  };

  return (
    <form className={styles.searchBox} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={placeholder}
        className={styles.searchInput}
        value={value}
        onChange={handleChange}
      />
      <Button
        radius="sm"
        bgColor="primary"
        paddingSize="lg"
        width="120px"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "검색 중" : "검색"}
      </Button>
    </form>
  );
};

export default Input;
