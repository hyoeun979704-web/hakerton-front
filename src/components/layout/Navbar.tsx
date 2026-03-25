import { Link, useLocation } from 'react-router-dom';
import { Home, MapPin, Search, Plane, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';

export default function Navbar() {
  const location = useLocation();
  const { t } = useApp();

  const leftItems = [
    { path: '/',           icon: Home,   label: t.nav.home },
    { path: '/situations', icon: MapPin, label: t.nav.live },
  ];

  const rightItems = [
    { path: '/companions', icon: Plane, label: t.nav.travel },
    { path: '/mypage',     icon: User,  label: t.nav.mypage },
  ];

  const NavItem = ({ path, icon: Icon, label }: { path: string; icon: typeof Home; label: string }) => {
    const isActive = location.pathname === path;
    return (
      <Link
        to={path}
        className="flex flex-col items-center justify-center gap-0.5 flex-1 h-full relative group"
      >
        {isActive && (
          <motion.div
            layoutId="nav-pill"
            className="absolute top-2 inset-x-1 h-10 rounded-2xl bg-blue-50 dark:bg-blue-500/10"
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
        )}
        <Icon
          size={21}
          className={`relative z-10 transition-colors duration-200 ${
            isActive
              ? 'text-blue-600 dark:text-blue-400'
              : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-400'
          }`}
          strokeWidth={isActive ? 2.5 : 1.8}
        />
        <span
          className={`relative z-10 text-[9px] font-bold tracking-tight transition-colors duration-200 ${
            isActive
              ? 'text-blue-600 dark:text-blue-400'
              : 'text-slate-400 dark:text-slate-500'
          }`}
        >
          {label}
        </span>
      </Link>
    );
  };

  const isTipsActive = location.pathname === '/tips' || location.pathname === '/search';

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-panel border-t border-slate-200/60 dark:border-white/5 pb-safe">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto relative">
        {leftItems.map(item => <NavItem key={item.path} {...item} />)}

        {/* Center FAB — 꿀팁 검색 */}
        <div className="flex flex-col items-center justify-center flex-1 h-full relative">
          <Link
            to="/tips"
            className={`absolute -top-6 w-14 h-14 rounded-full flex items-center justify-center shadow-xl active:scale-95 transition-all ${
              isTipsActive
                ? 'bg-gradient-to-br from-blue-500 to-indigo-600 shadow-blue-500/50 ring-4 ring-blue-500/20'
                : 'bg-gradient-to-br from-blue-500 to-indigo-600 shadow-blue-500/40'
            }`}
          >
            <Search size={22} className="text-white" strokeWidth={2.2} />
          </Link>
          <span className={`absolute bottom-2 text-[9px] font-bold tracking-tight ${
            isTipsActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'
          }`}>
            {t.nav.tips}
          </span>
        </div>

        {rightItems.map(item => <NavItem key={item.path} {...item} />)}
      </div>
    </nav>
  );
}
