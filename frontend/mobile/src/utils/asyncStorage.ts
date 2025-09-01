import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAsyncStorageItem = async (key: string): Promise<string | null> => {
  return AsyncStorage.getItem(key);
};

export const setAsyncStorageItem = async (key: string, value: string): Promise<void> => {
  await AsyncStorage.setItem(key, value);
};

export const setAsyncStorageItems = async (
  items: { key: string; value: string }[],
): Promise<void> => {
  const entries: [string, string][] = items.map(({ key, value }) => [key, value]);
  await AsyncStorage.multiSet(entries);
};

export const removeAsyncStorageItem = async (key: string): Promise<void> => {
  await AsyncStorage.removeItem(key);
};

export const removeAsyncStorageItems = async (...keys: string[]): Promise<void> => {
  await AsyncStorage.multiRemove(keys);
};
