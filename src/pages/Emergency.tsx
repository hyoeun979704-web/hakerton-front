import { Phone, Volume2, Wifi } from 'lucide-react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';

const EMERGENCY_NUMBERS = [
  { icon: '🚔', labelKey: 'police' as const, number: '112', color: 'text-blue-600 dark:text-blue-400' },
  { icon: '🚒', labelKey: 'fire' as const, number: '119', color: 'text-red-600 dark:text-red-400' },
  { icon: '🏥', labelKey: 'foreignMedical' as const, number: '1339', color: 'text-emerald-600 dark:text-emerald-400' },
  { icon: '🌐', labelKey: 'seoulHelpline' as const, number: '120', color: 'text-purple-600 dark:text-purple-400' },
];

const PHRASES = [
  { icon: '🆘', textKey: 'helpMe' as const, korean: '도와주세요' },
  { icon: '🗣️', textKey: 'doYouSpeakEnglish' as const, korean: '영어 하세요?' },
  { icon: '🏥', textKey: 'whereIsHospital' as const, korean: '병원 어디에요?' },
  { icon: '🚑', textKey: 'callAmbulance' as const, korean: '구급차 불러주세요' },
  { icon: '🗺️', textKey: 'iAmLost' as const, korean: '길을 잃었어요' },
];

function speak(text: string) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'ko-KR';
  utter.rate = 0.85;
  window.speechSynthesis.speak(utter);
}

export default function Emergency() {
  const { t } = useApp();
  const et = t.emergency;

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0E] pt-14 pb-24">
      {/* Header Banner */}
      <div className="bg-red-600 px-6 py-5">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🆘</span>
            <div>
              <h1 className="font-extrabold text-white text-lg leading-tight">{et.title}</h1>
              <p className="text-red-200 text-xs font-medium">{et.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-red-700/60 px-2.5 py-1 rounded-full">
            <Wifi size={11} className="text-red-200" />
            <span className="text-red-200 text-[11px] font-bold">{et.offline}</span>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-8">
        {/* Emergency Numbers */}
        <section>
          <h2 className="text-sm font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Phone size={13} /> {et.numbersTitle}
          </h2>
          <div className="space-y-3">
            {EMERGENCY_NUMBERS.map(({ icon, labelKey, number, color }, idx) => (
              <motion.a
                key={number}
                href={`tel:${number}`}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.07 }}
                className="flex items-center gap-4 bg-white dark:bg-slate-900 rounded-2xl px-5 py-4 border border-slate-200 dark:border-slate-800 shadow-sm active:scale-[0.98] transition-transform"
              >
                <span className="text-2xl flex-shrink-0">{icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-900 dark:text-white text-sm">{et[labelKey]}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`text-2xl font-black ${color}`}>{number}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${color} bg-current/10`}
                    style={{ backgroundColor: 'currentColor', opacity: 1 }}
                  >
                    <Phone size={14} className="text-white" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </section>

        {/* Help Phrases */}
        <section>
          <h2 className="text-sm font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Volume2 size={13} /> {et.phrasesTitle}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 font-medium">{et.tapToSpeak}</p>
          <div className="space-y-3">
            {PHRASES.map(({ icon, textKey, korean }, idx) => (
              <motion.button
                key={textKey}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.28 + idx * 0.07 }}
                onClick={() => speak(korean)}
                className="w-full flex items-center gap-4 bg-white dark:bg-slate-900 rounded-2xl px-5 py-4 border border-slate-200 dark:border-slate-800 shadow-sm text-left active:scale-[0.98] transition-transform hover:border-blue-300 dark:hover:border-blue-700 group"
              >
                <span className="text-xl flex-shrink-0">{icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-900 dark:text-white text-sm leading-snug">{korean}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">{et[textKey]}</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-blue-100 dark:group-hover:bg-blue-500/15 flex items-center justify-center transition-colors flex-shrink-0">
                  <Volume2 size={16} className="text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                </div>
              </motion.button>
            ))}
          </div>
        </section>

        {/* Offline note */}
        <div className="bg-amber-50 dark:bg-amber-500/10 rounded-2xl p-4 border border-amber-200 dark:border-amber-500/25 flex items-start gap-3">
          <Wifi size={16} className="text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-amber-700 dark:text-amber-400 font-medium leading-relaxed">
            이 페이지는 오프라인에서도 사용 가능합니다. 긴급상황 시 언제든 이 화면을 보여주세요.
            <br />
            <span className="text-amber-500">This page works offline. Show this screen in emergencies.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
