export type TipCategory = 'Transport' | 'Food' | 'Culture' | 'Shopping' | 'Nightlife' | 'Emergency';

export interface TipItem {
  id: number;
  category: TipCategory;
  situations: string[];
  titleKo: string;
  contentKo: string;
  contentEn: string;
  contentJa: string;   // Japanese translation + cultural nuance
  contentZh: string;   // Chinese translation + cultural nuance
  culturalContext: string; // One-line "왜 그런지" explanation (English)
  author: string;
  authorInitials: string;
  avatarColor: string;
  isExpert: boolean;
  tags: string[];
  likes: number;
  comments: number;
  location: string;
  isFeatured?: boolean;
}

export const TIPS: TipItem[] = [
  {
    id: 1,
    category: 'Food',
    situations: ['restaurant'],
    titleKo: '반찬은 무한 리필, 눈치 보지 마세요',
    contentKo: '작은 그릇들이 다 떨어지면 그냥 달라고 하면 됩니다. 무료로 리필된 당연한 것이에요. "반찬 더 주세요" 라고 말하면 기꺼이 줄 거예요.',
    contentEn: 'Side dishes (banchan) are always free to refill. Just ask — it\'s expected, not rude. Say "반찬 더 주세요" (banchan deo juseyo) and they\'ll happily bring more.',
    contentJa: '小鉢（バンチャン）はいつでも無料でお代わりできます。「반찬 더 주세요」（バンチャン モ ジュセヨ）と言えば快く持ってきてくれます。遠慮は不要です。',
    contentZh: '小菜（반찬）可以免费续加，这是韩国餐厅的惯例。说"반찬 더 주세요"服务员会高兴地帮您续加，完全不用不好意思。',
    culturalContext: 'In Korean dining culture, generosity with side dishes is a form of hospitality — asking for refills is expected and shows appreciation, never rudeness.',
    author: '박',
    authorInitials: '박',
    avatarColor: 'from-emerald-500 to-teal-600',
    isExpert: true,
    tags: ['#서울', '#음식', '#에티켓'],
    likes: 428,
    comments: 31,
    location: '서울',
    isFeatured: true,
  },
  {
    id: 2,
    category: 'Transport',
    situations: ['subway'],
    titleKo: '서울 지하철에서 T머니를 충전할 때는 역 안에 있는 편의점에서',
    contentKo: '서울 지하철에서 T머니를 충전할 때는 역 안에 있는 편의점(GS25, CU, 세븐일레븐)이 창구보다 훨씬 빠릅니다. 앱카드로도 충전이 가능하며, T머니 잔액은 버스·지하철 모두에서 그대로 사용할 수 있습니다. 잔액이 ...',
    contentEn: 'When topping up T-Money in Seoul subway, convenience stores inside stations (GS25, CU, 7-Eleven) are much faster than ticket windows. You can also top up via app, and T-Money balance works on both buses and subways.',
    contentJa: 'T-Moneyをチャージする際は駅構内のコンビニ（GS25・CU・セブンイレブン）が窓口より断然速い。アプリカードでもチャージ可能。残高はバスにも地下鉄にも使えます。',
    contentZh: '充值T-Money时，站内便利店（GS25、CU、7-11）比售票窗口快得多。也可用手机APP充值，余额可在公交和地铁通用。',
    culturalContext: 'T-Money is Korea\'s universal transit card — Koreans use it for subway, bus, and even some taxis, making convenience store top-ups a daily routine.',
    author: '김민준',
    authorInitials: 'JH',
    avatarColor: 'from-blue-500 to-indigo-600',
    isExpert: true,
    tags: ['#서울', '#교통', '#지하철'],
    likes: 342,
    comments: 12,
    location: '서울',
  },
  {
    id: 3,
    category: 'Food',
    situations: ['restaurant'],
    titleKo: '식당에서 반찬 더 달라고 하는 법',
    contentKo: '한국 식당에서 반찬은 무료로 리필됩니다. "저 반찬 더 주세요"라고 하면 됩니다. 물도 셀프 코너에서 직접 가져다 마셔도 되고, 직원에게 요청해도 됩니다.',
    contentEn: 'At Korean restaurants, side dishes are free refills. Say "반찬 더 주세요". Water is often self-serve from a machine, or just ask the staff.',
    contentJa: '韓国の食堂では副菜は無料でお代わりできます。「반찬 더 주세요」と言えばOK。お水はセルフコーナーから自由に取れることも多いです。',
    contentZh: '韩国餐厅的小菜可以免费续加，说"반찬 더 주세요"就可以。水通常在自助角自取，或直接向服务员要。',
    culturalContext: 'Self-service water and unlimited refills reflect Korea\'s "정 (jeong)" — a cultural warmth that values making guests feel at home.',
    author: 'Sarah.킴',
    authorInitials: 'SK',
    avatarColor: 'from-pink-500 to-rose-500',
    isExpert: false,
    tags: ['#음식', '#식당', '#꿀팁'],
    likes: 316,
    comments: 18,
    location: '서울',
  },
  {
    id: 4,
    category: 'Culture',
    situations: ['restaurant'],
    titleKo: '어른 앞에서 술 마시는 예절',
    contentKo: '한국에서는 어른 앞에서 고개를 돌려 마시는 게 예의예요. 처음 받을 때 두 손으로 받거나 한 손으로 잡고 다른 손으로 팔뚝을 받치면 됩니다.',
    contentEn: 'When drinking with someone older in Korea, turn your head or body slightly away as you drink. Receive the glass with two hands or support your elbow — both show respect.',
    contentJa: '韓国では目上の人の前でお酒を飲む際、顔を少し横に向けて飲むのがマナー。グラスは両手で受け取るか、片手で持ち反対の手で肘を支えましょう。',
    contentZh: '韩国喝酒礼仪：在长辈面前喝酒时需侧过头。接酒杯时用双手，或一手持杯另一手托住手肘，这都是表示尊重的方式。',
    culturalContext: 'Korea\'s Confucian hierarchy means deference to elders is woven into daily life — these small gestures signal respect without a single word.',
    author: 'MonkJeong',
    authorInitials: 'MJ',
    avatarColor: 'from-amber-500 to-orange-500',
    isExpert: true,
    tags: ['#문화예절', '#술자리', '#에티켓'],
    likes: 512,
    comments: 45,
    location: '한국 전체',
  },
  {
    id: 5,
    category: 'Transport',
    situations: ['subway', 'taxi'],
    titleKo: '서울역에서 인천공항 가는 법',
    contentKo: 'AREX(공항철도)를 이용하면 서울역에서 인천공항까지 직통 43분. 일반열차는 66분이지만 훨씬 저렴합니다. 직통은 좌석 지정 필수, 수하물 미리 체크인 가능합니다.',
    contentEn: 'Take AREX from Seoul Station to Incheon Airport. Express: 43min (seat reservation required, early check-in available). Regular: 66min, much cheaper.',
    contentJa: 'ソウル駅からAREX（空港鉄道）で仁川空港へ。直通43分（座席指定・早期チェックイン可）、一般列車は66分で格安。直通は事前予約が必要です。',
    contentZh: '从首尔站乘AREX机场铁路前往仁川机场。直达43分钟（须订座，可提前值机），普通列车66分钟但便宜很多。',
    culturalContext: 'The AREX express allows city check-in at Seoul Station — a uniquely Korean convenience where you can drop luggage before boarding.',
    author: '공항맞춤',
    authorInitials: 'AX',
    avatarColor: 'from-sky-500 to-blue-600',
    isExpert: false,
    tags: ['#서울역', '#인천공항', '#AREX'],
    likes: 289,
    comments: 22,
    location: '서울',
  },
  {
    id: 6,
    category: 'Nightlife',
    situations: ['norebang'],
    titleKo: '홍대 로컬들만 아는 노래방 꿀팁',
    contentKo: '홍대 메인 거리 노래방은 관광객 가격. 상수역 쪽 골목 노래방은 같은 시간에 30~40% 저렴하고 최신 장비 갖춰져 있어요. 평일 낮에는 "낮 특가"로 시간당 5천원도 가능.',
    contentEn: 'Main Hongdae street noraebangs charge tourist prices. Alley spots near Sangsu station are 30-40% cheaper with newer equipment. Weekday afternoons: "afternoon specials" as low as ₩5,000/hour.',
    contentJa: '홍대メインストリートのノレバンは観光客価格。상수駅近くの路地は同じ時間で30〜40%安く最新設備。平日昼は「낮 특가」で1時間5,000ウォンも可能。',
    contentZh: '弘大主街的卡拉OK是游客价。上水站附近巷子里便宜30-40%且设备更新。工作日下午有"특가"，最低每小时5000韩元。',
    culturalContext: 'Norebang is a core Korean social ritual — Koreans bond here after work and school, making private karaoke rooms a deeply cultural nightlife staple.',
    author: 'Jihoon',
    authorInitials: 'JH',
    avatarColor: 'from-purple-500 to-violet-600',
    isExpert: true,
    tags: ['#홍대', '#노래방', '#로컬꿀팁'],
    likes: 203,
    comments: 9,
    location: '서울 홍대',
  },
  {
    id: 7,
    category: 'Shopping',
    situations: ['convenience'],
    titleKo: '편의점 도시락 200% 활용법',
    contentKo: '편의점 도시락은 계산 전에 따뜻하게 데워달라고 하면 됩니다. "데워주세요" (데워주세요). 삼각김밥은 포장 화살표 방향대로 열면 김이 안 눅어요.',
    contentEn: 'Ask to heat your bento before checkout: "데워주세요" (dae-wo-ju-se-yo). For triangle kimbap, follow arrows (1→2→3) to unwrap without soggy seaweed.',
    contentJa: 'お弁当はレジ前に「데워주세요」（温めてください）で温めてもらえます。삼각김밥は矢印順（1→2→3）に開けると海苔がべたつきません。',
    contentZh: '便利店便当结账前说"데워주세요"可以加热。三角饭团按箭头顺序（1→2→3）打开，海苔就不会变湿。',
    culturalContext: 'Korean convenience stores double as quick-meal spots — heating service and sit-in seating reflect Korea\'s "빨리빨리" fast-paced lifestyle.',
    author: 'CuBenji',
    authorInitials: 'CB',
    avatarColor: 'from-green-500 to-emerald-600',
    isExpert: false,
    tags: ['#편의점', '#도시락', '#꿀팁'],
    likes: 167,
    comments: 14,
    location: '한국 전체',
  },
  {
    id: 8,
    category: 'Emergency',
    situations: ['pharmacy'],
    titleKo: '약국에서 약 살 때 영어로 설명하는 법',
    contentKo: '한국 약사들은 대부분 기본 영어가 가능합니다. 증상을 몸짓으로 보여주거나 구글 번역을 쓰면 OK. 두통약(타이레놀), 소화제(베아제), 지사제(스메타) 브랜드 이름으로 말하면 더 빨라요.',
    contentEn: 'Most Korean pharmacists handle basic English. Use gestures or Google Translate. Brand names work: Tylenol (headache), Beazyme (digestion), Smecta (diarrhea).',
    contentJa: '韓国の薬剤師は大抵基本的な英語が通じます。ジェスチャーかGoogle翻訳でOK。ブランド名が早い：タイレノール（頭痛）・베아제（消化）・스메타（下痢）。',
    contentZh: '韩国药剂师大多会基本英语。可以用手势或谷歌翻译。说品牌名更快：泰诺（头痛）、베아제（消化）、思密达（腹泻）。',
    culturalContext: 'Korean pharmacies (약국) are your first stop before a hospital — pharmacists are trained to counsel patients directly, not just dispense medicine.',
    author: '로컬닥터',
    authorInitials: 'DR',
    avatarColor: 'from-red-400 to-rose-500',
    isExpert: true,
    tags: ['#약국', '#응급', '#영어'],
    likes: 388,
    comments: 27,
    location: '한국 전체',
  },
  {
    id: 9,
    category: 'Transport',
    situations: ['taxi'],
    titleKo: '카카오택시 vs 일반택시 뭐가 나을까?',
    contentKo: '카카오택시 앱으로 호출하면 미터 요금 그대로라 바가지 없음. 목적지를 앱에서 입력하니 언어 장벽 없음. 심야(자정~4시)에는 할증 20% 붙으니 지하철 막차 꼭 확인.',
    contentEn: 'KakaoTaxi app = meter fare only, no price gouging. Type destination in-app — no language barrier. Late night (midnight–4am) adds 20% surcharge, so check last subway time.',
    contentJa: 'カカオタクシーならメーター料金のみでぼったくりなし。目的地はアプリ入力で言語の壁もなし。深夜（0時〜4時）は20%割増なので終電を確認。',
    contentZh: '用KakaoTaxi叫车只收计价器费用不宰客。APP里输入目的地没有语言障碍。深夜（0点-4点）加收20%附加费，注意确认最后一班地铁。',
    culturalContext: 'Koreans widely trust KakaoTaxi because it\'s backed by Kakao — Korea\'s dominant tech company — making it the de facto standard for safe, transparent rides.',
    author: '택시왕',
    authorInitials: 'TX',
    avatarColor: 'from-yellow-500 to-amber-600',
    isExpert: false,
    tags: ['#택시', '#카카오', '#교통'],
    likes: 445,
    comments: 33,
    location: '서울',
  },
  {
    id: 10,
    category: 'Culture',
    situations: ['restaurant', 'subway'],
    titleKo: '한국에서 "진짜요?" 한 마디면 친해져요',
    contentKo: '같은 말인데도 반응이 완전히 달라요. "진짜요?" (jinjja-yo?) — "Really?" 이 한마디만 알면 어디서든 대화가 트입니다. 현지인들이 엄청 좋아해요.',
    contentEn: '"진짜요?" (jinjja-yo?) means "Really?" — learn this one phrase and Koreans will instantly warm up to you. It shows engagement and locals absolutely love it.',
    contentJa: '「진짜요？」（チンチャヨ？）は「本当に？」の意味。この一言を覚えるだけでどこでも会話が弾みます。現地人がとても喜んでくれますよ。',
    contentZh: '「진짜요?」（真的吗？）—只要学会这一句，在哪里都能和韩国人打开话匣子。当地人特别喜欢听到外国人说这句话。',
    culturalContext: 'Koreans are deeply moved when foreigners make an effort with their language — even one phrase signals respect and curiosity, instantly breaking social barriers.',
    author: '현지친구',
    authorInitials: '현',
    avatarColor: 'from-teal-500 to-cyan-600',
    isExpert: true,
    tags: ['#한국어', '#소통', '#문화'],
    likes: 621,
    comments: 58,
    location: '한국 전체',
  },
];

export const SITUATIONS = [
  { id: 'restaurant', label: '식당', labelEn: 'RESTAURANT', emoji: '🍜', category: 'Food' as TipCategory },
  { id: 'subway', label: '지하철', labelEn: 'SUBWAY', emoji: '🚇', category: 'Transport' as TipCategory },
  { id: 'convenience', label: '편의점', labelEn: 'CONVENIENCE', emoji: '🏪', category: 'Shopping' as TipCategory },
  { id: 'pharmacy', label: '약국', labelEn: 'PHARMACY', emoji: '💊', category: 'Emergency' as TipCategory },
  { id: 'taxi', label: '택시', labelEn: 'TAXI', emoji: '🚕', category: 'Transport' as TipCategory },
  { id: 'norebang', label: '노래방', labelEn: 'NOREBANG', emoji: '🎤', category: 'Nightlife' as TipCategory },
  { id: 'atm', label: 'ATM', labelEn: 'ATM', emoji: '🏧', category: 'Shopping' as TipCategory },
  { id: 'accommodation', label: '숙소', labelEn: 'ACCOMMODATION', emoji: '🏨', category: 'Shopping' as TipCategory },
];

export interface VenueItem {
  id: string;
  name: string;
  area: string;
  emoji: string;
  waitMin: number;
  crowdLevel: 'low' | 'medium' | 'high' | 'very_high';
  localRatio: number; // 0–100 현지인 비율
  isTrending: boolean; // SNS 핫플
  isAiPick: boolean;   // AI 대안 추천
  pairId?: string;
  aiTip?: string;
}

export const VENUES: VenueItem[] = [
  {
    id: 'gyeongbokgung',
    name: '경복궁',
    area: '종로구',
    emoji: '🏯',
    waitMin: 43,
    crowdLevel: 'very_high',
    localRatio: 8,
    isTrending: true,
    isAiPick: false,
    pairId: 'changdeokgung',
  },
  {
    id: 'changdeokgung',
    name: '창덕궁 후원',
    area: '종로구',
    emoji: '🌿',
    waitMin: 5,
    crowdLevel: 'low',
    localRatio: 65,
    isTrending: false,
    isAiPick: true,
    pairId: 'gyeongbokgung',
    aiTip: '현지인 65% · 비밀 정원 투어 포함',
  },
  {
    id: 'myeongdong',
    name: '명동 먹자골목',
    area: '중구',
    emoji: '🛍️',
    waitMin: 31,
    crowdLevel: 'high',
    localRatio: 6,
    isTrending: true,
    isAiPick: false,
    pairId: 'ikseon',
  },
  {
    id: 'ikseon',
    name: '익선동 한옥마을',
    area: '종로구',
    emoji: '🏠',
    waitMin: 0,
    crowdLevel: 'medium',
    localRatio: 58,
    isTrending: false,
    isAiPick: true,
    pairId: 'myeongdong',
    aiTip: '현지인 58% · 카페·한옥·바이브 완벽',
  },
  {
    id: 'gangnam_station',
    name: '강남역 주변',
    area: '강남구',
    emoji: '🏙️',
    waitMin: 18,
    crowdLevel: 'high',
    localRatio: 22,
    isTrending: true,
    isAiPick: false,
    pairId: 'garosu',
  },
  {
    id: 'garosu',
    name: '가로수길',
    area: '강남구',
    emoji: '🌳',
    waitMin: 0,
    crowdLevel: 'low',
    localRatio: 71,
    isTrending: false,
    isAiPick: true,
    pairId: 'gangnam_station',
    aiTip: '현지인 71% · 분위기 있는 브런치 명소',
  },
];

export const SAVED_KEY = 'lf_saved_tips';
export const SUBMITTED_KEY = 'lf_submitted_tips';

export function getSavedIds(): Set<number> {
  try {
    const raw = localStorage.getItem(SAVED_KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw) as number[]);
  } catch { return new Set(); }
}

export function toggleSaved(id: number): boolean {
  const saved = getSavedIds();
  if (saved.has(id)) {
    saved.delete(id);
  } else {
    saved.add(id);
  }
  try { localStorage.setItem(SAVED_KEY, JSON.stringify([...saved])); } catch {}
  return saved.has(id);
}
