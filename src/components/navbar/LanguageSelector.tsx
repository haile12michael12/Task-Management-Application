import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/utils/cn';

interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

const languages: LanguageOption[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸'
  },
  {
    code: 'am',
    name: 'Amharic',
    nativeName: 'አማርኛ',
    flag: '🇪🇹'
  }
];

const LanguageSelector: React.FC = () => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const currentLanguage = i18n.language.split('-')[0]; // Get base language code
  
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  const getCurrentLanguage = () => {
    return languages.find(lang => lang.code === currentLanguage) || languages[0];
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={t('common.selectLanguage', 'Select language')}
      >
        <Globe className="h-5 w-5" />
        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[8px] text-primary-foreground flex items-center justify-center font-bold">
          {getCurrentLanguage().flag}
        </span>
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-64 bg-background border border-border rounded-lg shadow-lg py-2 z-50">
            <div className="px-4 py-2 border-b border-border">
              <h3 className="text-sm font-medium text-foreground">
                {t('common.selectLanguage', 'Select Language')}
              </h3>
            </div>
            
            <div className="py-1">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => changeLanguage(language.code)}
                  className={cn(
                    'w-full flex items-center px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors',
                    currentLanguage === language.code && 'bg-accent text-accent-foreground'
                  )}
                >
                  <span className="text-lg mr-3">{language.flag}</span>
                  <div className="flex-1 text-left">
                    <div className="font-medium">{language.nativeName}</div>
                    <div className="text-xs text-foreground/60">{language.name}</div>
                  </div>
                  {currentLanguage === language.code && (
                    <Check className="h-4 w-4 text-accent-foreground" />
                  )}
                </button>
              ))}
            </div>
            
            <div className="px-4 py-2 border-t border-border text-xs text-foreground/60">
              {t('common.languagePreferenceSaved', 'Your language preference is saved')}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSelector;