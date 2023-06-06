import i18n from 'i18next';
import { useEffect, useState } from 'react';
import { initReactI18next, useTranslation } from 'react-i18next';
import { findBestLanguageTag, getLocales } from 'react-native-localize';
import { AppState } from 'react-native';

const TRANSLATION_NAMESPACE = 'translations';
const FALLBACK = 'en';

function getResourceJSONs(): any {
  return {
    hu: require('./hu.json'),
    en: require('./en.json'),
  };
}

export function getAvailable(
  resourceJSONs: any = getResourceJSONs(),
): string[] {
  return Object.keys(resourceJSONs);
}

function getTranslation(resourceJSON: any, code: string): any {
  return { [TRANSLATION_NAMESPACE]: resourceJSON[code] };
}

function getTranslationResourceObject(): any {
  const resource: any = {};
  const resourceJSONs = getResourceJSONs();
  for (const languageCode of getAvailable(resourceJSONs)) {
    resource[languageCode] = getTranslation(resourceJSONs, languageCode);
  }
  return resource;
}

const startingLanguageCode: string =
  findBestLanguageTag(getAvailable())?.languageTag || FALLBACK;
i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3', // remove this if pluralisation is needed and may use intl-pluralrules
  defaultNS: TRANSLATION_NAMESPACE,
  lng: startingLanguageCode,
  fallbackLng: FALLBACK,
  resources: getTranslationResourceObject(),
});

export const initializeLocalization = () => i18n;

export const onLanguageChange = (languageCode: string) => {
  i18n.changeLanguage(languageCode);
};

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

export type TextKey =
  | string
  | TemplateStringsArray
  | (string | TemplateStringsArray)[];

/* eslint-disable react-hooks/rules-of-hooks, @typescript-eslint/no-shadow */
export const t = (key: TextKey) => {
  const { t } = useTranslation();
  return t(key);
};

export default i18n;
