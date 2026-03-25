import { useState } from 'react';
import { X, Sparkles, Check, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

type Category = 'Transport' | 'Food' | 'Culture' | 'Emergency' | 'Other';

const MOCK_TRANSLATIONS: Record<string, { en: string; ja: string; zh: string }> = {
  default: {
    en: "AI-translated version of your tip will appear here. The cultural nuances and local knowledge will be preserved and contextualized for international travelers.",
    ja: "あなたのヒントのAI翻訳版がここに表示されます。文化的なニュアンスとローカルな知識が保持され、外国人旅行者向けに文脈化されます。",
    zh: "您的攻略的AI翻译版本将显示在这里。文化细节和本地知识将被保留，并为国际旅行者提供背景说明。",
  },
};

const TRANSLATION_TABS = ['EN', 'JA', 'ZH'] as const;

export default function Submit() {
  const { t } = useApp();
  const st = t.submit;
  const navigate = useNavigate();

  const [category, setCategory] = useState<Category>('Food');
  const [content, setContent] = useState('');
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [aiTab, setAiTab] = useState<'EN' | 'JA' | 'ZH'>('EN');
  const [aiGenerated, setAiGenerated] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [posted, setPosted] = useState(false);

  const categories = Object.keys(st.categories) as Category[];
  const canPost = content.length >= 20;

  const handleAiPreview = async () => {
    if (!canPost) return;
    setAiLoading(true);
    await new Promise(r => setTimeout(r, 1800));
    setAiLoading(false);
    setAiGenerated(true);
  };

  const handlePost = async () => {
    if (!canPost) return;
    setPosted(true);
    await new Promise(r => setTimeout(r, 4000));
    navigate('/');
  };

  const translation = MOCK_TRANSLATIONS.default;

  if (posted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-slate-900 pt-14 pb-24 text-center">
        <motion.div
           initial={{ scale: 0 }}
           animate={{ scale: 1 }}
           transition={{ type: 'spring', stiffness: 200, damping: 15 }}
           className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-yellow-500/30"
        >
          <Sparkles className="w-12 h-12 text-white" />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="text-3xl font-black text-white mb-2"
        >
          +50 XP 획득!
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="text-slate-400 mb-10 font-medium text-sm leading-relaxed"
        >
          훌륭한 로컬 꿀팁이 전 세계 여행자에게<br/> 번역되어 공유되었습니다.
        </motion.p>
        
        <motion.div 
           initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
           className="w-full max-w-sm bg-slate-800 rounded-2xl p-5 border border-slate-700 flex items-center gap-4 mx-auto"
        >
          <div className="w-12 h-12 rounded-full border-4 border-emerald-500/30 flex flex-col items-center justify-center bg-emerald-500/10 text-emerald-400 flex-shrink-0">
            <span className="text-[10px] font-black leading-none mb-0.5">Lv.</span>
            <span className="text-sm font-black leading-none">4</span>
          </div>
          <div className="flex-1 text-left">
            <div className="flex items-center justify-between mb-1">
              <p className="font-bold text-white text-sm">Local Expert 🎉</p>
              <p className="text-xs font-bold text-emerald-400">200 XP</p>
            </div>
            <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
              <motion.div initial={{ width: '75%' }} animate={{ width: '100%' }} transition={{ delay: 0.8, duration: 1, ease: 'easeOut' }} className="h-full bg-gradient-to-r from-emerald-400 to-teal-400" />
            </div>
            <p className="text-[10px] text-slate-400 mt-1.5">레벨업! 새로운 배지를 획득했습니다.</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0A0A0E] pt-14 pb-24">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div>
          <h1 className="font-extrabold text-slate-900 dark:text-white text-lg leading-tight">{st.title}</h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">{st.description}</p>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
        >
          <X size={18} />
        </button>
      </div>

      {/* Gamification Profile */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 flex items-center justify-between text-white shadow-inner">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">ME</div>
          <div>
            <p className="font-bold text-sm flex items-center gap-1">Local Explorer <Sparkles size={12}/></p>
            <p className="text-[11px] text-white/80 mt-0.5">150 XP · <span className="text-emerald-300 font-bold">50 XP to Next Badge</span></p>
          </div>
        </div>
        <div className="w-11 h-11 rounded-full border-2 border-white/30 flex flex-col items-center justify-center bg-white/10 backdrop-blur-sm">
          <span className="text-[10px] font-black leading-none mb-0.5 text-white/80">Lv.</span>
          <span className="text-sm font-black leading-none">3</span>
        </div>
      </div>

      <div className="px-4 py-5 space-y-5">
        {/* Step 1: Category */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
            <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">Step 1</p>
            <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{st.categoryLabel}</p>
          </div>
          <div className="px-4 py-3 relative">
            <button
              onClick={() => setShowCategoryMenu(v => !v)}
              className="w-full flex items-center justify-between bg-slate-50 dark:bg-slate-800 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 dark:text-white"
            >
              <span>{st.categories[category]}</span>
              <ChevronDown size={16} className={`text-slate-400 transition-transform ${showCategoryMenu ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {showCategoryMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute left-4 right-4 top-full mt-1 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg overflow-hidden z-20"
                >
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => { setCategory(cat); setShowCategoryMenu(false); }}
                      className={`w-full px-4 py-3 text-sm font-semibold text-left flex items-center justify-between transition-colors ${
                        category === cat
                          ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                      }`}
                    >
                      {st.categories[cat]}
                      {category === cat && <Check size={14} />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Step 2: Content */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
            <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">Step 2</p>
            <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{st.contentLabel}</p>
          </div>
          <div className="px-4 py-3">
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder={st.contentPlaceholder}
              rows={5}
              className="w-full bg-slate-50 dark:bg-slate-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 resize-none outline-none border border-transparent focus:border-blue-400 dark:focus:border-blue-600 transition-colors leading-relaxed"
            />
            <div className={`text-right text-[11px] mt-1.5 font-semibold ${content.length >= 20 ? 'text-emerald-500' : 'text-slate-400'}`}>
              {content.length} / 20+
            </div>
            
            {/* Tip Quality Cue */}
            <div className="mt-3 bg-amber-50 dark:bg-amber-500/10 rounded-xl p-3 flex gap-2.5 border border-amber-200 dark:border-amber-500/20">
              <span className="text-lg flex-shrink-0 mt-0.5">💡</span>
              <div>
                <p className="text-xs font-bold text-amber-800 dark:text-amber-400 mb-1">외국인을 위한 '이유(Why)'를 적어주면 더 좋아요!</p>
                <p className="text-[10px] text-amber-700/80 dark:text-amber-400/80 leading-relaxed">
                  예: "한국 식당에선 반찬 추가가 무료니, 언제든 눈치보지 말고 더 달라고 해도 돼요!"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Step 3: AI Translation */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">Step 3</p>
              <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{st.aiLabel}</p>
            </div>
            <div className="w-7 h-7 rounded-full bg-purple-100 dark:bg-purple-500/15 flex items-center justify-center">
              <Sparkles size={14} className="text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <div className="px-4 py-3">
            {!aiGenerated ? (
              <div className="text-center py-4">
                <p className="text-xs text-slate-400 dark:text-slate-500 mb-3">{st.aiHint}</p>
                <button
                  onClick={handleAiPreview}
                  disabled={!canPost || aiLoading}
                  className={`flex items-center gap-2 mx-auto font-bold text-sm px-5 py-2.5 rounded-full transition-all ${
                    canPost && !aiLoading
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md hover:shadow-lg'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {aiLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                        className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white"
                      />
                      {st.aiGenerating}
                    </>
                  ) : (
                    <>
                      <Sparkles size={15} />
                      {st.aiButton}
                    </>
                  )}
                </button>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex gap-1 mb-3">
                  {TRANSLATION_TABS.map(tab => (
                    <button
                      key={tab}
                      onClick={() => setAiTab(tab)}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                        aiTab === tab
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800 rounded-xl p-3">
                  {aiTab === 'EN' ? translation.en : aiTab === 'JA' ? translation.ja : translation.zh}
                </p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Post button */}
        <motion.button
          onClick={handlePost}
          disabled={!canPost || posted}
          whileTap={{ scale: 0.97 }}
          className={`w-full font-extrabold text-base py-4 rounded-2xl transition-all flex items-center justify-center gap-2 ${
            canPost && !posted
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25'
              : posted
              ? 'bg-emerald-500 text-white'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
          }`}
        >
          {posted ? (
            <>
              <Check size={18} /> {st.success}
            </>
          ) : (
            st.post
          )}
        </motion.button>
      </div>
    </div>
  );
}
