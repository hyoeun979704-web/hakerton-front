import { useState } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import {
  Sparkles, Compass,
  Users, Star, AlertTriangle, Bookmark,
  Clock, Bot, ChevronRight, ChevronLeft,
  Flame, Heart, MessageCircle,
  X, GripVertical, Check
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { TIPS, VENUES, getSavedIds, toggleSaved } from '../data/tips';
import { useApp } from '../context/AppContext';

/* ── 홈 설정 타입 ── */
type SectionId = 'categories' | 'emergency' | 'pick' | 'live' | 'travel' | 'companions';

const SECTION_META: Record<SectionId, { label: string; labelEn: string; icon: string }> = {
  categories: { label: '정보 카테고리',  labelEn: 'Categories',   icon: '🗺️' },
  emergency:  { label: '긴급 상황 대비', labelEn: 'Emergency',    icon: '🆘' },
  pick:       { label: '오늘의 픽',      labelEn: "Today's Pick", icon: '⭐' },
  live:       { label: '실시간 혼잡도',  labelEn: 'Live Crowd',   icon: '📡' },
  travel:     { label: '맞춤 여행 계획', labelEn: 'Travel Plan',  icon: '✈️' },
  companions: { label: '동행 미니카드',  labelEn: 'Travel Mates', icon: '👥' },
};

const DEFAULT_SECTION_ORDER: SectionId[] = ['categories', 'emergency', 'pick', 'live', 'travel', 'companions'];
const SETTINGS_KEY = 'lf_home_v3';

interface HomeSettings { showHeadline: boolean; sectionOrder: SectionId[] }

function loadSettings(): HomeSettings {
  try {
    const s = localStorage.getItem(SETTINGS_KEY);
    if (s) {
      const p = JSON.parse(s) as Partial<HomeSettings>;
      return {
        showHeadline: p.showHeadline ?? true,
        sectionOrder: p.sectionOrder ?? [...DEFAULT_SECTION_ORDER],
      };
    }
  } catch {}
  return { showHeadline: true, sectionOrder: [...DEFAULT_SECTION_ORDER] };
}

function saveSettings(s: HomeSettings) {
  try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(s)); } catch {}
}

/* ── animation preset ── */
const fadeUp: HTMLMotionProps<'div'> = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-24px' },
  transition: { duration: 0.45, ease: 'easeOut' },
};

const CROWD = {
  low:       { label: '여유',     color: 'text-emerald-500', bar: 'bg-emerald-400', w: '22%' },
  medium:    { label: '보통',     color: 'text-amber-500',   bar: 'bg-amber-400',   w: '50%' },
  high:      { label: '혼잡',     color: 'text-orange-500',  bar: 'bg-orange-500',  w: '75%' },
  very_high: { label: '매우 혼잡', color: 'text-red-500',    bar: 'bg-red-500',     w: '95%' },
};

const VENUE_PAIRS = [
  { trending: VENUES[0], aiPick: VENUES[1] },
  { trending: VENUES[2], aiPick: VENUES[3] },
  { trending: VENUES[4], aiPick: VENUES[5] },
];

const SITUATIONS = [
  { id: 'restaurant',    emoji: '🍜', label: '식당',  labelEn: 'Restaurant' },
  { id: 'subway',        emoji: '🚇', label: '지하철', labelEn: 'Subway' },
  { id: 'convenience',   emoji: '🏪', label: '편의점', labelEn: 'Store' },
  { id: 'pharmacy',      emoji: '💊', label: '약국',  labelEn: 'Pharmacy' },
  { id: 'taxi',          emoji: '🚕', label: '택시',  labelEn: 'Taxi' },
  { id: 'norebang',      emoji: '🎤', label: '노래방', labelEn: 'Karaoke' },
  { id: 'atm',           emoji: '🏧', label: 'ATM',   labelEn: 'ATM' },
  { id: 'accommodation', emoji: '🏨', label: '숙소',  labelEn: 'Hotel' },
];

type LangKey = 'ko' | 'en' | 'ja' | 'zh';

const LANG_TABS: { key: LangKey; flag: string; label: string }[] = [
  { key: 'ko', flag: '🇰🇷', label: 'KR' },
  { key: 'en', flag: '🇺🇸', label: 'EN' },
  { key: 'ja', flag: '🇯🇵', label: 'JA' },
  { key: 'zh', flag: '🇨🇳', label: 'ZH' },
];

const FEATURED_TRANSLATIONS: Record<LangKey, string> = {
  ko: '작은 그릇들이 다 떨어지면 그냥 달라고 하면 됩니다. "반찬 더 주세요" 라고 말하면 무료로 리필해줘요. 눈치 볼 필요 없어요.',
  en: 'Side dishes (banchan) are always free to refill. Say "반찬 더 주세요" (ban-chan deo ju-se-yo) and they\'ll happily bring more — it\'s expected, not rude.',
  ja: '小鉢（バンチャン）はおかわり自由です。「반찬 더 주세요」と言えば喜んで追加してくれます。遠慮は無用、当然のことです。',
  zh: '小菜（반찬）可以免费续加，这是韩餐厅的惯例。说"반찬 더 주세요"服务员就会高兴地帮您续加，完全不用不好意思。',
};

export default function Home() {
  const { homeSettingsOpen, closeHomeSettings } = useApp();

  /* page state */
  const [savedIds, setSavedIds] = useState<Set<number>>(getSavedIds);
  const [tipLiked, setTipLiked] = useState(false);
  const [activePair, setActivePair] = useState(0);
  const [tipLang, setTipLang] = useState<LangKey>('ko');
  const [emergencySaved, setEmergencySaved] = useState(() => localStorage.getItem('lf_emergency_saved') === '1');

  /* home settings state */
  const [settings, setSettings] = useState<HomeSettings>(loadSettings);
  const [draftOrder, setDraftOrder] = useState<SectionId[]>(loadSettings().sectionOrder);

  const handleEmergencySave = () => {
    localStorage.setItem('lf_emergency_saved', '1');
    setEmergencySaved(true);
  };

  const handleSave = (id: number) => {
    toggleSaved(id);
    setSavedIds(getSavedIds());
  };

  const applySettings = () => {
    const next = { ...settings, sectionOrder: draftOrder };
    setSettings(next);
    saveSettings(next);
    closeHomeSettings();
  };

  const toggleHeadline = () => {
    setSettings(s => ({ ...s, showHeadline: !s.showHeadline }));
  };

  const featuredTip = TIPS.find(t => t.isFeatured) || TIPS[0];
  const pair = VENUE_PAIRS[activePair];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0E] pb-28">

      {/* ══════════════════════════════════════
          홈 설정 패널 (bottom sheet)
      ══════════════════════════════════════ */}
      <AnimatePresence>
        {homeSettingsOpen && (
          <>
            {/* backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeHomeSettings}
              className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
            />
            {/* sheet */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed bottom-0 left-0 right-0 z-50 max-w-md mx-auto bg-white dark:bg-[#111118] rounded-t-3xl border-t border-slate-200 dark:border-slate-800 shadow-2xl"
            >
              {/* handle */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
              </div>

              {/* header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h2 className="font-extrabold text-base text-slate-900 dark:text-white">홈 커스터마이즈</h2>
                  <p className="text-[11px] text-slate-400 mt-0.5">Customize your home screen</p>
                </div>
                <button onClick={closeHomeSettings} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
                  <X size={16} />
                </button>
              </div>

              <div className="px-5 py-4 max-h-[65vh] overflow-y-auto">
                {/* headline toggle */}
                <div className="mb-5">
                  <p className="text-[11px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">헤드라인 · Headline</p>
                  <button
                    onClick={toggleHeadline}
                    className="w-full flex items-center justify-between bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-3 active:scale-[0.98] transition-transform"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">🏠</span>
                      <div className="text-left">
                        <p className="text-sm font-bold text-slate-900 dark:text-white">헤드라인 섹션</p>
                        <p className="text-[10px] text-slate-400">Hero banner & CTA buttons</p>
                      </div>
                    </div>
                    {/* toggle switch */}
                    <div className={`relative w-11 h-6 rounded-full transition-colors ${settings.showHeadline ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'}`}>
                      <motion.div
                        layout
                        className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm"
                        animate={{ left: settings.showHeadline ? '22px' : '2px' }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    </div>
                  </button>
                </div>

                {/* section reorder */}
                <div>
                  <p className="text-[11px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">섹션 순서 · Section Order</p>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 mb-3">길게 누른 후 드래그해서 순서를 바꾸세요<br/>Hold and drag to reorder sections</p>
                  <Reorder.Group
                    axis="y"
                    values={draftOrder}
                    onReorder={setDraftOrder}
                    className="space-y-2"
                  >
                    {draftOrder.map((id, idx) => {
                      const meta = SECTION_META[id];
                      return (
                        <Reorder.Item
                          key={id}
                          value={id}
                          className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-3 cursor-grab active:cursor-grabbing active:shadow-lg active:scale-[1.02] transition-shadow select-none"
                        >
                          <span className="text-[10px] font-black text-slate-300 dark:text-slate-600 w-4 text-center">{idx + 1}</span>
                          <span className="text-lg">{meta.icon}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-slate-900 dark:text-white">{meta.label}</p>
                            <p className="text-[10px] text-slate-400">{meta.labelEn}</p>
                          </div>
                          <GripVertical size={16} className="text-slate-300 dark:text-slate-600 flex-shrink-0" />
                        </Reorder.Item>
                      );
                    })}
                  </Reorder.Group>
                </div>
              </div>

              {/* footer */}
              <div className="px-5 py-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={applySettings}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm py-3.5 rounded-2xl transition-colors active:scale-[0.98] shadow-lg shadow-blue-500/25"
                >
                  <Check size={16} /> 저장 · Save
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════
          1. HERO (토글 가능)
      ══════════════════════════════════════ */}
      <AnimatePresence>
        {settings.showHeadline && (
          <motion.section
            key="hero"
            initial={false}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35 }}
            className="relative overflow-hidden px-6 pt-20 pb-12"
          >
        {/* bg blobs */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-indigo-50/40 to-transparent dark:from-blue-950/25 dark:via-indigo-950/15 dark:to-transparent" />
        <div className="absolute top-6 right-4 w-48 h-48 rounded-full bg-gradient-to-br from-blue-400/15 to-indigo-400/15 dark:from-blue-500/8 dark:to-indigo-500/8 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          {/* live badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
            className="inline-flex items-center gap-1.5 mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[11px] font-bold text-red-500 tracking-widest uppercase">Live · Seoul Now</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-[2rem] font-black text-slate-900 dark:text-white leading-[1.15] mb-3"
          >
            현지인의 꿀팁이<br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              당신의 언어로
            </span>{' '}
            번역됩니다
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6 max-w-[270px]"
          >
            관광 가이드엔 없는 꿀팁, AI가 4개 국어로 실시간 번역하고 여행 메이트까지 연결해드립니다.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link
              to="/chat"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 py-3 rounded-2xl shadow-lg shadow-blue-500/25 transition-colors active:scale-95"
            >
              <MessageCircle size={16} />
              AI 채팅으로 서울 꿀팁 물어보기
            </Link>
          </motion.div>

          {/* social proof micro */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-2 mt-5"
          >
            <div className="flex -space-x-1.5">
              {['from-pink-500 to-rose-400','from-blue-500 to-indigo-500','from-emerald-500 to-teal-400','from-amber-500 to-orange-400'].map((g, i) => (
                <div key={i} className={`w-6 h-6 rounded-full border-2 border-white dark:border-[#0A0A0E] bg-gradient-to-br ${g}`} />
              ))}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              <span className="font-bold text-slate-700 dark:text-slate-300">247명</span>이 오늘 꿀팁을 저장했어요
            </p>
          </motion.div>
        </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════
          섹션 목록 — settings.sectionOrder 순서대로 렌더링
      ══════════════════════════════════════ */}
      {settings.sectionOrder.map(sectionId => {
        /* ─── 정보 카테고리 ─── */
        if (sectionId === 'categories') return (
        <motion.div key="categories" {...fadeUp} className="px-4 mt-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Compass size={15} className="text-blue-500" />
              <h2 className="font-extrabold text-sm text-slate-900 dark:text-white">
                지금 어디에 계세요?
                <span className="ml-1.5 text-[10px] font-medium text-slate-400">Where are you?</span>
              </h2>
            </div>
            <Link to="/situations" className="text-[11px] font-bold text-blue-600 dark:text-blue-400">전체 보기 →</Link>
          </div>
        <div className="grid grid-cols-4 gap-2">
          {SITUATIONS.map(({ id, emoji, label, labelEn }) => (
            <Link
              key={id}
              to={`/tips?situation=${id}`}
              className="flex flex-col items-center gap-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl py-3.5 hover:border-blue-300 dark:hover:border-blue-700 transition-all active:scale-95 shadow-sm"
            >
              <span className="text-xl">{emoji}</span>
              <span className="text-[9px] font-bold text-slate-600 dark:text-slate-400 leading-tight text-center">{label}</span>
              <span className="text-[8px] text-slate-400 dark:text-slate-600 leading-none">{labelEn}</span>
            </Link>
          ))}
        </div>
        </motion.div>
        );

        /* ─── 긴급 상황 대비 ─── */
        if (sectionId === 'emergency') return (
        <motion.div key="emergency" {...fadeUp} className="px-4 mt-6">
        <div className="bg-slate-900 dark:bg-slate-950 rounded-3xl border border-slate-800 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle size={15} className="text-red-400" />
              <span className="font-extrabold text-sm text-white">긴급 상황 대비</span>
              <span className="text-[10px] text-slate-500">Emergency</span>
            </div>
            <button
              onClick={handleEmergencySave}
              className={`flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full transition-all ${
                emergencySaved
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              <Bookmark size={10} fill={emergencySaved ? 'currentColor' : 'none'} />
              {emergencySaved ? '저장됨' : '오프라인 저장'}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-4">
            {[
              { num: '112', label: '경찰', sub: 'Police', color: 'bg-blue-500/15 border-blue-500/20 text-blue-400' },
              { num: '119', label: '소방/구급', sub: 'Fire & EMS', color: 'bg-red-500/15 border-red-500/20 text-red-400' },
              { num: '1339', label: '외국인 의료', sub: 'Medical Help', color: 'bg-emerald-500/15 border-emerald-500/20 text-emerald-400' },
              { num: '120', label: '서울 다산콜', sub: 'Seoul Info', color: 'bg-amber-500/15 border-amber-500/20 text-amber-400' },
            ].map(({ num, label, sub, color }) => (
              <a key={num} href={`tel:${num}`} className={`rounded-xl px-3 py-3 border ${color} active:scale-95 transition-transform`}>
                <p className="font-black text-lg leading-none mb-0.5">{num}</p>
                <p className="text-[10px] font-bold opacity-80">{label}</p>
                <p className="text-[9px] opacity-50">{sub}</p>
              </a>
            ))}
          </div>

          <Link
            to="/emergency"
            className="flex items-center justify-center gap-2 w-full bg-red-500/10 hover:bg-red-500/15 border border-red-500/20 text-red-400 font-bold text-sm py-3 rounded-2xl transition-colors"
          >
            <AlertTriangle size={13} /> 긴급 정보 + 음성 발음 보기 <ChevronRight size={13} />
          </Link>
        </div>
        </motion.div>
        );

        /* ─── 오늘의 픽 ─── */
        if (sectionId === 'pick') return (
        <motion.div key="pick" {...fadeUp} className="px-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Star size={15} className="text-amber-400 fill-amber-400" />
            <span className="font-extrabold text-sm text-slate-900 dark:text-white">오늘의 로컬 Pick</span>
          </div>
          <Link to="/tips" className="text-[11px] font-bold text-blue-600 dark:text-blue-400">전체 보기 →</Link>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${featuredTip.avatarColor} border-2 border-white/25 flex items-center justify-center text-white text-xs font-bold`}>
                {featuredTip.authorInitials}
              </div>
              <span className="text-white/80 text-xs font-semibold">{featuredTip.author} · 서울 현지인</span>
              <span className="ml-auto text-[10px] font-bold bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full">PICK</span>
            </div>
            <h3 className="font-extrabold text-white text-sm leading-snug">{featuredTip.titleKo}</h3>
          </div>

          <div className="p-4">
            <div className="flex gap-1.5 mb-3">
              {LANG_TABS.map(({ key, flag, label }) => (
                <button
                  key={key}
                  onClick={() => setTipLang(key)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${
                    tipLang === key
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {flag} {label}
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={tipLang}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className={`rounded-xl p-3 ${tipLang === 'ko' ? 'bg-slate-50 dark:bg-slate-800' : 'bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800/30'}`}
              >
                {tipLang !== 'ko' && (
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Sparkles size={10} className="text-purple-500" />
                    <span className="text-[10px] font-extrabold text-purple-600 dark:text-purple-400 uppercase tracking-wider">AI 번역</span>
                  </div>
                )}
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {FEATURED_TRANSLATIONS[tipLang]}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="px-4 pb-3 flex items-center justify-between">
            <div className="flex gap-1.5">
              {featuredTip.tags.slice(0, 2).map(tag => (
                <span key={tag} className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">{tag}</span>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setTipLiked(v => !v)}
                className={`flex items-center gap-1 text-[11px] font-semibold transition-colors ${tipLiked ? 'text-red-500' : 'text-slate-400'}`}
              >
                <Heart size={13} fill={tipLiked ? 'currentColor' : 'none'} />
                {featuredTip.likes + (tipLiked ? 1 : 0)}
              </button>
              <button
                onClick={() => handleSave(featuredTip.id)}
                className={`transition-colors ${savedIds.has(featuredTip.id) ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`}
              >
                <Bookmark size={14} fill={savedIds.has(featuredTip.id) ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>
        </div>
        </motion.div>
        );

        /* ─── 실시간 혼잡도 ─── */
        if (sectionId === 'live') return (
        <motion.div key="live" {...fadeUp} className="px-4 mt-6 mb-2">
        <div className="bg-slate-900 dark:bg-slate-950 rounded-3xl overflow-hidden border border-slate-800">
          {/* header */}
          <div className="px-5 pt-4 pb-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-extrabold text-white tracking-widest uppercase">Seoul NOW</span>
              <span className="text-[10px] font-bold text-slate-500 uppercase">실시간 혼잡도</span>
            </div>
            <span className="text-[10px] text-slate-500 font-medium">{activePair + 1} / {VENUE_PAIRS.length}</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activePair}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={(_, info) => {
                if (info.offset.x < -50) setActivePair(p => Math.min(p + 1, VENUE_PAIRS.length - 1));
                if (info.offset.x > 50)  setActivePair(p => Math.max(p - 1, 0));
              }}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-2 divide-x divide-slate-800 cursor-grab active:cursor-grabbing select-none"
            >
              {/* SNS 핫플 */}
              <div className="p-4">
                <div className="flex items-center gap-1.5 mb-3">
                  <Flame size={12} className="text-orange-400" />
                  <span className="text-[10px] font-extrabold text-orange-400 uppercase tracking-wider">SNS 핫플</span>
                </div>
                <p className="text-2xl mb-0.5">{pair.trending.emoji}</p>
                <p className="font-extrabold text-white text-sm leading-tight mb-0.5">{pair.trending.name}</p>
                <p className="text-[10px] text-slate-500 mb-3">{pair.trending.area}</p>

                {/* wait time */}
                <div className="flex items-center gap-1.5 mb-2">
                  <Clock size={11} className="text-slate-400" />
                  <span className="text-xs font-bold text-white">
                    {pair.trending.waitMin > 0 ? `대기 ${pair.trending.waitMin}분` : '대기 없음'}
                  </span>
                </div>

                {/* crowd bar */}
                <div className="mb-2">
                  <div className="flex justify-between mb-1">
                    <span className="text-[9px] text-slate-500">혼잡도</span>
                    <span className={`text-[9px] font-bold ${CROWD[pair.trending.crowdLevel].color}`}>
                      {CROWD[pair.trending.crowdLevel].label}
                    </span>
                  </div>
                  <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${CROWD[pair.trending.crowdLevel].bar}`} style={{ width: CROWD[pair.trending.crowdLevel].w }} />
                  </div>
                </div>

                {/* local ratio */}
                <div className="flex items-center gap-1">
                  <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${pair.trending.localRatio}%` }} />
                  </div>
                  <span className="text-[9px] text-slate-500 whitespace-nowrap">현지인 {pair.trending.localRatio}%</span>
                </div>
              </div>

              {/* AI 대안 */}
              <div className="p-4 bg-blue-950/40">
                <div className="flex items-center gap-1.5 mb-3">
                  <Bot size={12} className="text-blue-400" />
                  <span className="text-[10px] font-extrabold text-blue-400 uppercase tracking-wider">AI 추천</span>
                </div>
                <p className="text-2xl mb-0.5">{pair.aiPick.emoji}</p>
                <p className="font-extrabold text-white text-sm leading-tight mb-0.5">{pair.aiPick.name}</p>
                <p className="text-[10px] text-slate-500 mb-3">{pair.aiPick.area}</p>

                <div className="flex items-center gap-1.5 mb-2">
                  <Clock size={11} className="text-slate-400" />
                  <span className="text-xs font-bold text-emerald-400">
                    {pair.aiPick.waitMin > 0 ? `대기 ${pair.aiPick.waitMin}분` : '바로 입장'}
                  </span>
                </div>

                <div className="mb-2">
                  <div className="flex justify-between mb-1">
                    <span className="text-[9px] text-slate-500">혼잡도</span>
                    <span className={`text-[9px] font-bold ${CROWD[pair.aiPick.crowdLevel].color}`}>
                      {CROWD[pair.aiPick.crowdLevel].label}
                    </span>
                  </div>
                  <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${CROWD[pair.aiPick.crowdLevel].bar}`} style={{ width: CROWD[pair.aiPick.crowdLevel].w }} />
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${pair.aiPick.localRatio}%` }} />
                  </div>
                  <span className="text-[9px] text-slate-500 whitespace-nowrap">현지인 {pair.aiPick.localRatio}%</span>
                </div>

                {pair.aiPick.aiTip && (
                  <p className="text-[9px] text-blue-300/80 mt-2 leading-relaxed">
                    ✦ {pair.aiPick.aiTip}
                  </p>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* arrow nav + CTA */}
          <div className="px-4 pb-4 pt-3 border-t border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActivePair(p => Math.max(p - 1, 0))}
                disabled={activePair === 0}
                className="w-7 h-7 rounded-full flex items-center justify-center bg-slate-800 disabled:opacity-25 hover:bg-slate-700 transition-colors"
              >
                <ChevronLeft size={13} className="text-white" />
              </button>
              <div className="flex gap-1.5">
                {VENUE_PAIRS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActivePair(i)}
                    className={`rounded-full transition-all ${activePair === i ? 'w-4 h-2 bg-blue-400' : 'w-2 h-2 bg-slate-700'}`}
                  />
                ))}
              </div>
              <button
                onClick={() => setActivePair(p => Math.min(p + 1, VENUE_PAIRS.length - 1))}
                disabled={activePair === VENUE_PAIRS.length - 1}
                className="w-7 h-7 rounded-full flex items-center justify-center bg-slate-800 disabled:opacity-25 hover:bg-slate-700 transition-colors"
              >
                <ChevronRight size={13} className="text-white" />
              </button>
            </div>
            <Link to="/live" className="flex items-center gap-1 text-[11px] font-bold text-blue-400">
              실시간 전체 보기 <ChevronRight size={12} />
            </Link>
          </div>
        </div>
        </motion.div>
        );

        /* ─── 동행 미니카드 ─── */
        if (sectionId === 'companions') return (
        <motion.div key="companions" {...fadeUp} className="px-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Users size={15} className="text-purple-500" />
            <h2 className="font-extrabold text-sm text-slate-900 dark:text-white">지금 당신을 찾는 메이트</h2>
          </div>
          <Link to="/companions" className="text-[11px] font-bold text-blue-600 dark:text-blue-400">전체 보기 →</Link>
        </div>

        {/* urgent banner */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-4 mb-3 shadow-lg shadow-purple-500/20">
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white font-extrabold text-sm flex-shrink-0 shadow-md">EK</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="font-extrabold text-white text-sm">Emma K.</span>
                <span className="text-white/60 text-xs">🇺🇸</span>
                <span className="ml-auto text-[10px] font-extrabold bg-emerald-400/20 text-emerald-300 px-2 py-0.5 rounded-full">94% 매치</span>
              </div>
              <p className="text-white/70 text-[11px] mb-2">🍜 Food Tour · 🌙 Nightlife · 📸 Photo Spots</p>
              <p className="text-white/60 text-[10px]">📅 3/25 출발 · D-4</p>
            </div>
          </div>
          <div className="mt-3">
            <Link
              to="/companions"
              className="flex items-center justify-center gap-1.5 w-full bg-white text-purple-700 font-bold text-xs py-2.5 rounded-xl"
            >
              동행 신청하기 →
            </Link>
          </div>
        </div>

        {/* mini list */}
        {[
          { name: 'Yuki T.', from: '🇯🇵', match: 89, style: '🎤 노래방 · ☕ 카페', color: 'from-violet-500 to-purple-600', initials: 'YT', days: 'D-1' },
          { name: 'Marco R.', from: '🇮🇹', match: 82, style: '🏛️ 역사 · 🍖 K-BBQ', color: 'from-emerald-500 to-teal-500', initials: 'MR', days: 'D-7' },
        ].map(c => (
          <Link key={c.name} to="/companions" className="flex items-center gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 mb-2 shadow-sm active:scale-[0.98] transition-transform">
            <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${c.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>{c.initials}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-slate-900 dark:text-white">{c.name}</span>
                <span className="text-xs">{c.from}</span>
                <span className={`ml-auto text-[10px] font-bold ${c.match >= 90 ? 'text-emerald-500' : 'text-blue-500'}`}>{c.match}%</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">{c.style} · <span className="text-orange-400 font-bold">{c.days}</span></p>
            </div>
            <ChevronRight size={14} className="text-slate-300 dark:text-slate-600 flex-shrink-0" />
          </Link>
        ))}
        </motion.div>
        );

        /* ─── 맞춤 여행 계획 ─── */
        if (sectionId === 'travel') return (
        <motion.div key="travel" {...fadeUp} className="px-4 mt-6">
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-3xl p-5 shadow-xl shadow-blue-500/20">
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/5 -mr-8 -mt-8 pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Compass size={15} className="text-white/80" />
              <p className="text-white/70 text-[11px] font-bold uppercase tracking-widest">맞춤 여행 계획 · Travel Plan</p>
            </div>
            <p className="text-lg font-black text-white mb-1 leading-snug">
              나에게 딱 맞는 서울을 발견하세요
            </p>
            <p className="text-white/60 text-xs mb-4 leading-relaxed">
              2가지 질문으로 여행 페르소나를 분석하고<br />맞춤 꿀팁 + 동행 메이트를 연결해드립니다
            </p>
            <Link
              to="/travel"
              className="flex items-center justify-center gap-2 w-full bg-white text-indigo-700 font-extrabold text-sm py-3 rounded-xl shadow-md hover:bg-slate-100 transition-colors active:scale-95"
            >
              <Sparkles size={14} /> 여행 계획 세우기
            </Link>
          </div>
        </div>
        </motion.div>
        );

        return null;
      })}

    </div>
  );
}
