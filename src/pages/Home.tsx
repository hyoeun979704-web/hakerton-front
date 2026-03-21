import { useState, useEffect } from 'react';
import { MapPin, Search, Heart, Bookmark, ChevronRight, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { TIPS, SITUATIONS, getSavedIds, toggleSaved, type TipCategory, type TipItem } from '../data/tips';
import type { Translations } from '../context/AppContext';

type SortMode = 'recommend' | 'latest' | 'popular';
type CategoryFilter = 'All' | TipCategory;

const CATEGORY_FILTERS: CategoryFilter[] = ['All', 'Transport', 'Food', 'Culture', 'Shopping', 'Nightlife', 'Emergency'];

// ---- TipCard sub-component ----
interface TipCardProps {
  tip: TipItem;
  lang: string;
  t: Translations;
  savedIds: Set<number>;
  likedIds: Set<number>;
  expandedId: number | null;
  onSave: (id: number) => void;
  onLike: (id: number) => void;
  onExpand: (id: number | null) => void;
}

function TipCard({ tip, lang, t, savedIds, likedIds, expandedId, onSave, onLike, onExpand }: TipCardProps) {
  const content = lang === 'ko' ? tip.contentKo : tip.contentEn;
  const isExpanded = expandedId === tip.id;
  const isLong = content.length > 90;
  const isSaved = savedIds.has(tip.id);
  const isLiked = likedIds.has(tip.id);

  const categoryStyle =
    tip.category === 'Food' ? 'bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-400' :
    tip.category === 'Transport' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400' :
    tip.category === 'Culture' ? 'bg-purple-100 text-purple-700 dark:bg-purple-500/15 dark:text-purple-400' :
    tip.category === 'Emergency' ? 'bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400' :
    tip.category === 'Nightlife' ? 'bg-pink-100 text-pink-700 dark:bg-pink-500/15 dark:text-pink-400' :
    tip.category === 'Shopping' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400' :
    'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300';

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 bg-gradient-to-br ${tip.avatarColor}`}>
              {tip.authorInitials}
            </div>
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">{tip.author}</span>
            {tip.isExpert && (
              <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-500/15 px-1.5 py-0.5 rounded-full">
                {t.tips.localExpert}
              </span>
            )}
          </div>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${categoryStyle}`}>
            {t.categories[tip.category]}
          </span>
        </div>

        <h3 className="font-extrabold text-slate-900 dark:text-white text-sm leading-snug mb-1.5">{tip.titleKo}</h3>
        <p className={`text-xs text-slate-600 dark:text-slate-400 leading-relaxed ${!isExpanded && isLong ? 'line-clamp-2' : ''}`}>
          {content}
        </p>
        {isLong && (
          <button
            onClick={() => onExpand(isExpanded ? null : tip.id)}
            className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 mt-1"
          >
            {isExpanded ? t.tips.readLess : t.tips.readMore}
          </button>
        )}
      </div>

      <div className="px-4 pb-3 flex items-center justify-between mt-1">
        <div className="flex gap-2 flex-wrap">
          {tip.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">{tag}</span>
          ))}
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => onLike(tip.id)}
            className={`flex items-center gap-1 text-[11px] font-semibold transition-colors ${isLiked ? 'text-red-500' : 'text-slate-400 dark:text-slate-500'}`}
          >
            <Heart size={14} fill={isLiked ? 'currentColor' : 'none'} />
            {tip.likes + (isLiked ? 1 : 0)}
          </button>
          <button
            onClick={() => onSave(tip.id)}
            className={`p-1 transition-colors ${isSaved ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`}
          >
            <Bookmark size={15} fill={isSaved ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ---- Main Home page ----
export default function Home() {
  const { t, lang } = useApp();
  const ht = t.home;
  const [searchParams] = useSearchParams();
  const situationParam = searchParams.get('situation');

  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');
  const [sortMode, setSortMode] = useState<SortMode>('recommend');
  const [savedIds, setSavedIds] = useState<Set<number>>(getSavedIds);
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set());
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    if (situationParam) setActiveCategory('All');
  }, [situationParam]);

  const handleSave = (id: number) => {
    toggleSaved(id);
    setSavedIds(getSavedIds());
  };

  const handleLike = (id: number) => {
    setLikedIds(prev => {
      const s = new Set(prev);
      if (s.has(id)) s.delete(id); else s.add(id);
      return s;
    });
  };

  const filteredTips = TIPS
    .filter(tip => {
      if (situationParam) return tip.situations.includes(situationParam);
      return activeCategory === 'All' || tip.category === activeCategory;
    })
    .sort((a, b) => {
      if (sortMode === 'popular') return b.likes - a.likes;
      if (sortMode === 'latest') return b.id - a.id;
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0) || b.likes - a.likes;
    });

  const featuredTip = TIPS.find(tip => tip.isFeatured);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0A0A0E] pt-14 pb-24">
      {/* City + search bar */}
      <div className="bg-white dark:bg-slate-900 px-4 pt-4 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <button className="flex items-center gap-1.5 text-slate-900 dark:text-white font-extrabold text-base">
            <MapPin size={16} className="text-blue-500" />
            {ht.citySelector}
          </button>
          <span className="text-xs text-slate-400 font-medium">{TIPS.length} {ht.cityTipCount}</span>
        </div>
        <Link
          to="/search"
          className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-xl px-4 py-2.5 text-slate-400 dark:text-slate-500 text-sm"
        >
          <Search size={15} />
          <span>{ht.searchPlaceholder}</span>
        </Link>
      </div>

      {/* Event banner */}
      <div className="mx-4 mt-4">
        <Link to="/situations" className="flex items-center justify-between bg-gradient-to-r from-pink-500 to-rose-400 rounded-2xl px-5 py-3.5 shadow-md shadow-pink-500/20">
          <div>
            <p className="font-extrabold text-white text-sm">{ht.eventBanner}</p>
            <p className="text-pink-100 text-xs mt-0.5 font-medium">{ht.eventBannerSub}</p>
          </div>
          <ChevronRight size={18} className="text-white/80" />
        </Link>
      </div>

      {/* I'm at a... */}
      <div className="px-4 mt-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-extrabold text-slate-900 dark:text-white text-sm">{ht.iAmAt}</h2>
          <Link to="/situations" className="text-xs font-bold text-blue-600 dark:text-blue-400">{ht.seeMore}</Link>
        </div>
        <div className="grid grid-cols-3 gap-2.5">
          {SITUATIONS.slice(0, 6).map(({ id, emoji }, idx) => {
            const label = t.situations[id as keyof typeof t.situations] as string;
            const isActive = situationParam === id;
            return (
              <motion.div key={id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.05 }}>
                <Link
                  to={isActive ? '/' : `/?situation=${id}`}
                  className={`flex flex-col items-center gap-1.5 py-3 rounded-2xl border transition-all text-center ${
                    isActive
                      ? 'bg-blue-600 border-blue-600 shadow-md'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700'
                  }`}
                >
                  <span className="text-2xl">{emoji}</span>
                  <span className={`text-[10px] font-bold leading-tight ${isActive ? 'text-white' : 'text-slate-700 dark:text-slate-300'}`}>{label}</span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Situation filter label */}
      <AnimatePresence>
        {situationParam && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mx-4 mt-4 flex items-center justify-between bg-blue-50 dark:bg-blue-500/10 rounded-xl px-4 py-2.5"
          >
            <p className="text-xs font-bold text-blue-700 dark:text-blue-400">
              {SITUATIONS.find(s => s.id === situationParam)?.emoji}{' '}
              {t.situations[situationParam as keyof typeof t.situations] as string} 관련 꿀팁
            </p>
            <Link to="/" className="text-[11px] font-bold text-blue-600 dark:text-blue-400">✕ 전체보기</Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Today's Pick (featured) */}
      {featuredTip && !situationParam && activeCategory === 'All' && (
        <div className="px-4 mt-5">
          <div className="flex items-center gap-2 mb-3">
            <Star size={14} className="text-amber-400 fill-amber-400" />
            <h2 className="font-extrabold text-slate-900 dark:text-white text-sm">{ht.todayPick}</h2>
          </div>
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-4 shadow-lg shadow-blue-500/20">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold bg-gradient-to-br ${featuredTip.avatarColor} border-2 border-white/20`}>
                {featuredTip.authorInitials}
              </div>
              <span className="text-white/80 text-xs font-semibold">{featuredTip.author}</span>
              <span className="text-[10px] font-bold bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full">PICK</span>
            </div>
            <h3 className="font-extrabold text-white text-sm leading-snug mb-2">{featuredTip.titleKo}</h3>
            <p className="text-blue-100 text-xs leading-relaxed line-clamp-3">
              {lang === 'ko' ? featuredTip.contentKo : featuredTip.contentEn}
            </p>
            <div className="flex items-center justify-between mt-3">
              <div className="flex gap-1.5">
                {featuredTip.tags.slice(0, 2).map(tag => (
                  <span key={tag} className="text-[10px] font-semibold text-blue-200 bg-white/10 px-2 py-0.5 rounded-full">{tag}</span>
                ))}
              </div>
              <button
                onClick={() => handleSave(featuredTip.id)}
                className={`p-1.5 rounded-full transition-colors ${savedIds.has(featuredTip.id) ? 'text-amber-300' : 'text-white/50 hover:text-white'}`}
              >
                <Bookmark size={15} fill={savedIds.has(featuredTip.id) ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Category chips + sort */}
      {!situationParam && (
        <div className="flex gap-2 px-4 mt-5 overflow-x-auto hide-scrollbar pb-1">
          {CATEGORY_FILTERS.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 text-xs font-bold px-3.5 py-1.5 rounded-full transition-all ${
                activeCategory === cat
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {t.categories[cat === 'All' ? 'All' : cat as TipCategory]}
            </button>
          ))}
        </div>
      )}

      {/* Tips feed */}
      <div className="px-4 mt-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-extrabold text-slate-900 dark:text-white text-sm">{ht.latestTips}</h2>
          {!situationParam && (
            <div className="flex gap-1">
              {(['recommend', 'latest', 'popular'] as SortMode[]).map(mode => (
                <button
                  key={mode}
                  onClick={() => setSortMode(mode)}
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-full transition-colors ${
                    sortMode === mode
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 dark:text-slate-500'
                  }`}
                >
                  {ht[mode]}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-3">
          {filteredTips.length === 0 ? (
            <p className="text-center text-slate-400 py-8 text-sm">{t.tips.empty}</p>
          ) : (
            filteredTips.map((tip, idx) => (
              <motion.div
                key={tip.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04 }}
              >
                <TipCard
                  tip={tip}
                  lang={lang}
                  t={t}
                  savedIds={savedIds}
                  likedIds={likedIds}
                  expandedId={expandedId}
                  onSave={handleSave}
                  onLike={handleLike}
                  onExpand={setExpandedId}
                />
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
