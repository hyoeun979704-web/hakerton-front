import { useState } from 'react';
import { Users, Star, CalendarDays, MessageCircle, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

interface Companion {
  id: number;
  name: string;
  initials: string;
  avatarColor: string;
  matchRate: number;
  travelStyle: string[];
  travelDate: string;
  from: string;
  bio: string;
  isVerified: boolean;
}

const COMPANIONS: Companion[] = [
  {
    id: 1,
    name: 'Emma K.',
    initials: 'EK',
    avatarColor: 'from-pink-500 to-rose-500',
    matchRate: 94,
    travelStyle: ['🍜 Food Tour', '🌙 Nightlife', '📸 Photo Spots'],
    travelDate: '3/25 – 3/30',
    from: '🇺🇸 New York',
    bio: 'Solo traveler, 3rd time in Seoul. Looking for a food buddy for Gwangjang Market!',
    isVerified: true,
  },
  {
    id: 2,
    name: 'Yuki T.',
    initials: 'YT',
    avatarColor: 'from-violet-500 to-purple-600',
    matchRate: 89,
    travelStyle: ['🎤 Norebang', '🛍️ Shopping', '☕ Café Hopping'],
    travelDate: '3/22 – 3/28',
    from: '🇯🇵 Tokyo',
    bio: 'K-culture enthusiast. Want to explore Hongdae cafes and catch a K-pop showcase.',
    isVerified: true,
  },
  {
    id: 3,
    name: 'Marco R.',
    initials: 'MR',
    avatarColor: 'from-emerald-500 to-teal-600',
    matchRate: 82,
    travelStyle: ['🏛️ History', '🍖 K-BBQ', '🚇 Local Transport'],
    travelDate: '3/20 – 4/2',
    from: '🇮🇹 Rome',
    bio: 'History buff visiting palaces and temples. Happy to share local transport tips!',
    isVerified: false,
  },
  {
    id: 4,
    name: 'Mei L.',
    initials: 'ML',
    avatarColor: 'from-amber-500 to-orange-500',
    matchRate: 78,
    travelStyle: ['🌸 Nature', '📸 Photo Spots', '🍜 Food Tour'],
    travelDate: '3/28 – 4/5',
    from: '🇨🇳 Shanghai',
    bio: 'Cherry blossom season explorer! Planning to visit Yeouido and Namsan.',
    isVerified: true,
  },
];

const MY_STYLE = ['🍜 Food Tour', '🌙 Nightlife', '📸 Photo Spots', '☕ Café Hopping'];

export default function Companions() {
  const { t } = useApp();
  const ct = t.companions;
  const [requested, setRequested] = useState<Set<number>>(new Set());
  const [filter, setFilter] = useState<'recommended' | 'all'>('recommended');

  const displayed = filter === 'recommended'
    ? COMPANIONS.slice(0, 3)
    : COMPANIONS;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0A0A0E] pt-14 pb-24">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 px-6 py-5 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-2xl bg-purple-100 dark:bg-purple-500/15 flex items-center justify-center">
            <Users size={18} className="text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h1 className="font-extrabold text-slate-900 dark:text-white text-lg leading-tight">{ct.title}</h1>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">{ct.subtitle}</p>
          </div>
        </div>

        {/* My style chips */}
        <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{ct.myStyle}</p>
            <Link to="/onboarding" className="text-[11px] font-bold text-blue-600 dark:text-blue-400">{ct.editStyle}</Link>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {MY_STYLE.map(style => (
              <span key={style} className="text-[11px] font-semibold bg-blue-100 dark:bg-blue-500/15 text-blue-700 dark:text-blue-400 px-2.5 py-1 rounded-full">
                {style}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 pt-4">
        {/* Filter tabs */}
        <div className="flex gap-2 mb-4">
          {(['recommended', 'all'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
                filter === f
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                  : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {f === 'recommended' ? ct.recommended : ct.all}
            </button>
          ))}
        </div>

        {/* Companion cards */}
        <div className="space-y-3">
          {displayed.map((companion, idx) => {
            const isRequested = requested.has(companion.id);
            const matchColor =
              companion.matchRate >= 90 ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/15' :
              companion.matchRate >= 80 ? 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-500/15' :
              'text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-500/15';

            return (
              <motion.div
                key={companion.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.07 }}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm"
              >
                <div className="px-4 pt-4 pb-3">
                  {/* Top row */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-extrabold text-sm flex-shrink-0 bg-gradient-to-br ${companion.avatarColor}`}>
                      {companion.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">{companion.name}</h3>
                        {companion.isVerified && (
                          <Star size={13} className="text-amber-400 fill-amber-400 flex-shrink-0" />
                        )}
                        <span className="text-xs text-slate-400 dark:text-slate-500">{companion.from}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <CalendarDays size={11} className="text-slate-400" />
                        <span className="text-[11px] text-slate-400 font-medium">{companion.travelDate}</span>
                      </div>
                    </div>
                    <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full font-extrabold text-xs flex-shrink-0 ${matchColor}`}>
                      <span>{companion.matchRate}%</span>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">{companion.bio}</p>

                  {/* Style tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {companion.travelStyle.map(style => (
                      <span key={style} className="text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-full">
                        {style}
                      </span>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setRequested(prev => { const s = new Set(prev); s.add(companion.id); return s; })}
                      className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all ${
                        isRequested
                          ? 'bg-emerald-100 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      {isRequested ? '신청 완료 ✓' : ct.requestBtn}
                    </button>
                    <button className="flex items-center justify-center gap-1 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                      <MessageCircle size={14} />
                    </button>
                  </div>
                </div>

                {/* Match bar */}
                <div className="px-4 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">{ct.matchRate}</span>
                    <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${companion.matchRate}%` }}
                        transition={{ delay: idx * 0.07 + 0.3, duration: 0.6, ease: 'easeOut' }}
                        className={`h-full rounded-full ${
                          companion.matchRate >= 90 ? 'bg-emerald-400' :
                          companion.matchRate >= 80 ? 'bg-blue-500' : 'bg-amber-400'
                        }`}
                      />
                    </div>
                    <span className="text-[10px] font-extrabold text-slate-500">{companion.matchRate}%</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filter === 'recommended' && COMPANIONS.length > 3 && (
          <button
            onClick={() => setFilter('all')}
            className="w-full mt-3 flex items-center justify-center gap-1.5 py-3 text-sm font-bold text-slate-500 dark:text-slate-400"
          >
            전체 보기 <ChevronRight size={15} />
          </button>
        )}
      </div>
    </div>
  );
}
