import Link from "next/link";
import type { Metadata } from "next";
// styles
import styles from "@/app/Home.module.scss";
// components
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Button from "@/components/common/Button/Button";

export const metadata: Metadata = {
  title: "Home",
  description: "여행을 색다르게 즐겨보세요",
};

export default function HomePage() {
  return (
    <>
      <Header />

      <div className={styles.container}>
        <h1 className={styles.title}>TripMarble</h1>
        <p className={styles.subtitle}>
          &quot;보드판 위 여행지를 돌며 새로운 추억을 만들어보세요.&quot;
        </p>
        <Link href="/recommend">
          <Button radius="md" bgColor="accent" paddingSize="lg">
            랜덤 여행지 추천받기
          </Button>
        </Link>
      </div>

      <Footer />
    </>
  );
}
