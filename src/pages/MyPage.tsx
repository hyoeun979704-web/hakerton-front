import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Globe, Moon, Sun, Bell, Info, ChevronRight,
  Shield, FileText, User, Check, Sparkles,
  LogIn, LogOut, Bookmark, PenLine
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp, type Lang } from '../context/AppContext';

const LANG_OPTIONS: { code: Lang; flag: string; label: string }[] = [
  { code: 'ko', flag: '🇰🇷', label: '한국어' },
  { code: 'en', flag: '🇺🇸', label: 'English' },
  { code: 'ja', flag: '🇯🇵', label: '日本語' },
  { code: 'zh', flag: '🇨🇳', label: '中文' },
];

const TESTER = {
  name: 'Kim 테스터',
  nameEn: 'Kim Tester',
  email: 'tester@localflow.kr',
  initials: 'KT',
};

function loadLogin(): boolean {
  try { return localStorage.getItem('lf_logged_in') === '1'; } catch { return false; }
}

export default function MyPage() {
  const { lang, setLang, theme, toggleTheme, t } = useApp();
  const mt = t.myPage;
  const [notifEnabled, setNotifEnabled] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(loadLogin);

  const login = () => {
    try { localStorage.setItem('lf_logged_in', '1'); } catch {}
    setIsLoggedIn(true);
  };
  const logout = () => {
    try { localStorage.removeItem('lf_logged_in'); } catch {}
    setIsLoggedIn(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0A0A0E] pt-14 pb-24">
      {/* Page Title */}
      <div className="px-6 pt-6 pb-5">
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">{mt.title}</h1>
      </div>

      {/* Profile Card */}
      <div className="px-6 mb-4">
        {isLoggedIn ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 flex-shrink-0">
                <span className="text-white font-extrabold text-lg">{TESTER.initials}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-slate-900 dark:text-white text-base truncate">{TESTER.name}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{TESTER.email}</p>
                <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-extrabold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full">
                  ✓ 테스터 계정
                </span>
              </div>
              <button
                onClick={logout}
                className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-xl active:scale-95 transition-transform"
              >
                <LogOut size={12} /> 로그아웃
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                <User size={24} className="text-slate-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-slate-900 dark:text-white text-base">{mt.guestUser}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{mt.guestEmail}</p>
              </div>
            </div>
            <button
              onClick={login}
              className="mt-4 w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-extrabold text-sm py-3 rounded-2xl shadow-lg shadow-blue-500/25 active:scale-[0.98] transition-transform"
            >
              <LogIn size={15} /> 테스터로 로그인
            </button>
          </div>
        )}
      </div>

      {/* Travel Style Button */}
      <div className="px-6 mb-4">
        <Link
          to="/onboarding"
          className="flex items-center gap-3 w-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl px-5 py-4 shadow-md shadow-blue-500/20 active:scale-[0.98] transition-transform"
        >
          <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
            <Sparkles size={18} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="font-extrabold text-sm text-white">여행 스타일 탐색 다시하기</p>
            <p className="text-[11px] text-white/65 mt-0.5">Retake Travel Style Quiz</p>
          </div>
          <ChevronRight size={16} className="text-white/60 flex-shrink-0" />
        </Link>
      </div>

      {/* Shortcuts */}
      <div className="px-6 mb-6">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
          <Link
            to="/saved"
            className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors active:scale-[0.99]"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-500/15 flex items-center justify-center flex-shrink-0">
              <Bookmark size={17} className="text-amber-600 dark:text-amber-400" />
            </div>
            <span className="flex-1 font-semibold text-sm text-slate-700 dark:text-slate-300">저장한 꿀팁</span>
            <ChevronRight size={16} className="text-slate-300 dark:text-slate-600" />
          </Link>
          <Link
            to="/submit"
            className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors active:scale-[0.99]"
          >
            <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-500/15 flex items-center justify-center flex-shrink-0">
              <PenLine size={17} className="text-purple-600 dark:text-purple-400" />
            </div>
            <span className="flex-1 font-semibold text-sm text-slate-700 dark:text-slate-300">꿀팁 제보하기</span>
            <ChevronRight size={16} className="text-slate-300 dark:text-slate-600" />
          </Link>
        </div>
      </div>

      {/* Language Section */}
      <SectionHeader icon={Globe} label={mt.language} />
      <div className="px-6 mb-6">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
          {LANG_OPTIONS.map((opt) => (
            <motion.button
              key={opt.code}
              whileTap={{ scale: 0.99 }}
              onClick={() => setLang(opt.code)}
              className={`w-full flex items-center gap-4 px-5 py-4 transition-colors text-left ${
                lang === opt.code
                  ? 'bg-blue-50 dark:bg-blue-500/10'
                  : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              <span className="text-2xl flex-shrink-0">{opt.flag}</span>
              <span className={`flex-1 font-semibold text-sm ${
                lang === opt.code
                  ? 'text-blue-700 dark:text-blue-400'
                  : 'text-slate-700 dark:text-slate-300'
              }`}>
                {opt.label}
              </span>
              {lang === opt.code && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0"
                >
                  <Check size={13} className="text-white" strokeWidth={3} />
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Theme Section */}
      <SectionHeader icon={theme === 'dark' ? Moon : Sun} label={mt.theme} />
      <div className="px-6 mb-6">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
          {[
            { mode: 'light' as const, icon: Sun, label: mt.themeLight },
            { mode: 'dark' as const, icon: Moon, label: mt.themeDark },
          ].map(({ mode, icon: Icon, label }) => (
            <motion.button
              key={mode}
              whileTap={{ scale: 0.99 }}
              onClick={() => { if (theme !== mode) toggleTheme(); }}
              className={`w-full flex items-center gap-4 px-5 py-4 transition-colors text-left ${
                theme === mode
                  ? 'bg-blue-50 dark:bg-blue-500/10'
                  : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                mode === 'light'
                  ? 'bg-amber-100 dark:bg-amber-500/15 text-amber-600 dark:text-amber-400'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}>
                <Icon size={18} />
              </div>
              <span className={`flex-1 font-semibold text-sm ${
                theme === mode
                  ? 'text-blue-700 dark:text-blue-400'
                  : 'text-slate-700 dark:text-slate-300'
              }`}>
                {label}
              </span>
              {theme === mode && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0"
                >
                  <Check size={13} className="text-white" strokeWidth={3} />
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Notifications Section */}
      <SectionHeader icon={Bell} label={mt.notifications} />
      <div className="px-6 mb-6">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 px-5 py-4 flex items-center gap-4">
          <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-500/15 flex items-center justify-center flex-shrink-0">
            <Bell size={18} className="text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm text-slate-700 dark:text-slate-300">{mt.notifications}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{mt.notificationsDesc}</p>
          </div>
          <button
            onClick={() => setNotifEnabled(v => !v)}
            className={`relative w-12 h-6 rounded-full transition-colors flex-shrink-0 ${
              notifEnabled ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-700'
            }`}
          >
            <motion.div
              animate={{ x: notifEnabled ? 24 : 2 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-md"
            />
          </button>
        </div>
      </div>

      {/* About Section */}
      <SectionHeader icon={Info} label={mt.about} />
      <div className="px-6 mb-6">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
          <InfoRow icon={Info} label={mt.version} value="1.0.0" />
          <InfoRow icon={Shield} label={mt.privacy} />
          <InfoRow icon={FileText} label={mt.terms} />
        </div>
      </div>

      {/* App branding */}
      <div className="px-6 pb-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-1">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <span className="text-white font-black text-xs">L</span>
          </div>
          <span className="font-extrabold text-sm text-slate-700 dark:text-slate-300">LocalFlow</span>
        </div>
        <p className="text-xs text-slate-400 dark:text-slate-600">Seoul, Decoded.</p>
      </div>
    </div>
  );
}

function SectionHeader({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="px-6 mb-2 flex items-center gap-2">
      <Icon size={13} className="text-slate-400 dark:text-slate-500" />
      <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{label}</span>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value?: string;
}) {
  return (
    <div className="flex items-center gap-4 px-5 py-4">
      <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
        <Icon size={16} className="text-slate-500 dark:text-slate-400" />
      </div>
      <span className="flex-1 font-semibold text-sm text-slate-700 dark:text-slate-300">{label}</span>
      {value && <span className="text-sm text-slate-400 dark:text-slate-500 font-medium">{value}</span>}
    </div>
  );
}
