import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Send, Sparkles, Bot, Mic } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Message {
  id: number;
  role: 'ai' | 'user';
  text: string;
  time: string;
}

const QUICK_QUESTIONS = [
  { emoji: '🚇', label: '지하철 타는 법', labelEn: 'How to use subway' },
  { emoji: '🍜', label: '반찬 리필 방법', labelEn: 'Free side dish refills' },
  { emoji: '🏧', label: 'ATM 이용하기', labelEn: 'Using ATM abroad' },
  { emoji: '🚕', label: '택시 앱 추천', labelEn: 'Best taxi apps' },
  { emoji: '🛒', label: '편의점 꿀팁', labelEn: 'Convenience store tips' },
  { emoji: '💊', label: '약국 이용하기', labelEn: 'Using pharmacy' },
];

const INITIAL_MESSAGES: Message[] = [
  {
    id: 1,
    role: 'ai',
    text: '안녕하세요! 👋 서울 여행 AI 도우미입니다.\n\nHello! I\'m your Seoul travel AI assistant.\n서울에 대해 무엇이든 물어보세요 — 교통, 음식, 에티켓, 긴급 상황까지 4개 국어로 답변해드립니다.',
    time: 'Now',
  },
];

const AI_RESPONSES: Record<string, string> = {
  default: '서울 여행에 관한 다양한 꿀팁을 알려드릴 수 있어요! 아래 버튼을 눌러보거나 직접 질문해주세요.\n\nI can help with Seoul travel tips! Try one of the quick questions below or ask me anything. 🗺️',
  subway: '🚇 **서울 지하철 꿀팁**\n\n• T-money 카드를 편의점(GS25, CU, 세븐일레븐)에서 구입하세요 — 현금보다 저렴해요\n• 1~9호선 + 수인분당선 등 모두 호환됩니다\n• 환승은 30분 이내 자유롭게 가능\n• 영어 안내가 잘 되어 있어 외국인도 쉽게 이용 가능합니다 ✅',
  banchan: '🍽️ **반찬 리필 꿀팁**\n\n한국 식당에서는 반찬(밑반찬)을 무료로 리필해줍니다!\n\n"반찬 더 주세요" (ban-chan deo ju-se-yo)\n라고 말하면 됩니다. 눈치 보지 않아도 돼요 — 당연한 문화입니다 😊\n\n✅ Free · 🔄 Unlimited refills',
  atm: '🏧 **외국인 ATM 이용법**\n\n• **우리은행, 하나은행** ATM이 외국 카드 호환성 가장 높음\n• 공항·지하철역 ATM은 대부분 영어 지원\n• 인출 한도: 1회 최대 700,000원\n• 수수료: 약 3,000~5,000원 (은행마다 상이)\n• Visa/Mastercard/UnionPay 모두 사용 가능 ✅',
  taxi: '🚕 **서울 택시 앱 추천**\n\n1. **카카오T** (KakaoT) — 가장 많이 사용, 영어 지원\n2. **우버** (Uber) — 외국인에게 친숙\n\n택시 기본요금: 4,800원 (2024년 기준)\n심야(00:00~04:00): 20% 할증 적용\n\n⚠️ 택시에서 신용카드 사용 가능합니다',
  convenience: '🏪 **편의점 꿀팁 모음**\n\n• **삼각김밥**: 화살표 1→2→3 순서대로 개봉하면 김이 안 눅어요\n• **계산대 옆 핫바**: 신선하고 저렴 (500~1,000원)\n• **공공 와이파이**: 편의점 내부 무료\n• **ATM**: GS25, CU 편의점 ATM 외국 카드 OK\n• **쓰레기통 없음**: 영수증 버릴 때 계산대에서 부탁하면 돼요',
  pharmacy: '💊 **약국(약국) 이용법**\n\n• 처방전 없이 살 수 있는 약: 타이레놀, 소화제, 반창고 등\n• "이 약 주세요" 대신 번역 앱으로 성분명 보여주세요\n• 영어로 말하면 대부분 도움받을 수 있어요\n• 24시간 약국: 강남역, 홍대 근처에 있어요\n• 비용: 일반 의약품 3,000~10,000원',
};

function getAIResponse(text: string): string {
  const lower = text.toLowerCase();
  if (lower.includes('지하철') || lower.includes('subway') || lower.includes('metro')) return AI_RESPONSES.subway;
  if (lower.includes('반찬') || lower.includes('banchan') || lower.includes('리필')) return AI_RESPONSES.banchan;
  if (lower.includes('atm') || lower.includes('현금') || lower.includes('cash')) return AI_RESPONSES.atm;
  if (lower.includes('택시') || lower.includes('taxi') || lower.includes('카카오')) return AI_RESPONSES.taxi;
  if (lower.includes('편의점') || lower.includes('convenience') || lower.includes('김밥')) return AI_RESPONSES.convenience;
  if (lower.includes('약국') || lower.includes('pharmacy') || lower.includes('약')) return AI_RESPONSES.pharmacy;
  return AI_RESPONSES.default;
}

function now() {
  return new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now(), role: 'user', text: text.trim(), time: now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      const aiMsg: Message = { id: Date.now() + 1, role: 'ai', text: getAIResponse(text), time: now() };
      setMessages(prev => [...prev, aiMsg]);
    }, 1000 + Math.random() * 600);
  };

  return (
    <div className="flex flex-col h-[100dvh] bg-white dark:bg-[#0A0A0E]">

      {/* header */}
      <div className="fixed top-0 left-0 right-0 z-50 max-w-md mx-auto glass-panel border-b border-slate-200/60 dark:border-white/5">
        <div className="h-14 flex items-center gap-3 px-4">
          <Link to="/" className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            <ArrowLeft size={17} />
          </Link>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
              <Bot size={16} className="text-white" />
            </div>
            <div>
              <p className="font-extrabold text-sm text-slate-900 dark:text-white leading-none">AI 여행 도우미</p>
              <p className="text-[10px] text-emerald-500 font-semibold mt-0.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                Seoul Travel Assistant
              </p>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-1 text-[10px] font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10 px-2 py-1 rounded-full">
            <Sparkles size={10} /> AI 번역 지원
          </div>
        </div>
      </div>

      {/* messages */}
      <div className="flex-1 overflow-y-auto pt-20 pb-36 px-4 space-y-3">

        {/* quick questions */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="pt-2"
        >
          <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 mb-2 text-center">자주 묻는 질문 · Quick Questions</p>
          <div className="grid grid-cols-3 gap-1.5">
            {QUICK_QUESTIONS.map(q => (
              <button
                key={q.label}
                onClick={() => sendMessage(q.label)}
                className="flex flex-col items-center gap-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl py-3 px-2 text-center active:scale-95 transition-transform"
              >
                <span className="text-xl">{q.emoji}</span>
                <span className="text-[9px] font-bold text-slate-600 dark:text-slate-400 leading-tight">{q.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {messages.map((msg, i) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i === 0 ? 0.1 : 0 }}
            className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            {msg.role === 'ai' && (
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md">
                <Bot size={13} className="text-white" />
              </div>
            )}
            <div className={`max-w-[78%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
              <div className={`rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed whitespace-pre-wrap ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-sm shadow-md shadow-blue-500/20'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-sm'
              }`}>
                {msg.text}
              </div>
              <span className="text-[9px] text-slate-400 px-1">{msg.time}</span>
            </div>
          </motion.div>
        ))}

        {/* typing indicator */}
        <AnimatePresence>
          {typing && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              className="flex gap-2.5"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-md">
                <Bot size={13} className="text-white" />
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-slate-400"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 0.7, delay: i * 0.15 }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={bottomRef} />
      </div>

      {/* input bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 max-w-md mx-auto bg-white/90 dark:bg-[#0A0A0E]/90 backdrop-blur-md border-t border-slate-200/60 dark:border-white/5 px-4 py-3">
        <div className="flex items-end gap-2">
          <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-end gap-2 px-4 py-3 min-h-[44px]">
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
              placeholder="서울에 대해 무엇이든 물어보세요... · Ask anything about Seoul"
              rows={1}
              className="flex-1 bg-transparent text-sm text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 resize-none outline-none leading-relaxed"
              style={{ maxHeight: '96px' }}
            />
            <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 flex-shrink-0 pb-0.5">
              <Mic size={17} />
            </button>
          </div>
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim()}
            className="w-11 h-11 rounded-2xl bg-blue-600 disabled:bg-slate-300 dark:disabled:bg-slate-700 flex items-center justify-center shadow-lg shadow-blue-500/30 disabled:shadow-none transition-all active:scale-95 flex-shrink-0"
          >
            <Send size={17} className={input.trim() ? 'text-white' : 'text-slate-400 dark:text-slate-500'} />
          </button>
        </div>
      </div>
    </div>
  );
}
