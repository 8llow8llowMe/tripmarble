import { palette } from '@/constants/colors';
import { License, licenses } from '@/constants/licenses';
import { Ionicons } from '@expo/vector-icons';

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Linking,
  TouchableOpacity,
  Pressable,
} from 'react-native';

// Author 타입 정의
interface Author {
  name: string;
  email?: string;
  url?: string;
}

// 타입 가드 함수들
const isAuthorObject = (author: License['author']): author is Author => {
  return typeof author === 'object' && author !== null && 'name' in author;
};

const isRepositoryObject = (
  repo: License['repository'],
): repo is NonNullable<License['repository']> => {
  return typeof repo === 'object' && repo !== null && 'url' in repo;
};

const LicenseScreen = () => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleItem = (libraryName: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(libraryName)) {
        newSet.delete(libraryName);
      } else {
        newSet.add(libraryName);
      }
      return newSet;
    });
  };

  const handleLinkPress = async (url: string | undefined) => {
    if (!url) return;

    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('링크를 열 수 없습니다:', error);
    }
  };

  const renderAuthor = (author: License['author']) => {
    if (!author) return null;

    if (isAuthorObject(author)) {
      return (
        <View style={styles.authorContainer}>
          <Text style={styles.authorLabel}>작성자:</Text>
          <Text style={styles.authorName}>{author.name}</Text>
          {author.email && <Text style={styles.authorEmail}>{author.email}</Text>}
        </View>
      );
    }

    // author가 문자열인 경우
    const authorName = typeof author === 'string' ? author : JSON.stringify(author);
    return (
      <View style={styles.authorContainer}>
        <Text style={styles.authorLabel}>작성자:</Text>
        <Text style={styles.authorName}>{authorName}</Text>
      </View>
    );
  };

  const renderRepository = (repository: License['repository']) => {
    if (!isRepositoryObject(repository)) return null;

    return (
      <TouchableOpacity onPress={() => handleLinkPress(repository.url)} style={styles.linkButton}>
        <Text style={styles.linkText}>저장소</Text>
      </TouchableOpacity>
    );
  };

  const renderLicenseItem = (license: License) => {
    const isExpanded = expandedItems.has(license.libraryName ?? '');

    return (
      <View key={license.libraryName} style={styles.licenseItem}>
        <Pressable
          onPress={() => toggleItem(license.libraryName ?? '')}
          style={styles.headerContainer}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.libraryName}>{license.libraryName}</Text>
            <Text style={styles.version}>v{license.version}</Text>
          </View>
          <Ionicons
            name={isExpanded ? 'chevron-up' : 'chevron-down'}
            size={18}
            color={palette.gray600}
          />
        </Pressable>

        {isExpanded && (
          <View style={styles.contentContainer}>
            <Text style={styles.description}>{license._description}</Text>

            <View style={styles.linkContainer}>
              {license.homepage && (
                <TouchableOpacity
                  onPress={() => handleLinkPress(license.homepage)}
                  style={styles.linkButton}
                >
                  <Text style={styles.linkText}>홈페이지</Text>
                </TouchableOpacity>
              )}

              {renderRepository(license.repository)}
            </View>

            {renderAuthor(license.author)}

            <View style={styles.licenseContainer}>
              <Text style={styles.licenseLabel}>라이선스:</Text>
              <Text style={styles.licenseType}>{license._license}</Text>
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={{ padding: 16 }}
      showsVerticalScrollIndicator={false}
    >
      {licenses.map(renderLicenseItem)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingBottom: 16,
  },
  licenseItem: {
    marginBottom: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  titleContainer: {
    flex: 1,
  },
  libraryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  version: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  expandIcon: {
    fontSize: 12,
    color: '#666',
    transform: [{ rotate: '0deg' }],
  },
  expandIconRotated: {
    transform: [{ rotate: '180deg' }],
  },
  contentContainer: {
    padding: 16,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  description: {
    fontSize: 14,
    color: '#444',
    paddingVertical: 12,
    lineHeight: 20,
  },
  linkContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 8,
  },
  linkButton: {
    backgroundColor: '#e9ecef',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  linkText: {
    color: palette.gray500,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  authorContainer: {
    marginBottom: 8,
  },
  authorLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  authorName: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  authorEmail: {
    fontSize: 14,
    color: '#666',
  },
  licenseContainer: {
    marginTop: 8,
  },
  licenseLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  licenseType: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
});

export default LicenseScreen;
