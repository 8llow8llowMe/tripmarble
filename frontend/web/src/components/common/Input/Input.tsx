import Button from "@/components/common/Button/Button";
import styles from "./Input.module.scss";

const Input = () => {
  return (
    <div className={styles.searchBox}>
      <input
        type="text"
        placeholder="여행지를 입력하세요"
        className={styles.searchInput}
      />
      <Button radius="sm" bgColor="primary" paddingSize="lg" width="100px">
        검색
      </Button>
    </div>
  );
};

export default Input;
