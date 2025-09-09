const formatDate = (date: Date | null) => {
  if (!date) return "";
  // 표준 4자리 연도 포맷으로 반환 (yyyy-MM-dd)
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default formatDate;
