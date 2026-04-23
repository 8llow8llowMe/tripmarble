import {
  ChangeEvent,
  FormEvent,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  useId,
} from "react";
import Button from "@/shared/ui/common/Button/Button";
import styles from "./Input.module.scss";

type NativeInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  | "aria-describedby"
  | "aria-invalid"
  | "className"
  | "onChange"
  | "onSubmit"
  | "placeholder"
  | "size"
  | "type"
  | "value"
>;

interface InputProps extends NativeInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
  submitLabel?: string;
  type?: HTMLInputTypeAttribute;
  isLoading?: boolean;
  isInvalid?: boolean;
  helperText?: string;
  errorText?: string;
  className?: string;
  inputClassName?: string;
  buttonClassName?: string;
}

const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

const Input = ({
  value,
  onChange,
  onSubmit,
  placeholder = "여행지를 입력하세요",
  submitLabel = "검색",
  type = "text",
  isLoading = false,
  isInvalid = false,
  helperText,
  errorText,
  className,
  inputClassName,
  buttonClassName,
  id,
  disabled,
  ...inputProps
}: InputProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const feedback = errorText ?? helperText;
  const feedbackId = feedback ? `${inputId}-feedback` : undefined;
  const { "aria-label": ariaLabel, ...nativeInputProps } = inputProps;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit?.();
  };

  return (
    <form className={cx(styles.searchBox, className)} onSubmit={handleSubmit}>
      <input
        {...nativeInputProps}
        id={inputId}
        type={type}
        placeholder={placeholder}
        className={cx(styles.searchInput, inputClassName)}
        value={value}
        aria-label={ariaLabel ?? placeholder}
        aria-invalid={isInvalid || Boolean(errorText) || undefined}
        aria-describedby={feedbackId}
        disabled={disabled}
        onChange={handleChange}
      />
      <Button
        variant="primary"
        size="lg"
        className={cx(styles.submitButton, buttonClassName)}
        type="submit"
        disabled={disabled}
        isLoading={isLoading}
      >
        {submitLabel}
      </Button>
      {feedback && (
        <p
          id={feedbackId}
          className={errorText ? styles.errorText : styles.helperText}
        >
          {feedback}
        </p>
      )}
    </form>
  );
};

export default Input;
