import { useState } from 'react';
import {
  Users, Star, CalendarDays, MessageCircle,
  ChevronRight, Sparkles, MapPin, Compass,
  Heart, TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

interface StyleDim {
  label: string;
  score: number; // 0–100
  emoji: string;
}

interface Companion {
  id: number;
  name: string;
  initials: string;
  avatarColor: string;
  matchRate: number;
  travelStyle: string[];
  travelDate: string;
  daysUntil: number;
  from: string;
  fromFlag: string;
  bio: string;
  isVerified: boolean;
  dimensions: StyleDim[];
  conversationStarter: string;
  wishlist: string[];
}

const COMPANIONS: Companion[] = [
  {
    id: 1,
    name: 'Emma K.',
    initials: 'EK',
    avatarColor: 'from-pink-500 to-rose-500',
    matchRate: 94,
    travelStyle: ['🍜 Food Tour', '🌙 Nightlife', '📸 Photo Spots'],
    travelDate: '3/25 – 3/30',
    daysUntil: 4,
    from: 'New York',
    fromFlag: '🇺🇸',
    bio: '3번째 서울 방문. 이번엔 현지인처럼 먹고 마시고 싶어요. 광장시장 야식 같이 갈 사람!',
    isVerified: true,
    dimensions: [
      { label: '음식 탐방', score: 97, emoji: '🍜' },
      { label: '야간 활동', score: 91, emoji: '🌙' },
      { label: '문화 체험', score: 85, emoji: '🏛️' },
      { label: '쇼핑', score: 72, emoji: '🛍️' },
    ],
    conversationStarter: '"광장시장 빈대떡 먹어봤어요? 제가 숨은 명소 알아요 👀"',
    wishlist: ['광장시장', '을지로 골목바', '한강 야경'],
  },
  {
    id: 2,
    name: 'Yuki T.',
    initials: 'YT',
    avatarColor: 'from-violet-500 to-purple-600',
    matchRate: 89,
    travelStyle: ['🎤 Norebang', '🛍️ Shopping', '☕ Café Hopping'],
    travelDate: '3/22 – 3/28',
    daysUntil: 1,
    from: 'Tokyo',
    fromFlag: '🇯🇵',
    bio: 'K-컬처 덕후. 홍대 카페 투어 + K팝 쇼케이스 같이 갈 메이트 구해요!',
    isVerified: true,
    dimensions: [
      { label: '카페 투어', score: 95, emoji: '☕' },
      { label: '쇼핑', score: 90, emoji: '🛍️' },
      { label: '노래방', score: 88, emoji: '🎤' },
      { label: '음식 탐방', score: 70, emoji: '🍜' },
    ],
    conversationStarter: '"홍대 근처 한 달 살기 카페 알아요? 같이 탐방해요 ☕"',
    wishlist: ['홍대 카페거리', '성수동 팝업', 'SM 아티움'],
  },
  {
    id: 3,
    name: 'Marco R.',
    initials: 'MR',
    avatarColor: 'from-emerald-500 to-teal-600',
    matchRate: 82,
    travelStyle: ['🏛️ History', '🍖 K-BBQ', '🚇 Local Life'],
    travelDate: '3/20 – 4/2',
    daysUntil: 0,
    from: 'Rome',
    fromFlag: '🇮🇹',
    bio: '역사·건축 전공. 한국 궁궐과 골목을 걷고 싶어요. 현지 교통 꿀팁 공유 환영!',
    isVerified: false,
    dimensions: [
      { label: '역사·문화', score: 95, emoji: '🏛️' },
      { label: 'K-BBQ', score: 88, emoji: '🍖' },
      { label: '로컬 탐방', score: 82, emoji: '🗺️' },
      { label: '야간 활동', score: 55, emoji: '🌙' },
    ],
    conversationStarter: '"창덕궁 후원 투어 예약했어요. 같이 가면 더 재밌을 것 같아요 🏯"',
    wishlist: ['창덕궁 후원', '북촌 한옥마을', '익선동'],
  },
  {
    id: 4,
    name: 'Mei L.',
    initials: 'ML',
    avatarColor: 'from-amber-500 to-orange-500',
    matchRate: 78,
    travelStyle: ['🌸 Nature', '📸 Photo', '🍜 Food'],
    travelDate: '3/28 – 4/5',
    daysUntil: 7,
    from: 'Shanghai',
    fromFlag: '🇨🇳',
    bio: '벚꽃 시즌 첫 서울. 여의도 + 남산 피크닉 같이 갈 메이트 찾아요 🌸',
    isVerified: true,
    dimensions: [
      { label: '자연·꽃구경', score: 95, emoji: '🌸' },
      { label: '음식 탐방', score: 80, emoji: '🍜' },
      { label: '사진 찍기', score: 78, emoji: '📸' },
      { label: '쇼핑', score: 60, emoji: '🛍️' },
    ],
    conversationStarter: '"여의도 벚꽃 개화 D-3! 피크닉 매트랑 같이 갈까요? 🌸"',
    wishlist: ['여의도 한강공원', '남산 N서울타워', '경리단길'],
  },
];

const MY_STYLE: StyleDim[] = [
  { label: '음식 탐방', score: 93, emoji: '🍜' },
  { label: '야간 활동', score: 88, emoji: '🌙' },
  { label: '카페 투어', score: 82, emoji: '☕' },
  { label: '문화 체험', score: 75, emoji: '🏛️' },
];

type Filter = 'recommended' | 'all' | 'soon';

export default function Companions() {
  const { t } = useApp();
  const ct = t.companions;
  const [requested, setRequested] = useState<Set<number>>(new Set());
  const [filter, setFilter] = useState<Filter>('recommended');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [itineraryId, setItineraryId] = useState<number | null>(null);
  const [itineraryLoading, setItineraryLoading] = useState(false);
  const [itineraryDone, setItineraryDone] = useState(false);

  const displayed = COMPANIONS.filter(c => {
    if (filter === 'soon') return c.daysUntil <= 3;
    if (filter === 'recommended') return c.matchRate >= 85;
    return true;
  });

  const handleItinerary = async (id: number) => {
    setItineraryId(id);
    setItineraryLoading(true);
    setItineraryDone(false);
    await new Promise(r => setTimeout(r, 2000));
    setItineraryLoading(false);
    setItineraryDone(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0A0A0E] pb-28">
      {/* ── Header ── */}
      <div className="bg-white dark:bg-slate-900 px-5 pt-5 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-2xl bg-purple-100 dark:bg-purple-500/15 flex items-center justify-center">
            <Users size={18} className="text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h1 className="font-extrabold text-slate-900 dark:text-white text-lg leading-tight">{ct.title}</h1>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">{ct.subtitle}</p>
          </div>
        </div>

        {/* My style profile */}
        <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-extrabold text-slate-700 dark:text-slate-300">{ct.myStyle}</p>
            <Link to="/onboarding" className="flex items-center gap-1 text-[11px] font-bold text-blue-600 dark:text-blue-400">
              <Compass size={11} /> {ct.editStyle}
            </Link>
          </div>
          <div className="space-y-2">
            {MY_STYLE.map(dim => (
              <div key={dim.label} className="flex items-center gap-2">
                <span className="text-sm w-5 text-center">{dim.emoji}</span>
                <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 w-16 flex-shrink-0">{dim.label}</span>
                <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${dim.score}%` }}
                    transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                  />
                </div>
                <span className="text-[10px] font-bold text-slate-500 w-6 text-right">{dim.score}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 pt-4">
        {/* Filter tabs */}
        <div className="flex gap-2 mb-4">
          {([
            { key: 'recommended', label: '추천순' },
            { key: 'soon', label: '🔥 곧 출발' },
            { key: 'all', label: '전체' },
          ] as { key: Filter; label: string }[]).map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors ${
                filter === f.key
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                  : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Companion cards */}
        <AnimatePresence>
          {displayed.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-center py-12 text-slate-400"
            >
              <Users size={36} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm font-medium">해당하는 메이트가 없어요</p>
            </motion.div>
          ) : (
            <div className="space-y-3">
              {displayed.map((companion, idx) => {
                const isRequested = requested.has(companion.id);
                const isExpanded = expandedId === companion.id;
                const matchColor =
                  companion.matchRate >= 90 ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/15' :
                  companion.matchRate >= 80 ? 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-500/15' :
                  'text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-500/15';

                return (
                  <motion.div
                    key={companion.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ delay: idx * 0.06 }}
                    className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm"
                  >
                    <div className="px-4 pt-4 pb-3">
                      {/* Top row */}
                      <div className="flex items-start gap-3 mb-3">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-extrabold text-sm flex-shrink-0 bg-gradient-to-br ${companion.avatarColor} shadow-sm`}>
                          {companion.initials}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">{companion.name}</h3>
                            {companion.isVerified && <Star size={12} className="text-amber-400 fill-amber-400 flex-shrink-0" />}
                            <span className="text-xs text-slate-400">{companion.fromFlag} {companion.from}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CalendarDays size={11} className="text-slate-400 flex-shrink-0" />
                            <span className="text-[11px] text-slate-400 font-medium">{companion.travelDate}</span>
                            {companion.daysUntil === 0 ? (
                              <span className="text-[10px] font-bold text-red-500 bg-red-50 dark:bg-red-500/10 px-1.5 py-0.5 rounded-full">여행 중!</span>
                            ) : companion.daysUntil <= 3 ? (
                              <span className="text-[10px] font-bold text-orange-500 bg-orange-50 dark:bg-orange-500/10 px-1.5 py-0.5 rounded-full">D-{companion.daysUntil} 🔥</span>
                            ) : (
                              <span className="text-[10px] text-slate-400">D-{companion.daysUntil}</span>
                            )}
                          </div>
                        </div>
                        <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full font-extrabold text-xs flex-shrink-0 ${matchColor}`}>
                          {companion.matchRate}%
                        </div>
                      </div>

                      {/* Style tags */}
                      <div className="flex flex-wrap gap-1.5 mb-2.5">
                        {companion.travelStyle.map(style => (
                          <span key={style} className="text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-full">
                            {style}
                          </span>
                        ))}
                      </div>

                      {/* Bio */}
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">{companion.bio}</p>

                      {/* Compatibility breakdown */}
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mb-3"
                        >
                          {/* style bars */}
                          <p className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">스타일 궁합 분석</p>
                          <div className="space-y-1.5 mb-3">
                            {companion.dimensions.map(dim => (
                              <div key={dim.label} className="flex items-center gap-2">
                                <span className="text-sm w-5 text-center">{dim.emoji}</span>
                                <span className="text-[10px] text-slate-500 dark:text-slate-400 w-16 flex-shrink-0">{dim.label}</span>
                                <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${dim.score}%` }}
                                    transition={{ duration: 0.5, ease: 'easeOut' }}
                                    className={`h-full rounded-full ${
                                      dim.score >= 90 ? 'bg-emerald-400' :
                                      dim.score >= 75 ? 'bg-blue-500' : 'bg-amber-400'
                                    }`}
                                  />
                                </div>
                                <span className="text-[10px] font-bold text-slate-400 w-5 text-right">{dim.score}</span>
                              </div>
                            ))}
                          </div>

                          {/* AI conversation starter */}
                          <div className="bg-purple-50 dark:bg-purple-500/10 rounded-xl p-3 mb-3">
                            <div className="flex items-center gap-1.5 mb-1.5">
                              <Sparkles size={11} className="text-purple-500" />
                              <span className="text-[10px] font-extrabold text-purple-600 dark:text-purple-400">AI 추천 대화 시작법</span>
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
                              {companion.conversationStarter}
                            </p>
                          </div>

                          {/* Wishlist */}
                          <div className="mb-3">
                            <p className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1">
                              <Heart size={10} /> 가고 싶은 곳
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {companion.wishlist.map(place => (
                                <span key={place} className="flex items-center gap-1 text-[10px] font-semibold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">
                                  <MapPin size={9} /> {place}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* AI 코스 생성 */}
                          {itineraryId === companion.id && itineraryDone ? (
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-xl p-3 mb-3 border border-blue-200 dark:border-blue-800">
                              <div className="flex items-center gap-1.5 mb-2">
                                <Sparkles size={11} className="text-blue-500" />
                                <span className="text-[10px] font-extrabold text-blue-600 dark:text-blue-400">AI 맞춤 코스 완성!</span>
                              </div>
                              <div className="space-y-1.5">
                                {[
                                  { time: '10:00', place: '창덕궁 후원 투어', tag: '문화' },
                                  { time: '12:30', place: '익선동 한옥 카페 브런치', tag: '음식' },
                                  { time: '15:00', place: '광장시장 야식 투어', tag: '음식' },
                                  { time: '19:00', place: '을지로 골목 칵테일 바', tag: '야간' },
                                ].map(item => (
                                  <div key={item.time} className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold text-slate-400 w-10 flex-shrink-0">{item.time}</span>
                                    <span className="text-[10px] text-slate-700 dark:text-slate-300 flex-1">{item.place}</span>
                                    <span className="text-[9px] font-bold text-blue-500 bg-blue-100 dark:bg-blue-500/15 px-1.5 py-0.5 rounded-full">{item.tag}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleItinerary(companion.id)}
                              disabled={itineraryLoading && itineraryId === companion.id}
                              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold text-xs py-2.5 rounded-xl mb-3 disabled:opacity-60"
                            >
                              {itineraryLoading && itineraryId === companion.id ? (
                                <>
                                  <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                                    className="w-3 h-3 rounded-full border-2 border-white/30 border-t-white"
                                  />
                                  AI가 코스를 만들고 있어요...
                                </>
                              ) : (
                                <><Sparkles size={12} /> 함께 여행 코스 짜기</>
                              )}
                            </button>
                          )}
                        </motion.div>
                      )}

                      {/* Action buttons */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => setRequested(prev => { const s = new Set(prev); s.add(companion.id); return s; })}
                          className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all ${
                            isRequested
                              ? 'bg-emerald-100 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                          }`}
                        >
                          {isRequested ? '신청 완료 ✓' : ct.requestBtn}
                        </button>
                        <button
                          onClick={() => setExpandedId(isExpanded ? null : companion.id)}
                          className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                        >
                          <TrendingUp size={13} />
                          {isExpanded ? '접기' : '궁합 보기'}
                        </button>
                        <button className="flex items-center justify-center px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                          <MessageCircle size={15} />
                        </button>
                      </div>
                    </div>

                    {/* Match bar */}
                    <div className="px-4 pb-3.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">{ct.matchRate}</span>
                        <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${companion.matchRate}%` }}
                            transition={{ delay: idx * 0.06 + 0.3, duration: 0.6, ease: 'easeOut' }}
                            className={`h-full rounded-full ${
                              companion.matchRate >= 90 ? 'bg-emerald-400' :
                              companion.matchRate >= 80 ? 'bg-blue-500' : 'bg-amber-400'
                            }`}
                          />
                        </div>
                        <span className="text-[10px] font-extrabold text-slate-500">{companion.matchRate}%</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </AnimatePresence>

        {/* 스타일 미진단 CTA */}
        <div className="mt-4 bg-blue-50 dark:bg-blue-500/10 rounded-2xl p-4 flex items-center gap-3">
          <Compass size={20} className="text-blue-600 dark:text-blue-400 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">더 정확한 매칭을 원한다면?</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">여행 스타일 진단으로 정확도를 높여보세요</p>
          </div>
          <Link to="/onboarding" className="text-[11px] font-bold text-blue-600 dark:text-blue-400 flex items-center gap-0.5 flex-shrink-0">
            진단 <ChevronRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}
