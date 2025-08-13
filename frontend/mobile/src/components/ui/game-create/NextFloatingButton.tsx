import React, { useEffect, useRef } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  ViewStyle,
  AccessibilityRole,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  visible: boolean; // 나타낼지 여부
  onPress: () => void; // 눌렀을 때
  style?: ViewStyle; // 위치 커스텀(선택)
  label?: string; // 접근성 라벨
  iconName?: React.ComponentProps<typeof Ionicons>['name'];
};

export default function NextFloatingButton({
  visible,
  onPress,
  style,
  label = '다음 섹션으로 이동',
  iconName = 'arrow-down',
}: Props) {
  const scale = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (visible) {
      // 등장 애니메이션
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, friction: 7 }).start();
      // 펄스 반복
      const loop = Animated.loop(
        Animated.sequence([
          Animated.timing(pulse, {
            toValue: 1.08,
            duration: 700,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(pulse, {
            toValue: 1,
            duration: 600,
            easing: Easing.in(Easing.quad),
            useNativeDriver: true,
          }),
        ]),
      );
      loop.start();
      return () => loop.stop();
    } else {
      scale.setValue(0);
      pulse.setValue(1);
    }
  }, [visible, scale, pulse]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[styles.wrap, style, { transform: [{ scale }, { scale: pulse }] }]}
      pointerEvents="box-none"
    >
      <TouchableOpacity
        accessibilityRole={'button' as AccessibilityRole}
        accessibilityLabel={label}
        activeOpacity={0.85}
        onPress={onPress}
        style={styles.btn}
      >
        <Ionicons name={iconName} size={22} color="#111827" />
      </TouchableOpacity>
    </Animated.View>
  );
}

const SIZE = 52;

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    bottom: 20, // 필요 시 부모에서 덮어쓰기
    alignSelf: 'center',
  },
  btn: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#111827',
    justifyContent: 'center',
    alignItems: 'center',
    // 살짝 그림자
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
});
