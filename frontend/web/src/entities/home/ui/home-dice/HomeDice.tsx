"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/entities/users/model";
import { toast } from "react-toastify";
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
import LiquidButton from "@/shared/ui/common/LiquidButton/LiquidButton";

export default function HomeDicePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<THREE.Object3D | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current) return;

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

    console.log(containerRef.current);
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

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".ux-trigger",
        start: "top top",
        end: "+=3500",
        scrub: 0.8,
        pin: ".canvas-wrapper",
        // markers: true,
      },
      defaults: { ease: "power2.out" },
    });

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

    tl.to(
      ".button-container",
      {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      },
      4.2
    ).to(
      ".button-container",
      {
        opacity: 0,
        duration: 0.8,
        ease: "power2.in",
      },
      5.2
    );

    // 텍스트 애니메이션

    const texts = gsap.utils.toArray<HTMLElement>(".text");

    texts.forEach((el, i) => {
      const delay = parseFloat(String(Number(el.dataset.index) * 0.5) || "0");
      tl.to(
        el,
        {
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        },
        1.5 + delay
      ).to(
        el,
        {
          opacity: 0,
          duration: 0.6,
          ease: "power2.in",
        },
        2.5
      );
    });
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
      ScrollTrigger.getAll().forEach((t) => t.kill());
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
  }, []);

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
      <div className={`ux-trigger ${styles.uxTrigger}`}>
        <div
          className={`canvas-wrapper ${styles.canvasWrapper}`}
          ref={containerRef}
        />
        <div className={`${styles.logoText}`}>
          {"TripMarble".split("").map((char, i) => (
            <span key={i} className={`split-char`} data-char-index={i}>
              {char}
            </span>
          ))}
        </div>
        <div className={`text ${styles.fadeText}`} data-index="0">
          여행지 추천을 랜덤으로!
        </div>
        <div className={`text ${styles.fadeText}`} data-index="1">
          주사위를 굴려 여행을 떠나보세요!
        </div>
        {/* 버튼 */}
        <div className={`button-container ${styles.buttonContainer}`}>
          <Link href="/recommend">
            <LiquidButton
              width="100%"
              height="100%"
              fontSize="1.5rem"
              radius="lg"
              bgColor="primary"
              paddingSize="xl"
            >
              랜덤 여행지 추천받기
            </LiquidButton>
          </Link>
          <LiquidButton
            width="100%"
            height="100%"
            fontSize="1.5rem"
            radius="lg"
            bgColor="primary"
            paddingSize="xl"
            onClick={handleCreateClick}
          >
            게임 만들기
          </LiquidButton>
        </div>
        <CreateGameModal
          isOpen={isCreateModalOpen}
          onClose={() => setCreateModalOpen(false)}
        />
      </div>
    </>
  );
}
