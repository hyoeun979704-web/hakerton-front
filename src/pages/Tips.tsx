import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart, Bookmark, Search, ChevronDown, ChevronUp,
  CheckCircle2, Share2, Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TIPS, getSavedIds, toggleSaved, type TipCategory } from '../data/tips';
import { useSearchParams } from 'react-router-dom';

type CategoryFilter = 'All' | TipCategory;
const CATEGORIES: CategoryFilter[] = ['All', 'Transport', 'Food', 'Culture', 'Shopping', 'Nightlife', 'Emergency'];

export default function Tips() {
  const [searchParams] = useSearchParams();
  const situationParam = searchParams.get('situation');
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set());
  const [savedIds, setSavedIds] = useState<Set<number>>(getSavedIds);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const { t, lang } = useApp();
  const tt = t.tips;

  const filteredTips = TIPS.filter(tip => {
    if (situationParam) return tip.situations.includes(situationParam);
    if (activeCategory !== 'All' && tip.category !== activeCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        tip.titleKo.toLowerCase().includes(q) ||
        tip.contentKo.toLowerCase().includes(q) ||
        tip.contentEn.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const toggleLike = (id: number) => {
    setLikedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const handleSave = (id: number) => {
    toggleSaved(id);
    setSavedIds(getSavedIds());
  };

  const handleShare = async (tip: typeof TIPS[0]) => {
    const text = `${tip.titleKo}\n\n${tip.contentEn}\n\n— 로컬리 (Locally) 서울 꿀팁`;
    if (navigator.share) {
      try {
        await navigator.share({ title: tip.titleKo, text, url: window.location.href });
      } catch { /* user dismissed */ }
    } else {
      await navigator.clipboard.writeText(text);
      setCopiedId(tip.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  // Pick the right language content
  const getContent = (tip: typeof TIPS[0]) => {
    if (lang === 'ja') return tip.contentJa;
    if (lang === 'zh') return tip.contentZh;
    if (lang === 'ko') return tip.contentKo;
    return tip.contentEn;
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0A0A0E]">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 px-5 pt-5 pb-4 border-b border-slate-200 dark:border-slate-800">
        <h1 className="text-xl font-extrabold text-slate-900 dark:text-white mb-1">{tt.title}</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-3">
          {filteredTips.length} tips
        </p>
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-xl px-3 py-2.5">
          <Search size={15} className="text-slate-400 flex-shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={t.home.searchPlaceholder}
            className="flex-1 bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400 outline-none"
          />
        </div>
      </div>

      {/* Category Chips */}
      <div className="flex gap-2 overflow-x-auto py-3 px-5 hide-scrollbar bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full font-bold whitespace-nowrap text-xs transition-all flex-shrink-0 ${
              activeCategory === cat
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {t.categories[cat === 'All' ? 'All' : cat as TipCategory]}
          </button>
        ))}
      </div>

      {/* Tips List */}
      <div className="px-4 py-4 space-y-3">
        <AnimatePresence mode="popLayout">
          {filteredTips.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="text-center py-16 text-slate-400 dark:text-slate-500"
            >
              <span className="text-4xl mb-3 block">🔍</span>
              <p className="font-medium text-sm">{tt.empty}</p>
            </motion.div>
          ) : (
            filteredTips.map((tip, idx) => {
              const isExpanded = expandedId === tip.id;
              const isLiked = likedIds.has(tip.id);
              const isSaved = savedIds.has(tip.id);
              const isCopied = copiedId === tip.id;
              const content = getContent(tip);
              const isLong = content.length > 100;

              const categoryStyle =
                tip.category === 'Food'      ? 'bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-400' :
                tip.category === 'Transport' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400' :
                tip.category === 'Culture'   ? 'bg-purple-100 text-purple-700 dark:bg-purple-500/15 dark:text-purple-400' :
                tip.category === 'Emergency' ? 'bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400' :
                tip.category === 'Nightlife' ? 'bg-pink-100 text-pink-700 dark:bg-pink-500/15 dark:text-pink-400' :
                tip.category === 'Shopping'  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400' :
                'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300';

              return (
                <motion.article
                  key={tip.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.2, delay: idx * 0.03 }}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"
                >
                  <div className="px-4 pt-4 pb-3">
                    {/* Category + Expert badge */}
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${categoryStyle}`}>
                        {t.categories[tip.category]}
                      </span>
                      {tip.isExpert && (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 px-2 py-0.5 rounded-full">
                          <CheckCircle2 size={10} /> {tt.localExpert}
                        </span>
                      )}
                      {tip.isFeatured && (
                        <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-2 py-0.5 rounded-full">PICK</span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-snug mb-1.5">
                      {tip.titleKo}
                    </h3>

                    {/* Content — language-aware */}
                    <p className={`text-xs text-slate-600 dark:text-slate-400 leading-relaxed ${isExpanded || !isLong ? '' : 'line-clamp-2'}`}>
                      {content}
                    </p>

                    {/* Expanded: cultural context box */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          key="ctx"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="mt-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800/30 rounded-xl p-3"
                        >
                          <div className="flex items-center gap-1.5 mb-1.5">
                            <span className="text-[10px]">✦</span>
                            <p className="text-[10px] font-extrabold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                              문화 맥락 · Cultural Context
                            </p>
                          </div>
                          <p className="text-xs text-purple-700 dark:text-purple-300 leading-relaxed">
                            {tip.culturalContext}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {isLong && (
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : tip.id)}
                        className="mt-1.5 flex items-center gap-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400"
                      >
                        {isExpanded
                          ? <><ChevronUp size={12} /> {tt.readLess}</>
                          : <><ChevronDown size={12} /> {tt.readMore}</>
                        }
                      </button>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="px-4 py-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${tip.avatarColor} flex items-center justify-center text-white font-bold text-[9px]`}>
                        {tip.authorInitials}
                      </div>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">{tip.author}</span>
                      <span className="text-[10px] text-slate-300 dark:text-slate-600">·</span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500">{tip.location}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleLike(tip.id)}
                        className={`flex items-center gap-1 text-[11px] font-semibold transition-colors ${isLiked ? 'text-red-500' : 'text-slate-400 dark:text-slate-500'}`}
                      >
                        <Heart size={13} fill={isLiked ? 'currentColor' : 'none'} />
                        {tip.likes + (isLiked ? 1 : 0)}
                      </button>
                      <button
                        onClick={() => handleSave(tip.id)}
                        className={`transition-colors ${isSaved ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`}
                      >
                        <Bookmark size={14} fill={isSaved ? 'currentColor' : 'none'} />
                      </button>
                      {/* SNS Share */}
                      <button
                        onClick={() => handleShare(tip)}
                        className={`transition-colors ${isCopied ? 'text-emerald-500' : 'text-slate-400 dark:text-slate-500'}`}
                      >
                        {isCopied ? <Check size={14} /> : <Share2 size={14} />}
                      </button>
                    </div>
                  </div>

                  {/* Copied toast */}
                  <AnimatePresence>
                    {isCopied && (
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="px-4 pb-2.5"
                      >
                        <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold text-right">
                          ✓ 클립보드에 복사됨 · Copied!
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.article>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
