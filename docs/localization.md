# React Localization Implementation

This project uses `react-i18next` for internationalization support with automatic language detection and persistence.

## Features

- **Automatic Language Detection**: Detects browser language on first visit
- **Language Persistence**: Saves user preference to localStorage
- **Real-time Translation**: Instant language switching without page reload
- **Multiple Languages**: Currently supports English and Amharic
- **Navbar Integration**: Language selector integrated into both navbar components

## File Structure

```
src/
├── locales/
│   ├── en.ts          # English translations
│   ├── am.ts          # Amharic translations
│   └── i18n.ts        # i18next configuration
├── components/
│   └── navbar/
│       ├── LanguageSelector.tsx    # Language selector dropdown
│       ├── AdvancedNavbar.tsx      # Navbar with localization
│       └── TopNavbar.tsx           # Navbar with localization
└── pages/
    └── LocalizationDemo.tsx        # Demo page showcasing localization
```

## Usage

### In Components

```tsx
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('common.home')}</h1>
      <p>{t('common.welcomeMessage', 'Welcome!')}</p>
    </div>
  );
};
```

### Changing Language Programmatically

```tsx
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  
  return (
    <div>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('am')}>አማርኛ</button>
    </div>
  );
};
```

## Adding New Languages

1. Create a new translation file in `src/locales/` (e.g., `fr.ts` for French)
2. Export the translations following the same structure as `en.ts`
3. Import and add the new language to `i18n.ts` resources
4. Add the language to the `languages` array in `LanguageSelector.tsx`

### Example for French:

```tsx
// src/locales/fr.ts
import { Translations } from './en';

export const fr: Translations = {
  common: {
    home: 'Accueil',
    dashboard: 'Tableau de bord',
    // ... other translations
  },
  transactionParser: {
    // ... translations
  }
};

// src/locales/i18n.ts
import { fr } from './fr';

const resources = {
  en: { translation: en },
  am: { translation: am },
  fr: { translation: fr }  // Add new language
};

// src/components/navbar/LanguageSelector.tsx
const languages: LanguageOption[] = [
  // ... existing languages
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷'
  }
];
```

## Translation Keys Structure

Translations are organized in namespaces:

- `common`: Shared translations used across the application
- `transactionParser`: Specific to transaction parsing functionality

### Common Namespace Keys

```
common: {
  home: 'Home',
  dashboard: 'Dashboard',
  budgets: 'Budgets',
  transactions: 'Transactions',
  goals: 'Goals',
  reports: 'Reports',
  advanced: 'Advanced',
  settings: 'Settings',
  profile: 'Profile',
  signOut: 'Sign Out',
  selectLanguage: 'Select Language',
  languagePreferenceSaved: 'Your language preference is saved'
}
```

## Browser Language Detection

The system automatically detects the user's browser language on first visit using:
- `localStorage` (if previously saved)
- Browser `navigator.language`
- HTML `lang` attribute
- URL path or subdomain (configurable)

## Persistence

Language preferences are stored in `localStorage` with the key `i18nextLng` and persist across browser sessions.

## Navbar Integration

Both `AdvancedNavbar` and `TopNavbar` components include:
- Language selector dropdown with flag indicators
- Real-time language switching
- Visual indication of current language
- Responsive design for mobile devices

The language selector is positioned in the top-right area of the navbar alongside other utility buttons.