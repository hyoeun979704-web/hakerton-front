import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, Calendar, Users, MapPin,
  Plus, X, Search, Bot, Sparkles,
  Clock, Star, Navigation, Edit3, Check,
  Smile, UserPlus
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

/* ─── 타입 ─── */
type Companion = 'solo' | 'couple' | 'friends' | 'family';

interface TravelState {
  startDate: string;
  endDate: string;
  companion: Companion | null;
  wantNewFriend: boolean | null;
  places: string[];
  selectedPlan: number | null;
}

/* ─── 상수 ─── */
const COMPANION_OPTIONS: { id: Companion; emoji: string; label: string; labelEn: string }[] = [
  { id: 'solo',    emoji: '🧍', label: '혼자',     labelEn: 'Solo' },
  { id: 'couple',  emoji: '👫', label: '연인/친구', labelEn: 'Couple / Friend' },
  { id: 'friends', emoji: '👯', label: '친구들',    labelEn: 'Friends Group' },
  { id: 'family',  emoji: '👨‍👩‍👧', label: '가족',    labelEn: 'Family' },
];

const POPULAR_PLACES = [
  '경복궁', '홍대', '명동', '이태원', '인사동',
  '한강공원', '북촌한옥마을', '동대문DDP', '강남', '성수동',
];

const TRAVEL_PLANS = [
  {
    id: 0,
    title: '문화 & 역사 탐방',
    titleEn: 'Culture & History',
    emoji: '🏯',
    color: 'from-amber-500 to-orange-600',
    reason: '조용한 여행을 선호하고 한국 문화에 관심이 높은 분께 추천드려요',
    highlights: ['경복궁', '북촌한옥마을', '인사동', '창덕궁'],
    duration: '3박 4일',
    budget: '₩150,000 ~',
    schedule: [
      { day: 'Day 1', items: ['경복궁 관람 (09:00)', '인사동 점심 (12:00)', '북촌한옥마을 산책 (14:00)'] },
      { day: 'Day 2', items: ['창덕궁 비원 투어 (10:00)', '익선동 카페 (13:00)', '광장시장 저녁 (18:00)'] },
      { day: 'Day 3', items: ['국립중앙박물관 (10:00)', '이태원 (15:00)', '한강 노을 (18:00)'] },
    ],
  },
  {
    id: 1,
    title: 'K-트렌드 & 푸드 투어',
    titleEn: 'K-Trend & Food Tour',
    emoji: '🍜',
    color: 'from-pink-500 to-rose-600',
    reason: '맛집과 트렌디한 스팟을 좋아하는 분께 완벽한 코스예요',
    highlights: ['성수동', '홍대', '명동', '강남'],
    duration: '3박 4일',
    budget: '₩200,000 ~',
    schedule: [
      { day: 'Day 1', items: ['성수동 카페 (10:00)', '코엑스몰 (14:00)', '청담동 디저트 (17:00)'] },
      { day: 'Day 2', items: ['홍대 브런치 (11:00)', '연남동 산책 (14:00)', '홍대 클럽거리 (21:00)'] },
      { day: 'Day 3', items: ['명동 쇼핑 (11:00)', '을지로 힙플 (15:00)', 'N서울타워 (18:00)'] },
    ],
  },
  {
    id: 2,
    title: '힐링 & 자연 코스',
    titleEn: 'Healing & Nature',
    emoji: '🌿',
    color: 'from-emerald-500 to-teal-600',
    reason: '바쁜 도시 속에서 여유를 찾고 싶은 분을 위한 힐링 코스예요',
    highlights: ['한강공원', '북한산', '서울숲', '양재천'],
    duration: '2박 3일',
    budget: '₩100,000 ~',
    schedule: [
      { day: 'Day 1', items: ['서울숲 피크닉 (10:00)', '뚝섬 한강공원 (15:00)', '성수 야시장 (19:00)'] },
      { day: 'Day 2', items: ['북한산 가벼운 트레킹 (09:00)', '은평한옥마을 (14:00)', '수유리 닭갈비 (18:00)'] },
    ],
  },
];

/* ─── 스텝 표시기 ─── */
const STEPS = ['일정', '동행', '장소', '계획', '선택'];

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-1.5 justify-center mb-6">
      {STEPS.map((label, i) => (
        <div key={i} className="flex items-center gap-1.5">
          <div className="flex flex-col items-center gap-0.5">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-extrabold transition-all ${
              i < current ? 'bg-blue-600 text-white' :
              i === current ? 'bg-blue-600 text-white ring-4 ring-blue-500/20' :
              'bg-slate-200 dark:bg-slate-800 text-slate-400'
            }`}>
              {i < current ? <Check size={11} /> : i + 1}
            </div>
            <span className={`text-[8px] font-bold ${i === current ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`}>
              {label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`w-6 h-px mb-4 ${i < current ? 'bg-blue-500' : 'bg-slate-200 dark:bg-slate-800'}`} />
          )}
        </div>
      ))}
    </div>
  );
}

export default function Travel() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [state, setState] = useState<TravelState>({
    startDate: '',
    endDate: '',
    companion: null,
    wantNewFriend: null,
    places: [],
    selectedPlan: null,
  });
  const [placeInput, setPlaceInput] = useState('');
  const [searching, setSearching] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [_generated, setGenerated] = useState(false);

  const goNext = () => setStep(s => s + 1);
  const goBack = () => { if (step > 0) setStep(s => s - 1); };

  const addPlace = (place: string) => {
    if (place && !state.places.includes(place)) {
      setState(s => ({ ...s, places: [...s.places, place] }));
    }
    setPlaceInput('');
  };

  const removePlace = (place: string) =>
    setState(s => ({ ...s, places: s.places.filter(p => p !== place) }));

  const handleSearch = () => {
    setSearching(true);
    setTimeout(() => { setSearching(false); goNext(); }, 1500);
  };

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => { setGenerating(false); setGenerated(true); goNext(); }, 2200);
  };

  const slideVariants = {
    enter: { x: 40, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -40, opacity: 0 },
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0E] pt-14 pb-28">

      {/* header */}
      <div className="px-4 py-4 flex items-center gap-3 border-b border-slate-100 dark:border-slate-800">
        <button onClick={step === 0 ? () => navigate(-1) : goBack}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
        >
          <ArrowLeft size={16} />
        </button>
        <div>
          <h1 className="font-extrabold text-base text-slate-900 dark:text-white">맞춤 여행 계획</h1>
          <p className="text-[10px] text-slate-400">Custom Travel Planner · AI 추천</p>
        </div>
        <div className="ml-auto flex items-center gap-1 text-[10px] font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10 px-2 py-1 rounded-full">
          <Sparkles size={10} /> AI
        </div>
      </div>

      <div className="px-5 pt-6">
        <StepIndicator current={step} />

        <AnimatePresence mode="wait">

          {/* ── Step 0: 일정 ── */}
          {step === 0 && (
            <motion.div key="step0" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
              <div className="flex items-center gap-2 mb-1">
                <Calendar size={18} className="text-blue-500" />
                <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">언제 가시나요?</h2>
              </div>
              <p className="text-sm text-slate-400 mb-6">When are you visiting Seoul?</p>

              <div className="space-y-4 mb-8">
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-1.5 block">출발일 · Arrival Date</label>
                  <input
                    type="date"
                    value={state.startDate}
                    onChange={e => setState(s => ({ ...s, startDate: e.target.value }))}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-800 dark:text-white outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-1.5 block">귀국일 · Departure Date</label>
                  <input
                    type="date"
                    value={state.endDate}
                    onChange={e => setState(s => ({ ...s, endDate: e.target.value }))}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-800 dark:text-white outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              <button
                onClick={goNext}
                disabled={!state.startDate || !state.endDate}
                className="w-full bg-blue-600 disabled:bg-slate-200 dark:disabled:bg-slate-800 text-white disabled:text-slate-400 font-extrabold py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors active:scale-[0.98] shadow-lg shadow-blue-500/25 disabled:shadow-none"
              >
                다음 <ArrowRight size={16} />
              </button>
            </motion.div>
          )}

          {/* ── Step 1: 동행 ── */}
          {step === 1 && (
            <motion.div key="step1" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
              <div className="flex items-center gap-2 mb-1">
                <Users size={18} className="text-purple-500" />
                <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">누구와 함께하나요?</h2>
              </div>
              <p className="text-sm text-slate-400 mb-6">Who are you traveling with?</p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {COMPANION_OPTIONS.map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setState(s => ({ ...s, companion: opt.id }))}
                    className={`flex flex-col items-center gap-2 py-5 rounded-2xl border-2 transition-all active:scale-95 ${
                      state.companion === opt.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/10'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
                    }`}
                  >
                    <span className="text-3xl">{opt.emoji}</span>
                    <div className="text-center">
                      <p className={`text-sm font-extrabold ${state.companion === opt.id ? 'text-blue-600 dark:text-blue-400' : 'text-slate-800 dark:text-white'}`}>{opt.label}</p>
                      <p className="text-[10px] text-slate-400">{opt.labelEn}</p>
                    </div>
                  </button>
                ))}
              </div>

              {/* solo → 새 친구 제안 */}
              <AnimatePresence>
                {state.companion === 'solo' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-6"
                  >
                    <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800/40 rounded-2xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <UserPlus size={15} className="text-purple-500" />
                        <p className="font-extrabold text-sm text-purple-800 dark:text-purple-300">새로운 친구를 만나볼까요?</p>
                      </div>
                      <p className="text-xs text-purple-600 dark:text-purple-400 mb-3 leading-relaxed">
                        비슷한 취향의 여행자와 동행 메이트를 연결해드릴 수 있어요!
                        <br />Find travel mates with similar interests!
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setState(s => ({ ...s, wantNewFriend: true }))}
                          className={`flex-1 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                            state.wantNewFriend === true
                              ? 'bg-purple-600 text-white'
                              : 'bg-white dark:bg-slate-800 text-purple-600 dark:text-purple-400 border border-purple-300 dark:border-purple-700'
                          }`}
                        >
                          <Smile size={12} className="inline mr-1" /> 네, 원해요!
                        </button>
                        <button
                          onClick={() => setState(s => ({ ...s, wantNewFriend: false }))}
                          className={`flex-1 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                            state.wantNewFriend === false
                              ? 'bg-slate-700 text-white'
                              : 'bg-white dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          혼자 여행할게요
                        </button>
                      </div>

                      {/* 동행 찾기 제안 */}
                      <AnimatePresence>
                        {state.wantNewFriend === true && (
                          <motion.div
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-3"
                          >
                            <Link
                              to="/companions"
                              className="flex items-center gap-2 w-full bg-purple-600 text-white font-bold text-xs py-2.5 rounded-xl justify-center"
                            >
                              <UserPlus size={13} /> 동행 메이트 탐색하기
                            </Link>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onClick={goNext}
                disabled={!state.companion}
                className="w-full bg-blue-600 disabled:bg-slate-200 dark:disabled:bg-slate-800 text-white disabled:text-slate-400 font-extrabold py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors active:scale-[0.98] shadow-lg shadow-blue-500/25 disabled:shadow-none"
              >
                다음 <ArrowRight size={16} />
              </button>
            </motion.div>
          )}

          {/* ── Step 2: 장소 ── */}
          {step === 2 && (
            <motion.div key="step2" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
              <div className="flex items-center gap-2 mb-1">
                <MapPin size={18} className="text-red-500" />
                <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">어디로 가볼까요?</h2>
              </div>
              <p className="text-sm text-slate-400 mb-4">꼭 방문하고 싶은 장소를 추가하세요<br/>Add must-visit places</p>

              {/* 입력 */}
              <div className="flex gap-2 mb-4">
                <div className="flex-1 flex items-center gap-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-2.5">
                  <Search size={15} className="text-slate-400 flex-shrink-0" />
                  <input
                    value={placeInput}
                    onChange={e => setPlaceInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') addPlace(placeInput); }}
                    placeholder="장소 검색 · Search place"
                    className="flex-1 bg-transparent text-sm text-slate-800 dark:text-white placeholder-slate-400 outline-none"
                  />
                </div>
                <button
                  onClick={() => addPlace(placeInput)}
                  className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white flex-shrink-0 shadow-md shadow-blue-500/30"
                >
                  <Plus size={18} />
                </button>
              </div>

              {/* 인기 장소 칩 */}
              <p className="text-[11px] font-bold text-slate-400 mb-2">인기 장소 · Popular Spots</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {POPULAR_PLACES.map(place => (
                  <button
                    key={place}
                    onClick={() => addPlace(place)}
                    disabled={state.places.includes(place)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all ${
                      state.places.includes(place)
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-blue-400'
                    }`}
                  >
                    {state.places.includes(place) ? <Check size={10} className="inline mr-1" /> : null}
                    {place}
                  </button>
                ))}
              </div>

              {/* 선택된 장소 */}
              {state.places.length > 0 && (
                <div className="mb-6 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3">
                  <p className="text-[11px] font-bold text-slate-400 mb-2">선택된 장소 ({state.places.length})</p>
                  <div className="flex flex-wrap gap-1.5">
                    {state.places.map(p => (
                      <span key={p} className="flex items-center gap-1 bg-blue-50 dark:bg-blue-500/15 text-blue-700 dark:text-blue-300 text-xs font-bold px-2.5 py-1 rounded-full border border-blue-200 dark:border-blue-500/30">
                        {p}
                        <button onClick={() => removePlace(p)} className="ml-0.5 hover:text-red-500 transition-colors">
                          <X size={11} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={handleSearch}
                disabled={state.places.length === 0 || searching}
                className="w-full bg-blue-600 disabled:bg-slate-200 dark:disabled:bg-slate-800 text-white disabled:text-slate-400 font-extrabold py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors active:scale-[0.98] shadow-lg shadow-blue-500/25 disabled:shadow-none"
              >
                {searching ? (
                  <>
                    <Bot size={16} className="animate-pulse" /> 최고의 장소를 찾고있어요...
                  </>
                ) : (
                  <>
                    <Search size={16} /> 주변 장소 검색하기
                  </>
                )}
              </button>
            </motion.div>
          )}

          {/* ── Step 3: 계획 생성 ── */}
          {step === 3 && (
            <motion.div key="step3" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-blue-500/30">
                  <Bot size={28} className="text-white" />
                </div>
                <h2 className="text-lg font-extrabold text-slate-900 dark:text-white mb-1">최고의 여행을 준비해 드릴게요</h2>
                <p className="text-sm text-slate-400">여행 스타일 + 일정 + 선택한 장소 기반<br/>AI가 여행 계획 3개를 생성합니다</p>
              </div>

              {/* 요약 카드 */}
              <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 mb-6 space-y-2.5">
                <div className="flex items-center gap-3">
                  <Calendar size={14} className="text-blue-500 flex-shrink-0" />
                  <span className="text-sm text-slate-700 dark:text-slate-300">
                    {state.startDate} → {state.endDate}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Users size={14} className="text-purple-500 flex-shrink-0" />
                  <span className="text-sm text-slate-700 dark:text-slate-300">
                    {COMPANION_OPTIONS.find(c => c.id === state.companion)?.label}
                    {state.wantNewFriend === true ? ' + 새 친구 매칭' : ''}
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={14} className="text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700 dark:text-slate-300">{state.places.join(', ')}</span>
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={generating}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-xl shadow-blue-500/30 disabled:opacity-70"
              >
                {generating ? (
                  <>
                    <Sparkles size={16} className="animate-spin" /> AI가 여행 계획을 만들고 있어요...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} /> 여행 계획 3개 생성하기
                  </>
                )}
              </button>
            </motion.div>
          )}

          {/* ── Step 4: 계획 선택 ── */}
          {step === 4 && (
            <motion.div key="step4" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
              <div className="flex items-center gap-2 mb-1">
                <Star size={18} className="text-amber-400 fill-amber-400" />
                <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">이런 여행은 어떠세요?</h2>
              </div>
              <p className="text-sm text-slate-400 mb-5">AI가 추천하는 맞춤 여행 계획 3가지</p>

              <div className="space-y-4">
                {TRAVEL_PLANS.map((plan, i) => (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.12 }}
                  >
                    <button
                      onClick={() => setState(s => ({ ...s, selectedPlan: plan.id }))}
                      className={`w-full text-left rounded-3xl border-2 overflow-hidden transition-all active:scale-[0.98] ${
                        state.selectedPlan === plan.id
                          ? 'border-blue-500 shadow-lg shadow-blue-500/15'
                          : 'border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      {/* gradient header */}
                      <div className={`bg-gradient-to-r ${plan.color} p-4`}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-2xl">{plan.emoji}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold bg-white/20 text-white px-2 py-0.5 rounded-full">{plan.duration}</span>
                            {state.selectedPlan === plan.id && (
                              <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                                <Check size={13} className="text-blue-600" />
                              </div>
                            )}
                          </div>
                        </div>
                        <p className="font-extrabold text-white text-base">{plan.title}</p>
                        <p className="text-white/70 text-[11px]">{plan.titleEn}</p>
                      </div>

                      {/* body */}
                      <div className="bg-white dark:bg-slate-900 p-4">
                        {/* 추천 이유 */}
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
                          ✦ {plan.reason}
                        </p>

                        {/* 하이라이트 */}
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {plan.highlights.map(h => (
                            <span key={h} className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-full">
                              📍 {h}
                            </span>
                          ))}
                        </div>

                        {/* 일정 다이어그램 */}
                        <div className="space-y-2">
                          {plan.schedule.map(day => (
                            <div key={day.day} className="flex gap-3">
                              <div className="flex flex-col items-center gap-1 flex-shrink-0">
                                <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center">
                                  <span className="text-[7px] font-black text-blue-600 dark:text-blue-400">{day.day.replace('Day ', '')}</span>
                                </div>
                                <div className="w-px flex-1 bg-slate-200 dark:bg-slate-700" />
                              </div>
                              <div className="pb-2">
                                <p className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 mb-1">{day.day}</p>
                                {day.items.map(item => (
                                  <div key={item} className="flex items-center gap-1.5 mb-0.5">
                                    <Clock size={9} className="text-slate-300 flex-shrink-0" />
                                    <p className="text-[10px] text-slate-600 dark:text-slate-400">{item}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                          <span className="text-[11px] font-bold text-slate-400">예상 비용 {plan.budget}</span>
                          <span className="text-[11px] font-bold text-blue-500">상세 보기 →</span>
                        </div>
                      </div>
                    </button>
                  </motion.div>
                ))}
              </div>

              {/* 선택 버튼 */}
              <div className="mt-6 space-y-3">
                <button
                  disabled={state.selectedPlan === null}
                  className="w-full bg-blue-600 disabled:bg-slate-200 dark:disabled:bg-slate-800 text-white disabled:text-slate-400 font-extrabold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-blue-500/25 disabled:shadow-none"
                >
                  <Navigation size={16} /> 이 여행으로 결정!
                </button>
                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-1.5 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 font-bold text-sm py-3 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <Edit3 size={14} /> 장소 수정
                  </button>
                  <Link
                    to="/tips"
                    className="flex-1 flex items-center justify-center gap-1.5 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 font-bold text-sm py-3 rounded-2xl border border-slate-200 dark:border-slate-800"
                  >
                    <Star size={14} /> AI 꿀팁 보기
                  </Link>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
