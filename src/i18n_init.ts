import i18n from 'i18next';
import { useEffect, useState } from 'react';
import { initReactI18next } from 'react-i18next';
import { findBestLanguageTag, getLocales } from 'react-native-localize';
import { AppState } from 'react-native';

const DEFAULT_NAMESPACE = 'translations';
const FALLBACK = 'en';

const resourceJSONs = {
  en: require('../assets/i18n/en.json'),
  hu: require('../assets/i18n/hu.json'),
} as const;

type ResourceKeys = keyof typeof resourceJSONs;

export function getAvailable(): ResourceKeys[] {
  return Object.keys(resourceJSONs) as ResourceKeys[];
}

// will call this from App.tsx to initalize
export const initializeLocalization = () => {
  const startingLanguageCode: string =
    findBestLanguageTag(getAvailable())?.languageTag || FALLBACK;
  i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3', // modify if pluralization is required
    defaultNS: DEFAULT_NAMESPACE,
    lng: startingLanguageCode,
    fallbackLng: FALLBACK,
    resources: resourceJSONs,
  });
};

export const onLanguageChange = (languageCode: string) => {
  i18n.changeLanguage(languageCode);
};

// hook which listens to react-native-localize and returns the system wide languageCode.
export const useDeviceLanguageCode = () => {
  const [deviceLanguageCode, setDeviceLanguageCode] = useState<string>(
    getLocales()[0].languageCode ?? FALLBACK,
  );
  useEffect(() => {
    const subscription = AppState.addEventListener('change', () => {
      setDeviceLanguageCode(getLocales()[0].languageCode ?? FALLBACK);
    });
    return () => subscription.remove();
  });

  return deviceLanguageCode;
};

export default i18n;
