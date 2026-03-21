import { Link, useLocation } from 'react-router-dom';
import { Compass, Lightbulb, User, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';

export default function Navbar() {
  const location = useLocation();
  const { t } = useApp();

  const navItems = [
    { path: '/', icon: Home, label: t.nav.home },
    { path: '/tips', icon: Lightbulb, label: t.nav.tips },
    { path: '/onboarding', icon: Compass, label: t.nav.tripStyle },
    { path: '/mypage', icon: User, label: t.nav.myPage },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-panel border-t border-slate-200/60 dark:border-white/5 pb-safe">
      <div className="flex justify-around items-center h-16 px-2 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex flex-col items-center justify-center gap-1 flex-1 h-full relative group"
            >
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute top-2 inset-x-2 h-10 rounded-2xl bg-blue-50 dark:bg-blue-500/10"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <Icon
                size={22}
                className={`relative z-10 transition-colors duration-200 ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-400'
                }`}
                strokeWidth={isActive ? 2.5 : 1.8}
              />
              <span
                className={`relative z-10 text-[10px] font-semibold transition-colors duration-200 ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-slate-400 dark:text-slate-500'
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
