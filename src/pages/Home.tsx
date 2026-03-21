import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import {
  ArrowRight, Sparkles, Compass,
  Users, Star, AlertTriangle, Bookmark,
  Clock, Bot, ChevronRight,
  Flame, Globe2, Heart
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { TIPS, VENUES, getSavedIds, toggleSaved } from '../data/tips';

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
  { id: 'restaurant', emoji: '🍜', label: '식당' },
  { id: 'subway',     emoji: '🚇', label: '지하철' },
  { id: 'convenience',emoji: '🏪', label: '편의점' },
  { id: 'pharmacy',   emoji: '💊', label: '약국' },
  { id: 'taxi',       emoji: '🚕', label: '택시' },
  { id: 'norebang',   emoji: '🎤', label: '노래방' },
  { id: 'atm',        emoji: '🏧', label: 'ATM' },
  { id: 'accommodation', emoji: '🏨', label: '숙소' },
];

export default function Home() {
  const [savedIds, setSavedIds] = useState<Set<number>>(getSavedIds);
  const [tipLiked, setTipLiked] = useState(false);
  const [activePair, setActivePair] = useState(0);
  const featuredTip = TIPS.find(t => t.isFeatured) || TIPS[0];

  const handleSave = (id: number) => {
    toggleSaved(id);
    setSavedIds(getSavedIds());
  };

  const pair = VENUE_PAIRS[activePair];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0E] pb-28">

      {/* ══════════════════════════════════════
          1. HERO
      ══════════════════════════════════════ */}
      <section className="relative overflow-hidden px-6 pt-20 pb-12">
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
            현지인의 서울이<br />
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
            className="flex gap-2.5"
          >
            <Link
              to="/tips"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-5 py-3 rounded-2xl shadow-lg shadow-blue-500/25 flex items-center gap-1.5 transition-colors"
            >
              꿀팁 탐색 <ArrowRight size={14} />
            </Link>
            <Link
              to="/onboarding"
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-sm px-4 py-3 rounded-2xl flex items-center gap-1.5 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
            >
              <Compass size={14} /> 스타일 진단
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
      </section>

      {/* ══════════════════════════════════════
          2. 🔴 LIVE SEOUL NOW — 명소 대기시간
      ══════════════════════════════════════ */}
      <motion.div {...fadeUp} className="px-4 mb-2">
        <div className="bg-slate-900 dark:bg-slate-950 rounded-3xl overflow-hidden border border-slate-800">
          {/* header */}
          <div className="px-5 pt-4 pb-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-extrabold text-white tracking-widest uppercase">Seoul NOW</span>
              <span className="text-[10px] font-bold text-slate-500 uppercase">실시간 혼잡도</span>
            </div>
            <div className="flex gap-1">
              {VENUE_PAIRS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActivePair(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${activePair === i ? 'bg-blue-400' : 'bg-slate-700'}`}
                />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activePair}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-2 divide-x divide-slate-800"
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

          {/* swipe hint + CTA */}
          <div className="px-5 pb-4 pt-3 border-t border-slate-800 flex items-center justify-between">
            <p className="text-[10px] text-slate-600">← 좌우로 넘겨보세요</p>
            <Link to="/tips" className="flex items-center gap-1 text-[11px] font-bold text-blue-400">
              전체 명소 보기 <ChevronRight size={12} />
            </Link>
          </div>
        </div>
      </motion.div>

      {/* ══════════════════════════════════════
          3. 오늘의 로컬 Pick — 실제 팁 내용
      ══════════════════════════════════════ */}
      <motion.div {...fadeUp} className="px-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Star size={15} className="text-amber-400 fill-amber-400" />
            <span className="font-extrabold text-sm text-slate-900 dark:text-white">오늘의 로컬 Pick</span>
          </div>
          <Link to="/tips" className="text-[11px] font-bold text-blue-600 dark:text-blue-400">전체 보기 →</Link>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          {/* tip header */}
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

          {/* bilingual content */}
          <div className="p-4">
            <div className="mb-3">
              <p className="text-[10px] font-extrabold text-blue-600 dark:text-blue-400 mb-1 uppercase tracking-wider">🇰🇷 원문</p>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{featuredTip.contentKo}</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-3">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Sparkles size={11} className="text-purple-500" />
                <p className="text-[10px] font-extrabold text-purple-600 dark:text-purple-400 uppercase tracking-wider">AI Translation · EN</p>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed italic">
                "{featuredTip.contentEn}"
              </p>
            </div>
          </div>

          {/* footer */}
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

      {/* ══════════════════════════════════════
          4. 지금 어디에 계세요?
      ══════════════════════════════════════ */}
      <motion.div {...fadeUp} className="px-4 mt-7">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-extrabold text-sm text-slate-900 dark:text-white">🗺️ 지금 어디에 계세요?</h2>
          <Link to="/situations" className="text-[11px] font-bold text-blue-600 dark:text-blue-400">전체 →</Link>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {SITUATIONS.map(({ id, emoji, label }) => (
            <Link
              key={id}
              to={`/tips?situation=${id}`}
              className="flex flex-col items-center gap-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl py-3 hover:border-blue-300 dark:hover:border-blue-700 transition-all active:scale-95 shadow-sm"
            >
              <span className="text-xl">{emoji}</span>
              <span className="text-[9px] font-bold text-slate-600 dark:text-slate-400 leading-tight text-center">{label}</span>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* ══════════════════════════════════════
          5. 나와 맞는 동행 메이트 — FOMO
      ══════════════════════════════════════ */}
      <motion.div {...fadeUp} className="px-4 mt-7">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Users size={15} className="text-purple-500" />
            <h2 className="font-extrabold text-sm text-slate-900 dark:text-white">지금 당신을 찾는 메이트</h2>
          </div>
          <Link to="/companions" className="text-[11px] font-bold text-blue-600 dark:text-blue-400">전체 →</Link>
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
          <div className="mt-3 flex gap-2">
            <Link
              to="/companions"
              className="flex-1 bg-white text-purple-700 font-bold text-xs py-2 rounded-xl text-center"
            >
              동행 신청하기 →
            </Link>
            <Link
              to="/onboarding"
              className="px-3 bg-white/10 text-white font-bold text-xs py-2 rounded-xl text-center"
            >
              내 스타일 먼저
            </Link>
          </div>
        </div>

        {/* mini list */}
        {[
          { name: 'Yuki T.', from: '🇯🇵', match: 89, style: '🎤 노래방 · ☕ 카페', color: 'from-violet-500 to-purple-600', initials: 'YT', days: 'D-1' },
          { name: 'Marco R.', from: '🇮🇹', match: 82, style: '🏛️ 역사 · 🍖 K-BBQ', color: 'from-emerald-500 to-teal-500', initials: 'MR', days: 'D-7' },
        ].map(c => (
          <div key={c.name} className="flex items-center gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 mb-2 shadow-sm">
            <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${c.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>{c.initials}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-slate-900 dark:text-white">{c.name}</span>
                <span className="text-xs">{c.from}</span>
                <span className={`ml-auto text-[10px] font-bold ${c.match >= 90 ? 'text-emerald-500' : 'text-blue-500'}`}>{c.match}%</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">{c.style} · <span className="text-orange-400 font-bold">{c.days}</span></p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* ══════════════════════════════════════
          6. AI 번역 — 나도 공유하기
      ══════════════════════════════════════ */}
      <motion.div {...fadeUp} className="px-4 mt-7">
        <div className="bg-gradient-to-br from-slate-50 to-indigo-50/50 dark:from-slate-900 dark:to-indigo-950/30 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-indigo-400/10 blur-2xl pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-1">
              <Globe2 size={16} className="text-blue-500" />
              <h2 className="font-extrabold text-sm text-slate-900 dark:text-white">당신의 꿀팁이 세계로</h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">한국어로 쓰면 AI가 4개 국어로 문화 번역합니다</p>

            {/* translation demo */}
            <div className="space-y-2 mb-4">
              <div className="bg-white dark:bg-slate-800 rounded-xl px-3 py-2.5 flex items-start gap-2">
                <span className="text-base flex-shrink-0">🇰🇷</span>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">"편의점 삼각김밥은 화살표 순서대로 열면 김이 안 눅어요"</p>
              </div>
              <div className="flex items-center gap-2 px-2">
                <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
                <div className="flex items-center gap-1 text-[10px] font-bold text-purple-600 dark:text-purple-400">
                  <Sparkles size={10} /> AI 문화 번역 중
                </div>
                <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { flag: '🇺🇸', lang: 'EN', text: 'Follow arrows 1→2→3 to open the triangle rice ball without soggy seaweed.' },
                  { flag: '🇯🇵', lang: 'JA', text: '矢印の順番で開けるとのりがパリパリのまま食べられます。' },
                  { flag: '🇨🇳', lang: 'ZH', text: '按照箭头顺序打开，海苔就不会变软了。' },
                ].map(({ flag, lang, text }) => (
                  <div key={lang} className="bg-white dark:bg-slate-800 rounded-xl p-2.5">
                    <span className="text-sm block mb-1">{flag}</span>
                    <p className="text-[9px] text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            <Link
              to="/submit"
              className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm py-3 rounded-2xl transition-colors shadow-md shadow-blue-500/20"
            >
              <Sparkles size={14} /> 내 꿀팁 공유하기
            </Link>
          </div>
        </div>
      </motion.div>

      {/* ══════════════════════════════════════
          7. 긴급 상황 대비
      ══════════════════════════════════════ */}
      <motion.div {...fadeUp} className="px-4 mt-7">
        <div className="bg-slate-900 dark:bg-slate-950 rounded-3xl border border-slate-800 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle size={15} className="text-red-400" />
              <span className="font-extrabold text-sm text-white">긴급 상황 대비</span>
            </div>
            <span className="text-[10px] font-bold text-slate-500">오프라인 저장 가능</span>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-4">
            {[
              { num: '112', label: '경찰', sub: 'Police', color: 'bg-blue-500/15 border-blue-500/20 text-blue-400' },
              { num: '119', label: '소방/구급', sub: 'Fire & EMS', color: 'bg-red-500/15 border-red-500/20 text-red-400' },
              { num: '1339', label: '외국인 의료', sub: 'Medical Help', color: 'bg-emerald-500/15 border-emerald-500/20 text-emerald-400' },
              { num: '120', label: '서울 다산콜', sub: 'Seoul Info', color: 'bg-amber-500/15 border-amber-500/20 text-amber-400' },
            ].map(({ num, label, sub, color }) => (
              <a key={num} href={`tel:${num}`} className={`rounded-xl px-3 py-3 border ${color}`}>
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

      {/* ══════════════════════════════════════
          8. BOTTOM CTA — 스타일 진단
      ══════════════════════════════════════ */}
      <motion.div {...fadeUp} className="px-4 mt-7">
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-3xl p-6 text-center shadow-xl shadow-blue-500/20">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-4 left-8 text-5xl">🇰🇷</div>
            <div className="absolute bottom-4 right-8 text-5xl">✨</div>
          </div>
          <div className="relative z-10">
            <p className="text-white/60 text-xs font-bold mb-2 uppercase tracking-widest">여행 스타일 진단</p>
            <p className="text-xl font-black text-white mb-2 leading-tight">
              나에게 딱 맞는<br />서울을 발견하세요
            </p>
            <p className="text-white/60 text-xs mb-5 leading-relaxed">
              2가지 질문으로 당신의 여행 페르소나를 분석하고<br />맞춤 꿀팁과 동행 메이트를 연결해드립니다
            </p>
            <Link
              to="/onboarding"
              className="inline-flex items-center gap-2 bg-white text-indigo-700 font-extrabold text-sm px-6 py-3 rounded-full shadow-lg hover:bg-slate-100 transition-colors"
            >
              <Compass size={15} /> 지금 시작하기 <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </motion.div>

    </div>
  );
}
