import { Link, useLocation } from 'react-router-dom';
import { Compass, Lightbulb, User, Home } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/tips', icon: Lightbulb, label: 'Tips' },
    { path: '/onboarding', icon: Compass, label: 'Trip Style' },
    { path: '/mypage', icon: User, label: 'My' },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-50 glass border-t border-white/10 pb-safe">
      <div className="flex justify-around items-center h-16 px-6 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.path} 
              to={item.path}
              className="relative flex flex-col items-center justify-center w-16 h-full"
            >
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-blue-500/20 rounded-xl"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon 
                className={`w-6 h-6 mb-1 transition-colors ${isActive ? 'text-blue-400' : 'text-gray-400'}`} 
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className={`text-[10px] font-medium transition-colors ${isActive ? 'text-blue-400' : 'text-gray-500'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
