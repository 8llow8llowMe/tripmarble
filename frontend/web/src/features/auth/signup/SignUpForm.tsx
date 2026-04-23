"use client";
import { useState, useMemo, useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
// query
import useSignUp from "@/entities/users/hooks/useSignUp";
import useSendEmailCode from "@/entities/users/hooks/useSendEmailCode";
import useVerifyEmailCode from "@/entities/users/hooks/useVerifyEmailCode";
// store
import { useAppDispatch, useAppSelector } from "@/entities/users/model";
import { resetForm, updateField } from "@/entities/users/model/form/formSlice";
import Button from "@/shared/ui/common/Button/Button";
//style
import styles from "./SignUpForm.module.scss";

const steps = [
  { label: "이메일", placeholder: "예: user@example.com" },
  {
    label: "비밀번호",
    placeholder: "영문, 숫자, 특수문자 포함 8자 이상 입력해주세요",
    type: "password",
  },
  {
    label: "비밀번호 확인",
    placeholder: "비밀번호를 한 번 더 입력해주세요",
    type: "password",
  },
  { label: "이름", placeholder: "이름을 입력해주세요 (예: 홍길동)" },
  { label: "닉네임", placeholder: "사용하실 닉네임을 입력해주세요" },
];

export default function SignUpPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const form = useAppSelector((state) => state.form);
  const [step, setStep] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [emailCode, setEmailCode] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const { signUpMutate, isSigningUp } = useSignUp();
  const { sendCodeMutate, isSending } = useSendEmailCode();
  const { verifyCodeMutate, isVerifying } = useVerifyEmailCode();

  // 이메일이 바뀌면 인증 상태 초기화
  useEffect(() => {
    setIsEmailVerified(false);
    setEmailCode("");
  }, [form.email]);

  const current = useMemo(() => steps[step], [step]);
  const key = useMemo(
    () => Object.keys(form)[step] as keyof typeof form,
    [step, form]
  );
  const value = useMemo(() => form[key], [form, key]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(updateField({ key, value: e.target.value }));
    },
    [dispatch, key]
  );

  const validateInput = () => {
    switch (key) {
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
      case "password":
        return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()\-\_=+\[\]{};:'",.<>\/?\\|])\S{8,20}$/.test(
          form.password
        );
      case "confirmPassword":
        return form.password === form.confirmPassword;
      case "name":
        return form.name.trim().length > 0;
      case "nickname":
        return form.nickname.trim().length > 0;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (!validateInput()) {
      setHasError(true);
      return;
    }
    // 첫 단계(이메일)는 인증 완료 후에만 넘어가도록 제한
    if (step === 0 && !isEmailVerified) {
      setHasError(true);
      return;
    }
    setHasError(false);
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      signUpMutate(
        {
          email: form.email,
          password: form.password,
          name: form.name,
          nickname: form.nickname,
        },
        {
          onSuccess: () => {
            dispatch(resetForm());
            router.push("/login");
            toast.success(
              <>
                가입이 완료되었습니다.
                <br />
                로그인하고 여행을 시작하세요.
              </>
            );
          },
          onError: (error) => {
            console.error("회원가입 실패:", error);
            toast.error(
              "가입할 수 없습니다. 정보를 다시 확인해주세요."
            );
            router.push("/login");
          },
        }
      );
    }
  };

  return (
    <div className={styles.formShell}>
      <div className={styles.progress}>
        <div className={styles.barWrapper}>
          <div
            className={styles.bar}
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      <div className={styles.titleDiv}>
        <div>
          <div className={styles.info}>{current.label}</div>
          <p className={styles.helper}>필요한 정보만 순서대로 입력합니다.</p>
        </div>
        <span className={styles.stepCount}>
          {step + 1} / {steps.length}
        </span>
      </div>

      <div className={styles.contentContainer}>
        <label
          className={styles.label}
          htmlFor={step === 0 ? "signup-email" : `signup-${key}`}
        >
          {current.label}
        </label>
        {step === 0 ? (
          <>
            {/* 이메일 입력 + 전송 버튼 (한 줄) */}
            <div className={styles.row}>
              <input
                className={`${styles.input} ${styles.grow}`}
                type="text"
                id="signup-email"
                placeholder={current.placeholder}
                value={form.email}
                aria-invalid={hasError && !isEmailVerified}
                onChange={handleChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") nextStep();
                }}
              />
              <Button
                className={styles.inlineBtn}
                type="button"
                variant="primary"
                size="sm"
                disabled={!validateInput() || isSending || isEmailVerified}
                isLoading={isSending}
                onClick={() => sendCodeMutate({ email: form.email })}
              >
                {isEmailVerified
                  ? "인증 완료"
                  : isSending
                  ? "전송중..."
                  : "인증코드 전송"}
              </Button>
            </div>

            {/* 인증코드 입력 + 확인 버튼 (아래 줄) */}
            <div className={`${styles.row} ${styles.codeRow}`}>
              <input
                className={`${styles.input} ${styles.grow}`}
                type="text"
                id="signup-email-code"
                placeholder="인증코드 입력"
                value={emailCode}
                aria-invalid={hasError && !isEmailVerified}
                onChange={(e) => setEmailCode(e.target.value)}
                disabled={isEmailVerified}
              />
              <Button
                className={styles.inlineBtn}
                type="button"
                variant="primary"
                size="sm"
                disabled={
                  isVerifying ||
                  isEmailVerified ||
                  emailCode.trim().length === 0
                }
                isLoading={isVerifying}
                onClick={() =>
                  verifyCodeMutate(
                    { email: form.email, code: emailCode.trim() },
                    { onSuccess: () => setIsEmailVerified(true) }
                  )
                }
              >
                {isEmailVerified
                  ? "확인됨"
                  : isVerifying
                  ? "확인중..."
                  : "인증 확인"}
              </Button>
            </div>
          </>
        ) : (
          <input
            className={styles.input}
            id={`signup-${key}`}
            type={current.type || "text"}
            placeholder={current.placeholder}
            value={value}
            aria-invalid={hasError}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") nextStep();
            }}
          />
        )}
        {hasError && (
          <div className={styles.errorText}>
            {step === 0 && !isEmailVerified
              ? "이메일 인증을 완료해주세요."
              : `올바른 ${current.label}을 입력해주세요.`}
          </div>
        )}
        <Button
          className={styles.nextButton}
          type="button"
          variant="primary"
          size="md"
          block
          isLoading={isSigningUp}
          onClick={nextStep}
        >
          {step !== 4 ? "계속하기" : "회원가입하기"}
        </Button>
      </div>
    </div>
  );
}
