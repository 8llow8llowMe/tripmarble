"use client";

import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAppSelector } from "@/entities/users/model";
// three
import * as THREE from "three";
import { PMREMGenerator } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
// gsap
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// styles
import styles from "./HomeDice.module.scss";
// components
import CreateGameModal from "@/features/game/create-game/ui/CreateGameModal";
import useRepresentativeRegions from "@/entities/trips/hooks/useRepresentativeRegions";
import noImage from "/public/images/no-image.png";
import PolaroidStack from "@/entities/home/ui/polaroid-stack/PolaroidStack";
import Button from "@/shared/ui/common/Button/Button";

const getAssetSrc = (asset: string | { src: string }) =>
  (typeof asset === "string" ? asset : asset.src) || "";

const BOARD_IMAGE_SRCS = [
  "/images/board/Board01.png",
  "/images/board/Board02.png",
  "/images/board/Board05.png",
  "/images/board/Board04.png",
  "/images/board/Board03.png",
] as const;

type PolaroidItem = {
  id: number | string;
  name: string;
  imgUrl: string;
};

type HeroCopyProps = {
  onCreateGame: () => void;
  onExplore: () => void;
};

function HeroCopy({ onCreateGame, onExplore }: HeroCopyProps) {
  return (
    <div className={styles.heroCopy}>
      <p className={styles.eyebrow}>TripMarble</p>
      <h1 className={styles.heroTitle} aria-label="TripMarble">
        {"TripMarble".split("").map((char, i) => (
          <span key={i} className="split-char" data-char-index={i}>
            {char}
          </span>
        ))}
      </h1>
      <p className={styles.heroBody}>
        주사위를 굴리고, 여행지를 고르고, 미션을 따라 이동하는 여행 게임.
      </p>
      <div className={styles.heroActions}>
        <Button
          variant="primary"
          size="lg"
          className={styles.heroButton}
          onClick={onCreateGame}
        >
          게임 만들기
        </Button>
        <Button
          variant="secondary"
          size="lg"
          className={styles.heroButton}
          onClick={onExplore}
        >
          여행지 보기
        </Button>
      </div>
    </div>
  );
}

type BoardLayerProps = {
  boardRef: RefObject<HTMLDivElement>;
  onPieceLoaded: () => void;
};

function BoardLayer({ boardRef, onPieceLoaded }: BoardLayerProps) {
  return (
    <div className={styles.boardLayerWrapper} ref={boardRef} aria-hidden="true">
      <div className={styles.boardGroup}>
        <div className={`${styles.pieceBox} ${styles.pOuterLeft}`}>
          <img
            className={styles.piece}
            src={BOARD_IMAGE_SRCS[0]}
            alt=""
            onLoad={onPieceLoaded}
          />
        </div>
        <div className={`${styles.pieceBox} ${styles.pMidLeft}`}>
          <img
            className={styles.piece}
            src={BOARD_IMAGE_SRCS[1]}
            alt=""
            onLoad={onPieceLoaded}
          />
        </div>
        <div className={`${styles.pieceBox} ${styles.pOuterRight}`}>
          <img
            className={styles.piece}
            src={BOARD_IMAGE_SRCS[2]}
            alt=""
            onLoad={onPieceLoaded}
          />
        </div>
        <div className={`${styles.pieceBox} ${styles.pMidRight}`}>
          <img
            className={styles.piece}
            src={BOARD_IMAGE_SRCS[3]}
            alt=""
            onLoad={onPieceLoaded}
          />
        </div>
        <div className={`${styles.pieceBox} ${styles.pCenter}`}>
          <img
            className={styles.piece}
            src={BOARD_IMAGE_SRCS[4]}
            alt=""
            onLoad={onPieceLoaded}
          />
        </div>
      </div>
    </div>
  );
}

function RegionRail({ items }: { items: PolaroidItem[] }) {
  return (
    <>
      <div className={`polaroid-container ${styles.polaroidContainer}`}>
        <PolaroidStack items={items} />
      </div>
      <div className={styles.polaroidHint}>
        <span>사진을 눌러</span>
        <br className={styles.mobileBr} />
        <span>여행지를 찾아보세요.</span>
      </div>
    </>
  );
}

type HomeHeroSceneProps = {
  containerRef: RefObject<HTMLDivElement>;
  portalEl: HTMLElement | null;
  boardRef: RefObject<HTMLDivElement>;
  polaroidItems: PolaroidItem[];
  onPieceLoaded: () => void;
  onCreateGame: () => void;
  onExplore: () => void;
};

function HomeHeroScene({
  containerRef,
  portalEl,
  boardRef,
  polaroidItems,
  onPieceLoaded,
  onCreateGame,
  onExplore,
}: HomeHeroSceneProps) {
  return (
    <section className={`ux-trigger ${styles.uxTrigger}`} aria-label="홈 히어로">
      <div
        className={`canvas-wrapper ${styles.canvasWrapper}`}
        ref={containerRef}
      />
      <HeroCopy onCreateGame={onCreateGame} onExplore={onExplore} />
      {portalEl &&
        createPortal(
          <BoardLayer boardRef={boardRef} onPieceLoaded={onPieceLoaded} />,
          portalEl
        )}
      <RegionRail items={polaroidItems} />
    </section>
  );
}

export default function HomeDicePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<THREE.Object3D | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const [portalEl, setPortalEl] = useState<HTMLElement | null>(null);

  const [loadedCount, setLoadedCount] = useState(0);
  const handlePieceLoaded = () => {
    setLoadedCount((count) => count + 1);
  };

  // Prefetch representative regions early to avoid delay
  const { data: regionsData } = useRepresentativeRegions();
  const polaroidItems: PolaroidItem[] = (regionsData?.data?.dataBody || [])
    .slice(0, 6)
    .map((r: any) => ({
      id: r.representativeRegionId,
      name: r.representativeRegionName,
      imgUrl: r.representativeRegionImageUrl || getAssetSrc(noImage),
    }));

  // Create a fixed-layer portal element so board isn't affected by parent transforms after routing
  useEffect(() => {
    const el = document.createElement("div");
    document.body.appendChild(el);
    setPortalEl(el);
    return () => {
      if (el && el.isConnected) {
        el.remove();
      }
      setPortalEl(null);
    };
  }, []);

  useEffect(() => {
    if (!portalEl) return;
    window.scrollTo(0, 0);
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current) return;
    if (polaroidItems.length === 0) return;

    // if (loadedCount === 5 && boardRef.current) {
    gsap.to(boardRef.current, {
      autoAlpha: 1,
      duration: 0.5,
      ease: "power2.out",
    });
    // }

    // Ensure initial hidden state for polaroid stack before timeline runs
    gsap.set(".polaroid-container", { opacity: 0, pointerEvents: "none" });
    gsap.set(`.${styles.polaroidHint}`, { autoAlpha: 0 });
    // Hide cards and set initial transform so fromTo works consistently
    gsap.set("[data-polaroid-card]", { autoAlpha: 0, y: 180, scale: 0.96 });
    // Reset bodies (avoid inheriting transforms if hot reloaded)
    gsap.set("[data-polaroid-body]", { x: 0, y: 0, rotate: 0 });

    /** 1) three 기본 세팅 */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const existingCanvas = containerRef.current.querySelector("canvas");
    if (existingCanvas) {
      containerRef.current.removeChild(existingCanvas);
    }
    containerRef.current.appendChild(renderer.domElement);

    // 조명(유리여도 약간 두는 게 좋아요)
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const dir = new THREE.DirectionalLight(0xffffff, 0.8);
    dir.position.set(3, 5, 7);
    scene.add(dir);

    // HDR 환경맵 – 유리 반사/굴절 느낌 강화
    let pmrem: PMREMGenerator | null = null;
    const hdrLoader = new RGBELoader();
    pmrem = new PMREMGenerator(renderer);
    hdrLoader.load("/hdr/royal_esplanade_1k.hdr", (hdr) => {
      const envMap = pmrem!.fromEquirectangular(hdr).texture;
      scene.environment = envMap;
      hdr.dispose();
    });

    /** 2) 렌더 루프 */
    let raf = 0;
    const animate = () => {
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    /** 3) 주사위 GLB 로드 */
    const loader = new GLTFLoader();
    loader.load(
      "/models/dice.glb",
      (gltf) => {
        const model = gltf.scene;
        // 필요 시 초기 스케일/정렬
        model.scale.set(1, 1, 1);
        // model.position.set(-3, 2.5, 0);
        model.position.set(0, 0, 0);
        // Z가 반대로 보이면 model.rotation.set(?, ?, Math.PI) 같이 조정
        scene.add(model);
        cubeRef.current = model;
      },
      undefined,
      (err) => console.error("GLB load error:", err)
    );

    /** 4) GSAP + ScrollTrigger */
    const cubePos = { x: 0, y: 0, z: 0 };
    const cubeRot = { x: 0, y: 0, z: 0 };
    const cubeScale = { x: 1, y: 1, z: 1 };

    // 로드된 모델에 매 프레임 적용
    const ticker = () => {
      const m = cubeRef.current;
      if (m) {
        m.position.set(cubePos.x, cubePos.y, cubePos.z);
        m.rotation.set(cubeRot.x, cubeRot.y, cubeRot.z);
        m.scale.set(cubeScale.x, cubeScale.y, cubeScale.z);
      }
    };
    gsap.ticker.add(ticker);

    gsap.to(boardRef.current, {
      autoAlpha: 1,
      duration: 0.5,
      ease: "power2.out",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".ux-trigger",
        start: "top top",
        end: "+=4600",
        scrub: 0.8,
        pin: ".canvas-wrapper",
        // markers: true,
      },
      defaults: { ease: "power2.out" },
    });

    tl.to(
      `.${styles.heroCopy}`,
      { autoAlpha: 0, y: -16, duration: 0.5, ease: "power2.in" },
      2.7
    );

    tl.to(
      [
        `.${styles.pOuterLeft}`,
        `.${styles.pMidLeft}`,
        `.${styles.pCenter}`,
        `.${styles.pMidRight}`,
        `.${styles.pOuterRight}`,
      ],
      {
        y: (i) => [-90, -60, -20, -60, -90][i] + "vh",
        autoAlpha: 0,
        duration: 1,
        ease: "power2.in",
      },
      3
    );

    // 던지는 느낌으로 왼쪽 위에서 중앙으로 천천히 회전하며 이동
    tl.fromTo(
      cubePos,
      { x: -3, y: 2, z: 0 },
      { x: 0, y: 0, z: 0, duration: 1.5 },
      0
    ).fromTo(
      cubeRot,
      { x: 0, y: 0, z: 0 },
      {
        x: "+=" + Math.PI * 2,
        y: "+=" + Math.PI * 1,
        z: "+=" + Math.PI * 0.5,
        duration: 1.5,
      },
      0
    );

    // 중앙에서 여유 있게 회전 (브랜드 강조)
    tl.to(
      cubeRot,
      {
        x: "+=" + Math.PI * 2,
        y: "+=" + Math.PI * 1,
        z: "+=" + Math.PI * 0.5,
        duration: 1.5,
        ease: "none",
      },
      1.5
    );

    // 확대 + 오른쪽 하단으로 이동
    tl.to(cubeScale, { x: 1.5, y: 1.5, z: 1.5, duration: 1.2 }, 3);
    tl.to(
      cubePos,
      { x: 3, y: 0, z: 0, duration: 1.2, ease: "power2.inOut" },
      3
    );

    tl.to({}, { duration: 1 }); // pause for 1 second at time = 4.2

    // 폴라로이드 등장 + 스택 쌓기
    tl.set(".polaroid-container", { opacity: 1, pointerEvents: "auto" }, 5.2)
      // 1) 카드 자체를 아래에서 위로 하나씩 등장 (그리드 자리로 등장)
      .fromTo(
        "[data-polaroid-card]",
        { autoAlpha: 0, y: 180, scale: 0.96 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
          // 아래에서 위로 차례대로 올라오게
          stagger: { each: 0.28, from: "start" }, // 마지막 카드가 먼저, 처음 카드가 맨 위로 오게 하려면 "start"
        },
        5.35
      )
      // 폴라로이드가 모두 등장한 뒤, 힌트를 아래에서 위로 페이드 인
      .fromTo(
        `.${styles.polaroidHint}`,
        { autoAlpha: 0, y: 28 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" },
        ">-0.1"
      )
      // 주사위를 먼저 위로 이동시켜 화면에서 벗어나게
      .to(cubePos, { y: 6, duration: 1.0, ease: "power2.in" }, ">0.6")
      // 추가 스크롤에서 폴라로이드/힌트가 위로 사라지도록 처리
      .to(
        `.${styles.polaroidHint}`,
        { y: -40, autoAlpha: 0, duration: 0.5, ease: "power2.in" },
        ">1"
      )
      .to(
        ".polaroid-container",
        {
          y: "-=70vh",
          autoAlpha: 0,
          duration: 1.0,
          ease: "power2.in",
        },
        ">-0.2"
      )
      .set(".polaroid-container", { pointerEvents: "none" });

    ScrollTrigger.refresh();

    const chars = gsap.utils.toArray<HTMLElement>(".split-char");
    chars.forEach((el, i) => {
      tl.fromTo(
        el,
        { opacity: 1 },
        {
          opacity: 0,
          duration: 0.5,
          ease: "power2.in",
          delay: i * 0.05,
        },
        i * 0.05
      );
    });

    /** 5) 리사이즈 대응 */
    const onResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    /** 6) 정리 */
    return () => {
      window.removeEventListener("resize", onResize);
      gsap.ticker.remove(ticker);
      // Kill only triggers created by this component
      tl.scrollTrigger?.kill();
      tl.kill();
      // Clear only GSAP-related inline styles on our elements if they still exist
      const toClear = gsap.utils.toArray<HTMLElement>(
        `.${styles.piece}, .${styles.pieceBox}`
      );
      if (toClear.length) {
        gsap.set(toClear, { clearProps: "transform,opacity,will-change" });
      }
      cancelAnimationFrame(raf);
      renderer.dispose();
      pmrem?.dispose();
      scene.traverse((obj: THREE.Object3D) => {
        if ((obj as THREE.Mesh).isMesh) {
          const mesh = obj as THREE.Mesh;
          mesh.geometry?.dispose?.();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((m: THREE.Material) => m.dispose?.());
          } else {
            (mesh.material as THREE.Material)?.dispose?.();
          }
        }
      });
    };
  }, [polaroidItems.length, loadedCount, portalEl]);

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

  const handleExploreClick = () => {
    router.push("/spots");
  };

  return (
    <>
      <HomeHeroScene
        containerRef={containerRef}
        portalEl={portalEl}
        boardRef={boardRef}
        polaroidItems={polaroidItems}
        onPieceLoaded={handlePieceLoaded}
        onCreateGame={handleCreateClick}
        onExplore={handleExploreClick}
      />
      <CreateGameModal
        isOpen={isCreateModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />
    </>
  );
}
