import { useState } from 'react';
import { Globe, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp, type Lang } from '../../context/AppContext';

const LANG_OPTIONS: { code: Lang; flag: string; label: string }[] = [
  { code: 'ko', flag: '🇰🇷', label: '한국어' },
  { code: 'en', flag: '🇺🇸', label: 'English' },
  { code: 'ja', flag: '🇯🇵', label: '日本語' },
  { code: 'zh', flag: '🇨🇳', label: '中文' },
];

export default function Header() {
  const { lang, setLang, theme, toggleTheme } = useApp();
  const [langOpen, setLangOpen] = useState(false);

  const currentLang = LANG_OPTIONS.find(l => l.code === lang);

  const handleLangSelect = (code: Lang) => {
    setLang(code);
    setLangOpen(false);
  };

  return (
    <>
      {/* Overlay to close dropdown */}
      {langOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
      )}

      <header className="fixed top-0 left-0 right-0 z-50 glass-panel">
        <div className="max-w-md mx-auto px-5 h-14 flex items-center justify-between">
          {/* LOGO */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 flex-shrink-0">
              <span className="text-white font-black text-base leading-none select-none">L</span>
            </div>
            <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
              LocalFlow
            </span>
          </div>

          {/* CONTROLS */}
          <div className="flex items-center gap-2">
            {/* Language Selector */}
            <div className="relative z-50">
              <button
                onClick={() => setLangOpen(o => !o)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm font-semibold text-slate-700 dark:text-slate-200"
                aria-label="Select language"
              >
                <Globe size={14} className="text-slate-500 dark:text-slate-400" />
                <span>{currentLang?.flag}</span>
                <span className="text-xs">{lang.toUpperCase()}</span>
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-36 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl overflow-hidden"
                  >
                    {LANG_OPTIONS.map(opt => (
                      <button
                        key={opt.code}
                        onClick={() => handleLangSelect(opt.code)}
                        className={`w-full text-left px-4 py-3 text-sm font-medium flex items-center gap-2.5 transition-colors border-b border-slate-100 dark:border-slate-800 last:border-0 ${
                          lang === opt.code
                            ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold'
                            : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <span className="text-base">{opt.flag}</span>
                        <span>{opt.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-slate-300"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
