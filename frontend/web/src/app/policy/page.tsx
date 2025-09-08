import Link from "next/link";
import styles from "./PolicyList.module.scss";
export const dynamic = "force-static";

export default function PolicyIndexPage() {
  const cards = [
    {
      href: "/policy/terms",
      title: "이용약관",
      desc: "서비스 이용에 대한 약관을 확인하세요.",
    },
    {
      href: "/policy/privacy",
      title: "개인정보 처리방침",
      desc: "개인정보 수집·이용 및 보호 방침입니다.",
    },
    {
      href: "/policy/youth",
      title: "청소년 보호정책",
      desc: "유해정보로부터 청소년을 보호하기 위한 정책입니다.",
    },
  ];

  return (
    <main className={styles.container}>
      <div className={styles.inner}>
        <h1 className={styles.title}>정책 및 약관</h1>
        <p className={styles.desc}>
          TripMarble 서비스와 관련된 약관과 정책을 한 곳에서 확인하실 수
          있습니다.
        </p>
        <div className={styles.grid}>
          {cards.map((c) => (
            <Link key={c.href} href={c.href} className={styles.card}>
              <div className={styles.cardTitle}>{c.title}</div>
              <div className={styles.cardDesc}>{c.desc}</div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
