import { Translations } from './en';

export const am: Translations = {
  common: {
    dashboard: 'ዳሽቦርድ',
    accounts: 'ሂሳቦች',
    transactions: 'ግብይቶች',
    budgets: 'በጀቶች',
    goals: 'ግቦች',
    reports: 'ሪፖርቶች',
    advanced: 'የላቀ',
    settings: 'ቅንብሮች',
    import: 'አስገባ',
    aiInsights: 'AI ግንዛቤዎች',
    notifications: 'ማሳወቂያዎች',
    howItWorks: 'እንዴት እንደሚሰራ',
    delete: 'አጥፋ',
    cancel: 'ሰርዝ',
    save: 'አስቀምጥ',
    edit: 'አርትዕ',
    confirm: 'አረጋግጥ',
    upload: 'ስቀል',
    clear: 'አጽዳ',
    search: 'ፈልግ',
    filter: 'አጣራ',
    all: 'ሁሉም',
    unknown: 'ያልታወቀ',
    selectLanguage: 'ቋንቋ ይምረጡ',
    languagePreferenceSaved: 'የእርስዎ የቋንቋ ምርጫ ተቀምጧል',
    home: 'መነሻ',
    products: 'ምርቶች',
    profile: 'መገለጫ',
    signOut: 'ውጣ',
    lightMode: 'ብርሃን ሁነታ',
    darkMode: 'ጨለማ ሁነታ',
    searchPlaceholder: 'ፈልግ...',
    localizationDemo: 'የቋንቋ ማስተካከያ ማሳያ',
    testDifferentLanguages: 'መተግበሪያውን በተለያዩ ቋንቋዎች ይሞክሩ',
    currentLanguage: 'የአሁኑ ቋንቋ',
    currentlyUsing: 'አሁን የሚጠቀሙበት',
    languageCode: 'ኮድ',
    switchLanguage: 'ቋንቋ ቀይር',
    choosePreferredLanguage: 'የምርጫ ቋንቋዎን ይምረጡ',
    translatedContent: 'የተተረጎመ ይዘት',
    examplesOfTranslatedText: 'በአሁኑ ቋንቋ የተተረጎመ ጽሑፍ ምሳሌዎች',
    navigation: 'አሰሳ',
    actions: 'ድርጊቶች',
    languagePreferenceNotice: 'የቋንቋ ምርጫዎ በራስ-ሰር ይቀመጣል እና በአንዳንድ ክፍለ ጊዜያዊ ክፍሎች ይቀጥላል።',
    browserDetection: 'ሲስተሙ በመጀመሪያ ጊዜ የአሳሽዎን ቋንቋ በራስ-ሰር ይገኛል።',
  },
  transactionParser: {
    title: 'የግብይት ተንታኝ',
    subtitle: 'የባንክ መግለጫዎችዎን ይስቀሉ እና ይተንትኑ',
    uploadTitle: 'የባንክ መግለጫ ይስቀሉ',
    uploadDesc: 'የእርስዎን CSV ወይም PDF ፋይሎች እዚህ ይጎትቱ',
    uploadButton: 'ፋይሎችን ይምረጡ',
    uploading: 'በመጫን ላይ...',
    clearData: 'ውሂብ አጽዳ',
    filters: {
      title: 'ማጣሪያዎች',
      startDate: 'የመጀመሪያ ቀን',
      endDate: 'የመጨረሻ ቀን',
      category: 'ምድብ',
      reset: 'ማጣሪያዎችን ዳግም አስጀምር',
    },
    summary: {
      title: 'የወጪ ማጠቃለያ',
      totalSpent: 'ጠቅላላ ወጪ',
      totalCredits: 'ጠቅላላ ክሬዲት',
      netSpending: 'የተጣራ ወጪ',
      transactionCount: 'ግብይቶች',
      categories: 'ምድቦች',
    },
    table: {
      date: 'ቀን',
      description: 'መግለጫ',
      category: 'ምድብ',
      source: 'ምንጭ',
      amount: 'መጠን',
      actions: 'ድርጊቶች',
      noTransactions: 'ምንም ግብይቶች አልተገኙም። ለመጀመር የCSV ወይም PDF ፋይል ይስቀሉ።',
    },
    deleteModal: {
      title: 'ግብይትን ሰርዝ',
      message: 'ይህንን ግብይት በእርግጠኝነት መሰረዝ ይፈልጋሉ? ይህ ድርጊት ሊቀለበስ አይችልም።',
      confirm: 'ሰርዝ',
    },
    howItWorks: {
      title: 'ይህ ጣቢያ እንዴት እንደሚሰራ',
      privacyTitle: 'የእርስዎ ግላዊነት ቅድሚያ የሚሰጠው ነው',
      privacyDesc: 'ሁሉም ሂደቶች በአሳሽዎ ውስጥ በአካባቢው ይከናወናሉ። የባንክ መግለጫዎችዎ እና የግብይት ውሂብዎ ከመሳሪያዎ አይወጡም።',
      stepsTitle: 'እንዴት እንደሚሰራ',
      step1: 'ስቀል፡ የባንክ መግለጫዎችዎን (CSV ወይም PDF) ወደ መጫኛ ቦታው ይጎትቱ',
      step2: 'ተንትን፡ መተግበሪያው ፋይሎችዎን በአካባቢው ይተነትናል',
      step3: 'መደብ፡ ግብይቶች በራስ-ሰር ይመደባሉ',
      step4: 'ተንትን፡ የወጪ ማጠቃለያዎችን ይመልከቱ እና በቀን ያጣሩ',
    },
    notes: {
      amex: 'CSV/PDF ድጋፍ: አሜሪካን ኤክስፕረስ ክሬዲት ካርድ',
      apple: 'CSV/PDF ድጋፍ: አፕል ክሬዲት ካርድ',
      usbank: 'CSV/PDF ድጋፍ: የዩኤስ ባንክ ክሬዲት ካርድ',
    },
    helpContent: {
      amex: {
        title: 'የአሜሪካን ኤክስፕረስ PDF እንዴት እንደሚገኝ',
        steps: [
          { text: 'ወደ አሜሪካን ኤክስፕረስ መለያዎ ይግቡ እና <strong>Statements & Activity</strong> ላይ ጠቅ ያድርጉ', altText: 'የአሜሪካን ኤክስፕረስ አሰሳ መግለጫዎች እና እንቅስቃሴ ትርን ያሳያል' },
          { text: '<strong>Go to PDF Statements</strong> የሚለውን ቁልፍ ይጫኑ', altText: 'ወደ PDF መግለጫዎች ሂድ ቁልፍ' },
          { text: 'ማውረድ የሚፈልጉትን መግለጫ ያግኙ እና <strong>Download</strong> ቁልፍን ይጫኑ', altText: 'የቅርብ ጊዜ መግለጫዎች ዝርዝር ከማውረድ ቁልፎች ጋር' },
          { text: '<strong>Billing Statement (PDF)</strong> የሚለውን ይምረጡ እና <strong>Download</strong> የሚለውን ይጫኑ', altText: 'የክፍያ መግለጫ PDF የተመረጠበት የፋይል አይነት ምርጫ ሳጥን' },
          { text: 'አንዴ ከወረደ፣ የእርስዎን PDF መግለጫ ለመምረጥ እና ለመጫን ከላይ ያለውን የመጫኛ ቁልፍ ይጠቀሙ', altText: '' }
        ]
      },
      apple: {
        title: 'የአፕል ካርድ መግለጫ እንዴት እንደሚገኝ',
        steps: [
          { text: 'በላፕቶፕዎ ላይ ወደ <strong>card.apple.com</strong> ይሂዱ እና <strong>Statements</strong> ላይ ጠቅ ያድርጉ', altText: 'የአፕል ካርድ ድህረ ገጽ የመግለጫዎች አማራጭን ያሳያል' },
          { text: 'የሚፈልጉትን መግለጫ ያግኙ እና በስተቀኝ በኩል ያለውን <strong>download icon</strong> ይጫኑ', altText: 'የመግለጫዎች ዝርዝር ከማውረድ አዶዎች ጋር' },
          { text: 'PDF ፋይሉን በመሳሪያዎ ላይ ያስቀምጡ፣ ከዚያ ለመምረጥ እና ለመጫን ከላይ ያለውን የመጫኛ ቁልፍ ይጠቀሙ', altText: '' }
        ]
      }
    }
  }
};
