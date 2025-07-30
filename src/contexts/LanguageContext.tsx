import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'te' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  te: {
    // Navigation
    home: 'హోమ్',
    about: 'మా గురించి',
    profile: 'ప్రొఫైల్',
    login: 'లాగిన్',
    back: 'వెనుకకు',
    converter: 'అనువాదం',
    
    // Home page
    siteTitle: 'నా ఊరు, నా స్వరం',
    siteSubtitle: 'మీ ప్రాంతాన్ని వివరించండి లేదా మీ సంప్రదాయాన్ని తెలుగులో పంచుకోండి 📜',
    culture: '🏛️ సంస్కృతి',
    traditions: '🎭 సంప్రదాయాలు',
    stories: '🗣️ కథలు',
    places: '📍 స్థలాలు',
    writeStory: '✍️ మీ కథను వ్రాయండి',
    storyTitle: 'కథ శీర్షిక',
    district: 'జిల్లా / ప్రాంతం',
    selectDistrict: 'మీ జిల్లాను ఎంచుకోండి',
    yourStory: 'మీ కథ',
    storyPlaceholder: 'మీ ఊరి గురించి, సంప్రదాయాల గురించి, లేదా ఏదైనా ప్రత్యేకమైన విషయం గురించి వ్రాయండి...',
    shareStory: 'కథను పంచుకోండి 🌟',
    otherStories: '🏛️ ఇతర కథలు మరియు సంప్రదాయాలు',
    noStories: 'ఇంకా కథలు లేవు',
    noStoriesDesc: 'మీరే మొదటి కథను పంచుకోండి! 🌟',
    thankYou: '🙏 ధన్యవాదాలు',
    thankYouDesc: 'మీ సంస్కృతిని మరియు సంప్రదాయాలను భాగస్వామ్యం చేసినందుకు ధన్యవాదాలు. మీ కథలు మన వారసత్వాన్ని భవిష్యత్ తరాలకు అందించడంలో సహాయపడతాయి.',
    
    // About page
    aboutTitle: 'మా గురించి 🌟',
    aboutSubtitle: '"నా ఊరు, నా స్వరం" ప్రాజెక్ట్ తెలుగు సంస్కృతిని మరియు సంప్రదాయాలను డిజిటల్ యుగంలో పరిరక్షించడానికి ఒక అద్భుతమైన వేదిక.',
    ourMission: 'మా లక్ష్యం',
    
    // Common
    incompleteInfo: 'అసంపూర్ణ సమాచారం',
    fillAllFields: 'దయచేసి అన్ని ఫీల్డ్‌లను పూర్తి చేయండి',
    storyAdded: 'కథ జోడించబడింది! 🎉',
    storyShared: 'మీ కథ విజయవంతంగా భాగస్వామ్యం చేయబడింది',
    audioStory: 'ఆడియో కథ',
    audioRecordingDesc: 'ఇది ఒక ఆడియో రికార్డింగ్. వినడానికి ప్లే బటన్ నొక్కండి.',
    unknownDistrict: 'తెలియని జిల్లా'
  },
  en: {
    // Navigation
    home: 'Home',
    about: 'About Us',
    profile: 'Profile',
    login: 'Login',
    back: 'Back',
    converter: 'Convert',
    
    // Home page
    siteTitle: 'My Region, My Voice',
    siteSubtitle: 'Describe your region or share your traditions in your language 📜',
    culture: '🏛️ Culture',
    traditions: '🎭 Traditions',
    stories: '🗣️ Stories',
    places: '📍 Places',
    writeStory: '✍️ Write Your Story',
    storyTitle: 'Story Title',
    district: 'District / Region',
    selectDistrict: 'Select your district',
    yourStory: 'Your Story',
    storyPlaceholder: 'Write about your village, traditions, or any special aspects of your region...',
    shareStory: 'Share Story 🌟',
    otherStories: '🏛️ Other Stories and Traditions',
    noStories: 'No stories yet',
    noStoriesDesc: 'Be the first to share a story! 🌟',
    thankYou: '🙏 Thank You',
    thankYouDesc: 'Thank you for sharing your culture and traditions. Your stories help preserve our heritage for future generations.',
    
    // About page
    aboutTitle: 'About Us 🌟',
    aboutSubtitle: '"My Region, My Voice" project is a wonderful platform to preserve Telugu culture and traditions in the digital age.',
    ourMission: 'Our Mission',
    
    // Common
    incompleteInfo: 'Incomplete Information',
    fillAllFields: 'Please fill all fields',
    storyAdded: 'Story Added! 🎉',
    storyShared: 'Your story has been shared successfully',
    audioStory: 'Audio Story',
    audioRecordingDesc: 'This is an audio recording. Click play button to listen.',
    unknownDistrict: 'Unknown District'
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('te');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'te' ? 'en' : 'te');
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['te']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};