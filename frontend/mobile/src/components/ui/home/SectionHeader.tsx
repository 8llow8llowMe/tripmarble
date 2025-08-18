import TextBox from '@/components/atom/TextBox';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { palette } from '@/constants/colors';

export function SectionHeader({
  title,
  onPressMore,
  rightNode,
}: {
  title: string;
  onPressMore?: () => void;
  rightNode?: React.ReactNode;
}) {
  return (
    <View style={styles.sectionHeader}>
      <TextBox size={18} fontsName="Pretendard700" color={palette.gray800}>
        {title}
      </TextBox>
      {rightNode ? (
        rightNode
      ) : onPressMore ? (
        <TouchableOpacity onPress={onPressMore} activeOpacity={0.85} style={styles.iconBtn}>
          <TextBox size={13} color={palette.gray600}>
            더보기
          </TextBox>
          <Ionicons name="chevron-forward" size={14} color={palette.gray600} />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 24 }} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  // Sections
  sectionHeader: {
    paddingHorizontal: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconBtn: { flexDirection: 'row', alignItems: 'center' },
});
