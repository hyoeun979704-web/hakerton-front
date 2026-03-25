import { useState, useEffect } from 'react';
import { Bookmark, Trash2, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { TIPS, getSavedIds, toggleSaved } from '../data/tips';

export default function Saved() {
  const { t, lang } = useApp();
  const st = t.saved;
  const [savedIds, setSavedIds] = useState<Set<number>>(getSavedIds);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    setSavedIds(getSavedIds());
  }, []);

  const savedTips = TIPS.filter(tip => savedIds.has(tip.id));

  const handleRemove = (id: number) => {
    toggleSaved(id);
    setSavedIds(getSavedIds());
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0A0A0E] pt-14 pb-24">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 px-6 py-5 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-blue-100 dark:bg-blue-500/15 flex items-center justify-center">
            <Bookmark size={18} className="text-blue-600 dark:text-blue-400" fill="currentColor" />
          </div>
          <div>
            <h1 className="font-extrabold text-slate-900 dark:text-white text-lg leading-tight">{st.title}</h1>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">
              {savedTips.length > 0 ? `${savedTips.length}개 저장됨` : st.empty}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-emerald-50 dark:bg-emerald-500/10 px-6 py-3 border-b border-emerald-100 dark:border-emerald-500/20 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </div>
          <span className="text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400 tracking-wide uppercase">✅ 오프라인 열람 가능 · Available Offline</span>
        </div>
      </div>

      <div className="px-4 py-4">
        <AnimatePresence>
          {savedTips.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center pt-16 pb-8 text-center"
            >
              <div className="w-20 h-20 rounded-3xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                <Bookmark size={32} className="text-slate-300 dark:text-slate-600" />
              </div>
              <p className="font-bold text-slate-900 dark:text-white text-base mb-1">{st.empty}</p>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">{st.emptyDesc}</p>
              <Link
                to="/"
                className="flex items-center gap-1.5 bg-blue-600 text-white font-bold text-sm px-5 py-2.5 rounded-full"
              >
                {st.browseCta} <ChevronRight size={14} />
              </Link>
            </motion.div>
          ) : (
            <div className="space-y-3">
              {savedTips.map((tip, idx) => {
                const isExpanded = expandedId === tip.id;
                const content = lang === 'ko' ? tip.contentKo : tip.contentEn;
                const title = tip.titleKo;
                const isLong = content.length > 80;

                return (
                  <motion.div
                    key={tip.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -32, transition: { duration: 0.2 } }}
                    transition={{ delay: idx * 0.06 }}
                    className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm"
                  >
                    <div className="px-4 pt-4 pb-3">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 bg-gradient-to-br ${tip.avatarColor}`}>
                            {tip.authorInitials}
                          </div>
                          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                            tip.category === 'Food' ? 'bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-400' :
                            tip.category === 'Transport' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400' :
                            tip.category === 'Culture' ? 'bg-purple-100 text-purple-700 dark:bg-purple-500/15 dark:text-purple-400' :
                            tip.category === 'Emergency' ? 'bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400' :
                            tip.category === 'Nightlife' ? 'bg-pink-100 text-pink-700 dark:bg-pink-500/15 dark:text-pink-400' :
                            'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                          }`}>
                            {t.categories[tip.category]}
                          </span>
                        </div>
                        <button
                          onClick={() => handleRemove(tip.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors flex-shrink-0"
                          aria-label="Remove from saved"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <h3 className="font-bold text-slate-900 dark:text-white text-sm leading-snug mb-1.5">{title}</h3>
                      <p className={`text-xs text-slate-600 dark:text-slate-400 leading-relaxed ${!isExpanded && isLong ? 'line-clamp-2' : ''}`}>
                        {content}
                      </p>
                      {isLong && (
                        <button
                          onClick={() => setExpandedId(isExpanded ? null : tip.id)}
                          className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 mt-1"
                        >
                          {isExpanded ? t.tips.readLess : t.tips.readMore}
                        </button>
                      )}
                    </div>

                    <div className="px-4 pb-3 flex items-center gap-3">
                      {tip.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">{tag}</span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
