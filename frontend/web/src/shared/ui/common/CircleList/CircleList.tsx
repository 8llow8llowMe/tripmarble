import Link from "next/link";
import styles from "./CircleList.module.scss";

type SpotItem = {
  id: number;
  name: string;
  imgUrl: string;
};

type CircleListProps = {
  baseHref: string;
  items: SpotItem[];
};

export default function CircleList({ baseHref, items }: CircleListProps) {
  return (
    <div className={styles.container}>
      {items.map((item) => (
        <Link
          key={item.id}
          href={`${baseHref}/${item.id}`}
          aria-label={item.name}
        >
          <div
            className={styles.circleItem}
            style={{
              backgroundImage: `url(${item.imgUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <span className={styles.label}>{item.name}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
