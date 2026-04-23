"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
// styles
import styles from "./Home.module.scss";
// components
import Button from "@/shared/ui/common/Button/Button";
import CreateGameModal from "@/features/game/create-game/ui/CreateGameModal";
// assets
import { jeju2, seoul2 } from "@/shared/assets/images/places";
// stores
import { useAppSelector } from "@/entities/users/model";

const getImageSrc = (asset: string | { src: string }) =>
  (typeof asset === "string" ? asset : asset.src) || "";

export default function HomePage() {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const router = useRouter();
  const user = useAppSelector((state) => state.user.user);

  const handleCreateClick = () => {
    if (!user) {
      toast.info("로그인 후 게임을 만들 수 있습니다.");
      router.push("/login");
      return;
    }
    setCreateModalOpen(true);
  };

  return (
    <>
      <div className={styles.parallaxWrapper}>
        <section className={styles.parallaxSection}>
          <div className={styles.content}>
            <div className={styles.textWrapper}>
              <h1 className={styles.title}>TripMarble</h1>
              <p className={styles.subtitle}>
                &quot;보드판 위 여행지를 돌며 새로운 추억을 만들어보세요.&quot;
              </p>
              <div className={styles.buttonContainer}>
                <Link href="/recommend">
                  <Button variant="secondary" size="lg">
                    랜덤 여행지 추천받기
                  </Button>
                </Link>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleCreateClick}
                >
                  게임 만들기
                </Button>
              </div>
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
            <img
              src={getImageSrc(jeju2)}
              alt="jeju-image"
              className={styles.featureImage}
              loading="lazy"
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
            <img
              src={getImageSrc(seoul2)}
              alt="seoul-image"
              className={styles.featureImage}
              loading="lazy"
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
        <CreateGameModal
          isOpen={isCreateModalOpen}
          onClose={() => setCreateModalOpen(false)}
        />
      </div>
    </>
  );
}
