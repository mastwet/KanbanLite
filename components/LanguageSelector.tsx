import React, { useState } from 'react';
import { Languages, Globe, Check } from 'lucide-react';
import { useI18n, Language } from '../i18n';

const LANGUAGE_LABELS: Record<Language, string> = {
  en: 'English',
  zh: '中文'
};

const LANGUAGE_FLAGS: Record<Language, string> = {
  en: '🇺🇸',
  zh: '🇨🇳'
};

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage, t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-1.5 rounded hover:bg-slate-100 transition-colors text-sm font-medium text-slate-700"
        title={t.settings.settings}
      >
        <Globe size={18} />
        {/* <span className="hidden sm:inline">{LANGUAGE_FLAGS[language]}</span> */}
        <span className="hidden sm:inline">{LANGUAGE_LABELS[language]}</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10 cursor-default"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-slate-200 z-20 py-2 animate-in fade-in zoom-in-95 duration-100 origin-top-right">
            <div className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
              {t.settings.language}
            </div>
            {Object.entries(LANGUAGE_LABELS).map(([lang, label]) => (
              <button
                key={lang}
                onClick={() => {
                  setLanguage(lang as Language);
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-between px-4 py-2.5 text-sm hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{LANGUAGE_FLAGS[lang as Language]}</span>
                  <span className={language === lang ? 'text-blue-600 font-medium' : 'text-slate-700'}>
                    {label}
                  </span>
                </div>
                {language === lang && <Check size={16} className="text-blue-600" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
