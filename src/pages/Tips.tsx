import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ThumbsUp, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';
import { useApp } from '../context/AppContext';

const TIPS_DATA = [
  {
    id: 1,
    category: 'Transport',
    title: 'How to use T-Money Card like a pro',
    author: 'Jihoon',
    authorInitials: 'JH',
    avatarColor: 'from-blue-500 to-indigo-600',
    isExpert: true,
    content: "T-Money cards aren't just for subways! You can use them in convenience stores, taxis, and even some vending machines to avoid carrying coins. Recharge at any subway station or CU/GS25.",
    likes: 342,
    comments: 12,
  },
  {
    id: 2,
    category: 'Food',
    title: 'Hidden KBBQ spot in Mapo-gu',
    author: 'Sarah.킴',
    authorInitials: 'SK',
    avatarColor: 'from-pink-500 to-rose-500',
    isExpert: false,
    content: 'Skip the tourist traps in Myeongdong. Head to Mapo station exit 3, walk down the alleyway next to the GS25. The pork belly there is thick cut and cooked over real charcoal.',
    likes: 89,
    comments: 4,
  },
  {
    id: 3,
    category: 'Culture',
    title: 'Temple Stay Etiquette 101',
    author: 'MonkJeong',
    authorInitials: 'MJ',
    avatarColor: 'from-amber-500 to-orange-500',
    isExpert: true,
    content: 'Always step over the threshold, never on it. Keep your hands clasped at your navel when walking through the temple grounds. Bow slightly when passing monks.',
    likes: 512,
    comments: 45,
  },
  {
    id: 4,
    category: 'Shopping',
    title: 'Dongdaemun after midnight',
    author: 'KimFashion',
    authorInitials: 'KF',
    avatarColor: 'from-purple-500 to-violet-600',
    isExpert: false,
    content: 'Dongdaemun Design Plaza shops are open until 5 AM. Come after midnight when the crowds thin out and bulk buyers leave — you get better deals and more attention from sellers.',
    likes: 201,
    comments: 18,
  },
  {
    id: 5,
    category: 'Nightlife',
    title: 'Hongdae locals\' secret pubs',
    author: 'Jihoon',
    authorInitials: 'JH',
    avatarColor: 'from-blue-500 to-indigo-600',
    isExpert: true,
    content: 'Skip the main Hongdae club street on Fridays. Head to the alley near Sangsu station exit 1 — better music, real locals, and no queue. Ask for the "craft beer alley" (수제맥주 골목).',
    likes: 389,
    comments: 27,
  },
];

export default function Tips() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set());
  const { t } = useApp();
  const tt = t.tips;

  const categories = ['All', 'Transport', 'Food', 'Culture', 'Shopping', 'Nightlife'];

  const filteredTips = activeCategory === 'All'
    ? TIPS_DATA
    : TIPS_DATA.filter(tip => tip.category === activeCategory);

  const toggleLike = (id: number) => {
    setLikedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const getCategoryLabel = (cat: string) => {
    return t.categories[cat as keyof typeof t.categories] || cat;
  };

  return (
    <div className="min-h-screen pt-14 pb-24 bg-white dark:bg-[#0A0A0E]">
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-1">{tt.title}</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
          {filteredTips.length} tips
        </p>
      </div>

      {/* Category Chips */}
      <div className="flex gap-2 overflow-x-auto pb-4 px-6 -mx-0 hide-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl font-semibold whitespace-nowrap text-xs transition-all flex-shrink-0 ${
              activeCategory === cat
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {getCategoryLabel(cat)}
          </button>
        ))}
      </div>

      {/* Tips List */}
      <div className="px-6 space-y-4 mt-2">
        <AnimatePresence mode="popLayout">
          {filteredTips.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="text-center py-16 text-slate-400 dark:text-slate-500"
            >
              <span className="text-4xl mb-3 block">🌏</span>
              <p className="font-medium">{tt.empty}</p>
            </motion.div>
          ) : (
            filteredTips.map((tip) => {
              const isExpanded = expandedId === tip.id;
              const isLiked = likedIds.has(tip.id);
              return (
                <motion.article
                  key={tip.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.22 }}
                  className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"
                >
                  {/* Card Header */}
                  <div className="p-5 pb-4">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg ${
                          tip.category === 'Transport' ? 'bg-blue-100 dark:bg-blue-500/15 text-blue-700 dark:text-blue-400' :
                          tip.category === 'Food' ? 'bg-orange-100 dark:bg-orange-500/15 text-orange-700 dark:text-orange-400' :
                          tip.category === 'Culture' ? 'bg-purple-100 dark:bg-purple-500/15 text-purple-700 dark:text-purple-400' :
                          tip.category === 'Shopping' ? 'bg-pink-100 dark:bg-pink-500/15 text-pink-700 dark:text-pink-400' :
                          'bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400'
                        }`}>
                          {getCategoryLabel(tip.category)}
                        </span>
                        {tip.isExpert && (
                          <span className="flex items-center gap-1 text-[10px] font-bold bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/25 text-amber-700 dark:text-amber-400 px-2 py-1 rounded-lg">
                            <CheckCircle2 size={10} /> {tt.localExpert}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2 leading-snug">{tip.title}</h3>

                    {/* Content */}
                    <p className={`text-sm text-slate-600 dark:text-slate-400 leading-relaxed ${isExpanded ? '' : 'line-clamp-2'}`}>
                      {tip.content}
                    </p>

                    {/* Expand Toggle */}
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : tip.id)}
                      className="mt-2 flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                    >
                      {isExpanded ? (
                        <><ChevronUp size={13} /> 접기</>
                      ) : (
                        <><ChevronDown size={13} /> 더 보기</>
                      )}
                    </button>
                  </div>

                  {/* Card Footer */}
                  <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-full bg-gradient-to-tr ${tip.avatarColor} flex items-center justify-center text-white font-bold text-[10px] flex-shrink-0`}>
                        {tip.authorInitials}
                      </div>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        @{tip.author}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleLike(tip.id)}
                        className={`flex items-center gap-1.5 transition-colors text-xs font-semibold ${
                          isLiked ? 'text-pink-500' : 'text-slate-400 dark:text-slate-500 hover:text-pink-400'
                        }`}
                      >
                        <ThumbsUp size={14} fill={isLiked ? 'currentColor' : 'none'} />
                        {tip.likes + (isLiked ? 1 : 0)}
                      </button>
                      <button className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 hover:text-blue-400 transition-colors text-xs font-semibold">
                        <MessageSquare size={14} /> {tip.comments}
                      </button>
                    </div>
                  </div>
                </motion.article>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
