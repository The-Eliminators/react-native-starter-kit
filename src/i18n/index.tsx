import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { LogBox } from 'react-native';
import English from './languages/English';
import Marathi from './languages/Marathi';

LogBox.ignoreLogs(['i18next is already initialized. You should call init just once!']);

export const resources = {
  en: { translation: English },
  mr: { translation: Marathi },
} as const;

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  debug: true,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
