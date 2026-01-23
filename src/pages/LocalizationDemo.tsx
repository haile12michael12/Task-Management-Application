import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Globe, Languages } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';

const LocalizationDemo: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
    { code: 'am', name: 'Amharic', nativeName: 'አማርኛ', flag: '🇪🇹' }
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            <Languages className="inline-block mr-3 h-10 w-10 text-primary" />
            {t('common.localizationDemo', 'Localization Demo')}
          </h1>
          <p className="text-xl text-muted-foreground">
            {t('common.testDifferentLanguages', 'Test the application in different languages')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                {t('common.currentLanguage', 'Current Language')}
              </CardTitle>
              <CardDescription>
                {t('common.currentlyUsing', 'You are currently using')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">
                    {languages.find(lang => lang.code === i18n.language)?.flag || '🇺🇸'}
                  </span>
                  <div>
                    <div className="font-medium">
                      {languages.find(lang => lang.code === i18n.language)?.nativeName || 'English'}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {languages.find(lang => lang.code === i18n.language)?.name || 'English'}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {t('common.languageCode', 'Code')}: {i18n.language}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('common.switchLanguage', 'Switch Language')}</CardTitle>
              <CardDescription>
                {t('common.choosePreferredLanguage', 'Choose your preferred language')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {languages.map((language) => (
                  <Button
                    key={language.code}
                    variant={i18n.language === language.code ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => changeLanguage(language.code)}
                  >
                    <span className="text-xl mr-3">{language.flag}</span>
                    <div className="text-left">
                      <div className="font-medium">{language.nativeName}</div>
                      <div className="text-xs text-muted-foreground">{language.name}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t('common.translatedContent', 'Translated Content')}</CardTitle>
            <CardDescription>
              {t('common.examplesOfTranslatedText', 'Examples of translated text in the current language')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3 text-lg">{t('common.navigation', 'Navigation')}</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between py-2 border-b">
                    <span>{t('common.home')}</span>
                    <span className="text-muted-foreground">/{t('common.home')}</span>
                  </li>
                  <li className="flex justify-between py-2 border-b">
                    <span>{t('common.dashboard')}</span>
                    <span className="text-muted-foreground">/{t('common.dashboard')}</span>
                  </li>
                  <li className="flex justify-between py-2 border-b">
                    <span>{t('common.budgets')}</span>
                    <span className="text-muted-foreground">/{t('common.budgets')}</span>
                  </li>
                  <li className="flex justify-between py-2 border-b">
                    <span>{t('common.transactions')}</span>
                    <span className="text-muted-foreground">/{t('common.transactions')}</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3 text-lg">{t('common.actions', 'Actions')}</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between py-2 border-b">
                    <span>{t('common.profile')}</span>
                    <span className="text-muted-foreground">/{t('common.profile')}</span>
                  </li>
                  <li className="flex justify-between py-2 border-b">
                    <span>{t('common.settings')}</span>
                    <span className="text-muted-foreground">/{t('common.settings')}</span>
                  </li>
                  <li className="flex justify-between py-2 border-b">
                    <span>{t('common.signOut')}</span>
                    <span className="text-muted-foreground">/{t('common.signOut')}</span>
                  </li>
                  <li className="flex justify-between py-2 border-b">
                    <span>{theme === 'dark' ? t('common.lightMode') : t('common.darkMode')}</span>
                    <span className="text-muted-foreground">/theme</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>{t('common.languagePreferenceNotice', 'Your language preference is automatically saved and will persist across sessions.')}</p>
          <p className="mt-2">{t('common.browserDetection', 'The system automatically detects your browser language on first visit.')}</p>
        </div>
      </div>
    </div>
  );
};

export default LocalizationDemo;