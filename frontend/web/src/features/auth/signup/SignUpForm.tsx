"use client";
import { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
// query
import { useSignUp } from "@/entities/users/hooks/useUsers";
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

  const { mutate } = useSignUp();

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
    setHasError(false);
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      mutate(
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
            alert("회원가입 완료! 로그인 해주세요.");
          },
          onError: (error) => {
            console.error("회원가입 실패:", error);
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
        {hasError && (
          <div style={{ color: "red", fontSize: "0.85rem" }}>
            올바른 {current.label}을 입력해주세요.
          </div>
        )}
        <button className={styles.nextButton} onClick={nextStep}>
          {step !== 4 ? "계속하기" : "회원가입하기"}
        </button>
      </div>
    </>
  );
}
