import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Languages, Check, ChevronDown } from 'lucide-react';
import { changeLanguage as executeChangeLanguage } from '../i18n';
import { useApp } from '../context/AppContext';

export interface LanguageOption {
  code: 'en' | 'hi' | 'mr';
  name: string;
  nativeName: string;
  badge: string;
  region: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', badge: 'EN', region: 'Global' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', badge: 'हि', region: 'भारत' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', badge: 'म', region: 'महाराष्ट्र' },
];

interface LanguageSelectorProps {
  variant?: 'navbar' | 'floating' | 'full';
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  variant = 'navbar',
  className = '' 
}) => {
  const { i18n, t } = useTranslation();
  const { setLanguage: setAppContextLanguage } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Normalize language code to 'en', 'hi', or 'mr'
  const currentLangCode = (i18n.language?.split('-')[0] as 'en' | 'hi' | 'mr') || 'en';
  const currentLang = LANGUAGES.find((l) => l.code === currentLangCode) || LANGUAGES[0];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageSelect = async (langCode: 'en' | 'hi' | 'mr') => {
    console.log(`🔘 [LanguageSelector] User clicked to change language to: "${langCode}"`);
    console.log(`🔘 [LanguageSelector] Previous i18n.language: "${i18n.language}"`);
    
    // 1. Call i18n.changeLanguage
    await executeChangeLanguage(langCode);
    
    // 2. Also notify AppContext so any legacy consumers sync immediately
    if (setAppContextLanguage) {
      setAppContextLanguage(langCode);
    }

    console.log(`✅ [LanguageSelector] Updated i18n.language is now: "${i18n.language}"`);
    setIsOpen(false);
  };

  if (variant === 'full') {
    return (
      <div className={`p-4 bg-slate-900 border border-slate-800 rounded-2xl ${className}`}>
        <div className="flex items-center space-x-2 text-emerald-400 mb-3">
          <Languages className="w-5 h-5" />
          <h3 className="font-bold text-sm text-white">
            {t('language.select', 'भाषा चुनें / Select Language')}
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {LANGUAGES.map((l) => {
            const isSelected = currentLangCode === l.code;
            return (
              <button
                key={l.code}
                id={`lang-btn-full-${l.code}`}
                onClick={() => handleLanguageSelect(l.code)}
                className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-emerald-600 text-white border-emerald-400 shadow-md shadow-emerald-950 font-bold scale-[1.02]'
                    : 'bg-slate-800/80 text-slate-200 border-slate-700 hover:bg-slate-700/80 hover:border-slate-600'
                }`}
              >
                <div>
                  <div className="text-base font-semibold">{l.nativeName}</div>
                  <div className={`text-xs ${isSelected ? 'text-emerald-100' : 'text-slate-400'}`}>
                    {l.name}
                  </div>
                </div>
                {isSelected && <Check className="w-4 h-4 text-white" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div ref={dropdownRef} className={`relative inline-block text-left ${className}`}>
      {/* Dropdown Toggle Button */}
      <button
        id="language-selector-dropdown-btn"
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={() => {
          console.log('🔘 [LanguageSelector] Dropdown toggled. Current state:', !isOpen);
          setIsOpen(!isOpen);
        }}
        className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-800/70 active:bg-emerald-900 text-emerald-100 text-xs sm:text-sm font-medium border border-emerald-700/60 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-emerald-900"
        title={t('language.select', 'Change Language')}
      >
        <Languages className="w-4 h-4 text-emerald-400 flex-shrink-0" />
        <span className="font-bold text-white tracking-wide">{currentLang.nativeName}</span>
        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-800 text-emerald-300 font-mono font-bold uppercase">
          {currentLang.badge}
        </span>
        <ChevronDown 
          className={`w-3.5 h-3.5 text-emerald-300 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          id="language-selector-menu"
          role="menu"
          className="absolute right-0 mt-2 w-48 rounded-xl bg-slate-900 border border-slate-700/90 shadow-2xl py-1.5 z-50 text-slate-200 transform origin-top-right focus:outline-none backdrop-blur-md"
        >
          <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 border-b border-slate-800 uppercase tracking-wider">
            {t('language.select', 'Select Language')}
          </div>

          <div className="py-1">
            {LANGUAGES.map((l) => {
              const isSelected = currentLangCode === l.code;
              return (
                <button
                  key={l.code}
                  id={`language-option-${l.code}`}
                  role="menuitem"
                  onClick={() => handleLanguageSelect(l.code)}
                  className={`w-full text-left px-3 py-2.5 text-xs sm:text-sm flex items-center justify-between transition-colors ${
                    isSelected
                      ? 'bg-emerald-950 text-emerald-300 font-bold border-l-4 border-emerald-400 pl-2'
                      : 'hover:bg-slate-800 text-slate-200 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <span className="w-6 h-6 rounded-md bg-slate-800 flex items-center justify-center text-xs font-bold text-emerald-400 border border-slate-700">
                      {l.badge}
                    </span>
                    <div>
                      <div className="font-semibold">{l.nativeName}</div>
                      <div className="text-[10px] text-slate-400">{l.name} • {l.region}</div>
                    </div>
                  </div>

                  {isSelected && (
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="px-3 py-1.5 text-[10px] text-slate-500 border-t border-slate-800/80 bg-slate-950/40">
            Active: <span className="text-emerald-400 font-mono font-semibold">{currentLangCode}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
