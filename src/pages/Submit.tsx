import { useState, useEffect } from 'react';
import { X, Sparkles, Check, ChevronDown, Share2, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

type Category = 'Transport' | 'Food' | 'Culture' | 'Emergency' | 'Other';

const DRAFT_KEY = 'lf_submit_draft';

const MOCK_TRANSLATIONS: Record<string, { en: string; ja: string; zh: string }> = {
  default: {
    en: "AI-translated version of your tip will appear here. Cultural nuances and local knowledge will be preserved and contextualized for international travelers.",
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
  const [content, setContent] = useState(() => {
    try { return localStorage.getItem(DRAFT_KEY) ?? ''; } catch { return ''; }
  });
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [aiTab, setAiTab] = useState<'EN' | 'JA' | 'ZH'>('EN');
  const [aiGenerated, setAiGenerated] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [posted, setPosted] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  // Auto-save draft
  useEffect(() => {
    try { localStorage.setItem(DRAFT_KEY, content); } catch {}
  }, [content]);

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
    await new Promise(r => setTimeout(r, 900));
    try { localStorage.removeItem(DRAFT_KEY); } catch {}
    setShowShareModal(true);
  };

  const handleShareAndExit = async () => {
    const text = `서울 꿀팁을 로컬리에 올렸어요! 🎉\n\n"${content.slice(0, 80)}..."\n\n로컬리 앱에서 더 많은 꿀팁을 확인하세요.`;
    if (navigator.share) {
      try { await navigator.share({ title: '내 꿀팁이 올라갔어요!', text }); } catch {}
    } else {
      await navigator.clipboard.writeText(text);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
      return;
    }
    navigate('/');
  };

  const translation = MOCK_TRANSLATIONS.default;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0A0A0E] pt-14 pb-24">
      {/* Post-submit share modal */}
      <AnimatePresence>
        {showShareModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed bottom-0 left-0 right-0 z-50 max-w-md mx-auto bg-white dark:bg-slate-900 rounded-t-3xl p-6"
            >
              {/* XP reward */}
              <div className="flex justify-center mb-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.15 }}
                  className="flex items-center gap-2 bg-amber-400/15 border border-amber-400/30 rounded-2xl px-5 py-2.5"
                >
                  <Zap size={18} className="text-amber-500 fill-amber-500" />
                  <span className="font-extrabold text-amber-600 dark:text-amber-400 text-base">+50 XP 획득!</span>
                  <span className="text-xs text-amber-500/70 font-medium">로컬 전문가 배지로 가는 길</span>
                </motion.div>
              </div>

              <div className="text-center mb-6">
                <div className="text-4xl mb-2">🎉</div>
                <h2 className="font-extrabold text-lg text-slate-900 dark:text-white mb-1">
                  꿀팁이 올라갔어요!
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  누군가의 여행이 더 즐거워질 거예요.<br />
                  <span className="text-[11px]">Someone's trip just got better thanks to you.</span>
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleShareAndExit}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-extrabold text-sm py-3.5 rounded-2xl shadow-lg shadow-purple-500/25 active:scale-[0.98] transition-transform"
                >
                  {shareCopied
                    ? <><Check size={16} /> 클립보드에 복사됨!</>
                    : <><Share2 size={16} /> 인스타에 공유하기</>
                  }
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="w-full py-3 text-sm font-semibold text-slate-500 dark:text-slate-400"
                >
                  홈으로 돌아가기
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="bg-white dark:bg-slate-900 px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div>
          <h1 className="font-extrabold text-slate-900 dark:text-white text-lg leading-tight">{st.title}</h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">{st.description}</p>
        </div>
        <div className="flex items-center gap-2">
          {/* XP badge preview */}
          <div className="flex items-center gap-1 bg-amber-400/10 border border-amber-400/20 rounded-full px-2.5 py-1">
            <Zap size={11} className="text-amber-500 fill-amber-500" />
            <span className="text-[10px] font-extrabold text-amber-600 dark:text-amber-400">+50 XP</span>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      <div className="px-4 py-5 space-y-5">
        {/* Draft restored notice */}
        {content.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-800/30 rounded-xl px-3 py-2"
          >
            <span className="text-[10px]">💾</span>
            <p className="text-[11px] font-semibold text-blue-600 dark:text-blue-400">
              임시저장된 내용이 있어요 · Draft restored
            </p>
          </motion.div>
        )}

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
                    <><Sparkles size={15} /> {st.aiButton}</>
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
          {posted ? <><Check size={18} /> {st.success}</> : st.post}
        </motion.button>
      </div>
    </div>
  );
}
