import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, Clock, Bot, Flame, Navigation,
  ChevronRight, RefreshCw, Users
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { VENUES, type VenueItem } from '../data/tips';

const CROWD = {
  low:       { label: '여유',      labelEn: 'Easy',     color: 'text-emerald-500', bg: 'bg-emerald-500', w: '22%', badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20' },
  medium:    { label: '보통',      labelEn: 'Moderate', color: 'text-amber-500',   bg: 'bg-amber-500',   w: '50%', badge: 'bg-amber-500/15 text-amber-400 border-amber-500/20' },
  high:      { label: '혼잡',      labelEn: 'Busy',     color: 'text-orange-500',  bg: 'bg-orange-500',  w: '75%', badge: 'bg-orange-500/15 text-orange-400 border-orange-500/20' },
  very_high: { label: '매우 혼잡', labelEn: 'Very Busy',color: 'text-red-500',    bg: 'bg-red-500',     w: '95%', badge: 'bg-red-500/15 text-red-400 border-red-500/20' },
};

const AREAS = ['전체', '종로구', '중구', '강남구', '홍대·마포구', '이태원·용산구'];

const ALL_VENUES: VenueItem[] = [
  ...VENUES,
  {
    id: 'hongdae',
    name: '홍대 거리',
    area: '홍대·마포구',
    emoji: '🎨',
    waitMin: 0,
    crowdLevel: 'high',
    localRatio: 34,
    isTrending: true,
    isAiPick: false,
  },
  {
    id: 'insadong',
    name: '인사동',
    area: '종로구',
    emoji: '🏺',
    waitMin: 0,
    crowdLevel: 'medium',
    localRatio: 42,
    isTrending: false,
    isAiPick: true,
    aiTip: '전통 공예·찻집 밀집 구역',
  },
  {
    id: 'itaewon',
    name: '이태원',
    area: '이태원·용산구',
    emoji: '🌍',
    waitMin: 0,
    crowdLevel: 'medium',
    localRatio: 28,
    isTrending: false,
    isAiPick: false,
  },
  {
    id: 'dongdaemun',
    name: '동대문 DDP',
    area: '중구',
    emoji: '🔵',
    waitMin: 12,
    crowdLevel: 'high',
    localRatio: 18,
    isTrending: true,
    isAiPick: false,
  },
];

function VenueCard({ venue }: { venue: VenueItem }) {
  const crowd = CROWD[venue.crowdLevel];
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm"
    >
      {/* top row */}
      <div className="flex items-start gap-3 mb-3">
        <span className="text-2xl flex-shrink-0">{venue.emoji}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-extrabold text-sm text-slate-900 dark:text-white">{venue.name}</p>
            {venue.isTrending && (
              <span className="flex items-center gap-0.5 text-[9px] font-bold text-orange-400 bg-orange-500/10 border border-orange-500/20 px-1.5 py-0.5 rounded-full">
                <Flame size={8} /> SNS 핫플
              </span>
            )}
            {venue.isAiPick && (
              <span className="flex items-center gap-0.5 text-[9px] font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-1.5 py-0.5 rounded-full">
                <Bot size={8} /> AI 추천
              </span>
            )}
          </div>
          <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
            <MapPin size={9} /> {venue.area}
          </p>
        </div>
        <span className={`text-[10px] font-extrabold px-2 py-1 rounded-full border ${crowd.badge}`}>
          {crowd.label}
        </span>
      </div>

      {/* crowd bar */}
      <div className="mb-2">
        <div className="flex justify-between items-center mb-1">
          <span className="text-[10px] text-slate-400">혼잡도 · Crowd Level</span>
          <span className={`text-[10px] font-bold ${crowd.color}`}>{crowd.labelEn}</span>
        </div>
        <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: crowd.w }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={`h-full rounded-full ${crowd.bg}`}
          />
        </div>
      </div>

      {/* stats row */}
      <div className="flex items-center gap-3 text-[10px] text-slate-500">
        {venue.waitMin > 0 && (
          <span className="flex items-center gap-1">
            <Clock size={10} /> 대기 {venue.waitMin}분
          </span>
        )}
        {venue.waitMin === 0 && (
          <span className="flex items-center gap-1 text-emerald-500">
            <Clock size={10} /> 대기 없음
          </span>
        )}
        <span className="flex items-center gap-1">
          <Users size={10} /> 현지인 {venue.localRatio}%
        </span>
        {venue.aiTip && (
          <span className="flex-1 text-blue-400 text-right truncate">✦ {venue.aiTip}</span>
        )}
      </div>
    </motion.div>
  );
}

export default function Live() {
  const [selectedArea, setSelectedArea] = useState('전체');
  const [sortBy, setSortBy] = useState<'crowd' | 'local'>('crowd');
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const crowdOrder = { very_high: 0, high: 1, medium: 2, low: 3 };

  const filtered = ALL_VENUES
    .filter(v => selectedArea === '전체' || v.area === selectedArea)
    .sort((a, b) =>
      sortBy === 'crowd'
        ? crowdOrder[a.crowdLevel] - crowdOrder[b.crowdLevel]
        : b.localRatio - a.localRatio
    );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0A0A0E] pt-14 pb-28">

      {/* hero header */}
      <div className="bg-slate-900 px-5 pt-5 pb-6">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[11px] font-extrabold text-white tracking-widest uppercase">Seoul Live</span>
          </div>
          <button
            onClick={handleRefresh}
            className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-slate-200 transition-colors"
          >
            <RefreshCw size={11} className={refreshing ? 'animate-spin' : ''} />
            새로고침
          </button>
        </div>
        <h1 className="text-xl font-black text-white mb-0.5">서울 실시간 혼잡도</h1>
        <p className="text-[11px] text-slate-400">Seoul Real-time Crowd · 위치기반 데이터</p>

        {/* summary chips */}
        <div className="flex gap-2 mt-4 flex-wrap">
          {Object.entries(CROWD).map(([key, val]) => {
            const count = ALL_VENUES.filter(v => v.crowdLevel === key).length;
            return (
              <span key={key} className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${val.badge}`}>
                {val.label} {count}곳
              </span>
            );
          })}
        </div>
      </div>

      {/* area filter */}
      <div className="px-4 py-3 overflow-x-auto">
        <div className="flex gap-2 w-max">
          {AREAS.map(area => (
            <button
              key={area}
              onClick={() => setSelectedArea(area)}
              className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-[11px] font-bold transition-all ${
                selectedArea === area
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              {area}
            </button>
          ))}
        </div>
      </div>

      {/* sort */}
      <div className="px-4 flex items-center justify-between mb-3">
        <p className="text-[11px] text-slate-400">{filtered.length}곳 표시 중</p>
        <div className="flex gap-1">
          {(['crowd', 'local'] as const).map(s => (
            <button
              key={s}
              onClick={() => setSortBy(s)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-colors ${
                sortBy === s
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
            >
              {s === 'crowd' ? '혼잡도순' : '현지인순'}
            </button>
          ))}
        </div>
      </div>

      {/* venue list */}
      <div className="px-4 space-y-3">
        <AnimatePresence mode="popLayout">
          {filtered.map(venue => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-3xl mb-3">🗺️</p>
            <p className="text-slate-500 text-sm">해당 지역 장소가 없어요</p>
          </div>
        )}
      </div>

      {/* 꿀팁 배너 */}
      <div className="px-4 mt-6">
        <Link
          to="/tips"
          className="flex items-center gap-3 bg-blue-600 rounded-2xl px-4 py-3.5 shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-transform"
        >
          <Navigation size={18} className="text-white flex-shrink-0" />
          <div className="flex-1">
            <p className="font-extrabold text-sm text-white">이 장소의 꿀팁 보기</p>
            <p className="text-[11px] text-white/65">현지인 꿀팁 검색 →</p>
          </div>
          <ChevronRight size={16} className="text-white/60 flex-shrink-0" />
        </Link>
      </div>
    </div>
  );
}
