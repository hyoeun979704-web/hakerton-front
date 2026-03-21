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
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
