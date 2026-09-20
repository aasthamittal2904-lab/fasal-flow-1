import { SupportedLanguage } from '../types';

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  badge: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', badge: 'EN' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', badge: 'हि' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', badge: 'म' },
];

export const UI_TRANSLATIONS = {
  en: {
    nav: {
      home: 'Home',
      dashboard: 'Dashboard',
      mandiPrices: 'Mandi Prices',
      browseLots: 'Browse Lots',
      myLots: 'My Lots',
      createLot: 'Create Lot',
      transport: 'Logistics',
      chat: 'Messages',
      profile: 'Profile',
      fasalMitra: 'Fasal Mitra AI',
      login: 'Sign In',
      logout: 'Sign Out',
    },
    hero: {
      tagline: 'DIRECT CROPS • ZERO EXPLOITATION • AI PRICE FORECASTS',
      title: 'Connecting Indian Farmers Directly with Buyers & Logistics',
      subtitle: 'Transparent 2% flat platform fee. Live AGMARKNET APMC mandi prices. AI quality grading and instant direct payments.',
      ctaCreateLot: 'Sell Your Produce',
      ctaBrowse: 'Explore Active Lots',
      ctaMandi: 'View Live Mandi Rates',
    },
    stats: {
      activeLots: 'Active Lots',
      farmersCount: 'Verified Farmers',
      dailyTrade: 'Daily Volume Traded',
      mandisCovered: 'APMC Mandis Live',
    },
  },
  hi: {
    nav: {
      home: 'होम',
      dashboard: 'डैशबोर्ड',
      mandiPrices: 'मंडी भाव',
      browseLots: 'फसल खरीदें',
      myLots: 'मेरी फसलें',
      createLot: 'फसल बेचें',
      transport: 'ट्रांसपोर्ट',
      chat: 'संदेश',
      profile: 'प्रोफाइल',
      fasalMitra: 'फसल मित्र AI',
      login: 'लॉग इन',
      logout: 'लॉग आउट',
    },
    hero: {
      tagline: 'सीधा व्यापार • बिचौलिया मुक्त • AI भाव पूर्वानुमान',
      title: 'किसानों को सीधे खरीदारों और ट्रांसपोर्ट से जोड़ें',
      subtitle: 'पारदर्शी 2% प्लेटफार्म शुल्क। वास्तविक एगमार्कनेट मंडी भाव। AI क्वालिटी ग्रेडिंग और सुरक्षित भुगतान।',
      ctaCreateLot: 'अपनी फसल बेचें',
      ctaBrowse: 'उपलब्ध फसलें देखें',
      ctaMandi: 'लाइव मंडी भाव देखें',
    },
    stats: {
      activeLots: 'सक्रिय फसलें',
      farmersCount: 'सत्यापित किसान',
      dailyTrade: 'दैनिक व्यापार मात्रा',
      mandisCovered: 'लाइव APMC मंडियां',
    },
  },
  mr: {
    nav: {
      home: 'मुख्यपृष्ठ',
      dashboard: 'डॅशबोर्ड',
      mandiPrices: 'बाजारभाव',
      browseLots: 'पिके खरेदी करा',
      myLots: 'माझी पिके',
      createLot: 'पीक विका',
      transport: 'वाहतूक',
      chat: 'संदेश',
      profile: 'प्रोफाइल',
      fasalMitra: 'पीक मित्र AI',
      login: 'लॉग इन',
      logout: 'लॉग आउट',
    },
    hero: {
      tagline: 'थेट शेतमाल • शून्य मध्यस्थ • AI दर अंदाज',
      title: 'शेतकऱ्यांना थेट खरेदीदार व वाहतूकदारांशी जोडा',
      subtitle: 'पारदर्शक २% प्लॅटफॉर्म फी. थेट ॲगमार्कनेट बाजारभाव. AI गुणवत्ता तपासणी व त्वरित थेट पेमेंट्स.',
      ctaCreateLot: 'शेतीमाल विक्री करा',
      ctaBrowse: 'उपलब्ध माल पहा',
      ctaMandi: 'थेट बाजारभाव पहा',
    },
    stats: {
      activeLots: 'सक्रिय पिके',
      farmersCount: 'प्रमाणित शेतकरी',
      dailyTrade: 'दैनिक व्यापार प्रमाण',
      mandisCovered: 'थेट APMC मंडया',
    },
  },
};
