export interface Tip {
  id: string;
  category: TipCategory;
  city: string;
  title: Record<Lang, string>;
  summary: Record<Lang, string>;
  content: Record<Lang, string>;
  culturalContext: Record<Lang, string>;
  relatedTipIds: string[];
  emoji: string;
}
 
export type TipCategory = '전체' | '교통' | '음식' | '문화예절' | '긴급상황';
export type Lang = 'ko' | 'en' | 'ja' | 'zh';
export type City = '서울' | '부산' | '제주' | '경주' | '강릉';
 
export interface Preference {
  id: string;
  label: string;
  emoji: string;
}
 
export interface Participant {
  name: string;
  preferences: string[];
}
 
export interface ItineraryItem {
  time: string;
  title: string;
  description: string;
  category: string;
  relatedTipId?: string;
  emoji: string;
}
 
export interface ItineraryDay {
  date: string;
  items: ItineraryItem[];
}
 
export interface MatchProfile {
  id: string;
  name: string;
  image: string;
  styleTags: string[];
  verified: boolean;
  matchRate: number;
  bio: string;
}
 
export interface StyleQuestion {
  id: number;
  question: string;
  options: { label: string; value: string; emoji: string }[];
}
 
export interface TranslationResult {
  en: string;
  ja: string;
  zh: string;
  culturalContext: {
    en: string;
    ja: string;
    zh: string;
  };
}
