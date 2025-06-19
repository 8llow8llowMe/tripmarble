// 예시

// 문자열이 비었는지 확인
export const isEmpty = (value: any): boolean => {
  return (
    value === null ||
    value === undefined ||
    (typeof value === "string" && value.trim() === "") ||
    (Array.isArray(value) && value.length === 0)
  );
};

// 객체가 비었는지 확인
export const isObjectEmpty = (obj: object): boolean => {
  return Object.keys(obj).length === 0;
};

// 숫자인지 확인
export const isNumber = (val: any): val is number => {
  return typeof val === "number" && !isNaN(val);
};

// 불리언 값으로 변환
export const toBoolean = (val: any): boolean => {
  return ["true", "1", 1, true].includes(val);
};
