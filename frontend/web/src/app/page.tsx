import Link from "next/link";
import type { Metadata } from "next";
// styles
import styles from "@/app/Home.module.scss";
// components
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Button from "@/components/common/Button/Button";
import Image from "next/image";
import { jeju2, seoul2 } from "@/assets/images/places";

export const metadata: Metadata = {
  title: "Home",
  description: "여행을 색다르게 즐겨보세요",
};

export default function HomePage() {
  return (
    <>
      <Header />
      <div className={styles.parallaxWrapper}>
        <section className={styles.parallaxSection}>
          <div className={styles.content}>
            <div className={styles.textWrapper}>
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
          </div>
        </section>
        <section className={styles.parallaxSection1}>
          <div className={styles.content}>
            <div className={styles.textWrapper}>
              <h1 className={styles.title}>원하는 여행지를 검색해보세요</h1>
              <p className={styles.subtitle}>
                &quot;가고 싶은 지역, 관광지, 맛집을 검색하면 자동완성으로
                빠르게 찾을 수 있어요.&quot;
              </p>
            </div>
          </div>
        </section>
        <section className={styles.parallaxSection2}>
          <div className={styles.content}>
            <Image
              src={jeju2}
              alt="jeju-image"
              width={400}
              height={400}
              style={{ objectFit: "cover", borderRadius: 8 }}
            />
            <div className={styles.textWrapper}>
              <h1 className={styles.title}>전국 여행지를 한눈에</h1>
              <p className={styles.subtitle}>
                &quot;모든 관광지와 맛집을 지역별로 쉽게 찾아보고 상세 정보를
                확인하세요.&quot;
              </p>
            </div>
          </div>
        </section>
        <section className={styles.parallaxSection3}>
          <div className={styles.content}>
            <Image
              src={seoul2}
              alt="seoul-image"
              width={400}
              height={400}
              style={{ objectFit: "cover", borderRadius: 8 }}
            />
            <div className={styles.textWrapper}>
              <h1 className={styles.title}>여행지를 선택해 게임처럼</h1>
              <p className={styles.subtitle}>
                &quot;선택한 여행지를 부루마불 형식으로 즐기며 여행을
                떠나보세요.&quot;
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
