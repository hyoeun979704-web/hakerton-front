import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import {
  ArrowRight, MapPin, Sparkles, Navigation, Globe2, Compass,
  Zap, Coffee, Train, MessageCircle, CheckCircle2, Users, Star, Shield
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const fadeUp: HTMLMotionProps<'section'> = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.5, ease: 'easeOut' },
};

export default function Home() {
  const navigate = useNavigate();
  const { t } = useApp();
  const h = t.home;

  return (
    <div className="bg-white dark:bg-[#0A0A0E] min-h-screen">

      {/* ── 1. HERO ── */}
      <section className="relative pt-20 pb-16 px-6 overflow-hidden min-h-[88vh] flex flex-col justify-center">
        {/* Background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-16 -right-20 w-72 h-72 bg-blue-400/20 dark:bg-blue-600/15 rounded-full blur-[80px]"
            animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute top-40 -left-16 w-56 h-56 bg-indigo-400/15 dark:bg-indigo-600/10 rounded-full blur-[60px]"
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />
        </div>

        <div className="relative z-10 pt-8">
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-500/15 text-blue-700 dark:text-blue-400 text-xs font-bold uppercase tracking-wide mb-6 border border-blue-200 dark:border-blue-500/25"
          >
            <Sparkles size={12} /> {h.heroTag}
          </motion.div>

          {/* App Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.05 }}
            className="w-16 h-16 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-6 shadow-2xl shadow-blue-500/30"
          >
            <Globe2 className="w-8 h-8 text-white" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.08] mb-5 whitespace-pre-line"
          >
            {h.heroTitle}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.18 }}
            className="text-base text-slate-600 dark:text-slate-400 font-medium mb-10 leading-relaxed max-w-[300px]"
          >
            {h.heroSubtitle}
          </motion.p>

          {/* Primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.26 }}
          >
            <button
              onClick={() => navigate('/onboarding')}
              className="group flex items-center justify-between w-full p-1.5 bg-slate-900 dark:bg-white rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-xl shadow-slate-900/20 dark:shadow-white/10"
            >
              <span className="pl-5 font-bold text-white dark:text-slate-900 text-sm">{h.heroCta}</span>
              <div className="w-11 h-11 bg-blue-500 rounded-xl flex items-center justify-center group-hover:bg-blue-400 transition-colors flex-shrink-0">
                <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── 2. STATS BAR ── */}
      <motion.section
        {...fadeUp}
        className="px-6 py-5 border-y border-slate-100 dark:border-slate-800/60"
      >
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: Users, value: '12K+', label: h.statsUsers },
            { icon: Star, value: '3.8K+', label: h.statsTips },
            { icon: Shield, value: '240+', label: h.statsExperts },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex flex-col items-center gap-1 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
              <Icon size={16} className="text-blue-500 dark:text-blue-400" />
              <span className="text-lg font-black text-slate-900 dark:text-white leading-none">{value}</span>
              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 text-center leading-tight">{label}</span>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ── 3. REAL-TIME PULSE ── */}
      <motion.section {...fadeUp} className="px-6 py-14">
        {/* Section Header */}
        <div className="mb-7">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-200 dark:border-emerald-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            {h.pulseTag}
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2 leading-tight whitespace-pre-line">
            {h.pulseTitle}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{h.pulseSubtitle}</p>
        </div>

        {/* Widget Preview */}
        <div className="bg-slate-50 dark:bg-slate-900/60 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm mb-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />

          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                <MapPin className="text-emerald-600 dark:text-emerald-400 w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-slate-900 dark:text-white text-sm">{h.samplePlace}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{h.samplePlaceDesc}</p>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-2xl font-black text-slate-900 dark:text-white">12m</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase">{h.avgWait}</p>
            </div>
          </div>

          <div className="mb-2 flex justify-between items-end">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{h.localRatio}</span>
            <span className="text-base font-black text-emerald-600 dark:text-emerald-400">82%</span>
          </div>
          <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: '82%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
            />
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => navigate('/tips')}
          className="w-full py-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold text-sm flex items-center justify-center gap-2 hover:border-blue-300 dark:hover:border-blue-700 hover:text-blue-600 dark:hover:text-blue-400 transition-all active:scale-[0.98]"
        >
          <Navigation size={17} /> {h.pulseCta}
        </button>
      </motion.section>

      {/* ── 4. SITUATIONAL ASSIST ── */}
      <motion.section
        {...fadeUp}
        className="px-6 py-14 bg-gradient-to-b from-blue-50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/10 border-y border-blue-100 dark:border-blue-900/30"
      >
        <div className="mb-7">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-4 border border-blue-200 dark:border-blue-500/30">
            <Zap size={11} fill="currentColor" /> {h.translateTag}
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2 leading-tight whitespace-pre-line">
            {h.translateTitle}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{h.translateSubtitle}</p>
        </div>

        {/* Situation Cards */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {[
            {
              icon: Coffee,
              color: 'orange',
              title: h.restaurantGuide,
              desc: h.restaurantDesc,
            },
            {
              icon: Train,
              color: 'indigo',
              title: h.transitGuide,
              desc: h.transitDesc,
            },
          ].map(({ icon: Icon, color, title, desc }) => (
            <div
              key={title}
              className="bg-white dark:bg-slate-900 p-4 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col gap-3 hover:shadow-md transition-shadow"
            >
              <div className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 bg-${color}-100 dark:bg-${color}-500/20 text-${color}-600 dark:text-${color}-400`}>
                <Icon size={22} strokeWidth={2.2} />
              </div>
              <div>
                <p className="font-bold text-slate-900 dark:text-white text-sm leading-tight">{title}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1 leading-snug">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 transition-colors active:scale-[0.98]">
          <Sparkles size={17} /> {h.translateCta}
        </button>
      </motion.section>

      {/* ── 5. AUTHENTIC TIPS ── */}
      <motion.section {...fadeUp} className="px-6 py-14">
        <div className="mb-7">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 text-xs font-bold uppercase tracking-wider mb-4 border border-purple-200 dark:border-purple-500/30">
            <MessageCircle size={11} fill="currentColor" /> {h.tipsTag}
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2 leading-tight whitespace-pre-line">
            {h.tipsTitle}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{h.tipsSubtitle}</p>
        </div>

        {/* Category Chips */}
        <div className="flex gap-2 mb-5 overflow-x-auto pb-1 -mx-6 px-6 hide-scrollbar">
          {['😎 Local Verified', '🍜 Foodie', '📸 Photo Spot', '🛍️ Secret Shop'].map((chip, idx) => (
            <div
              key={idx}
              className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold border transition-colors flex-shrink-0 ${
                idx === 0
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-transparent shadow-md'
                  : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800'
              }`}
            >
              {chip}
            </div>
          ))}
        </div>

        {/* Sample Tip Card */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm mb-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              JH
            </div>
            <div>
              <p className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1">
                {h.sampleTipAuthor}
                <CheckCircle2 size={13} className="text-blue-500" />
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{h.sampleTipExpert}</p>
            </div>
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
            {h.sampleTipContent}
          </p>
        </div>

        {/* CTA */}
        <button
          onClick={() => navigate('/tips')}
          className="w-full py-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold text-sm flex items-center justify-center gap-2 hover:border-purple-300 dark:hover:border-purple-700 hover:text-purple-600 dark:hover:text-purple-400 transition-all active:scale-[0.98]"
        >
          <Compass size={17} /> {h.tipsCta}
        </button>
      </motion.section>

      {/* ── 6. AI TRAVEL PERSONA ── */}
      <motion.section
        {...fadeUp}
        className="px-6 py-14 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900/40 dark:to-[#0A0A0E] border-t border-slate-100 dark:border-slate-800/60"
      >
        <div className="mb-7">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-4 border border-amber-200 dark:border-amber-500/25">
            <Sparkles size={11} fill="currentColor" /> {h.personaTag}
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2 leading-tight whitespace-pre-line">
            {h.personaTitle}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{h.personaSubtitle}</p>
        </div>

        {/* Persona Preview Cards */}
        <div className="relative mb-6 h-24">
          {[
            { emoji: '🐢', label: '여유파', color: 'from-emerald-400 to-teal-500', offset: 'left-0' },
            { emoji: '⚡', label: '핫플 정복', color: 'from-orange-400 to-red-500', offset: 'left-[30%]' },
            { emoji: '🍖', label: 'K-BBQ', color: 'from-red-400 to-pink-500', offset: 'left-[60%]' },
          ].map(({ emoji, label, color, offset }) => (
            <div
              key={label}
              className={`absolute ${offset} w-20 h-20 rounded-3xl bg-gradient-to-br ${color} shadow-lg flex flex-col items-center justify-center gap-1`}
            >
              <span className="text-2xl">{emoji}</span>
              <span className="text-[9px] font-bold text-white/90">{label}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => navigate('/onboarding')}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 transition-all active:scale-[0.98]"
        >
          <Sparkles size={17} /> {h.personaCta}
          <ArrowRight size={17} className="ml-1" />
        </button>
      </motion.section>

      {/* Bottom spacer */}
      <div className="h-6" />
    </div>
  );
}
