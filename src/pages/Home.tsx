import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { MapPin, Users, Clock, Coffee, Train, Navigation, AlertCircle, Sparkles } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

// Typewriter effect hook
function useTypewriter(text: string, speed = 50, startDelay = 0) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let idx = 0;
    setDisplayed('');
    const type = () => {
      if (idx < text.length) {
        setDisplayed(text.substring(0, idx + 1));
        idx++;
        timeout = setTimeout(type, speed);
      }
    };
    const start = setTimeout(type, startDelay);
    return () => { clearTimeout(timeout); clearTimeout(start); };
  }, [text, speed, startDelay]);
  return displayed;
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax for background
  const { scrollYProgress } = useScroll({ target: containerRef });
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  // Live Demo State Machine Sequence
  const [demoPhase, setDemoPhase] = useState(0); 
  const questionText = "외국인 친구한테 '치맥' 문화를 어떻게 설명하지?";

  useEffect(() => {
    const cycle = async () => {
      setDemoPhase(0);
      await new Promise(r => setTimeout(r, 1000));
      setDemoPhase(1); // Start typing
      await new Promise(r => setTimeout(r, 2500));
      setDemoPhase(2); // Analyzing
      await new Promise(r => setTimeout(r, 1500));
      setDemoPhase(3); // Result
      await new Promise(r => setTimeout(r, 6000));
      cycle();
    };
    cycle();
  }, []);

  const typedQuestion = useTypewriter(demoPhase >= 1 ? questionText : '', 50, 0);

  return (
    <div ref={containerRef} className="pb-24 overflow-hidden bg-[#FAFAFA] dark:bg-[#0F0F1A] text-slate-50 min-h-screen">
      {/* 1. HERO SECTION (Original LocalFlow Landing) */}
      <section className="relative pt-20 pb-16 px-6 min-h-[85vh] flex flex-col justify-center">
        {/* Animated Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <motion.div 
            style={{ y: yBg }}
            className="absolute -top-20 -right-20 w-96 h-96 bg-rose-500/20 rounded-full blur-[100px]" 
          />
          <motion.div 
            style={{ y: yBg }}
            className="absolute top-40 -left-20 w-80 h-80 bg-blue-600/20 rounded-full blur-[100px]" 
          />
        </div>

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <span className="px-3 py-1 text-xs font-semibold bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30 mb-6 inline-block">
              AI Culture Translation
            </span>
            <h1 className="text-5xl font-extrabold leading-tight mb-4">
              Flow like a <span className="bg-gradient-to-r from-blue-400 to-rose-400 bg-clip-text text-transparent">Local</span><br/>
              in Seoul.
            </h1>
            <p className="text-slate-400 text-lg">
              딥 로컬들의 생생한 팁과 AI 어시스턴트로 완벽한 서울 여행을 경험하세요.
            </p>
          </motion.div>

          {/* AI Demo Box */}
          <div className="glass rounded-3xl p-5 border border-white/10 shadow-2xl bg-black/40 backdrop-blur-xl">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="text-blue-400 w-5 h-5" />
              <span className="font-semibold text-sm">Local Assistant</span>
            </div>
            
            <div className="bg-white/5 rounded-2xl p-4 min-h-[80px] mb-4 text-left border border-white/5">
              <p className="text-slate-200">
                {demoPhase >= 1 ? typedQuestion : <span className="text-slate-600">질문을 입력해 주세요...</span>}
                {demoPhase === 1 && <span className="animate-pulse ml-1 inline-block w-2 h-4 bg-blue-400" />}
              </p>
            </div>

            <AnimatePresence mode="wait">
              {demoPhase === 2 && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex items-center gap-2 text-blue-400 text-sm justify-center py-4"
                >
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400" />
                  로컬 맥락 분석 중...
                </motion.div>
              )}
              {demoPhase === 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 text-left"
                >
                  <p className="text-sm text-slate-300 leading-relaxed font-medium">
                    "치맥(Chimaek)은 치킨과 맥주의 합성어로, 단순한 식사가 아닌 퇴근 후 동료들과의 유대감을 다지는 한국의 대표 소울 푸드 문화입니다. 한강공원에서 돗자리를 펴고 배달시켜 먹는 코스를 추천해요!"
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* --- INTEGRATION SECTIONS (App 4 & App 5) --- */}
      <div className="px-6 relative z-10 space-y-12">
        
        {/* App 4 Feature: Live Locality Pulse (Seoul Now) */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              Seoul Now
            </h2>
            <span className="text-xs text-slate-400 font-medium">Live Pulse</span>
          </div>
          
          <motion.div 
            className="glass rounded-3xl p-5 relative overflow-hidden group border border-white/5 bg-slate-900/50 shadow-xl"
            whileHover={{ scale: 1.02 }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-10 -mt-10 transition-all group-hover:bg-emerald-500/20" />
            
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-slate-800/80 rounded-2xl">
                <MapPin className="text-emerald-400 w-6 h-6" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-lg">Hongdae Street</h3>
                <p className="text-xs text-slate-400">홍대 걷고싶은거리</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="flex items-center gap-1 text-slate-300"><Users size={14} /> Local Ratio</span>
                  <span className="font-bold text-emerald-400">78% Local</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400" 
                    initial={{ width: 0 }} animate={{ width: "78%" }} transition={{ duration: 1, delay: 0.2 }}
                  />
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="flex-1 bg-slate-800/80 rounded-2xl p-3 flex flex-col items-center shadow-inner">
                  <Clock className="text-amber-400 mb-1" size={16} />
                  <span className="text-xl font-bold">15m</span>
                  <span className="text-[10px] text-slate-400">Avg Wait</span>
                </div>
                <div className="flex-1 bg-slate-800/80 rounded-2xl p-3 flex flex-col items-center shadow-inner">
                   <Navigation className="text-blue-400 mb-1" size={16} />
                   <span className="text-xl font-bold">Vibrant</span>
                   <span className="text-[10px] text-slate-400">Vibe</span>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* App 5 Feature: Situational Help Widget */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">I'm at a...</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <motion.div whileTap={{ scale: 0.95 }} className="glass rounded-2xl p-5 flex flex-col items-center text-center gap-3 border border-white/5 bg-slate-900/50 shadow-lg">
              <div className="p-3 bg-orange-500/20 rounded-full text-orange-400"><Coffee size={24} /></div>
              <span className="font-bold text-sm">Restaurant</span>
              <span className="text-[10px] text-slate-400">한국어로 주문하기</span>
            </motion.div>
            
            <motion.div whileTap={{ scale: 0.95 }} className="glass rounded-2xl p-5 flex flex-col items-center text-center gap-3 border border-white/5 bg-slate-900/50 shadow-lg">
               <div className="p-3 bg-indigo-500/20 rounded-full text-indigo-400"><Train size={24} /></div>
              <span className="font-bold text-sm">Transit</span>
               <span className="text-[10px] text-slate-400">지하철/버스 길찾기</span>
            </motion.div>
          </div>
          
          <motion.div whileTap={{ scale: 0.98 }} className="mt-3 glass rounded-2xl p-4 flex items-center justify-between border border-red-500/30 bg-red-500/10 shadow-lg">
            <div className="flex items-center gap-3">
               <div className="p-2 bg-red-500/20 rounded-full text-red-400"><AlertCircle size={20} /></div>
              <span className="font-bold text-red-200 text-sm">Emergency & Help</span>
            </div>
          </motion.div>
        </section>

      </div>
    </div>
  );
}
