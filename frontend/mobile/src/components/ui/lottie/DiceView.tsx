import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import dice1 from '@assets/lotties/dice-1.json';
import dice2 from '@assets/lotties/dice-2.json';
import dice3 from '@assets/lotties/dice-3.json';
import dice4 from '@assets/lotties/dice-4.json';
import dice5 from '@assets/lotties/dice-5.json';
import dice6 from '@assets/lotties/dice-6.json';

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

export default function DiceView({ visible, value, onFinish, size = 220 }: Props) {
  const animationRef = useRef<LottieView>(null);

  if (!visible || !value) return null;

  const diceSources: Record<number, any> = {
    1: dice1,
    2: dice2,
    3: dice3,
    4: dice4,
    5: dice5,
    6: dice6,
  };

  return (
    <View pointerEvents="none" style={styles.overlay}>
      <LottieView
        key={`dice-${value}`}
        ref={animationRef}
        source={diceSources[value]}
        style={{ width: size, height: size }}
        autoPlay
        loop={false}
        onAnimationFinish={() => {
          if (onFinish && value) onFinish(value);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  },
});
