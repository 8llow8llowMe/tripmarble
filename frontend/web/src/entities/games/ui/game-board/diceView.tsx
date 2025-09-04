import React, { useEffect, useRef } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";

type Props = {
  /** 보이기 여부 */
  visible: boolean;
  /** 주사위 값(1~6). null이면 렌더링하지 않음 */
  value: number | null;
  /** 애니메이션 종료 콜백. value를 그대로 넘김 */
  onFinish?: (value: number) => void;
  /** 주사위 표시 크기(px) */
  size?: number;
};

import dice1 from "@/shared/assets/lotties/dice-1.json";
import dice2 from "@/shared/assets/lotties/dice-2.json";
import dice3 from "@/shared/assets/lotties/dice-3.json";
import dice4 from "@/shared/assets/lotties/dice-4.json";
import dice5 from "@/shared/assets/lotties/dice-5.json";
import dice6 from "@/shared/assets/lotties/dice-6.json";

const DiceView: React.FC<Props> = ({
  visible,
  value,
  onFinish,
  size = 220,
}) => {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  const diceSources: Record<number, any> = {
    1: dice1,
    2: dice2,
    3: dice3,
    4: dice4,
    5: dice5,
    6: dice6,
  };

  useEffect(() => {
    const animation = lottieRef.current?.animationItem;
    if (!value) return;

    if (!animation && onFinish) {
      setTimeout(() => {
        onFinish(value);
      }, 4000);
    }
  }, [onFinish, value]);

  if (!visible || !value) return null;

  return (
    <div style={overlayStyle} aria-hidden>
      <Lottie
        key={`dice-${value}`}
        lottieRef={lottieRef}
        animationData={diceSources[value]}
        autoplay
        loop={false}
        style={{ width: size, height: size }}
      />
    </div>
  );
};

export default DiceView;

// 중앙 오버레이 스타일 (모바일과 동일한 레이어링)
const overlayStyle: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  pointerEvents: "none",
  zIndex: 20,
};
