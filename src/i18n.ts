import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './locales/en/translation.json';
import hiTranslation from './locales/hi/translation.json';
import mrTranslation from './locales/mr/translation.json';

export const defaultNS = 'translation';
export const resources = {
  en: {
    translation: enTranslation,
  },
  hi: {
    translation: hiTranslation,
  },
  mr: {
    translation: mrTranslation,
  },
} as const;

// Get initially saved language from localStorage (or fallback to 'en')
const initialLanguage = (() => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('fasalflow_lang') || localStorage.getItem('i18nextLng');
    if (saved && (saved === 'en' || saved === 'hi' || saved === 'mr')) {
      return saved;
    }
  }
  return 'en';
})();

console.log('🌐 [i18n] Initializing i18next with language:', initialLanguage);

i18n
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources,
    lng: initialLanguage,
    fallbackLng: 'en',
    defaultNS,
    supportedLngs: ['en', 'hi', 'mr'],
    interpolation: {
      escapeValue: false, // React already safeguards from XSS
    },
    react: {
      useSuspense: false, // Disables Suspense requirement to prevent blank page flashes
      bindI18n: 'languageChanged loaded',
      bindI18nStore: 'added removed',
    },
  });

// Debug event listeners for language change verification
i18n.on('languageChanged', (lng) => {
  console.log('🌐 [i18n] Event fired: languageChanged ->', lng);
  if (typeof window !== 'undefined') {
    localStorage.setItem('fasalflow_lang', lng);
    localStorage.setItem('i18nextLng', lng);
  }
});

i18n.on('initialized', (options) => {
  console.log('🌐 [i18n] Event fired: initialized with options ->', options.lng);
});

export const changeLanguage = async (newLang: 'en' | 'hi' | 'mr') => {
  console.log('🌐 [i18n] changeLanguage requested:', newLang, 'current is:', i18n.language);
  try {
    await i18n.changeLanguage(newLang);
    console.log('🌐 [i18n] changeLanguage resolved! Active language is now:', i18n.language);
    if (typeof window !== 'undefined') {
      localStorage.setItem('fasalflow_lang', newLang);
      localStorage.setItem('i18nextLng', newLang);
      // Dispatch a custom window event for any non-hook subscribers
      window.dispatchEvent(new CustomEvent('appLanguageChanged', { detail: { language: newLang } }));
    }
  } catch (error) {
    console.error('❌ [i18n] Failed to change language:', error);
  }
};

export default i18n;
