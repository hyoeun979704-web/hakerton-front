import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Lang = 'ko' | 'en' | 'ja' | 'zh';
export type Theme = 'light' | 'dark';

const TRANSLATIONS = {
  ko: {
    appName: 'LocalFlow',
    nav: {
      home: '홈',
      tips: '팁',
      tripStyle: '스타일',
      myPage: '마이',
    },
    home: {
      heroTag: 'AI 현지인 가이드',
      heroTitle: '현지인처럼\n서울을 누비다.',
      heroSubtitle: '당신의 취향을 분석하고 서울의 진짜 박동을 연결해주는 유일한 AI 컬처 가이드.',
      heroCta: '여행 스타일 진단하기',
      pulseTag: '실시간',
      pulseTitle: '도시의 박동을\n느껴보세요.',
      pulseSubtitle: '실시간 현지인 밀집도와 대기시간을 확인해 나만의 완벽한 타이밍을 찾으세요.',
      pulseCta: '실시간 로컬 지도 보기',
      translateTag: '빠른 도움',
      translateTitle: '언어 장벽?\n이제 없어요.',
      translateSubtitle: '식당, 지하철, 긴급상황. 위치와 상황을 인식하여 가장 필요한 도움말을 즉시 제공합니다.',
      translateCta: '상황별 툴킷 열기',
      tipsTag: '로컬 꿀팁',
      tipsTitle: '진짜 팁만\n모았습니다.',
      tipsSubtitle: '블로그 광고에 속지 마세요. 검증된 로컬 전문가들의 진짜 꿀팁 피드.',
      tipsCta: '로컬 팁 탐색하기',
      personaTag: 'AI 매칭',
      personaTitle: '당신만의\n여행 페르소나.',
      personaSubtitle: '취향 분석 AI가 당신의 여행 스타일을 진단하고 최적의 서울 경험을 제안합니다.',
      personaCta: '내 여행 스타일 진단',
      statsUsers: '누적 여행자',
      statsTips: '검증된 팁',
      statsExperts: '로컬 전문가',
      localRatio: '로컬 비율',
      avgWait: '평균 대기',
      samplePlace: '성수 카페거리',
      samplePlaceDesc: '핫플레이스 실시간 혼잡도',
      sampleTipAuthor: 'Jihoon',
      sampleTipExpert: '홍대거주 5년차 로컬 마스터',
      sampleTipContent: '"불금 홍대 클럽거리 대기줄 피하는 팁 알려드림. 메인 거리 말고 상수역 쪽 골목으로 들어가면 음악 좋고 로컬들만 아는 펍들이 많아요."',
      restaurantGuide: '식당에서',
      restaurantDesc: '한국어로 현지식 주문하기 가이드',
      transitGuide: '대중교통',
      transitDesc: '환승역 미아 방지 네비게이터',
    },
    tips: {
      title: '로컬 팁',
      searchPlaceholder: '팁 검색...',
      categories: {
        All: '전체',
        Transport: '교통',
        Food: '음식',
        Culture: '문화',
        Shopping: '쇼핑',
        Nightlife: '나이트라이프',
      },
      localExpert: '로컬 전문가',
      by: '작성자',
      empty: '이 카테고리에 팁이 없습니다.',
    },
    onboarding: {
      title: '여행 페르소나',
      subtitle: '당신에게 완벽한 로컬 플로우를 찾아드릴게요.',
      q1Title: '여행 페이스는?',
      q1Desc: '세밀한 계획파인가요, 즉흥 탐험가인가요?',
      q1A: '🐢 느긋하게 (여유파)',
      q1ASub: '동네 구석구석을 음미하며 여행하고 싶어요.',
      q1B: '⚡ 빠르게 (핫플 정복)',
      q1BSub: '모든 핫플레이스를 빠르게 정복하고 싶어요!',
      q2Title: '오늘 밤 우선순위는?',
      q2Desc: '서울의 해가 지면...',
      q2A: '🍖 K-BBQ & 소주',
      q2ASub: '최고의 현지 맛집으로 안내해주세요.',
      q2B: '🏮 야시장 & 야경',
      q2BSub: '도시의 야경과 길거리 음식을 즐기고 싶어요.',
      complete: '완료! 나만의 서울을 만나보세요.',
      resultTitle: '당신의 여행 스타일',
      goHome: '홈으로',
    },
    myPage: {
      title: '설정',
      profile: '프로필',
      guestUser: '여행자',
      guestEmail: '로그인이 필요합니다',
      language: '언어',
      theme: '테마',
      themeLight: '라이트 모드',
      themeDark: '다크 모드',
      notifications: '알림',
      notificationsDesc: '실시간 업데이트 알림 받기',
      about: '앱 정보',
      version: '버전',
      privacy: '개인정보 처리방침',
      terms: '서비스 이용약관',
      langNames: {
        ko: '한국어',
        en: 'English',
        ja: '日本語',
        zh: '中文',
      },
    },
  },
  en: {
    appName: 'LocalFlow',
    nav: {
      home: 'Home',
      tips: 'Tips',
      tripStyle: 'Style',
      myPage: 'My',
    },
    home: {
      heroTag: 'AI Local Guide',
      heroTitle: 'Flow Like\na Local.',
      heroSubtitle: 'The only AI culture guide that analyzes your taste and connects you to the real pulse of Seoul.',
      heroCta: 'Discover My Travel Style',
      pulseTag: 'Live Now',
      pulseTitle: "Feel the\nCity's Pulse.",
      pulseSubtitle: 'Check real-time local density and wait times to find your perfect moment in the city.',
      pulseCta: 'View Live Local Map',
      translateTag: 'Quick Help',
      translateTitle: 'Lost in\nTranslation?',
      translateSubtitle: 'Restaurants, subway, emergencies. Location-aware contextual help delivered instantly.',
      translateCta: 'Open Situational Toolkit',
      tipsTag: 'Local Tips',
      tipsTitle: 'Authentic Tips,\nFiltered for You.',
      tipsSubtitle: "Don't get fooled by ads. A verified local expert curated feed by category.",
      tipsCta: 'Explore Local Feed',
      personaTag: 'AI Matching',
      personaTitle: 'Your Personal\nTravel Persona.',
      personaSubtitle: 'Our AI analyzes your taste and recommends the optimal Seoul experience just for you.',
      personaCta: 'Diagnose My Style',
      statsUsers: 'Travelers',
      statsTips: 'Verified Tips',
      statsExperts: 'Local Experts',
      localRatio: 'Local Ratio',
      avgWait: 'Avg Wait',
      samplePlace: 'Seongsu Cafe St.',
      samplePlaceDesc: 'Hotspot real-time density',
      sampleTipAuthor: 'Jihoon',
      sampleTipExpert: 'Hongdae 5yr Local Master',
      sampleTipContent: '"Tip to skip the Friday club lines in Hongdae. Skip the main street — head into the alley near Sangsu station for better music and locals-only pubs."',
      restaurantGuide: 'At a Restaurant',
      restaurantDesc: 'Guide to ordering local food in Korean',
      transitGuide: 'Public Transit',
      transitDesc: 'Transfer station anti-lost navigator',
    },
    tips: {
      title: 'Local Tips',
      searchPlaceholder: 'Search tips...',
      categories: {
        All: 'All',
        Transport: 'Transport',
        Food: 'Food',
        Culture: 'Culture',
        Shopping: 'Shopping',
        Nightlife: 'Nightlife',
      },
      localExpert: 'Local Expert',
      by: 'By',
      empty: 'No tips in this category.',
    },
    onboarding: {
      title: 'Travel Persona',
      subtitle: "Let's find your perfect local flow.",
      q1Title: 'What is your local pace?',
      q1Desc: 'Are you a meticulous planner or a spontaneous wanderer?',
      q1A: '🐢 Slow & Steady',
      q1ASub: 'I want to soak in every detail of the neighborhood.',
      q1B: '⚡ Fast & Furious',
      q1BSub: 'I want to hit all the hot spots quickly!',
      q2Title: "What's your priority tonight?",
      q2Desc: 'When the sun goes down in Seoul...',
      q2A: '🍖 K-BBQ & Soju',
      q2ASub: 'Take me to the best local restaurants.',
      q2B: '🏮 Night Markets & Views',
      q2BSub: 'I want to see the city lights and street food.',
      complete: 'Done! Welcome to your Seoul.',
      resultTitle: 'Your Travel Style',
      goHome: 'Go Home',
    },
    myPage: {
      title: 'Settings',
      profile: 'Profile',
      guestUser: 'Traveler',
      guestEmail: 'Sign in to personalize',
      language: 'Language',
      theme: 'Theme',
      themeLight: 'Light Mode',
      themeDark: 'Dark Mode',
      notifications: 'Notifications',
      notificationsDesc: 'Receive real-time updates',
      about: 'About',
      version: 'Version',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      langNames: {
        ko: '한국어',
        en: 'English',
        ja: '日本語',
        zh: '中文',
      },
    },
  },
  ja: {
    appName: 'LocalFlow',
    nav: {
      home: 'ホーム',
      tips: 'ヒント',
      tripStyle: 'スタイル',
      myPage: 'マイ',
    },
    home: {
      heroTag: 'AIローカルガイド',
      heroTitle: 'ローカルのように\nソウルを満喫。',
      heroSubtitle: 'あなたの好みを分析し、ソウルのリアルな鼓動に繋げる唯一のAIカルチャーガイド。',
      heroCta: '旅行スタイルを診断する',
      pulseTag: 'リアルタイム',
      pulseTitle: '都市の鼓動を\n感じよう。',
      pulseSubtitle: 'リアルタイムの地元密度と待ち時間を確認して、完璧なタイミングを見つけましょう。',
      pulseCta: 'リアルタイムマップを見る',
      translateTag: 'クイックヘルプ',
      translateTitle: '言語の壁？\nもう大丈夫。',
      translateSubtitle: 'レストラン、地下鉄、緊急事態。場所と状況を認識し、必要なヘルプを即座に提供。',
      translateCta: '状況別ツールキットを開く',
      tipsTag: 'ローカルヒント',
      tipsTitle: '本物のヒントだけ\n集めました。',
      tipsSubtitle: '広告ブログに騙されないで。認定済みローカル専門家のカテゴリー別リアルヒントフィード。',
      tipsCta: 'ローカルフィードを見る',
      personaTag: 'AIマッチング',
      personaTitle: 'あなただけの\n旅行ペルソナ。',
      personaSubtitle: 'AIがあなたの趣味を分析し、最適なソウル体験を提案します。',
      personaCta: '旅行スタイルを診断',
      statsUsers: '旅行者数',
      statsTips: '認定済みヒント',
      statsExperts: 'ローカル専門家',
      localRatio: 'ローカル比率',
      avgWait: '平均待ち',
      samplePlace: '聖水カフェ通り',
      samplePlaceDesc: 'ホットスポットリアルタイム混雑度',
      sampleTipAuthor: 'Jihoon',
      sampleTipExpert: '弘大在住5年ローカルマスター',
      sampleTipContent: '"金曜夜の弘大クラブ街の行列を避けるコツ。メイン通りではなく上水駅近くの路地へ。音楽が良くてローカルしか知らないパブがたくさんあります。"',
      restaurantGuide: 'レストランで',
      restaurantDesc: '韓国語でのローカルフード注文ガイド',
      transitGuide: '公共交通機関',
      transitDesc: '乗り換え駅迷子防止ナビゲーター',
    },
    tips: {
      title: 'ローカルヒント',
      searchPlaceholder: 'ヒントを検索...',
      categories: {
        All: '全て',
        Transport: '交通',
        Food: '食べ物',
        Culture: 'カルチャー',
        Shopping: 'ショッピング',
        Nightlife: 'ナイトライフ',
      },
      localExpert: 'ローカル専門家',
      by: '投稿者',
      empty: 'このカテゴリーにヒントはありません。',
    },
    onboarding: {
      title: '旅行ペルソナ',
      subtitle: 'あなただけのローカルフローを見つけましょう。',
      q1Title: 'あなたの旅行ペースは？',
      q1Desc: '計画派？それとも即興派？',
      q1A: '🐢 ゆっくり（じっくり派）',
      q1ASub: '街の細かいところまでじっくり味わいたいです。',
      q1B: '⚡ 速く（ホットスポット制覇）',
      q1BSub: '全てのホットスポットを素早く回りたいです！',
      q2Title: '今夜の優先事項は？',
      q2Desc: 'ソウルに日が暮れたら...',
      q2A: '🍖 K-BBQ & ソジュ',
      q2ASub: '最高のローカルレストランに連れて行って。',
      q2B: '🏮 夜市 & 夜景',
      q2BSub: '都市の夜景とストリートフードを楽しみたいです。',
      complete: '完了！あなただけのソウルへようこそ。',
      resultTitle: 'あなたの旅行スタイル',
      goHome: 'ホームへ',
    },
    myPage: {
      title: '設定',
      profile: 'プロフィール',
      guestUser: '旅行者',
      guestEmail: 'サインインして個人化',
      language: '言語',
      theme: 'テーマ',
      themeLight: 'ライトモード',
      themeDark: 'ダークモード',
      notifications: '通知',
      notificationsDesc: 'リアルタイム更新通知を受け取る',
      about: 'アプリ情報',
      version: 'バージョン',
      privacy: 'プライバシーポリシー',
      terms: '利用規約',
      langNames: {
        ko: '한국어',
        en: 'English',
        ja: '日本語',
        zh: '中文',
      },
    },
  },
  zh: {
    appName: 'LocalFlow',
    nav: {
      home: '首页',
      tips: '攻略',
      tripStyle: '风格',
      myPage: '我的',
    },
    home: {
      heroTag: 'AI本地导览',
      heroTitle: '像本地人\n游览首尔。',
      heroSubtitle: '唯一分析您喜好并连接首尔真实节奏的AI文化导览。',
      heroCta: '探索我的旅行风格',
      pulseTag: '实时',
      pulseTitle: '感受\n城市的节拍。',
      pulseSubtitle: '实时查看本地密度和等待时间，找到完美的游览时机。',
      pulseCta: '查看实时地图',
      translateTag: '快速帮助',
      translateTitle: '语言不通？\n没问题。',
      translateSubtitle: '餐厅、地铁、紧急情况。位置感知，即时提供最需要的帮助。',
      translateCta: '打开情境工具包',
      tipsTag: '本地攻略',
      tipsTitle: '只有真实\n的攻略。',
      tipsSubtitle: '不要被广告欺骗。认证本地专家按类别分类的真实攻略。',
      tipsCta: '探索本地攻略',
      personaTag: 'AI匹配',
      personaTitle: '专属您的\n旅行人格。',
      personaSubtitle: 'AI分析您的偏好，为您推荐最优化的首尔体验。',
      personaCta: '诊断我的旅行风格',
      statsUsers: '旅行者',
      statsTips: '认证攻略',
      statsExperts: '本地专家',
      localRatio: '本地比例',
      avgWait: '平均等待',
      samplePlace: '圣水咖啡街',
      samplePlaceDesc: '热门地点实时拥挤度',
      sampleTipAuthor: 'Jihoon',
      sampleTipExpert: '弘大居住5年本地达人',
      sampleTipContent: '"避开弘大俱乐部区周五排队的技巧。不要去主街，去上水站附近的小巷，那里有好音乐和只有本地人知道的酒吧。"',
      restaurantGuide: '在餐厅',
      restaurantDesc: '用韩语点当地食物的指南',
      transitGuide: '公共交通',
      transitDesc: '防止在换乘站迷路的导航',
    },
    tips: {
      title: '本地攻略',
      searchPlaceholder: '搜索攻略...',
      categories: {
        All: '全部',
        Transport: '交通',
        Food: '美食',
        Culture: '文化',
        Shopping: '购物',
        Nightlife: '夜生活',
      },
      localExpert: '本地专家',
      by: '作者',
      empty: '该类别暂无攻略。',
    },
    onboarding: {
      title: '旅行人格',
      subtitle: '让我们找到您完美的本地节奏。',
      q1Title: '您的旅行节奏是？',
      q1Desc: '您是计划派还是即兴探险者？',
      q1A: '🐢 慢慢来（悠闲派）',
      q1ASub: '我想细细品味每个角落。',
      q1B: '⚡ 快快走（打卡派）',
      q1BSub: '我想快速打卡所有热门景点！',
      q2Title: '今晚的优先事项是？',
      q2Desc: '首尔日落之后...',
      q2A: '🍖 韩式烤肉 & 烧酒',
      q2ASub: '带我去最好的本地餐厅。',
      q2B: '🏮 夜市 & 夜景',
      q2BSub: '我想看城市夜景和街边小吃。',
      complete: '完成！欢迎来到您的首尔。',
      resultTitle: '您的旅行风格',
      goHome: '返回首页',
    },
    myPage: {
      title: '设置',
      profile: '个人资料',
      guestUser: '旅行者',
      guestEmail: '登录以个性化',
      language: '语言',
      theme: '主题',
      themeLight: '浅色模式',
      themeDark: '深色模式',
      notifications: '通知',
      notificationsDesc: '接收实时更新通知',
      about: '关于应用',
      version: '版本',
      privacy: '隐私政策',
      terms: '服务条款',
      langNames: {
        ko: '한국어',
        en: 'English',
        ja: '日本語',
        zh: '中文',
      },
    },
  },
} as const;

export type Translations = typeof TRANSLATIONS['ko'];

interface AppContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  theme: Theme;
  toggleTheme: () => void;
  t: Translations;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      return (localStorage.getItem('lf_lang') as Lang) || 'ko';
    } catch {
      return 'ko';
    }
  });

  const [theme, setTheme] = useState<Theme>(() => {
    try {
      return (localStorage.getItem('lf_theme') as Theme) || 'dark';
    } catch {
      return 'dark';
    }
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem('lf_lang', l); } catch {}
  };

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('lf_theme', next); } catch {}
      return next;
    });
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Apply initial theme on mount
  useEffect(() => {
    const saved = localStorage.getItem('lf_theme') as Theme || 'dark';
    if (saved === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const t = TRANSLATIONS[lang] as Translations;

  return (
    <AppContext.Provider value={{ lang, setLang, theme, toggleTheme, t }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
