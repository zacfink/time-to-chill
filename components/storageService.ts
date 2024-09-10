// services/storageService.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const NAMES_KEY = 'names'; // Key to store names array

export const getNames = async (): Promise<string[]> => {
  try {
    const namesJson = await AsyncStorage.getItem(NAMES_KEY);
    if (namesJson) {
      return JSON.parse(namesJson);
    }
    return [];
  } catch (error) {
    console.error('Error retrieving names from AsyncStorage', error);
    return [];
  }
};

export const saveName = async (name: string): Promise<void> => {
  try {
    const names = await getNames();
    names.push(name);
    await AsyncStorage.setItem(NAMES_KEY, JSON.stringify(names));
  } catch (error) {
    console.error('Error saving name to AsyncStorage', error);
  }
};

export const clearNames = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(NAMES_KEY);
  } catch (error) {
    console.error('Error clearing names from AsyncStorage', error);
  }
};
