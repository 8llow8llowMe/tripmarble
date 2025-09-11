import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import congratulation from '@assets/lotties/congratulations.json';

type Props = {
  /** 보이기 여부 */
  visible: boolean;
  onFinish: () => void;
  size?: number;
};

export default function CongratulationView({ visible, onFinish, size = 220 }: Props) {
  const animationRef = useRef<LottieView>(null);

  if (!visible) return null;

  return (
    <View pointerEvents="none" style={styles.overlay}>
      <LottieView
        key={`congratulation`}
        ref={animationRef}
        source={congratulation}
        style={{ width: size, height: size }}
        autoPlay
        loop={false}
        onAnimationFinish={() => {
          setTimeout(() => {
            onFinish();
          }, 4000);
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
