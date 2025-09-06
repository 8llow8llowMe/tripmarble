import TextBox from '@/components/atom/TextBox';
import { palette } from '@/constants/colors';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Asset } from 'expo-asset';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Markdown, { MarkdownIt } from 'react-native-markdown-display';

const markdownItInstance = MarkdownIt({ typographer: true });

const PrivacyPolicySheet = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    const load = async () => {
      const asset = Asset.fromModule(require('../../../assets/legals/privacy_policy.md'));
      await asset.downloadAsync();
      const text = await fetch(asset.uri).then((r) => r.text());
      setContent(text);
    };
    load();
  }, []);

  return (
    <View style={styles.container}>
      <BottomSheetScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={{ flexGrow: 1, gap: 16, paddingBottom: 12 }}>
          <TextBox size={14} fontsName="Pretendard600" style={{ alignSelf: 'center' }}>
            개인정보처리방침
          </TextBox>
        </View>
        <Markdown markdownit={markdownItInstance} style={mdStyles}>
          {content}
        </Markdown>
      </BottomSheetScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: palette.white,
    alignItems: 'center',
    width: '100%',
    paddingBottom: 90,
  },
});

const mdStyles = StyleSheet.create({
  body: {
    fontSize: 14,
    lineHeight: 22,
    color: palette.gray800,
  },
  heading2: {
    marginTop: 16,
    marginBottom: 8,
    fontSize: 16,
    fontWeight: '700',
    color: palette.gray800,
  },
  list_item: {
    marginTop: 2,
    marginBottom: 2,
    lineHeight: 20,
  },
  strong: {
    fontWeight: '600',
    color: palette.mainColor,
  },
});

export default PrivacyPolicySheet;
