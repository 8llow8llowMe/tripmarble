import TextBox from '@/components/atom/TextBox';
import { LinearGradient } from 'expo-linear-gradient';
import {
  FlatList,
  ImageBackground,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { palette } from '@/constants/colors';
import { SectionHeader } from './SectionHeader';

const DUMMY_PLACES = [
  {
    id: 1,
    name: '부산 해운대',
    image:
      'https://images.unsplash.com/photo-1517959105821-eaf2591984dd?q=80&w=1600&auto=format&fit=crop',
    tags: ['바다', '야경'],
    score: 4.7,
  },
  {
    id: 2,
    name: '강릉 안목해변',
    image:
      'https://images.unsplash.com/photo-1504604792257-22ebeb14f00a?q=80&w=1600&auto=format&fit=crop',
    tags: ['카페', '여유'],
    score: 4.5,
  },
  {
    id: 3,
    name: '제주 성산일출봉',
    image:
      'https://images.unsplash.com/photo-1607863680051-7e2d0d0e1a8f?q=80&w=1600&auto=format&fit=crop',
    tags: ['등산', '자연'],
    score: 4.8,
  },
];

// 공통 그림자
const shadow = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  android: { elevation: 3 },
});

const RecommendedPlacesSection = ({
  title,
  data,
  // onPressItem,
  onPressMore,
}: {
  title: string;
  data: typeof DUMMY_PLACES;
  // onPressItem? (id: number) => void;
  onPressMore?: () => void;
}) => {
  const itemWidth = 220;
  return (
    <View style={styles.section}>
      <SectionHeader title={title} onPressMore={onPressMore} />
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        snapToAlignment="start"
        decelerationRate="fast"
        snapToInterval={itemWidth + 12}
        ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.placeCard, { width: itemWidth }, shadow]}
            activeOpacity={0.9}
            // onPress={() => onPressItem(item.id)}
          >
            <ImageBackground
              source={{ uri: item.image }}
              style={styles.placeImage}
              imageStyle={{ borderRadius: 14 }}
            >
              <LinearGradient
                colors={['rgba(0,0,0,0.05)', 'rgba(0,0,0,0.55)']}
                style={StyleSheet.absoluteFill}
              />
              <View style={styles.placeInfo}>
                <View style={styles.tagRow}>
                  {item.tags.slice(0, 2).map((t) => (
                    <MiniTag key={t} text={t} />
                  ))}
                </View>
                <View style={{ flex: 1 }} />
                <TextBox size={17} fontsName="Pretendard700" color="#fff">
                  {item.name}
                </TextBox>
                <View style={styles.ratingRow}>
                  <Ionicons name="star" size={14} color="#FFD166" />
                  <TextBox size={14} color="#fff" style={{ marginLeft: 4 }}>
                    {item.score.toFixed(1)}
                  </TextBox>
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default RecommendedPlacesSection;

function MiniTag({ text }: { text: string }) {
  return (
    <View style={styles.tag}>
      <TextBox size={11} color="#fff">
        {text}
      </TextBox>
    </View>
  );
}

// ─────────────────────────────────────────────────────────────
// 스타일
// ─────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  // Sections
  section: { marginTop: 22 },
  sectionHeader: {
    paddingHorizontal: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconBtn: { flexDirection: 'row', alignItems: 'center' },

  // Places
  placeCard: { borderRadius: 14, overflow: 'hidden' },
  placeImage: { width: '100%', height: 160, justifyContent: 'flex-end' },
  placeInfo: { padding: 12 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  tagRow: { flexDirection: 'row', gap: 6 },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 999,
  },

  // Journal
  journalCard: {
    backgroundColor: palette.white,
    borderRadius: 12,
    overflow: 'hidden',
  },
  journalPhoto: { width: '100%', height: 90 },

  // Random
  randomCard: { marginHorizontal: 16, borderRadius: 16, overflow: 'hidden' },
  randomBG: { height: 150 },
  randomInner: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Friends
  friendsBanner: {
    marginTop: 24,
    marginHorizontal: 16,
    padding: 14,
    borderRadius: 16,
    backgroundColor: '#2F80ED',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatar: { width: 28, height: 28, borderRadius: 14, borderWidth: 2, borderColor: '#fff' },
  inviteBtn: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.22)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    alignItems: 'center',
  },
});
