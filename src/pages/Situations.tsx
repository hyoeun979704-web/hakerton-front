import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { SITUATIONS } from '../data/tips';

export default function Situations() {
  const { t } = useApp();
  const st = t.situations;
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0A0A0E] pt-14 pb-24">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 px-6 py-6 border-b border-slate-200 dark:border-slate-800">
        <h1 className="font-extrabold text-slate-900 dark:text-white text-xl leading-tight whitespace-pre-line">{st.title}</h1>
        <p className="text-slate-400 text-sm mt-1 font-medium">{st.subtitle}</p>
      </div>

      <div className="px-4 py-6">
        <div className="grid grid-cols-2 gap-3">
          {SITUATIONS.map(({ id, emoji, labelEn }, idx) => {
            const label = st[id as keyof typeof st] as string;
            return (
              <motion.button
                key={id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.06 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate(`/?situation=${id}`)}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 text-left shadow-sm hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md transition-all group"
              >
                <span className="text-3xl block mb-3">{emoji}</span>
                <p className="font-extrabold text-slate-900 dark:text-white text-sm">{label}</p>
                <p className="text-slate-400 dark:text-slate-500 text-[11px] mt-0.5 font-medium uppercase tracking-wide">{labelEn}</p>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
