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

  const { signUpMutate } = useSignUp();
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
                가입이 완료되었습니다!
                <br />
                로그인 후 여행의 재미를 경험하세요.
              </>
            );
          },
          onError: (error) => {
            console.error("회원가입 실패:", error);
            toast.error(
              "회원가입에 실패했습니다. 입력하신 정보를 다시 확인해주세요."
            );
            router.push("/login");
          },
        }
      );
    }
  };

  return (
    <>
      <div className={styles.progress}>
        <div className={styles.barWrapper}>
          <div
            className={styles.bar}
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      <div className={styles.titleDiv}>
        <div className={styles.info}>{current.label} 입력하기</div>
        {step + 1} / {steps.length}
      </div>

      <div className={styles.contentContainer}>
        <label className={styles.label}>{current.label}</label>
        {step === 0 ? (
          <>
            {/* 이메일 입력 + 전송 버튼 (한 줄) */}
            <div className={styles.row}>
              <input
                className={`${styles.input} ${styles.grow}`}
                type="text"
                placeholder={current.placeholder}
                value={form.email}
                onChange={handleChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") nextStep();
                }}
              />
              <button
                className={styles.inlineBtn}
                type="button"
                disabled={!validateInput() || isSending || isEmailVerified}
                onClick={() => sendCodeMutate({ email: form.email })}
              >
                {isEmailVerified
                  ? "인증 완료"
                  : isSending
                  ? "전송중..."
                  : "인증코드 전송"}
              </button>
            </div>

            {/* 인증코드 입력 + 확인 버튼 (아래 줄) */}
            <div className={`${styles.row} ${styles.codeRow}`}>
              <input
                className={`${styles.input} ${styles.grow}`}
                type="text"
                placeholder="인증코드 입력"
                value={emailCode}
                onChange={(e) => setEmailCode(e.target.value)}
                disabled={isEmailVerified}
              />
              <button
                className={styles.inlineBtn}
                type="button"
                disabled={
                  isVerifying ||
                  isEmailVerified ||
                  emailCode.trim().length === 0
                }
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
              </button>
            </div>
          </>
        ) : (
          <input
            className={styles.input}
            type={current.type || "text"}
            placeholder={current.placeholder}
            value={value}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") nextStep();
            }}
          />
        )}
        {hasError && (
          <div style={{ color: "red", fontSize: "0.85rem" }}>
            {step === 0 && !isEmailVerified
              ? "이메일 인증을 완료해주세요."
              : `올바른 ${current.label}을 입력해주세요.`}
          </div>
        )}
        <button className={styles.nextButton} onClick={nextStep}>
          {step !== 4 ? "계속하기" : "회원가입하기"}
        </button>
      </div>
    </>
  );
}
