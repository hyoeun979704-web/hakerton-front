import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Bookmark, Search, ChevronDown, ChevronUp, CheckCircle2, Share2, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TIPS, getSavedIds, toggleSaved, type TipCategory } from '../data/tips';
import { useSearchParams } from 'react-router-dom';
import { toPng } from 'html-to-image';

type CategoryFilter = 'All' | TipCategory;
const CATEGORIES: CategoryFilter[] = ['All', 'Transport', 'Food', 'Culture', 'Shopping', 'Nightlife', 'Emergency'];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function TipCard({ tip, lang, idx, likedIds, savedIds, toggleLike, handleSave, t, tt }: any) {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLElement>(null);
  
  const isLiked = likedIds.has(tip.id);
  const isSaved = savedIds.has(tip.id);
  const content = lang === 'ko' ? tip.contentKo : tip.contentEn;
  const isLong = content.length > 100;
  
  // Fake splitting for cultural context demo if English/Japanese (not KO)
  let translationText = lang === 'ko' ? tip.contentEn : tip.contentKo;
  let culturalContext = "";
  
  if (lang !== 'ko' && translationText.includes("—")) {
    const parts = translationText.split("—");
    translationText = parts[0].trim();
    culturalContext = parts[1].trim();
  } else if (lang !== 'ko' && translationText.length > 60) {
    const splitIndex = translationText.indexOf(". ");
    if (splitIndex !== -1) {
      culturalContext = translationText.trim().substring(splitIndex + 2);
      translationText = translationText.trim().substring(0, splitIndex + 1);
    }
  }

  const handleShare = async () => {
    if (!cardRef.current) return;
    try {
      // Create a wrapper for 9:16 aspect ratio export
      const wrapper = document.createElement('div');
      wrapper.style.width = '1080px';
      wrapper.style.height = '1920px';
      wrapper.style.background = 'linear-gradient(135deg, #4f46e5 0%, #db2777 100%)';
      wrapper.style.display = 'flex';
      wrapper.style.alignItems = 'center';
      wrapper.style.justifyContent = 'center';
      wrapper.style.position = 'fixed';
      wrapper.style.top = '-9999px';
      wrapper.style.left = '-9999px';

      const clone = cardRef.current.cloneNode(true) as HTMLElement;
      clone.style.width = '800px';
      clone.style.transform = 'scale(1.2)';
      clone.style.borderRadius = '32px';
      clone.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.5)';
      
      wrapper.appendChild(clone);
      document.body.appendChild(wrapper);

      const dataUrl = await toPng(wrapper, { cacheBust: true, pixelRatio: 1 });
      document.body.removeChild(wrapper);

      const link = document.createElement('a');
      link.download = `locally-story-tip-${tip.id}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export image', err);
    }
  };

  const categoryStyle =
    tip.category === 'Food' ? 'bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-400' :
    tip.category === 'Transport' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400' :
    tip.category === 'Culture' ? 'bg-purple-100 text-purple-700 dark:bg-purple-500/15 dark:text-purple-400' :
    tip.category === 'Emergency' ? 'bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400' :
    tip.category === 'Nightlife' ? 'bg-pink-100 text-pink-700 dark:bg-pink-500/15 dark:text-pink-400' :
    tip.category === 'Shopping' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400' :
    'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300';

  return (
    <motion.article
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.2, delay: idx * 0.03 }}
      className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"
    >
      <div className="px-5 pt-5 pb-4">
        {/* Category + Expert badge */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
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
        <h3 className="font-extrabold text-base text-slate-900 dark:text-white leading-snug mb-2">{tip.titleKo}</h3>

        {/* Content */}
        <p className={`text-sm text-slate-600 dark:text-slate-400 leading-relaxed ${isExpanded || !isLong ? '' : 'line-clamp-2'}`}>
          {content}
        </p>

        {/* Bilingual toggle - Now with separated Cultural Context */}
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 space-y-2.5"
          >
            {/* Literal Translation Box */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-3.5 border border-slate-100 dark:border-slate-700">
              <p className="text-[10px] font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1.5">{tt.translation || 'Translation'}</p>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {translationText}
              </p>
            </div>
            
            {/* Cultural Context Box */}
            {(culturalContext || lang === 'ko') && (
              <div className="bg-purple-50 dark:bg-purple-500/10 rounded-xl p-3.5 border border-purple-100 dark:border-purple-500/20 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-purple-400/20 to-pink-400/20 blur-xl rounded-full" />
                <p className="flex items-center gap-1.5 text-[11px] font-extrabold text-purple-600 dark:text-purple-400 uppercase tracking-widest mb-1.5 relative z-10">
                  <Sparkles size={13} /> Cultural Context (Why)
                </p>
                <p className="text-xs text-purple-900/80 dark:text-purple-200/80 leading-relaxed font-semibold relative z-10">
                  {culturalContext || (lang === 'ko' ? "이 팁은 한국의 독특한 문화적 맥락을 바탕으로 작성되었습니다." : "")}
                </p>
              </div>
            )}
          </motion.div>
        )}

        {isLong && (
          <button
            onClick={() => setIsExpanded(p => !p)}
            className="mt-3 flex items-center gap-1 text-[12px] font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors"
          >
            {isExpanded ? <><ChevronUp size={14} /> {tt.readLess}</> : <><ChevronDown size={14} /> {tt.readMore}</>}
          </button>
        )}
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900">
        <div className="flex items-center gap-2.5">
          <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${tip.avatarColor} flex items-center justify-center text-white font-bold text-[10px] shadow-sm`}>
            {tip.authorInitials}
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-slate-700 dark:text-slate-300 font-bold">{tip.author}</span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500">{tip.location}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => toggleLike(tip.id)}
            className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${isLiked ? 'text-red-500' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600'}`}
          >
            <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
            {tip.likes + (isLiked ? 1 : 0)}
          </button>
          <button
            onClick={() => handleSave(tip.id)}
            className={`transition-colors flex items-center gap-1.5 text-xs font-semibold ${isSaved ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600'}`}
          >
            <Bookmark size={16} fill={isSaved ? 'currentColor' : 'none'} />
          </button>
          {/* IG Story Share Button */}
          <button
            onClick={handleShare}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 text-white shadow-md active:scale-95 transition-transform ml-1"
            title="인스타그램 스토리로 공유 (9:16)"
          >
            <Share2 size={14} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default function Tips() {
  const [searchParams] = useSearchParams();
  const situationParam = searchParams.get('situation');
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set());
  const [savedIds, setSavedIds] = useState<Set<number>>(getSavedIds);
  const [searchQuery, setSearchQuery] = useState('');
  const { t, lang } = useApp();
  const tt = t.tips;

  const filteredTips = TIPS
    .filter(tip => {
      if (situationParam) return tip.situations.includes(situationParam);
      if (activeCategory !== 'All' && tip.category !== activeCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return tip.titleKo.toLowerCase().includes(q) || tip.contentKo.toLowerCase().includes(q) || tip.contentEn.toLowerCase().includes(q);
      }
      return true;
    });

  const toggleLike = (id: number) => {
    setLikedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSave = (id: number) => {
    toggleSaved(id);
    setSavedIds(getSavedIds());
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0A0A0E] pb-24">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 px-5 pt-8 pb-4 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-20 shadow-sm">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white mb-1.5">{tt.title}</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-bold mb-4">
          {filteredTips.length} tips available
        </p>
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-xl px-4 py-3 border border-slate-200 dark:border-slate-700 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
          <Search size={16} className="text-slate-400 flex-shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={t.home.searchPlaceholder}
            className="flex-1 bg-transparent text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 outline-none"
          />
        </div>
      </div>

      {/* Category Chips */}
      <div className="flex gap-2.5 overflow-x-auto py-4 px-5 hide-scrollbar bg-slate-50 dark:bg-[#0A0A0E]">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full font-bold whitespace-nowrap text-xs transition-all flex-shrink-0 shadow-sm border ${
              activeCategory === cat
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white'
                : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800'
            }`}
          >
            {t.categories[cat === 'All' ? 'All' : cat as TipCategory]}
          </button>
        ))}
      </div>

      {/* Tips List */}
      <div className="px-5 space-y-4 pb-8">
        <AnimatePresence mode="popLayout">
          {filteredTips.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              className="text-center py-20 text-slate-400 dark:text-slate-500"
            >
              <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
                <Search size={32} className="text-slate-300 dark:text-slate-600" />
              </div>
              <p className="font-bold text-base text-slate-800 dark:text-slate-300 mb-1">결과가 없습니다</p>
              <p className="font-medium text-xs">{tt.empty}</p>
            </motion.div>
          ) : (
            filteredTips.map((tip, idx) => (
              <TipCard 
                key={tip.id}
                tip={tip}
                lang={lang}
                idx={idx}
                likedIds={likedIds}
                savedIds={savedIds}
                toggleLike={toggleLike}
                handleSave={handleSave}
                t={t}
                tt={tt}
              />
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
