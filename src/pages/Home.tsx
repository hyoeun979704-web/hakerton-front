import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import {
  ArrowRight, MapPin, Sparkles, Globe2, Compass,
  Zap, Users, Star, Shield, Lightbulb, BookOpen,
  MessageSquarePlus, AlertTriangle, Bookmark, ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { TIPS } from '../data/tips';

const fadeUp: HTMLMotionProps<'section'> = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.5, ease: 'easeOut' },
};

export default function Home() {
  useApp(); // ensure context is available

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0E]">
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden px-6 pt-20 pb-14">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-indigo-50/50 to-transparent dark:from-blue-950/30 dark:via-indigo-950/20 dark:to-transparent" />
        <div className="absolute top-8 right-6 w-40 h-40 rounded-full bg-gradient-to-br from-blue-400/20 to-indigo-400/20 dark:from-blue-500/10 dark:to-indigo-500/10 blur-3xl" />
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-1.5 bg-blue-100 dark:bg-blue-500/15 text-blue-700 dark:text-blue-400 text-xs font-bold px-3 py-1.5 rounded-full mb-4"
          >
            <MapPin size={12} /> 서울 · Seoul
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-black text-slate-900 dark:text-white leading-tight mb-3"
          >
            현지인만 아는<br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              서울 꿀팁
            </span>
            을 만나보세요
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6 max-w-[280px]"
          >
            AI가 현지인의 팁을 번역하고, 여행 동행을 매칭하고, 긴급 상황에서 도와줍니다.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex gap-3"
          >
            <Link
              to="/situations"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 py-3 rounded-2xl shadow-lg shadow-blue-500/25 flex items-center gap-2 transition-colors"
            >
              꿀팁 탐색 <ArrowRight size={15} />
            </Link>
            <Link
              to="/onboarding"
              className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-sm px-5 py-3 rounded-2xl flex items-center gap-2 transition-colors"
            >
              <Compass size={15} /> 스타일 진단
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── STATS BAR ─── */}
      <motion.section {...fadeUp} className="mx-6 -mt-2 mb-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 flex items-center justify-around divide-x divide-slate-200 dark:divide-slate-800">
          {[
            { val: `${TIPS.length}+`, label: '로컬 꿀팁', icon: Lightbulb, color: 'text-amber-500' },
            { val: '4', label: '지원 언어', icon: Globe2, color: 'text-blue-500' },
            { val: '8', label: '상황별 가이드', icon: Zap, color: 'text-emerald-500' },
          ].map((s, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1 px-2">
              <s.icon size={16} className={s.color} />
              <p className="font-black text-lg text-slate-900 dark:text-white leading-none">{s.val}</p>
              <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ─── FEATURE 1: 상황별 꿀팁 ─── */}
      <motion.section {...fadeUp} className="px-6 py-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-500/15 flex items-center justify-center flex-shrink-0">
            <BookOpen size={20} className="text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="font-extrabold text-base text-slate-900 dark:text-white">지금 상황에 맞는 꿀팁</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">식당, 지하철, 택시... 8가지 상황별 가이드</p>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2 mb-4">
          {['🍜', '🚇', '🏪', '💊', '🚕', '🎤', '🏧', '🏨'].map((emoji, i) => (
            <div key={i} className="bg-slate-50 dark:bg-slate-800/60 rounded-xl py-3 flex flex-col items-center gap-1">
              <span className="text-xl">{emoji}</span>
              <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400">
                {['식당', '지하철', '편의점', '약국', '택시', '노래방', 'ATM', '숙소'][i]}
              </span>
            </div>
          ))}
        </div>
        <Link
          to="/situations"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold text-sm hover:bg-blue-100 dark:hover:bg-blue-500/15 transition-colors"
        >
          상황별 꿀팁 보기 <ChevronRight size={15} />
        </Link>
      </motion.section>

      {/* ─── FEATURE 2: 오늘의 Pick 미리보기 ─── */}
      <motion.section {...fadeUp} className="px-6 py-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-500/15 flex items-center justify-center flex-shrink-0">
            <Star size={20} className="text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <h2 className="font-extrabold text-base text-slate-900 dark:text-white">오늘의 Pick</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">매일 엄선된 로컬 꿀팁을 한눈에</p>
          </div>
        </div>
        {(() => {
          const tip = TIPS.find(t => t.isFeatured) || TIPS[0];
          return (
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 shadow-lg shadow-blue-500/20">
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold bg-gradient-to-br ${tip.avatarColor} border-2 border-white/20`}>
                  {tip.authorInitials}
                </div>
                <span className="text-white/80 text-xs font-semibold">{tip.author}</span>
                <span className="text-[10px] font-bold bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full ml-auto">PICK</span>
              </div>
              <h3 className="font-extrabold text-white text-base leading-snug mb-2">{tip.titleKo}</h3>
              <p className="text-blue-100/80 text-xs leading-relaxed line-clamp-2">{tip.contentKo}</p>
              <div className="flex items-center gap-1.5 mt-3">
                {tip.tags.slice(0, 2).map(tag => (
                  <span key={tag} className="text-[10px] font-semibold text-blue-200 bg-white/10 px-2 py-0.5 rounded-full">{tag}</span>
                ))}
              </div>
            </div>
          );
        })()}
        <Link
          to="/tips"
          className="flex items-center justify-center gap-2 w-full py-3 mt-3 rounded-2xl bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 font-bold text-sm hover:bg-amber-100 dark:hover:bg-amber-500/15 transition-colors"
        >
          전체 꿀팁 보기 <ChevronRight size={15} />
        </Link>
      </motion.section>

      {/* ─── FEATURE 3: AI 동행 매칭 ─── */}
      <motion.section {...fadeUp} className="px-6 py-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-purple-100 dark:bg-purple-500/15 flex items-center justify-center flex-shrink-0">
            <Users size={20} className="text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h2 className="font-extrabold text-base text-slate-900 dark:text-white">AI 동행 매칭</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">여행 스타일 기반 94% 매칭률</p>
          </div>
        </div>
        <div className="space-y-2 mb-4">
          {[
            { name: 'Emma K.', from: '🇺🇸 New York', match: 94, color: 'from-pink-500 to-rose-500', initials: 'EK' },
            { name: 'Yuki T.', from: '🇯🇵 Tokyo', match: 89, color: 'from-violet-500 to-purple-600', initials: 'YT' },
          ].map((c) => (
            <div key={c.name} className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold bg-gradient-to-br ${c.color}`}>{c.initials}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">{c.name}</span>
                  <span className="text-[11px] text-slate-400">{c.from}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${c.match >= 90 ? 'bg-emerald-400' : 'bg-blue-500'}`} style={{ width: `${c.match}%` }} />
                  </div>
                  <span className={`text-[10px] font-extrabold ${c.match >= 90 ? 'text-emerald-500' : 'text-blue-500'}`}>{c.match}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Link
          to="/companions"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold text-sm hover:bg-purple-100 dark:hover:bg-purple-500/15 transition-colors"
        >
          동행 찾기 <ChevronRight size={15} />
        </Link>
      </motion.section>

      {/* ─── FEATURE 4: 꿀팁 공유 ─── */}
      <motion.section {...fadeUp} className="px-6 py-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-green-100 dark:bg-green-500/15 flex items-center justify-center flex-shrink-0">
            <MessageSquarePlus size={20} className="text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h2 className="font-extrabold text-base text-slate-900 dark:text-white">나의 꿀팁 공유하기</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">AI가 4개 국어로 자동 번역해드려요</p>
          </div>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 mb-4">
          <div className="flex gap-2 mb-3">
            {['EN', 'JA', 'ZH'].map((tab, i) => (
              <span key={tab} className={`text-[11px] font-bold px-3 py-1 rounded-full ${i === 0 ? 'bg-blue-600 text-white' : 'bg-white dark:bg-slate-700 text-slate-400 dark:text-slate-500'}`}>{tab}</span>
            ))}
          </div>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={14} className="text-purple-500" />
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400">AI 문화 번역</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed italic">
            "Side dishes (banchan) are always free to refill. Just ask — it's expected, not rude..."
          </p>
        </div>
        <Link
          to="/submit"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 font-bold text-sm hover:bg-green-100 dark:hover:bg-green-500/15 transition-colors"
        >
          꿀팁 올리기 <ChevronRight size={15} />
        </Link>
      </motion.section>

      {/* ─── FEATURE 5: 긴급 안전 ─── */}
      <motion.section {...fadeUp} className="px-6 py-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-red-100 dark:bg-red-500/15 flex items-center justify-center flex-shrink-0">
            <Shield size={20} className="text-red-600 dark:text-red-400" />
          </div>
          <div>
            <h2 className="font-extrabold text-base text-slate-900 dark:text-white">긴급 안전 정보</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">오프라인에서도 사용 가능한 긴급 연락처 + 음성</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {[
            { num: '112', label: '경찰', color: 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400' },
            { num: '119', label: '소방/응급', color: 'bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400' },
            { num: '1339', label: '외국인 의료', color: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400' },
            { num: '120', label: '서울 다산콜', color: 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400' },
          ].map(({ num, label, color }) => (
            <div key={num} className={`rounded-xl px-4 py-3 ${color}`}>
              <p className="font-black text-lg">{num}</p>
              <p className="text-[10px] font-semibold opacity-70">{label}</p>
            </div>
          ))}
        </div>
        <Link
          to="/emergency"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 font-bold text-sm hover:bg-red-100 dark:hover:bg-red-500/15 transition-colors"
        >
          <AlertTriangle size={14} /> 긴급 정보 보기 <ChevronRight size={15} />
        </Link>
      </motion.section>

      {/* ─── FEATURE 6: 저장 & 오프라인 ─── */}
      <motion.section {...fadeUp} className="px-6 py-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-500/15 flex items-center justify-center flex-shrink-0">
            <Bookmark size={20} className="text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h2 className="font-extrabold text-base text-slate-900 dark:text-white">꿀팁 저장 & 오프라인</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">마음에 드는 팁을 저장하고 오프라인에서 확인</p>
          </div>
        </div>
        <Link
          to="/saved"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold text-sm hover:bg-indigo-100 dark:hover:bg-indigo-500/15 transition-colors"
        >
          저장함 보기 <ChevronRight size={15} />
        </Link>
      </motion.section>

      {/* ─── BOTTOM CTA ─── */}
      <motion.section {...fadeUp} className="px-6 pt-4 pb-10">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-6 text-center">
          <p className="text-2xl font-black text-white mb-2">
            나만의 서울을 시작하세요
          </p>
          <p className="text-sm text-slate-400 mb-5">
            여행 스타일을 진단하고 맞춤 꿀팁을 받아보세요
          </p>
          <Link
            to="/onboarding"
            className="inline-flex items-center gap-2 bg-white text-slate-900 font-bold text-sm px-6 py-3 rounded-full shadow-lg hover:bg-slate-100 transition-colors"
          >
            <Compass size={16} /> 여행 스타일 진단하기 <ArrowRight size={14} />
          </Link>
        </div>
      </motion.section>
    </div>
  );
}
