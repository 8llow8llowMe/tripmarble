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
import { SectionHeader } from '@/components/layout/header/SectionHeader';
import { DUMMY_PLACES } from '@/constants/dummyData';

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
  onPressItem,
}: {
  title: string;
  data: typeof DUMMY_PLACES;
  onPressItem: (tripSpotId: string) => void;
}) => {
  const itemWidth = 220;

  return (
    <View style={styles.section}>
      <SectionHeader title={title} />
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
            onPress={() => onPressItem(item.id)}
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
                <TextBox size={17} fontsName="Pretendard700" color={palette.white}>
                  {item.name}
                </TextBox>
                <View style={styles.ratingRow}>
                  {/* <Ionicons name="star" size={14} color="#FFD166" />
                  <TextBox size={14} color={palette.white} style={{ marginLeft: 4 }}>
                    {item.score.toFixed(1)}
                  </TextBox> */}
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
      <TextBox size={11} color={palette.white}>
        {text}
      </TextBox>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginTop: 22 },

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
});
