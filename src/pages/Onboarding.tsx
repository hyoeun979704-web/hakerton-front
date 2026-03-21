import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [done, setDone] = useState(false);
  const navigate = useNavigate();
  const { t } = useApp();
  const ot = t.onboarding;

  const QUESTIONS = [
    {
      id: 1,
      title: ot.q1Title,
      description: ot.q1Desc,
      options: [
        { id: 'slow', text: ot.q1A, subtext: ot.q1ASub, emoji: '🐢' },
        { id: 'fast', text: ot.q1B, subtext: ot.q1BSub, emoji: '⚡' },
      ],
    },
    {
      id: 2,
      title: ot.q2Title,
      description: ot.q2Desc,
      options: [
        { id: 'food', text: ot.q2A, subtext: ot.q2ASub, emoji: '🍖' },
        { id: 'culture', text: ot.q2B, subtext: ot.q2BSub, emoji: '🏮' },
      ],
    },
  ];

  const handleSelect = (optionId: string) => {
    const newAnswers = { ...answers, [QUESTIONS[step].id]: optionId };
    setAnswers(newAnswers);

    if (step < QUESTIONS.length - 1) {
      setTimeout(() => setStep(s => s + 1), 350);
    } else {
      setTimeout(() => setDone(true), 400);
    }
  };

  const progressPct = ((step + (done ? 1 : 0)) / QUESTIONS.length) * 100;

  // Result screen
  if (done) {
    const pace = answers[1] === 'slow' ? ot.q1A : ot.q1B;
    const night = answers[2] === 'food' ? ot.q2A : ot.q2B;

    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-white dark:bg-[#0A0A0E] pt-14 pb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full max-w-sm text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-blue-500/30"
          >
            <CheckCircle2 className="w-10 h-10 text-white" />
          </motion.div>

          <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">{ot.complete}</h1>
          <p className="text-slate-500 dark:text-slate-400 mb-8 font-medium">{ot.resultTitle}</p>

          <div className="space-y-3 mb-8 text-left">
            {[
              { label: ot.q1Title, value: pace },
              { label: ot.q2Title, value: night },
            ].map(({ label, value }) => (
              <div key={label} className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">{label}</p>
                <p className="font-bold text-slate-900 dark:text-white">{value}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate('/')}
            className="w-full py-4 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm hover:opacity-90 active:scale-[0.98] transition-all shadow-lg"
          >
            {ot.goHome}
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#0A0A0E] pt-14 pb-24">
      {/* Top bar */}
      <div className="px-6 pt-6 pb-4 flex items-center gap-4">
        <button
          onClick={() => step > 0 ? setStep(s => s - 1) : navigate('/')}
          className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex-shrink-0"
        >
          <ArrowLeft size={17} />
        </button>
        <div className="flex-1">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {step + 1} / {QUESTIONS.length}
            </span>
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
              {Math.round(progressPct)}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pt-6 flex flex-col">
        {/* Hero Icon */}
        <motion.div
          key={`icon-${step}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          className="w-16 h-16 bg-blue-50 dark:bg-blue-500/15 rounded-3xl flex items-center justify-center mb-6 border border-blue-100 dark:border-blue-500/20"
        >
          <span className="text-3xl">✈️</span>
        </motion.div>

        {/* Title area */}
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-wide text-blue-600 dark:text-blue-400">{ot.title}</span>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white mt-1 mb-2 leading-tight">
            {ot.subtitle}
          </h1>
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ type: 'spring', stiffness: 280, damping: 24 }}
          >
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mb-1">{QUESTIONS[step].title}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 font-medium">{QUESTIONS[step].description}</p>

            <div className="space-y-3">
              {QUESTIONS[step].options.map(option => {
                const isSelected = answers[QUESTIONS[step].id] === option.id;
                return (
                  <motion.button
                    key={option.id}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    onClick={() => handleSelect(option.id)}
                    className={`w-full text-left p-5 rounded-3xl border-2 transition-all ${
                      isSelected
                        ? 'bg-blue-50 dark:bg-blue-500/15 border-blue-500 shadow-lg shadow-blue-500/15'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-2xl flex-shrink-0 mt-0.5">{option.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-base text-slate-900 dark:text-white leading-snug mb-1">
                          {option.text.replace(/^[^\s]+\s/, '')}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{option.subtext}</div>
                      </div>
                      {isSelected && (
                        <CheckCircle2 size={20} className="text-blue-500 flex-shrink-0 mt-0.5" />
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
