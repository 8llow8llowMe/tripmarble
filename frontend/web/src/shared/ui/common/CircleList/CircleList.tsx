import Link from "next/link";
import styles from "./CircleList.module.scss";
import { StaticImageData } from "next/image";

type SpotItem = {
  id: number;
  name: string;
  imgUrl: string | StaticImageData;
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
              backgroundImage: `url(${
                typeof item.imgUrl === "string" ? item.imgUrl : item.imgUrl.src
              })`,
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
