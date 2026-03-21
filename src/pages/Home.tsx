import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Sparkles, Navigation, Globe2, Compass, Zap, Coffee, Train, MessageCircle, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-[#0A0A0E] min-h-screen pb-10">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-20 pb-24 px-6 overflow-hidden min-h-[80vh] flex flex-col justify-center">
        {/* Dynamic Abstract Background Core */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <motion.div 
            className="absolute top-0 right-[-20%] w-[120%] h-[60%] bg-gradient-to-bl from-blue-300/40 via-indigo-100/20 to-transparent dark:from-blue-600/20 dark:via-blue-800/10 rounded-full blur-[80px]" 
            animate={{ scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative z-10 flex flex-col pt-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-900 shadow-xl shadow-blue-500/10 flex items-center justify-center mb-8 border border-slate-100 dark:border-slate-800"
          >
            <Globe2 className="w-8 h-8 text-blue-600 dark:text-blue-500" />
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-6"
          >
            Flow like a <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              Local.
            </span>
            <br/>Seoul, Decoded.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-400 font-medium mb-10 leading-relaxed max-w-[280px]"
          >
            당신의 취향을 분석하고 서울의 진짜 박동을 연결해주는 유일한 AI 컬처 가이드.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
            <button 
              onClick={() => navigate('/onboarding')}
              className="group relative flex items-center justify-between w-full p-1 bg-slate-900 dark:bg-white rounded-full overflow-hidden hover:scale-[1.02] active:scale-[0.98] transition-transform"
            >
              <span className="pl-6 font-semibold text-white dark:text-slate-900">당신의 여행 스타일 진단하기</span>
              <div className="w-12 h-12 bg-white/20 dark:bg-black/10 rounded-full flex items-center justify-center backdrop-blur-md group-hover:bg-white/30 dark:group-hover:bg-black/20 transition-colors">
                <ArrowRight className="w-5 h-5 text-white dark:text-slate-900 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </motion.div>
        </div>
      </section>

      {/* 2. REAL-TIME PULSE (App 4 Showcase) */}
      <section className="px-6 py-16">
        <div className="mb-8">
           <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-200 dark:border-emerald-500/20">
             <span className="relative flex h-2 w-2">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
             </span>
             Seoul Now
           </div>
           <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-3">Feel the City's Pulse.</h2>
           <p className="text-slate-500 dark:text-slate-400 font-medium">실시간 현지인 밀집도와 대기시간을 확인하여 나만의 완벽한 타이밍을 찾으세요.</p>
        </div>

        {/* Pulse Widget Preview */}
        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm mb-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/10 rounded-full blur-3xl -mr-10 -mt-10" />
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center">
                <MapPin className="text-emerald-600 dark:text-emerald-400 w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-slate-900 dark:text-white">성수 카페거리</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">핫플레이스 실시간 혼잡도</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-black text-slate-900 dark:text-white">12m</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase">Avg Wait</p>
            </div>
          </div>

          <div className="mb-2 flex justify-between items-end">
            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Local Ratio</span>
            <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">82%</span>
          </div>
          <div className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <motion.div 
               className="h-full bg-emerald-500 rounded-full"
               initial={{ width: 0 }} whileInView={{ width: "82%" }} viewport={{ once: true }} transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* CTA */}
        <button onClick={() => navigate('/tips')} className="w-full py-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold flex items-center justify-center gap-2 hover:border-slate-300 dark:hover:border-slate-700 transition-colors active:scale-[0.98]">
           <Navigation size={18} /> 실시간 로컬 지도 보기
        </button>
      </section>

      {/* 3. SITUATIONAL ASSIST (App 5 Showcase) */}
      <section className="px-6 py-16 bg-blue-50 dark:bg-blue-950/20 border-y border-blue-100 dark:border-blue-900/30">
        <div className="mb-8">
           <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-4 border border-blue-200 dark:border-blue-500/30">
             <Zap size={12} fill="currentColor" /> Quick Action
           </div>
           <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-3">Lost in Translation?<br/>Not Anymore.</h2>
           <p className="text-slate-600 dark:text-slate-400 font-medium">식당, 지하철, 긴급상황. 위치와 상황을 인식하여 가장 필요한 도움말을 즉시 제공합니다.</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col gap-3 group hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center text-orange-600 dark:text-orange-400">
              <Coffee size={24} strokeWidth={2.5} />
            </div>
            <div>
              <p className="font-bold text-slate-900 dark:text-white text-base">식당에서</p>
              <p className="text-xs text-slate-500 font-medium mt-1">한국어로 현지식 주문하기 가이드</p>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col gap-3 group hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Train size={24} strokeWidth={2.5} />
            </div>
            <div>
              <p className="font-bold text-slate-900 dark:text-white text-base">대중교통</p>
              <p className="text-xs text-slate-500 font-medium mt-1">환승역 미아 방지 네비게이터</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <button className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-colors active:scale-[0.98]">
           <Sparkles size={18} /> 상황별 툴킷 열기
        </button>
      </section>

      {/* 4. DEEP LOCAL OVERVIEW (App 3 Showcase) */}
      <section className="px-6 py-16">
        <div className="mb-8">
           <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 text-xs font-bold uppercase tracking-wider mb-4 border border-purple-200 dark:border-purple-500/30">
             <MessageCircle size={12} fill="currentColor" /> Deep Context
           </div>
           <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-3">Authentic Tips.<br/>Filtered for You.</h2>
           <p className="text-slate-500 dark:text-slate-400 font-medium">블로그 광고에 속지 마세요. 검증된 로컬 전문가들의 카테고리별 찐 꿀팁 피드.</p>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-4 hide-scrollbar -mx-6 px-6">
          {['😎 Local Verified', '🍜 Foodie', '📸 Photo Spot', '🛍️ Secret Shop'].map((chip, idx) => (
            <div key={idx} className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-bold border ${idx === 0 ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent shadow-md' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800'}`}>
              {chip}
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
              JH
            </div>
            <div>
              <p className="font-bold text-slate-900 dark:text-white flex items-center gap-1">Jihoon <CheckCircle2 size={14} className="text-blue-500"/></p>
              <p className="text-xs text-slate-500 font-medium">홍대거주 5년차 로컬 마스터</p>
            </div>
          </div>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
            "불금 홍대 클럽거리 대기줄 피하는 팁 알려드림. 메인 거리 말고 상수역 쪽 골목으로 들어가면 음악 좋고 로컬들만 아는 펍들이 많아요."
          </p>
        </div>

        {/* CTA */}
        <button onClick={() => navigate('/tips')} className="w-full py-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold flex items-center justify-center gap-2 hover:border-slate-300 dark:hover:border-slate-700 transition-colors active:scale-[0.98]">
           <Compass size={18} /> 딥 로컬 피드 탐색하기
        </button>
      </section>

    </div>
  );
}
