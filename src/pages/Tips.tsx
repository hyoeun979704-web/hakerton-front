import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ThumbsUp, MessageSquare, ExternalLink } from 'lucide-react';

const TIPS_DATA = [
  {
    id: 1,
    category: 'Transport',
    title: 'How to use T-Money Card like a pro',
    author: 'Jihoon',
    isExpert: true,
    content: 'T-Money cards aren\'t just for subways! You can use them in convenience stores, taxis, and even some vending machines to avoid carrying coins.',
    likes: 342,
    comments: 12
  },
  {
    id: 2,
    category: 'Food',
    title: 'Hidden KBBQ spot in Mapo-gu',
    author: 'Sarah.킴',
    isExpert: false,
    content: 'Skip the tourist traps in Myeongdong. Head to Mapo station exit 3, walk down the alleyway next to the GS25. The pork belly there is thick cut and cooked over real charcoal.',
    likes: 89,
    comments: 4
  },
  {
    id: 3,
    category: 'Culture',
    title: 'Temple Stay Etiquette 101',
    author: 'MonkJeong',
    isExpert: true,
    content: 'Always step over the threshold, never on it. Keep your hands clasped at your navel when walking through the temple grounds.',
    likes: 512,
    comments: 45
  }
];

export default function Tips() {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const categories = ['All', 'Transport', 'Food', 'Culture', 'Shopping', 'Nightlife'];

  const filteredTips = activeCategory === 'All' 
    ? TIPS_DATA 
    : TIPS_DATA.filter(tip => tip.category === activeCategory);

  return (
    <div className="min-h-screen pt-12 px-6 pb-24">
      <h1 className="text-3xl font-extrabold mb-6">Local Tips</h1>
      
      {/* App 3 Feature: Category Chip Filtering */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-2 -mx-6 px-6 hide-scrollbar scroll-smooth">
        {categories.map((cat) => (
          <button 
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2.5 rounded-full font-medium whitespace-nowrap transition-all ${
              activeCategory === cat 
              ? 'bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]' 
              : 'glass text-slate-300 hover:bg-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      
      {/* App 3 Feature: Local Expert Badge Cards */}
      <div className="space-y-5">
        <AnimatePresence mode="popLayout">
          {filteredTips.map((tip) => (
            <motion.div 
              key={tip.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="glass rounded-3xl p-5 relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex gap-2 items-center">
                  <span className="text-xs font-semibold px-2 py-1 rounded-md bg-white/10 text-slate-300">
                    {tip.category}
                  </span>
                  {tip.isExpert && (
                    <span className="flex items-center gap-1 text-[10px] font-bold bg-amber-500/20 border border-amber-500/30 text-amber-400 px-2 py-1 rounded-md shadow-[0_0_10px_rgba(245,158,11,0.2)]">
                      <CheckCircle2 size={12} /> Local Expert
                    </span>
                  )}
                </div>
                <button className="text-slate-500 hover:text-white transition-colors">
                  <ExternalLink size={16} />
                </button>
              </div>
              
              <h3 className="text-xl font-bold mb-2 leading-tight">{tip.title}</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-3">
                {tip.content}
              </p>
              
              <div className="flex justify-between items-center text-sm border-t border-white/10 pt-4 mt-2">
                <span className="text-slate-400 font-medium">By @{tip.author}</span>
                <div className="flex gap-4">
                  <button className="flex items-center gap-1 text-slate-400 hover:text-pink-400 transition-colors">
                    <ThumbsUp size={16} /> <span className="text-xs font-semibold">{tip.likes}</span>
                  </button>
                  <button className="flex items-center gap-1 text-slate-400 hover:text-blue-400 transition-colors">
                    <MessageSquare size={16} /> <span className="text-xs font-semibold">{tip.comments}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
