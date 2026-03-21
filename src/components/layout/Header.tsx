import { useEffect, useState } from 'react';
import { Globe, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [theme, setTheme] = useState<'light'|'dark'>('dark');
  const [langOpen, setLangOpen] = useState(false);
  const [lang, setLang] = useState('EN');

  // Initialize theme from document class
  useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, []);

  const toggleTheme = () => {
    if (theme === 'dark') {
      document.documentElement.classList.remove('dark');
      setTheme('light');
    } else {
      document.documentElement.classList.add('dark');
      setTheme('dark');
    }
  };

  const selectLanguage = (l: string) => {
    setLang(l);
    setLangOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel">
      <div className="max-w-md mx-auto px-5 h-16 flex items-center justify-between relative">
        {/* LOGO */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <span className="text-white font-black text-lg leading-none">L</span>
          </div>
          <span className="font-extrabold text-lg tracking-tight">LocalFlow</span>
        </div>

        {/* CONTROLS */}
        <div className="flex items-center gap-2">
          
          {/* Language Selector */}
          <div className="relative">
            <button 
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm font-semibold"
            >
              <Globe size={16} className="text-slate-500 dark:text-slate-400" />
              <span>{lang}</span>
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute right-0 top-full mt-2 w-32 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden"
                >
                  {['KR', 'EN', 'JP', 'CN'].map(l => (
                    <button 
                      key={l}
                      onClick={() => selectLanguage(l)}
                      className="w-full text-left px-4 py-3 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b border-slate-100 dark:border-slate-800/50 last:border-0"
                    >
                      {l === 'KR' && '🇰🇷 한국어'}
                      {l === 'EN' && '🇺🇸 English'}
                      {l === 'JP' && '🇯🇵 日本語'}
                      {l === 'CN' && '🇨🇳 中文'}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-700 dark:text-slate-300"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}
