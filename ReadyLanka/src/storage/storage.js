import AsyncStorage from "@react-native-async-storage/async-storage";

const KEYS = {
  favorites: "@readylanka/favorites",
  checklist: "@readylanka/checklist",
  contacts: "@readylanka/contacts"
};

async function read(key, fallback = []) {
  try {
    const value = await AsyncStorage.getItem(key);
    const parsed = value ? JSON.parse(value) : fallback;
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

async function write(key, value) {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export const loadFavorites = () => read(KEYS.favorites);
export const saveFavorites = (value) => write(KEYS.favorites, value);
export const loadChecklist = () => read(KEYS.checklist);
export const saveChecklist = (value) => write(KEYS.checklist, value);
export const loadContacts = () => read(KEYS.contacts);
export const saveContacts = (value) => write(KEYS.contacts, value);
