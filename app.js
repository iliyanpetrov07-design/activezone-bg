/* ==========================================================================
   ActiveZone D2C Web Store & Real GA4 / GTM Tracking Engine (app.js)
   - All prices in EUR (€)
   - Free Shipping Threshold: €50.00
   - 4 Storefront Departments -> 10 Sports + 11th Supplements Pillar (40 SKUs)
   - Real Google Analytics 4 gtag('event', ...) + window.dataLayer.push(...)
   ========================================================================== */

const FREE_SHIPPING_THRESHOLD_EUR = 50.00;
const STANDARD_SHIPPING_EUR = 4.50;
const STORAGE_KEY_CATALOG = 'activezone_catalog_v3';
const STORAGE_KEY_GA4_ID = 'activezone_ga4_id_v2';
const DEFAULT_GA4_ID = 'G-8LKT5NYVJC';

window.dataLayer = window.dataLayer || [];
function gtag() {
  window.dataLayer.push(arguments);
}

// Clean SVG Icons by Sport / Department (Replacing Emojis per ui-ux-pro-max)
const SVG_ICONS = {
  running: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z"/><path d="M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z"/></svg>`,
  fitness: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6.5 6.5 11 11"/><path d="m21 21-1-1"/><path d="m3 3 1 1"/><path d="m18 22 4-4"/><path d="m2 6 4-4"/><path d="m3 10 7-7"/><path d="m14 21 7-7"/></svg>`,
  yoga: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="5" r="2"/><path d="m6 20 6-6 6 6"/><path d="m6 12 6 2 6-2"/></svg>`,
  outdoor: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>`,
  cycling: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18.5" cy="17.5" r="3.5"/><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="15" cy="5" r="1"/><path d="M12 17.5V14l-3-3 4-3 2 3h2"/></svg>`,
  swimming: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12c1.5-1.5 3.5-1.5 5 0s3.5 1.5 5 0 3.5-1.5 5 0 3.5 1.5 5 0"/><path d="M2 18c1.5-1.5 3.5-1.5 5 0s3.5 1.5 5 0 3.5-1.5 5 0 3.5 1.5 5 0"/><path d="M2 6c1.5-1.5 3.5-1.5 5 0s3.5 1.5 5 0 3.5-1.5 5 0 3.5 1.5 5 0"/></svg>`,
  football: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polygon points="12 7 16 10 14.5 15 9.5 15 8 10 12 7"/></svg>`,
  tennis: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M7 7c2.5 2.5 5.5 2.5 8 0"/></svg>`,
  basketball: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M4.93 4.93c4.5 4.5 9.64 4.5 14.14 0"/><path d="M4.93 19.07c4.5-4.5 9.64-4.5 14.14 0"/><line x1="2" y1="12" x2="22" y2="12"/></svg>`,
  combat: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  supplements: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/></svg>`,
  all: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`
};

function getSportSvg(sportId) {
  return SVG_ICONS[sportId] || SVG_ICONS.running;
}

// 4 Storefront Departments
const DEPARTMENTS = [
  {
    id: 'dept-1',
    name: 'Conditioning & Studio',
    roleTag: 'Основен фокус',
    sportIcon: 'running',
    sports: [
      'Бягане и маратон (4)',
      'Фитнес и домашни тренировки (4)',
      'Йога, пилатес и мобилност (3)'
    ]
  },
  {
    id: 'dept-2',
    name: 'Outdoor & Endurance',
    roleTag: 'Уикенд & Сезон',
    sportIcon: 'outdoor',
    sports: [
      'Планина, хайкинг и туризъм (4)',
      'Колоездене (3)',
      'Плуване и водни спортове (3)'
    ]
  },
  {
    id: 'dept-3',
    name: 'Team, Court & Combat',
    roleTag: 'Отборни & Корт',
    sportIcon: 'football',
    sports: [
      'Футбол (4)',
      'Тенис и падел (3)',
      'Баскетбол и волейбол (3)',
      'Бойни спортове и бокс (3)'
    ]
  },
  {
    id: 'dept-4',
    name: 'Sports Nutrition & Recovery',
    roleTag: 'Възстановяване',
    sportIcon: 'supplements',
    sports: [
      'Протеини и възстановяване (3)',
      'Витамини, минерали и стави (3)'
    ]
  }
];

// 10 Sports + 11th Pillar Categories
const SPORT_CATEGORIES = [
  { id: 'all', name: 'Всички категории', deptId: 'all' },
  { id: 'running', name: 'Бягане и маратон', deptId: 'dept-1' },
  { id: 'fitness', name: 'Фитнес и Кросфит', deptId: 'dept-1' },
  { id: 'yoga', name: 'Йога и Пилатес', deptId: 'dept-1' },
  { id: 'outdoor', name: 'Планина и Хайкинг', deptId: 'dept-2' },
  { id: 'cycling', name: 'Колоездене', deptId: 'dept-2' },
  { id: 'swimming', name: 'Плуване', deptId: 'dept-2' },
  { id: 'football', name: 'Футбол', deptId: 'dept-3' },
  { id: 'tennis', name: 'Тенис и Падел', deptId: 'dept-3' },
  { id: 'basketball', name: 'Баскетбол и Волейбол', deptId: 'dept-3' },
  { id: 'combat', name: 'Бойни спортове и Бокс', deptId: 'dept-3' },
  { id: 'supplements', name: 'Добавки и Витамини', deptId: 'dept-4' }
];

// 40 Hero Products across all 10 Sports (3-4 per sport) + 11th Supplements Pillar (6 SKUs)
const DEFAULT_PRODUCTS = [
  // ================= 1. RUNNING & MARATHON (4 products) =================
  {
    id: 'AZ-RUN-01',
    name: 'Маратонки за бягане AeroStride Cushion',
    deptId: 'dept-1',
    sportId: 'running',
    sportLabel: 'Бягане и маратон',
    brandTier: 'Vetted Partner Brand',
    priceEur: 42.00,
    sageLevel: 'Ниво: Начинаещи и напреднали',
    sageSurface: 'Настилка: Асфалт и парк',
    coachTip: 'Омекотената EVA междинна подметка с 8 мм дроп поема до 35% от ударното натоварване върху коленете при бягане на асфалт.',
    isFootwear: true,
    isConsumable: false
  },
  {
    id: 'AZ-RUN-02',
    name: 'Маратонки за планинско бягане TrailPulse GTX',
    deptId: 'dept-1',
    sportId: 'running',
    sportLabel: 'Бягане и маратон',
    brandTier: 'Vetted Partner Brand',
    priceEur: 58.00,
    sageLevel: 'Ниво: Напреднали и трейл',
    sageSurface: 'Настилка: Пресечен терен',
    coachTip: 'Дълбокият 4.5 мм грайфер и подсиленият борд пазят глезена стабилен при мокри корени и каменисти спускания.',
    isFootwear: true,
    isConsumable: false
  },
  {
    id: 'AZ-RUN-03',
    name: 'Дишащ бегачески сет PaceDry (Тениска + Шорти)',
    deptId: 'dept-1',
    sportId: 'running',
    sportLabel: 'Бягане и маратон',
    brandTier: 'ActiveZone Signature Line',
    priceEur: 29.00,
    sageLevel: 'Ниво: Всички нива',
    sageSurface: 'Предназначение: Кардио и маратон',
    coachTip: 'Плоските лазерни шевове предотвратяват протриване след 5-ия километър, а материята изсъхва за под 15 минути.',
    isFootwear: false,
    isConsumable: false
  },
  {
    id: 'AZ-RUN-04',
    name: 'Бегачески колан с мека колба 500 мл & Светлоотразител',
    deptId: 'dept-1',
    sportId: 'running',
    sportLabel: 'Бягане и маратон',
    brandTier: 'ActiveZone Signature Line',
    priceEur: 16.00,
    sageLevel: 'Ниво: За начинаещи',
    sageSurface: 'Предназначение: Градско тичане',
    coachTip: 'Прилепва плътно без подскачане около кръста — побира телефон, ключове и 500 мл вода с електролити.',
    isFootwear: false,
    isConsumable: false
  },

  // ================= 2. GYM, CROSSFIT & HOME FITNESS (4 products) =================
  {
    id: 'AZ-GYM-01',
    name: 'Комплект текстилни и латексови фитнес ластици (5 нива)',
    deptId: 'dept-1',
    sportId: 'fitness',
    sportLabel: 'Фитнес и Кросфит',
    brandTier: 'ActiveZone Signature Line',
    priceEur: 19.00,
    sageLevel: 'Ниво: За начинаещи',
    sageSurface: 'Предназначение: Дом и загрявка',
    coachTip: 'Започни с лекия ластик за 5-минутна активация на раменете и глутеуса преди всяка основна серия.',
    isFootwear: false,
    isConsumable: false
  },
  {
    id: 'AZ-GYM-02',
    name: 'Дишащ тренировъчен екип DryFit Pro (Зала & Кросфит)',
    deptId: 'dept-1',
    sportId: 'fitness',
    sportLabel: 'Фитнес и Кросфит',
    brandTier: 'ActiveZone Signature Line',
    priceEur: 34.00,
    sageLevel: 'Ниво: Всички нива',
    sageSurface: 'Настилка: Фитнес зала',
    coachTip: '4-посочната еластичност запазва кройката си без отпускане в коленете и раменете дори след десетки пранета.',
    isFootwear: false,
    isConsumable: false
  },
  {
    id: 'AZ-GYM-03',
    name: 'Чугунена пудовка с неопреново покритие IronCore 12 кг',
    deptId: 'dept-1',
    sportId: 'fitness',
    sportLabel: 'Фитнес и Кросфит',
    brandTier: 'ActiveZone Signature Line',
    priceEur: 36.00,
    sageLevel: 'Ниво: Средно и напреднало',
    sageSurface: 'Предназначение: Сила у дома',
    coachTip: 'Широката матова дръжка позволява сигурен двуръчен захват при суингове и гоблет клекове, а неопренът пази паркета.',
    isFootwear: false,
    isConsumable: false
  },
  {
    id: 'AZ-GYM-04',
    name: 'Трислоен шейкър ProMix 700 мл с отделение за доза протеин',
    deptId: 'dept-1',
    sportId: 'fitness',
    sportLabel: 'Фитнес и Кросфит',
    brandTier: 'ActiveZone Signature Line',
    priceEur: 11.00,
    sageLevel: 'Ниво: Всички нива',
    sageSurface: 'Предназначение: След тренировка',
    coachTip: 'Долната капсула на винт държи протеина и магнезия сухи до точния момент след края на тренировката.',
    isFootwear: false,
    isConsumable: false
  },

  // ================= 3. YOGA, PILATES & MOBILITY (3 products) =================
  {
    id: 'AZ-YOG-01',
    name: 'Неплъзгаща постелка за йога и пилатес GripFlow (6 мм)',
    deptId: 'dept-1',
    sportId: 'yoga',
    sportLabel: 'Йога и Пилатес',
    brandTier: 'ActiveZone Signature Line',
    priceEur: 26.00,
    sageLevel: 'Ниво: За начинаещи',
    sageSurface: 'Настилка: Студио и паркет',
    coachTip: 'Двуслойната TPE текстура спира плъзгането на дланите, а дебелината от 6 мм пази коленете и китките при планк.',
    isFootwear: false,
    isConsumable: false
  },
  {
    id: 'AZ-YOG-02',
    name: 'Комплект коркови блокчета (2 бр.) + Памучен ремък за разтягане',
    deptId: 'dept-1',
    sportId: 'yoga',
    sportLabel: 'Йога и Пилатес',
    brandTier: 'ActiveZone Signature Line',
    priceEur: 21.00,
    sageLevel: 'Ниво: За начинаещи',
    sageSurface: 'Предназначение: Мобилност',
    coachTip: 'Скъсяват дистанцията до пода при сковани задни бедра, за да запазиш гърба изправен без напрежение в кръста.',
    isFootwear: false,
    isConsumable: false
  },
  {
    id: 'AZ-YOG-03',
    name: 'Релефен фоумролер за миофасциален масаж DeepRelease',
    deptId: 'dept-1',
    sportId: 'yoga',
    sportLabel: 'Йога и Пилатес',
    brandTier: 'ActiveZone Signature Line',
    priceEur: 18.00,
    sageLevel: 'Ниво: Всички нива',
    sageSurface: 'Предназначение: Възстановяване',
    coachTip: 'Само 5 минути размачкване на прасците и бедрата вечер подобряват кръвообращението и намаляват мускулната треска.',
    isFootwear: false,
    isConsumable: false
  },

  // ================= 4. OUTDOOR, HIKING & TRAIL (4 products) =================
  {
    id: 'AZ-OUT-01',
    name: 'Водоустойчиви туристически обувки TrailShield Mid',
    deptId: 'dept-2',
    sportId: 'outdoor',
    sportLabel: 'Планина и Хайкинг',
    brandTier: 'Vetted Partner Brand',
    priceEur: 64.00,
    sageLevel: 'Ниво: Всички нива',
    sageSurface: 'Настилка: Планински пътеки',
    coachTip: 'Високият профил обхваща глезена при спускане с раница, а дишащата мембрана пази стъпалото сухо при роса и кал.',
    isFootwear: true,
    isConsumable: false
  },
  {
    id: 'AZ-OUT-02',
    name: 'Ергономична туристическа раница PeakPack 28L с вентилиран гръб',
    deptId: 'dept-2',
    sportId: 'outdoor',
    sportLabel: 'Планина и Хайкинг',
    brandTier: 'ActiveZone Signature Line',
    priceEur: 38.00,
    sageLevel: 'Ниво: Всички нива',
    sageSurface: 'Предназначение: Уикенд преходи',
    coachTip: 'Закопчай кръстния колан на нивото на хълбоците — така прехвърляш 60% от тежестта от раменете към краката.',
    isFootwear: false,
    isConsumable: false
  },
  {
    id: 'AZ-OUT-03',
    name: 'Сгъваеми алуминиеви щеки за трекинг AlpineLock (Чифт)',
    deptId: 'dept-2',
    sportId: 'outdoor',
    sportLabel: 'Планина и Хайкинг',
    brandTier: 'ActiveZone Signature Line',
    priceEur: 27.00,
    sageLevel: 'Ниво: За начинаещи',
    sageSurface: 'Настилка: Стръмен терен',
    coachTip: 'Щеките свалят до 25% от тежестта върху коленните стави при стръмно слизане от Витоша, Рила или Пирин.',
    isFootwear: false,
    isConsumable: false
  },
  {
    id: 'AZ-OUT-04',
    name: 'Ветроустойчиво и водоотблъскващо яке StormShell Light',
    deptId: 'dept-2',
    sportId: 'outdoor',
    sportLabel: 'Планина и Хайкинг',
    brandTier: 'ActiveZone Signature Line',
    priceEur: 46.00,
    sageLevel: 'Ниво: Любители и напреднали',
    sageSurface: 'Предназначение: Вятър и дъжд',
    coachTip: 'Сгъва се в собствен джоб с размер на юмрук (220 г), за да е винаги в раницата ти при промяна на времето.',
    isFootwear: false,
    isConsumable: false
  },

  // ================= 5. CYCLING (3 products) =================
  {
    id: 'AZ-CYC-01',
    name: 'Колоездачен клин с 3D гел подложка и дишащо трико AeroRide',
    deptId: 'dept-2',
    sportId: 'cycling',
    sportLabel: 'Колоездене',
    brandTier: 'ActiveZone Signature Line',
    priceEur: 44.00,
    sageLevel: 'Ниво: Всички нива',
    sageSurface: 'Настилка: Шосе и MTB',
    coachTip: 'Анатомичната гел вложка обира вибрациите от неравен асфалт и черни пътища за комфорт над 2 часа в седлото.',
    isFootwear: false,
    isConsumable: false
  },
  {
    id: 'AZ-CYC-02',
    name: 'Вентилирана каска за колоездене VeloShield MIPS-Style',
    deptId: 'dept-2',
    sportId: 'cycling',
    sportLabel: 'Колоездене',
    brandTier: 'Vetted Partner Brand',
    priceEur: 39.00,
    sageLevel: 'Ниво: Всички нива',
    sageSurface: 'Предназначение: Градско и шосе',
    coachTip: 'Задната ротационна катарама позволява прецизно напасване с една ръка, а 18-те отвора охлаждат главата при катерене.',
    isFootwear: false,
    isConsumable: false
  },
  {
    id: 'AZ-CYC-03',
    name: 'Колоездачни ръкавици с гел възглавнички + Комплект LED светлини',
    deptId: 'dept-2',
    sportId: 'cycling',
    sportLabel: 'Колоездене',
    brandTier: 'ActiveZone Signature Line',
    priceEur: 23.00,
    sageLevel: 'Ниво: За начинаещи',
    sageSurface: 'Предназначение: Сцепление и видимост',
    coachTip: 'Гел зоните на дланта предпазват от изтръпване на пръстите при дълги маршрути, а USB светлините те правят видим от 300 м.',
    isFootwear: false,
    isConsumable: false
  },

  // ================= 6. SWIMMING & WATER SPORTS (3 products) =================
  {
    id: 'AZ-SWM-01',
    name: 'Очила за плуване Anti-Fog HydroClear + Силиконова шапка',
    deptId: 'dept-2',
    sportId: 'swimming',
    sportLabel: 'Плуване',
    brandTier: 'ActiveZone Signature Line',
    priceEur: 22.00,
    sageLevel: 'Ниво: Всички нива',
    sageSurface: 'Настилка: Басейн и открити води',
    coachTip: 'Не бърши вътрешната страна на стъклата с пръсти — само ги изплаквай със студена вода, за да запазиш Anti-Fog покритието.',
    isFootwear: false,
    isConsumable: false
  },
  {
    id: 'AZ-SWM-02',
    name: 'Бързосъхнеща микрофибърна кърпа XL + Непромокаема торба',
    deptId: 'dept-2',
    sportId: 'swimming',
    sportLabel: 'Плуване',
    brandTier: 'ActiveZone Signature Line',
    priceEur: 19.00,
    sageLevel: 'Ниво: За начинаещи',
    sageSurface: 'Предназначение: Басейн и зала',
    coachTip: 'Попива 4 пъти собственото си тегло и заема 70% по-малко място в спортния сак спрямо стандартна хавлиена кърпа.',
    isFootwear: false,
    isConsumable: false
  },
  {
    id: 'AZ-SWM-03',
    name: 'Тренировъчна дъска KickBoard & Педълси за техника на загребване',
    deptId: 'dept-2',
    sportId: 'swimming',
    sportLabel: 'Плуване',
    brandTier: 'ActiveZone Signature Line',
    priceEur: 25.00,
    sageLevel: 'Ниво: Начинаещи и средно ниво',
    sageSurface: 'Предназначение: Техника в басейн',
    coachTip: 'Изолира работата на краката или раменния пояс, за да изчистиш техниката си на кроул без умора в цялото тяло.',
    isFootwear: false,
    isConsumable: false
  },

  // ================= 7. FOOTBALL (4 products) =================
  {
    id: 'AZ-FTB-01',
    name: 'Футболни стоножки и бутонки PitchControl TF/FG',
    deptId: 'dept-3',
    sportId: 'football',
    sportLabel: 'Футбол',
    brandTier: 'Vetted Partner Brand',
    priceEur: 48.00,
    sageLevel: 'Ниво: Всички нива',
    sageSurface: 'Настилка: Изкуствена трева (TF) и терен',
    coachTip: 'Мулти-шип подметката дава стабилно сцепление на мини-футболни игрища без блокиране на коляното при рязък завой.',
    isFootwear: true,
    isConsumable: false
  },
  {
    id: 'AZ-FTB-02',
    name: 'Термослепена футболна топка MatchPro FIFA Basic (Размер 5)',
    deptId: 'dept-3',
    sportId: 'football',
    sportLabel: 'Футбол',
    brandTier: 'Vetted Partner Brand',
    priceEur: 28.00,
    sageLevel: 'Ниво: Всички нива',
    sageSurface: 'Настилка: Естествена и изкуствена трева',
    coachTip: 'Безшевната конструкция не поема вода при мокър терен и запазва предвидима траектория през целия мач.',
    isFootwear: false,
    isConsumable: false
  },
  {
    id: 'AZ-FTB-03',
    name: 'Дишащ футболен екип StrikerSet + Противоплъзгащи калцуни',
    deptId: 'dept-3',
    sportId: 'football',
    sportLabel: 'Футбол',
    brandTier: 'ActiveZone Signature Line',
    priceEur: 31.00,
    sageLevel: 'Ниво: Любители и отбори',
    sageSurface: 'Предназначение: Мачове и тренировки',
    coachTip: 'Силиконовите зони по стъпалото на калцуните фиксират крака вътре в бутонката и предотвратяват пришки при спринт.',
    isFootwear: false,
    isConsumable: false
  },
  {
    id: 'AZ-FTB-04',
    name: 'Олекотени карбонови кори за пищял ShieldLite с ръкав',
    deptId: 'dept-3',
    sportId: 'football',
    sportLabel: 'Футбол',
    brandTier: 'ActiveZone Signature Line',
    priceEur: 17.00,
    sageLevel: 'Ниво: Всички нива',
    sageSurface: 'Предназначение: Защита на терена',
    coachTip: 'Компресионният ръкав държи кората неподвижна без нужда от допълнително облепяне с тиксо.',
    isFootwear: false,
    isConsumable: false
  },

  // ================= 8. TENNIS & PADEL (3 products) =================
  {
    id: 'AZ-TNP-01',
    name: 'Карбонова ракета за падел CourtMaster Control (Round Shape)',
    deptId: 'dept-3',
    sportId: 'tennis',
    sportLabel: 'Тенис и Падел',
    brandTier: 'Vetted Partner Brand',
    priceEur: 69.00,
    sageLevel: 'Ниво: Начинаещи и средно ниво',
    sageSurface: 'Настилка: Падел корт',
    coachTip: 'Кръглата форма с централен баланс разширява „sweet spot“ зоната и пази лакътя от вибрации.',
    isFootwear: false,
    isConsumable: false
  },
  {
    id: 'AZ-TNP-02',
    name: 'Маратонки за тенис и падел корт Baseline Grip All-Court',
    deptId: 'dept-3',
    sportId: 'tennis',
    sportLabel: 'Тенис и Падел',
    brandTier: 'Vetted Partner Brand',
    priceEur: 56.00,
    sageLevel: 'Ниво: Всички нива',
    sageSurface: 'Настилка: Хард, клей и падел корт',
    coachTip: 'Страничният стабилизатор на подметката пази глезена от обръщане при резки странични спирания на корта.',
    isFootwear: true,
    isConsumable: false
  },
  {
    id: 'AZ-TNP-03',
    name: 'Пакет 6 бр. абсорбиращи овъргрипове ProTack + Туба 3 топки',
    deptId: 'dept-3',
    sportId: 'tennis',
    sportLabel: 'Тенис и Падел',
    brandTier: 'ActiveZone Signature Line',
    priceEur: 15.00,
    sageLevel: 'Ниво: Всички нива',
    sageSurface: 'Предназначение: Сух захват на корта',
    coachTip: 'Сменяй овъргрипа на всеки 4–5 часа игра — сухият захват намалява стискането на дръжката и риска от „тенис лакът“.',
    isFootwear: false,
    isConsumable: false
  },

  // ================= 9. BASKETBALL & VOLLEYBALL (3 products) =================
  {
    id: 'AZ-BVO-01',
    name: 'Протекторни наколенки за волейбол и зала ImpactGuard Gel',
    deptId: 'dept-3',
    sportId: 'basketball',
    sportLabel: 'Баскетбол и Волейбол',
    brandTier: 'ActiveZone Signature Line',
    priceEur: 18.00,
    sageLevel: 'Ниво: Всички нива',
    sageSurface: 'Настилка: Паркет и спортна зала',
    coachTip: 'Високоплътната гел-пяна омекотява плонжовете на твърд паркет, без да ограничава сгъването при отскок.',
    isFootwear: false,
    isConsumable: false
  },
  {
    id: 'AZ-BVO-02',
    name: 'Обувки за баскетбол и волейбол JumpLock Indoor Court',
    deptId: 'dept-3',
    sportId: 'basketball',
    sportLabel: 'Баскетбол и Волейбол',
    brandTier: 'Vetted Partner Brand',
    priceEur: 62.00,
    sageLevel: 'Ниво: Напреднали и клубни',
    sageSurface: 'Настилка: Паркет (Non-Marking)',
    coachTip: 'Non-marking каучуковата подметка със спираловидна шарка осигурява мигновено спиране и омекотяване след висок отскок.',
    isFootwear: true,
    isConsumable: false
  },
  {
    id: 'AZ-BVO-03',
    name: 'Компресионни ръкави за стрелба и посрещане + Спортен накитник',
    deptId: 'dept-3',
    sportId: 'basketball',
    sportLabel: 'Баскетбол и Волейбол',
    brandTier: 'ActiveZone Signature Line',
    priceEur: 16.00,
    sageLevel: 'Ниво: За начинаещи',
    sageSurface: 'Предназначение: Волейбол и баскетбол',
    coachTip: 'Намаляват зачервяването на предмишниците при посрещане във волейбола и поддържат мускула топъл между геймовете.',
    isFootwear: false,
    isConsumable: false
  },

  // ================= 10. COMBAT SPORTS & BOXING (3 products) =================
  {
    id: 'AZ-CMB-01',
    name: 'Боксови ръкавици ProStrike 12oz + Памучни бинтове (3.5 м)',
    deptId: 'dept-3',
    sportId: 'combat',
    sportLabel: 'Бойни спортове и Бокс',
    brandTier: 'ActiveZone Signature Line',
    priceEur: 39.00,
    sageLevel: 'Ниво: Начинаещи и средно ниво',
    sageSurface: 'Предназначение: Чувал, лапи и спаринг',
    coachTip: 'Винаги навивай 3.5-метровите бинтове преди ръкавиците — те фиксират малките костици на дланта и китката при удар.',
    isFootwear: false,
    isConsumable: false
  },
  {
    id: 'AZ-CMB-02',
    name: 'Скоростно въже за скачане със стоманени лагери SpeedRope Pro',
    deptId: 'dept-3',
    sportId: 'combat',
    sportLabel: 'Бойни спортове и Бокс',
    brandTier: 'ActiveZone Signature Line',
    priceEur: 14.00,
    sageLevel: 'Ниво: Всички нива',
    sageSurface: 'Предназначение: Кардио и работа с крака',
    coachTip: '3 рунда по 3 минути на въже преди тренировка загряват глезените и изграждат ритъм и координация.',
    isFootwear: false,
    isConsumable: false
  },
  {
    id: 'AZ-CMB-03',
    name: 'Двуслоен протектор за уста + Протектори за пищял и стъпало',
    deptId: 'dept-3',
    sportId: 'combat',
    sportLabel: 'Бойни спортове и Бокс',
    brandTier: 'ActiveZone Signature Line',
    priceEur: 33.00,
    sageLevel: 'Ниво: Начинаещи и спаринг',
    sageSurface: 'Предназначение: Кикбокс и ММА',
    coachTip: 'Термо-оформящият се гел слой прилепва точно по зъбите за свободно дишане, а протекторите пазят пищяла при лоу-кик.',
    isFootwear: false,
    isConsumable: false
  },

  // ================= 11. SUPPLEMENTS, VITAMINS & MINERALS (6 products) =================
  {
    id: 'AZ-SUP-01',
    name: 'Магнезий Цитрат + Бисглицинат & Витамин B6 (60 капс. / 30 дни)',
    deptId: 'dept-4',
    sportId: 'supplements',
    sportLabel: 'Добавки и Витамини',
    brandTier: 'ActiveZone Signature Line',
    priceEur: 12.00,
    sageLevel: 'Ниво: Ежедневен прием',
    sageSurface: 'Предназначение: Срещу крампи и за сън',
    coachTip: 'Приемай 2 капсули 45 минути преди сън — хелатната форма Бисглицинат отпуска нервната система и спира нощните схващания.',
    isFootwear: false,
    isConsumable: true
  },
  {
    id: 'AZ-SUP-02',
    name: 'Електролитна формула HydroBoost Без Захар (30 дози)',
    deptId: 'dept-4',
    sportId: 'supplements',
    sportLabel: 'Добавки и Витамини',
    brandTier: 'ActiveZone Signature Line',
    priceEur: 12.00,
    sageLevel: 'Ниво: Всички нива',
    sageSurface: 'Предназначение: Хидратация и издръжливост',
    coachTip: 'Разтвори 1 мерителна лъжичка в 500 мл вода по време на тренировка над 45 минути, за да избегнеш спад в енергията.',
    isFootwear: false,
    isConsumable: true
  },
  {
    id: 'AZ-SUP-03',
    name: 'Чист Суроватъчен Протеин Whey Isolate & Concentrate (1 кг / 33 дози)',
    deptId: 'dept-4',
    sportId: 'supplements',
    sportLabel: 'Добавки и Витамини',
    brandTier: 'ActiveZone Signature Line',
    priceEur: 28.00,
    sageLevel: 'Ниво: Всички нива',
    sageSurface: 'Предназначение: Мускулно възстановяване',
    coachTip: '1 доза (30 г = 23 г чист белтък) до 30 минути след тренировка спира мускулния разпад без подуване и без добавена захар.',
    isFootwear: false,
    isConsumable: true
  },
  {
    id: 'AZ-SUP-04',
    name: '100% Микронизиран Креатин Монохидрат (300 г / 60 дози)',
    deptId: 'dept-4',
    sportId: 'supplements',
    sportLabel: 'Добавки и Витамини',
    brandTier: 'ActiveZone Signature Line',
    priceEur: 16.00,
    sageLevel: 'Ниво: Силови и корт спортове',
    sageSurface: 'Предназначение: Сила и експлозивност',
    coachTip: 'Приемай по 5 г всеки ден по едно и също време с чаша вода — най-изследваната и доказана добавка за силов прогрес.',
    isFootwear: false,
    isConsumable: true
  },
  {
    id: 'AZ-SUP-05',
    name: 'Хидролизиран Колаген Пептиди + Глюкозамин и Витамин C',
    deptId: 'dept-4',
    sportId: 'supplements',
    sportLabel: 'Добавки и Витамини',
    brandTier: 'ActiveZone Signature Line',
    priceEur: 22.00,
    sageLevel: 'Ниво: Бегачи и планинари',
    sageSurface: 'Предназначение: Защита на стави и сухожилия',
    coachTip: 'Витамин C във формулата активира естествения синтез на колаген за по-здрави коленни връзки при бягане и футбол.',
    isFootwear: false,
    isConsumable: true
  },
  {
    id: 'AZ-SUP-06',
    name: 'Ежедневен Витаминен Стак: Витамин D3+K2 + Омега-3 (1000 мг)',
    deptId: 'dept-4',
    sportId: 'supplements',
    sportLabel: 'Добавки и Витамини',
    brandTier: 'ActiveZone Signature Line',
    priceEur: 18.00,
    sageLevel: 'Ниво: Ежедневен прием (30 дни)',
    sageSurface: 'Предназначение: Имунитет и тонус',
    coachTip: 'Приемай със закуска или обяд — Омега-3 мастните киселини осигуряват пълно усвояване на мастноразтворимия Витамин D3.',
    isFootwear: false,
    isConsumable: true
  }
];

// 1-Click Beginner Starter Bundles ("Старт Пакети" -10%)
const STARTER_BUNDLES = [
  {
    id: 'BUNDLE-RUN-START',
    name: 'Старт Пакет „Бягане без контузии“',
    sportBadge: 'Бягане + Хидратация',
    sportId: 'running',
    regularEur: 66.00,
    bundleEur: 59.40,
    itemsText: [
      'Маратонки AeroStride Cushion (€42)',
      'Електролити HydroBoost 30 дози (€12)',
      'Магнезий Цитрат + Бисглицинат (€12)'
    ],
    coachNote: 'Омекотена подметка + електролити и магнезий срещу болки в коленете и мускулни крампи.'
  },
  {
    id: 'BUNDLE-HOME-FIT',
    name: 'Старт Пакет „Домашен Фитнес & Йога“',
    sportBadge: 'Фитнес & Йога у дома',
    sportId: 'yoga',
    regularEur: 57.00,
    bundleEur: 51.30,
    itemsText: [
      'Неплъзгаща постелка GripFlow 6 мм (€26)',
      'Комплект 5 нива фитнес ластици (€19)',
      'Магнезий Цитрат + Бисглицинат (€12)'
    ],
    coachNote: 'Всичко за 10-минутна сутрешна тренировка у дома + възстановяване вечер.'
  },
  {
    id: 'BUNDLE-PITCH-COURT',
    name: 'Старт Пакет „Терен & Корт Издръжливост“',
    sportBadge: 'Футбол, Падел и Корт',
    sportId: 'football',
    regularEur: 60.00,
    bundleEur: 54.00,
    itemsText: [
      'Футболни стоножки PitchControl TF/FG (€48)',
      'Електролитна формула HydroBoost (€12)'
    ],
    coachNote: 'Стабилно сцепление на изкуствена трева + хидратация и безплатна доставка над €50.'
  },
  {
    id: 'BUNDLE-RECOVERY-30D',
    name: 'Старт Пакет „Пълно Възстановяване (30 Дни)“',
    sportBadge: 'Добавки и Възстановяване',
    sportId: 'supplements',
    regularEur: 62.00,
    bundleEur: 55.80,
    itemsText: [
      'Суроватъчен Протеин Whey 1 кг (€28)',
      'Колаген Пептиди за стави (€22)',
      'Магнезий Цитрат + Бисглицинат (€12)'
    ],
    coachNote: 'Месечен стак: мускулен синтез след зала, защита на ставите и дълбок сън.'
  }
];

// Application State
let catalog = [];
let state = {
  selectedDept: 'all',
  selectedSport: 'all',
  selectedBrandTier: 'all',
  searchQuery: '',
  cart: [],
  appliedCoupon: '',
  activePdpProduct: null,
  selectedShoeSize: 'EU 42.5 (26.5 см + 0.5 см резерв)',
  ga4MeasurementId: localStorage.getItem(STORAGE_KEY_GA4_ID) || DEFAULT_GA4_ID,
  firedEvents: new Set()
};

function formatEur(val) {
  return `€${Number(val).toFixed(2)}`;
}

// ==========================================================================
// Real Google Analytics 4 (gtag.js) Loader & Event Dispatcher
// ==========================================================================
function initRealGA4Script(measurementId, isManualUpdate = false) {
  const cleanId = (measurementId || DEFAULT_GA4_ID).trim();
  state.ga4MeasurementId = cleanId;

  if (cleanId !== DEFAULT_GA4_ID || isManualUpdate) {
    const dynamicScriptId = `ga4-gtag-${cleanId}`;
    if (!document.getElementById(dynamicScriptId)) {
      const script = document.createElement('script');
      script.id = dynamicScriptId;
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(cleanId)}`;
      document.head.appendChild(script);
    }

    gtag('config', cleanId, {
      send_page_view: true,
      currency: 'EUR',
      debug_mode: true
    });
  }

  const idLabel = document.getElementById('active-ga4-id-label');
  if (idLabel) idLabel.textContent = cleanId;
  const idInput = document.getElementById('ga4-measurement-id-input');
  if (idInput) idInput.value = cleanId;
}

function updateGA4MeasurementId() {
  const input = document.getElementById('ga4-measurement-id-input');
  if (!input) return;
  const newId = input.value.trim() || DEFAULT_GA4_ID;
  localStorage.setItem(STORAGE_KEY_GA4_ID, newId);
  initRealGA4Script(newId, true);
  const statusEl = document.getElementById('ga4-id-save-status');
  if (statusEl) {
    statusEl.textContent = `✓ Активен GA4 ID: ${newId}`;
  }
}

function pushGA4Event(eventName, params) {
  const timestamp = new Date().toLocaleTimeString('bg-BG', { hour12: false });
  const payload = {
    event: eventName,
    ga4_property: state.ga4MeasurementId,
    timestamp,
    ...params
  };

  // 1. Push structured object to GTM window.dataLayer
  window.dataLayer.push(payload);

  // 2. Dispatch real GA4 gtag('event', ...) hit for Google Analytics Realtime / DebugView
  gtag('event', eventName, {
    ...params,
    debug_mode: true,
    send_to: state.ga4MeasurementId
  });

  state.firedEvents.add(eventName);
  renderGA4Inspector(eventName, payload, timestamp);
}

function renderGA4Inspector(eventName, payload, timestamp) {
  document.querySelectorAll('.event-chip').forEach((chip) => {
    const ev = chip.getAttribute('data-event');
    if (state.firedEvents.has(ev)) {
      chip.classList.add('fired');
    }
  });

  const countEl = document.getElementById('ga4-fired-count');
  if (countEl) {
    countEl.textContent = `${state.firedEvents.size}/5 събития отчетени`;
  }

  const stream = document.getElementById('ga4-log-stream');
  if (!stream) return;

  const placeholder = stream.querySelector('.ga4-empty-hint');
  if (placeholder) placeholder.remove();

  const entry = document.createElement('div');
  entry.className = 'ga4-log-entry';

  const cleanParams = { ...payload };
  delete cleanParams.event;
  delete cleanParams.ga4_property;
  delete cleanParams.timestamp;

  entry.innerHTML = `
    <div class="log-top">
      <span>gtag('event', '${eventName}') · ${state.ga4MeasurementId}</span>
      <span>${timestamp}</span>
    </div>
    <pre>${JSON.stringify(cleanParams, null, 2)}</pre>
  `;

  stream.prepend(entry);
}

// ==========================================================================
// Load or Save Catalog
// ==========================================================================
function loadCatalog() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_CATALOG);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        catalog = parsed;
        return;
      }
    }
  } catch (e) {
    console.warn('Could not read catalog from localStorage:', e);
  }
  catalog = JSON.parse(JSON.stringify(DEFAULT_PRODUCTS));
}

function saveCatalog() {
  try {
    localStorage.setItem(STORAGE_KEY_CATALOG, JSON.stringify(catalog));
  } catch (e) {
    console.warn('Could not save catalog:', e);
  }
}

// ==========================================================================
// Render 4 Storefront Departments & 11 Sport Pills
// ==========================================================================
function renderDepartments() {
  const container = document.getElementById('departments-grid');
  if (!container) return;

  container.innerHTML = DEPARTMENTS.map((dept) => {
    const isActive = state.selectedDept === dept.id;
    const deptProductCount = catalog.filter((p) => p.deptId === dept.id).length;
    return `
      <button type="button" class="dept-card ${isActive ? 'active' : ''}" onclick="selectDepartment('${dept.id}')">
        <div>
          <div class="dept-top">
            <div class="dept-svg-box">${getSportSvg(dept.sportIcon)}</div>
            <span class="dept-role-tag">${dept.roleTag}</span>
          </div>
          <div class="dept-title">${dept.name}</div>
          <ul class="dept-sports-list">
            ${dept.sports.map((s) => `<li>${s}</li>`).join('')}
          </ul>
        </div>
        <div class="dept-footer">
          <span class="tabular-nums">${deptProductCount} продукта</span>
          <span>${isActive ? 'Активен филтър' : 'Прегледай'}</span>
        </div>
      </button>
    `;
  }).join('');
}

function renderSportPills() {
  const row = document.getElementById('sports-pills-row');
  if (!row) return;

  const visibleSports = SPORT_CATEGORIES.filter((cat) => {
    if (cat.id === 'all') return true;
    if (state.selectedDept === 'all') return true;
    return cat.deptId === state.selectedDept;
  });

  row.innerHTML = visibleSports.map((cat) => {
    const count = cat.id === 'all'
      ? (state.selectedDept === 'all'
          ? catalog.length
          : catalog.filter((p) => p.deptId === state.selectedDept).length)
      : catalog.filter((p) => p.sportId === cat.id).length;

    const isActive = state.selectedSport === cat.id;
    return `
      <button type="button" class="sport-pill ${isActive ? 'active' : ''}" onclick="selectSport('${cat.id}')">
        <span>${cat.name}</span>
        <span class="pill-count">${count}</span>
      </button>
    `;
  }).join('');
}

// ==========================================================================
// Render 1-Click Beginner Starter Bundles ("Старт Пакети" -10%)
// ==========================================================================
function renderStarterBundles() {
  const grid = document.getElementById('bundles-grid');
  if (!grid) return;

  grid.innerHTML = STARTER_BUNDLES.map((b) => `
    <article class="bundle-card">
      <div>
        <div class="bundle-tag-row">
          <span class="bundle-sport-badge">${b.sportBadge}</span>
          <span class="bundle-save-badge">-10% Пакет</span>
        </div>
        <h3 class="bundle-name">${b.name}</h3>
        <ul class="bundle-items-list">
          ${b.itemsText.map((item) => `<li>${item}</li>`).join('')}
        </ul>
        <div class="bundle-coach-note">
          <strong>Съвет от треньора:</strong> ${b.coachNote}
        </div>
      </div>
      <div class="bundle-bottom">
        <div>
          <span class="bundle-old-price">Редовна: ${formatEur(b.regularEur)}</span>
          <span class="bundle-new-price">${formatEur(b.bundleEur)}</span>
        </div>
        <button type="button" class="btn btn-orange btn-sm" onclick="addBundleToCart('${b.id}')">
          Добави пакета
        </button>
      </div>
    </article>
  `).join('');
}

// ==========================================================================
// Render Filtered Product Grid (Built-In Sage 30% UX)
// ==========================================================================
function getFilteredProducts() {
  return catalog.filter((p) => {
    if (state.selectedDept !== 'all' && p.deptId !== state.selectedDept) return false;
    if (state.selectedSport !== 'all' && p.sportId !== state.selectedSport) return false;
    if (state.selectedBrandTier !== 'all' && p.brandTier !== state.selectedBrandTier) return false;
    if (state.searchQuery.trim() !== '') {
      const q = state.searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchSport = p.sportLabel.toLowerCase().includes(q);
      const matchSurface = p.sageSurface.toLowerCase().includes(q);
      const matchTip = p.coachTip.toLowerCase().includes(q);
      return matchName || matchSport || matchSurface || matchTip;
    }
    return true;
  });
}

function renderProductsGrid() {
  const grid = document.getElementById('products-grid');
  const summary = document.getElementById('filter-count-label');
  if (!grid) return;

  const filtered = getFilteredProducts();

  if (summary) {
    summary.innerHTML = `Показани <strong class="tabular-nums">${filtered.length}</strong> от общо <strong class="tabular-nums">${catalog.length}</strong> продукта`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; background: #fff; padding: 2.5rem; border-radius: 14px; text-align: center; border: 1px solid #E2E8F0;">
        <p style="font-weight: 700; color: #0D3B66; margin-bottom: 0.75rem;">Няма намерени продукти по избраните критерии.</p>
        <button type="button" class="btn btn-navy btn-sm" onclick="resetFilters()">Покажи всички продукти</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map((p) => {
    const isSig = p.brandTier === 'ActiveZone Signature Line';
    return `
      <article class="product-card" data-sku="${p.id}">
        <div class="product-visual" onclick="openPdpModal('${p.id}')">
          <div class="product-top-badges">
            <span class="brand-tier-badge ${isSig ? 'signature' : 'partner'}">
              ${isSig ? 'ActiveZone Signature Line' : 'Vetted Partner Brand'}
            </span>
            ${p.isConsumable ? '<span class="feature-tag-pill">Чиста формула</span>' : ''}
            ${p.isFootwear ? '<span class="feature-tag-pill">СМ Калкулатор</span>' : ''}
          </div>
          <div class="product-icon-stage">
            <div class="product-svg-badge">${getSportSvg(p.sportId)}</div>
            <div>
              <div class="product-sport-label">${p.sportLabel}</div>
              <h3 class="product-title">${p.name}</h3>
            </div>
          </div>
        </div>

        <div class="product-body">
          <div>
            <div class="sage-badges-wrap">
              <span class="sage-badge">${p.sageLevel}</span>
              <span class="sage-badge surface">${p.sageSurface}</span>
            </div>
            <div class="coach-tip-preview">
              <strong>Съвет от треньора:</strong> ${p.coachTip}
            </div>
          </div>

          <div class="product-footer">
            <span class="price-eur">${formatEur(p.priceEur)}</span>
            <div class="card-btn-group">
              <button type="button" class="btn btn-outline-navy btn-sm" onclick="openPdpModal('${p.id}')">
                Детайли
              </button>
              <button type="button" class="btn btn-orange btn-sm" onclick="addToCart('${p.id}', 1)">
                Купи
              </button>
            </div>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// ==========================================================================
// Filter Handlers
// ==========================================================================
function selectDepartment(deptId) {
  state.selectedDept = state.selectedDept === deptId ? 'all' : deptId;
  state.selectedSport = 'all';
  renderDepartments();
  renderSportPills();
  renderProductsGrid();
}

function selectSport(sportId) {
  state.selectedSport = sportId;
  renderSportPills();
  renderProductsGrid();
}

function selectBrandTier(tier, btnEl) {
  state.selectedBrandTier = tier;
  document.querySelectorAll('.tier-btn').forEach((b) => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');
  renderProductsGrid();
}

function handleSearchInput(val) {
  state.searchQuery = val;
  renderProductsGrid();
}

function resetFilters() {
  state.selectedDept = 'all';
  state.selectedSport = 'all';
  state.selectedBrandTier = 'all';
  state.searchQuery = '';
  const searchInput = document.getElementById('catalog-search-input');
  if (searchInput) searchInput.value = '';
  document.querySelectorAll('.tier-btn').forEach((b, idx) => {
    b.classList.toggle('active', idx === 0);
  });
  renderDepartments();
  renderSportPills();
  renderProductsGrid();
}

// ==========================================================================
// Interactive PDP Modal (view_item + CM Foot Calculator + Clean Nutrition Seal)
// ==========================================================================
function openPdpModal(productId) {
  const product = catalog.find((p) => p.id === productId);
  if (!product) return;

  state.activePdpProduct = product;

  // Fire Real GA4 view_item event
  pushGA4Event('view_item', {
    currency: 'EUR',
    value: product.priceEur,
    items: [{
      item_id: product.id,
      item_name: product.name,
      item_category: product.sportLabel,
      item_brand: product.brandTier,
      price: product.priceEur
    }]
  });

  const content = document.getElementById('pdp-modal-content');
  const titleEl = document.getElementById('pdp-modal-title');
  if (titleEl) titleEl.textContent = product.name;

  const isSig = product.brandTier === 'ActiveZone Signature Line';

  const footwearHtml = product.isFootwear ? `
    <div class="footwear-calc-box">
      <div class="calc-header">
        <strong style="color: #0D3B66; font-size: 0.9rem;">Интерактивен СМ Калкулатор за размер (+0.5 см спортен резерв)</strong>
        <span class="exchange-badge">Безплатна замяна на размер със Спиди/Еконт</span>
      </div>
      <p style="font-size: 0.8rem; color: #525B6C; margin-bottom: 0.65rem;">
        Измери стъпалото си до стена в см. Калкулаторът автоматично добавя <strong>+0.5 см спортен резерв</strong> против притискане при бягане и рязко спиране:
      </p>
      <div class="calc-controls">
        <label for="foot-cm-slider" style="font-size: 0.82rem; font-weight: 700;">Дължина на стъпалото:</label>
        <input type="range" id="foot-cm-slider" min="22.5" max="30.0" step="0.5" value="26.5" oninput="updateShoeSizeCalc(this.value)">
        <span id="foot-cm-display" class="tabular-nums" style="font-weight: 800; color: #F95738; min-width: 65px;">26.5 см</span>
      </div>
      <div class="calc-result-banner" id="shoe-calc-result">
        <span>Стъпало <strong>26.5 см</strong> + <strong>0.5 см резерв</strong> = Стелка <strong>27.0 см</strong></span>
        <strong style="color: #0D3B66;">Препоръчителен размер: EU 42.5</strong>
      </div>
    </div>
  ` : '';

  const supplementSealHtml = product.isConsumable ? `
    <div class="nutrition-seal-box">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
        <strong style="color: #0D3B66; font-size: 0.9rem;">Гаранция за чиста формула и точен прием</strong>
        <span class="exchange-badge">30-дневен цикъл · Brevo Flow 3 (+25d Refill)</span>
      </div>
      <div class="seal-points-grid" style="grid-template-columns: repeat(2, 1fr);">
        <div class="seal-point">
          <strong>Чиста формула</strong>
          0 г скрити захари, без изкуствени пълнители и без излишен жаргон.
        </div>
        <div class="seal-point">
          <strong>Точен дневен прием</strong>
          Ясна дозировка на български език според твоя спорт и времето на тренировка.
        </div>
      </div>
    </div>
  ` : '';

  content.innerHTML = `
    <div class="pdp-top-grid">
      <div class="pdp-visual-box">
        <span class="brand-tier-badge ${isSig ? 'signature' : 'partner'}">
          ${isSig ? 'ActiveZone Signature Line' : '100% Original Vetted Partner Brand'}
        </span>
        <div class="pdp-svg-stage">${getSportSvg(product.sportId)}</div>
        <div style="font-size: 0.78rem; font-weight: 600; color: #525B6C;">${product.sportLabel} · SKU: ${product.id}</div>
      </div>

      <div>
        <div class="sage-badges-wrap" style="margin-bottom: 0.75rem;">
          <span class="sage-badge">${product.sageLevel}</span>
          <span class="sage-badge surface">${product.sageSurface}</span>
        </div>

        <div style="margin-bottom: 0.85rem;">
          <span class="tabular-nums" style="font-family: var(--font-heading); font-size: 1.75rem; font-weight: 800; color: #0D3B66;">
            ${formatEur(product.priceEur)}
          </span>
        </div>

        <div class="coach-advice-box">
          <div class="coach-advice-title">Съвет от треньора</div>
          <p style="font-size: 0.88rem; color: #1D1E2C;">„${product.coachTip}“</p>
        </div>

        <div style="font-size: 0.82rem; color: #15803D; font-weight: 600; margin-bottom: 1rem;">
          ✓ Доставка 24–48 ч. до Спиди и Еконт с Преглед и Тест<br>
          ✓ Безплатна доставка за поръчки над €50.00
        </div>

        <button type="button" class="btn btn-orange" style="width: 100%;" onclick="addToCart('${product.id}', 1); document.getElementById('pdp-dialog').close();">
          Добави в количката — ${formatEur(product.priceEur)}
        </button>
      </div>
    </div>

    ${footwearHtml}
    ${supplementSealHtml}

    <div class="ask-coach-bar">
      <div>
        <strong style="font-size: 0.85rem; color: #0D3B66;">Имаш въпрос за размер или съчетаване?</strong>
        <div style="font-size: 0.76rem; color: #525B6C;">Директна консултация с треньор от екипа на ActiveZone</div>
      </div>
      <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
        <button type="button" class="btn btn-navy btn-sm" onclick="triggerCoachAdvisory('Instagram DM (@activezonebg)', '${product.name}')">
          Попитай Треньора в IG DM
        </button>
        <button type="button" class="btn btn-cyan btn-sm" onclick="triggerCoachAdvisory('Viber Консултация', '${product.name}')">
          Попитай във Viber
        </button>
      </div>
    </div>
    <div id="coach-advisory-feedback" style="display:none; margin-top:0.65rem; padding:0.7rem 0.9rem; background:#F0FDF4; border:1px solid #BBF7D0; border-radius:8px; font-size:0.8rem; color:#15803D; font-weight:600;"></div>
  `;

  const dialog = document.getElementById('pdp-dialog');
  if (dialog) dialog.showModal();
}

function updateShoeSizeCalc(cmVal) {
  const cm = parseFloat(cmVal);
  const totalInsole = (cm + 0.5).toFixed(1);
  const euMap = {
    '23.0': 'EU 36.5',
    '23.5': 'EU 37.5',
    '24.0': 'EU 38',
    '24.5': 'EU 39',
    '25.0': 'EU 40',
    '25.5': 'EU 40.5',
    '26.0': 'EU 41',
    '26.5': 'EU 42',
    '27.0': 'EU 42.5',
    '27.5': 'EU 43',
    '28.0': 'EU 44',
    '28.5': 'EU 44.5',
    '29.0': 'EU 45',
    '29.5': 'EU 46',
    '30.0': 'EU 46.5',
    '30.5': 'EU 47'
  };
  const recommendedEu = euMap[totalInsole] || 'EU 42';
  state.selectedShoeSize = `${recommendedEu} (${cm.toFixed(1)} см + 0.5 см резерв)`;

  const disp = document.getElementById('foot-cm-display');
  const res = document.getElementById('shoe-calc-result');
  if (disp) disp.textContent = `${cm.toFixed(1)} см`;
  if (res) {
    res.innerHTML = `
      <span>Стъпало <strong>${cm.toFixed(1)} см</strong> + <strong>0.5 см резерв</strong> = Стелка <strong>${totalInsole} см</strong></span>
      <strong style="color: #0D3B66;">Препоръчителен размер: ${recommendedEu}</strong>
    `;
  }
}

function triggerCoachAdvisory(channel, productName) {
  const box = document.getElementById('coach-advisory-feedback');
  if (!box) return;
  box.style.display = 'block';
  box.textContent = `Готово запитване за ${channel}: „Здравейте, интересувам се от ${productName} — подходящ ли е за моето ниво и настилка?“`;
}

// ==========================================================================
// Cart & Bulgarian Checkout Engine (€50 Free Shipping Bar + €12 Cross-Sell)
// ==========================================================================
function addToCart(productId, qty = 1) {
  const product = catalog.find((p) => p.id === productId);
  if (!product) return;

  const existing = state.cart.find((item) => item.id === product.id);
  if (existing) {
    existing.quantity += qty;
  } else {
    state.cart.push({
      id: product.id,
      name: product.name,
      sportLabel: product.sportLabel,
      priceEur: product.priceEur,
      quantity: qty,
      isConsumable: product.isConsumable
    });
  }

  pushGA4Event('add_to_cart', {
    currency: 'EUR',
    value: Number((product.priceEur * qty).toFixed(2)),
    items: [{
      item_id: product.id,
      item_name: product.name,
      item_category: product.sportLabel,
      quantity: qty,
      price: product.priceEur
    }]
  });

  updateCartBadge();
  renderCartModal();
}

function addBundleToCart(bundleId) {
  const bundle = STARTER_BUNDLES.find((b) => b.id === bundleId);
  if (!bundle) return;

  const existing = state.cart.find((item) => item.id === bundle.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    state.cart.push({
      id: bundle.id,
      name: `${bundle.name} (-10% Старт Пакет)`,
      sportLabel: bundle.sportBadge,
      priceEur: bundle.bundleEur,
      quantity: 1,
      isConsumable: true
    });
  }

  pushGA4Event('add_to_cart', {
    currency: 'EUR',
    value: bundle.bundleEur,
    items: [{
      item_id: bundle.id,
      item_name: bundle.name,
      item_category: 'Starter Bundle (-10%)',
      quantity: 1,
      price: bundle.bundleEur
    }]
  });

  updateCartBadge();
  openCartModal();
}

function changeCartQty(itemId, delta) {
  const idx = state.cart.findIndex((i) => i.id === itemId);
  if (idx === -1) return;
  state.cart[idx].quantity += delta;
  if (state.cart[idx].quantity <= 0) {
    state.cart.splice(idx, 1);
  }
  updateCartBadge();
  renderCartModal();
}

function getCartTotals() {
  const subtotalEur = state.cart.reduce((sum, i) => sum + i.priceEur * i.quantity, 0);
  let discountRate = 0;
  if (state.appliedCoupon === 'WELCOME10') discountRate = 0.10;
  if (state.appliedCoupon === 'DAN15' || state.appliedCoupon === 'SYLVIA15') discountRate = 0.15;

  const discountEur = subtotalEur * discountRate;
  const discountedSubtotal = subtotalEur - discountEur;
  const freeShippingUnlocked = discountedSubtotal >= FREE_SHIPPING_THRESHOLD_EUR || discountedSubtotal === 0;
  const shippingEur = freeShippingUnlocked ? 0 : STANDARD_SHIPPING_EUR;
  const totalEur = discountedSubtotal + shippingEur;
  const hasConsumable = state.cart.some((i) => i.isConsumable);

  return {
    subtotalEur,
    discountEur,
    discountedSubtotal,
    freeShippingUnlocked,
    shippingEur,
    totalEur,
    hasConsumable
  };
}

function updateCartBadge() {
  const totalCount = state.cart.reduce((sum, i) => sum + i.quantity, 0);
  const { discountedSubtotal } = getCartTotals();
  const badge = document.getElementById('header-cart-count');
  const sumLabel = document.getElementById('header-cart-sum');
  if (badge) badge.textContent = totalCount;
  if (sumLabel) sumLabel.textContent = formatEur(discountedSubtotal);
}

function applyPromoCode() {
  const input = document.getElementById('promo-code-input');
  const msg = document.getElementById('promo-feedback-msg');
  if (!input) return;

  const code = input.value.trim().toUpperCase();
  if (code === 'WELCOME10' || code === 'DAN15' || code === 'SYLVIA15') {
    state.appliedCoupon = code;
    if (msg) {
      msg.style.color = '#15803D';
      msg.textContent = `Код ${code} е приложен успешно.`;
    }
  } else {
    state.appliedCoupon = '';
    if (msg) {
      msg.style.color = '#B91C1C';
      msg.textContent = 'Невалиден код. Използвай WELCOME10 (-10%), DAN15 или SYLVIA15 (-15%).';
    }
  }
  updateCartBadge();
  renderCartModal();
}

function openCartModal() {
  renderCartModal();
  const dialog = document.getElementById('cart-dialog');
  if (dialog && !dialog.open) dialog.showModal();
}

function renderCartModal() {
  const container = document.getElementById('cart-modal-body');
  if (!container) return;

  const {
    subtotalEur,
    discountEur,
    discountedSubtotal,
    freeShippingUnlocked,
    shippingEur,
    totalEur,
    hasConsumable
  } = getCartTotals();

  const remainingForFreeShip = Math.max(0, FREE_SHIPPING_THRESHOLD_EUR - discountedSubtotal);
  const progressPct = Math.min(100, (discountedSubtotal / FREE_SHIPPING_THRESHOLD_EUR) * 100);

  const showCrossSell = remainingForFreeShip > 0 || !hasConsumable;
  const crossSellHtml = showCrossSell ? `
    <div class="cross-sell-box">
      <div style="font-size: 0.84rem; font-weight: 700; color: #0D3B66;">
        ${remainingForFreeShip > 0
          ? `Добави добавка за €12.00 и отключи БЕЗПЛАТНА доставка над €50.00:`
          : `Допълни поръчката си с добавка за възстановяване:`}
      </div>
      <div class="cross-sell-items">
        <div class="cross-sell-pill">
          <span><strong>Магнезий Цитрат + B6</strong> (€12.00)</span>
          <button type="button" class="btn btn-orange btn-sm" onclick="addToCart('AZ-SUP-01', 1)">Добави</button>
        </div>
        <div class="cross-sell-pill">
          <span><strong>Електролити HydroBoost</strong> (€12.00)</span>
          <button type="button" class="btn btn-orange btn-sm" onclick="addToCart('AZ-SUP-02', 1)">Добави</button>
        </div>
      </div>
    </div>
  ` : '';

  if (state.cart.length === 0) {
    container.innerHTML = `
      <div class="aov-progress-card">
        <div style="font-size: 0.85rem; font-weight: 700; color: #0D3B66;">
          Безплатна доставка до Спиди и Еконт за поръчки над €50.00
        </div>
        <div class="aov-bar-track"><div class="aov-bar-fill" style="width: 0%;"></div></div>
      </div>
      <div style="text-align: center; padding: 1.75rem 0;">
        <p style="color: #525B6C; margin-bottom: 1rem;">Количката ти е празна. Добави екипировка или старт пакет, за да започнеш.</p>
        <button type="button" class="btn btn-orange" onclick="addToCart('AZ-RUN-01', 1)">
          Добави Маратонки AeroStride (€42.00)
        </button>
      </div>
      ${crossSellHtml}
    `;
    return;
  }

  container.innerHTML = `
    <div class="aov-progress-card ${freeShippingUnlocked ? 'unlocked' : ''}">
      <div style="display:flex; justify-content:space-between; align-items:center; font-size: 0.85rem; font-weight: 700;">
        <span>
          ${freeShippingUnlocked
            ? 'Поздравления! Отключи БЕЗПЛАТНА доставка до Спиди и Еконт.'
            : `Остават още ${formatEur(remainingForFreeShip)} до БЕЗПЛАТНА доставка над €50.00`}
        </span>
        <span class="tabular-nums">${Math.round(progressPct)}%</span>
      </div>
      <div class="aov-bar-track">
        <div class="aov-bar-fill" style="width: ${progressPct}%;"></div>
      </div>
    </div>

    ${crossSellHtml}

    <div style="margin-bottom: 1rem;">
      ${state.cart.map((item) => `
        <div class="cart-item-row">
          <div>
            <div style="font-weight: 700; font-size: 0.9rem; color: #0D3B66;">${item.name}</div>
            <div style="font-size: 0.76rem; color: #525B6C;">
              ${item.sportLabel} · Ед. цена: ${formatEur(item.priceEur)}
              ${item.isConsumable ? ' · <strong style="color:#15803D;">30-дневен цикъл</strong>' : ''}
            </div>
          </div>
          <div style="display:flex; align-items:center; gap:0.75rem;">
            <div class="cart-qty-controls">
              <button type="button" class="qty-btn" onclick="changeCartQty('${item.id}', -1)" aria-label="Намали количеството">−</button>
              <span class="tabular-nums" style="font-weight: 700; min-width: 18px; text-align:center;">${item.quantity}</span>
              <button type="button" class="qty-btn" onclick="changeCartQty('${item.id}', 1)" aria-label="Увеличи количеството">+</button>
            </div>
            <strong class="tabular-nums" style="min-width: 64px; text-align: right; color: #0D3B66;">
              ${formatEur(item.priceEur * item.quantity)}
            </strong>
          </div>
        </div>
      `).join('')}
    </div>

    <div style="display:flex; gap: 0.5rem; align-items:center; margin-bottom: 0.4rem;">
      <input type="text" id="promo-code-input" value="${state.appliedCoupon}" placeholder="Промо код (WELCOME10, DAN15, SYLVIA15)" style="flex:1; padding:0.55rem 0.8rem; border:1.5px solid #E2E8F0; border-radius:8px; font-size:0.85rem;">
      <button type="button" class="btn btn-navy btn-sm" onclick="applyPromoCode()">Приложи код</button>
    </div>
    <div id="promo-feedback-msg" style="font-size: 0.76rem; font-weight: 600; margin-bottom: 0.8rem;"></div>

    <div class="checkout-summary-box">
      <div class="summary-line">
        <span>Междинна сума:</span>
        <span>${formatEur(subtotalEur)}</span>
      </div>
      ${discountEur > 0 ? `
        <div class="summary-line" style="color: #15803D; font-weight: 600;">
          <span>Отстъпка (${state.appliedCoupon}):</span>
          <span>−${formatEur(discountEur)}</span>
        </div>
      ` : ''}
      <div class="summary-line">
        <span>Доставка (Спиди / Еконт с Преглед и Тест):</span>
        <span>${freeShippingUnlocked ? '<strong style="color:#15803D;">€0.00 (Безплатна)</strong>' : formatEur(shippingEur)}</span>
      </div>
      <div class="summary-line total">
        <span>Общо за плащане:</span>
        <span>${formatEur(totalEur)}</span>
      </div>

      <div style="margin-top: 1rem; padding-top: 0.9rem; border-top: 1px solid #E2E8F0;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem; flex-wrap:wrap; gap:0.5rem;">
          <strong style="font-size: 0.86rem; color: #0D3B66;">Избор на доставка и плащане</strong>
          <button type="button" class="btn btn-cyan btn-sm" onclick="triggerBeginCheckoutEvent()">
            Стъпка 1: Потвърди данни (begin_checkout)
          </button>
        </div>

        <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 0.65rem; margin-bottom: 0.85rem;">
          <div>
            <label for="checkout-courier" style="font-size:0.75rem; font-weight:700; color:#0D3B66; display:block; margin-bottom:0.2rem;">Куриер (24–48 ч.):</label>
            <select id="checkout-courier" style="width:100%; padding:0.5rem; border-radius:6px; border:1px solid #E2E8F0; font-size:0.82rem;">
              <option value="Еконтомат / Офис на Еконт">Еконтомат / Офис на Еконт (Преглед и Тест)</option>
              <option value="Спиди Автомат / Офис на Спиди">Спиди Автомат / Офис на Спиди (Преглед и Тест)</option>
              <option value="До личен адрес със Спиди/Еконт">До личен адрес със Спиди / Еконт</option>
            </select>
          </div>
          <div>
            <label for="checkout-payment" style="font-size:0.75rem; font-weight:700; color:#0D3B66; display:block; margin-bottom:0.2rem;">Град и Плащане:</label>
            <select id="checkout-payment" style="width:100%; padding:0.5rem; border-radius:6px; border:1px solid #E2E8F0; font-size:0.82rem;">
              <option value="София · Наложен платеж">София · Наложен платеж след Преглед и Тест</option>
              <option value="Пловдив · Наложен платеж">Пловдив · Наложен платеж след Преглед и Тест</option>
              <option value="Варна / Бургас · Карта онлайн">Варна / Бургас · Плащане с карта онлайн</option>
            </select>
          </div>
        </div>

        <button type="button" class="btn btn-orange" style="width:100%;" onclick="completePurchaseOrder()">
          Завърши поръчката — ${formatEur(totalEur)}
        </button>
      </div>
    </div>
    <div id="purchase-success-banner" style="display:none; margin-top: 1rem; padding: 1rem; background: #F0FDF4; border: 1.5px solid #15803D; border-radius: 10px; color: #1D1E2C; font-size: 0.84rem;"></div>
  `;
}

function triggerBeginCheckoutEvent() {
  const { totalEur, freeShippingUnlocked } = getCartTotals();
  pushGA4Event('begin_checkout', {
    currency: 'EUR',
    value: Number(totalEur.toFixed(2)),
    coupon: state.appliedCoupon || 'NONE',
    free_shipping_unlocked: freeShippingUnlocked,
    items: state.cart.map((i) => ({
      item_id: i.id,
      item_name: i.name,
      quantity: i.quantity,
      price: i.priceEur
    }))
  });
}

function completePurchaseOrder() {
  if (state.cart.length === 0) return;

  const { totalEur, shippingEur, hasConsumable, freeShippingUnlocked } = getCartTotals();
  const txId = `AZ-BG-${Math.floor(100000 + Math.random() * 900000)}`;
  const taxEur = Number((totalEur * 0.20 / 1.20).toFixed(2));
  const courierEl = document.getElementById('checkout-courier');
  const courier = courierEl ? courierEl.value : 'Еконтомат / Спиди Автомат';

  if (!state.firedEvents.has('begin_checkout')) {
    triggerBeginCheckoutEvent();
  }

  pushGA4Event('purchase', {
    transaction_id: txId,
    currency: 'EUR',
    value: Number(totalEur.toFixed(2)),
    tax: taxEur,
    shipping: Number(shippingEur.toFixed(2)),
    coupon: state.appliedCoupon || 'NONE',
    free_shipping_unlocked: freeShippingUnlocked,
    is_consumable: hasConsumable,
    courier_method: courier
  });

  const banner = document.getElementById('purchase-success-banner');
  if (banner) {
    banner.style.display = 'block';
    banner.innerHTML = `
      <strong style="color:#15803D; font-size:0.94rem;">Поръчка #${txId} е приета успешно!</strong>
      <p style="margin-top:0.35rem;">
        • <strong>Доставка:</strong> ${courier} (с Преглед, Тест и Безплатна замяна на размер)<br>
        • <strong>Brevo Flow 3 (+3 дни):</strong> Насоки за поддръжка и прием след доставка.<br>
        ${hasConsumable
          ? '• <strong style="color:#0D3B66;">Brevo Flow 3 (+25 дни Zero-CAC Refill):</strong> Автоматично напомняне за презареждане на добавките преди да свършат на Ден 30.'
          : ''}
      </p>
    `;
  }

  state.cart = [];
  updateCartBadge();
}

// ==========================================================================
// Brevo GDPR Lead Capture Form Handler (generate_lead)
// ==========================================================================
function handleBrevoSubmit(event, formId) {
  event.preventDefault();
  const form = event.target;
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const nameInput = form.querySelector('[name="subscriber_name"]');
  const emailInput = form.querySelector('[name="subscriber_email"]');
  const sportSelect = form.querySelector('[name="preferred_sport"]');

  const preferredSport = sportSelect ? sportSelect.value : 'Бягане и Издръжливост';
  const nameVal = nameInput ? nameInput.value.trim() : 'Атлет';
  const emailVal = emailInput ? emailInput.value.trim() : '';

  state.appliedCoupon = 'WELCOME10';

  pushGA4Event('generate_lead', {
    form_id: formId,
    preferred_sport: preferredSport,
    currency: 'EUR',
    value: 0
  });

  const feedbackEl = form.querySelector('.brevo-submit-feedback');
  if (feedbackEl) {
    feedbackEl.style.display = 'block';
    feedbackEl.innerHTML = `
      Благодарим ти, <strong>${nameVal}</strong> (${emailVal})! Твоят профил е тагнат за <strong>„${preferredSport}“</strong>.<br>
      Код <strong>WELCOME10 (-10%)</strong> е активиран автоматично в количката ти.
    `;
  }
}

// ==========================================================================
// Live Catalog Editor Modal (Add / Update Products Anytime)
// ==========================================================================
function openCatalogManagerModal() {
  renderCatalogManagerList();
  const dialog = document.getElementById('catalog-manager-dialog');
  if (dialog) dialog.showModal();
}

function renderCatalogManagerList() {
  const listEl = document.getElementById('catalog-manager-list');
  if (!listEl) return;

  listEl.innerHTML = catalog.map((p) => `
    <div style="display:flex; justify-content:space-between; align-items:center; gap:0.5rem; padding:0.55rem 0.75rem; background:#fff; border:1px solid #E2E8F0; border-radius:6px; font-size:0.8rem;">
      <div>
        <strong>${p.name}</strong>
        <span style="color:#525B6C;">(${p.sportLabel} · ${p.brandTier} · ${formatEur(p.priceEur)})</span>
      </div>
      <button type="button" class="btn btn-outline-navy btn-sm" onclick="populateEditProductForm('${p.id}')">Редактирай</button>
    </div>
  `).join('');
}

function populateEditProductForm(skuId) {
  const p = catalog.find((item) => item.id === skuId);
  if (!p) return;
  document.getElementById('edit-sku-id').value = p.id;
  document.getElementById('edit-sku-name').value = p.name;
  document.getElementById('edit-sku-sport').value = p.sportId;
  document.getElementById('edit-sku-tier').value = p.brandTier;
  document.getElementById('edit-sku-price').value = p.priceEur;
  document.getElementById('edit-sku-level').value = p.sageLevel;
  document.getElementById('edit-sku-surface').value = p.sageSurface;
  document.getElementById('edit-sku-tip').value = p.coachTip;
  document.getElementById('edit-sku-footwear').checked = Boolean(p.isFootwear);
  document.getElementById('edit-sku-consumable').checked = Boolean(p.isConsumable);
}

function saveCustomProduct(event) {
  event.preventDefault();
  const idVal = document.getElementById('edit-sku-id').value.trim() || `AZ-NEW-${Date.now().toString().slice(-3)}`;
  const nameVal = document.getElementById('edit-sku-name').value.trim();
  const sportIdVal = document.getElementById('edit-sku-sport').value;
  const tierVal = document.getElementById('edit-sku-tier').value;
  const priceVal = parseFloat(document.getElementById('edit-sku-price').value) || 25.00;
  const levelVal = document.getElementById('edit-sku-level').value.trim() || 'Ниво: Всички нива';
  const surfaceVal = document.getElementById('edit-sku-surface').value.trim() || 'Предназначение: Универсално';
  const tipVal = document.getElementById('edit-sku-tip').value.trim() || 'Практичен съвет от треньора за максимален комфорт.';
  const isFootwear = document.getElementById('edit-sku-footwear').checked;
  const isConsumable = document.getElementById('edit-sku-consumable').checked;

  const sportObj = SPORT_CATEGORIES.find((s) => s.id === sportIdVal) || SPORT_CATEGORIES[1];

  const newProduct = {
    id: idVal,
    name: nameVal,
    deptId: sportObj.deptId,
    sportId: sportObj.id,
    sportLabel: sportObj.name,
    brandTier: tierVal,
    priceEur: priceVal,
    sageLevel: levelVal,
    sageSurface: surfaceVal,
    coachTip: tipVal,
    isFootwear,
    isConsumable
  };

  const existingIdx = catalog.findIndex((item) => item.id === idVal);
  if (existingIdx >= 0) {
    catalog[existingIdx] = newProduct;
  } else {
    catalog.unshift(newProduct);
  }

  saveCatalog();
  renderDepartments();
  renderSportPills();
  renderProductsGrid();
  renderCatalogManagerList();

  const notice = document.getElementById('catalog-save-notice');
  if (notice) {
    notice.textContent = `Продуктът „${nameVal}“ (${formatEur(priceVal)}) е запазен.`;
    notice.style.display = 'block';
  }
}

function resetDefaultCatalog() {
  localStorage.removeItem(STORAGE_KEY_CATALOG);
  loadCatalog();
  renderDepartments();
  renderSportPills();
  renderProductsGrid();
  renderCatalogManagerList();
}

function simulateFullGA4Funnel() {
  pushGA4Event('generate_lead', {
    form_id: 'brevo_welcome_modal',
    preferred_sport: 'Бягане и Издръжливост'
  });
  pushGA4Event('view_item', {
    currency: 'EUR',
    value: 42.00,
    items: [{ item_id: 'AZ-RUN-01', item_name: 'Маратонки AeroStride Cushion', item_category: 'Бягане и маратон', price: 42.00 }]
  });
  pushGA4Event('add_to_cart', {
    currency: 'EUR',
    value: 54.00,
    items: [
      { item_id: 'AZ-RUN-01', item_name: 'Маратонки AeroStride Cushion', price: 42.00, quantity: 1 },
      { item_id: 'AZ-SUP-01', item_name: 'Магнезий Цитрат + B6', price: 12.00, quantity: 1 }
    ]
  });
  pushGA4Event('begin_checkout', {
    coupon: 'WELCOME10',
    currency: 'EUR',
    value: 54.00,
    free_shipping_unlocked: true
  });
  pushGA4Event('purchase', {
    transaction_id: 'AZ-BG-DEMO54',
    currency: 'EUR',
    value: 54.00,
    tax: 9.00,
    shipping: 0.00,
    free_shipping_unlocked: true,
    is_consumable: true
  });
}

function clearGA4Console() {
  state.firedEvents.clear();
  document.querySelectorAll('.event-chip').forEach((c) => c.classList.remove('fired'));
  const countEl = document.getElementById('ga4-fired-count');
  if (countEl) countEl.textContent = '0/5 събития отчетени';
  const stream = document.getElementById('ga4-log-stream');
  if (stream) {
    stream.innerHTML = '<div class="ga4-empty-hint" style="color:rgba(255,255,255,0.65);">Логът е изчистен. Кликни върху продукт, количка или форма, за да изпратиш реални GA4 събития.</div>';
  }
}

// ==========================================================================
// Modern Web Guidance Fallbacks (Dialog Light-Dismiss & :user-invalid ARIA)
// ==========================================================================
function initModernWebFallbacks() {
  if (!('closedBy' in HTMLDialogElement.prototype)) {
    document.querySelectorAll('dialog[closedby="any"]').forEach((dialog) => {
      dialog.addEventListener('click', (event) => {
        if (event.target !== dialog) return;
        const rect = dialog.getBoundingClientRect();
        const isDialogContent = (
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width
        );
        if (isDialogContent) return;
        dialog.close();
      });
    });
  }

  const syncAria = (el) => {
    if (!el || !el.matches) return;
    try {
      el.setAttribute('aria-invalid', el.matches(':user-invalid') ? 'true' : 'false');
    } catch (_) {}
  };

  document.addEventListener('blur', (e) => syncAria(e.target), true);
  document.addEventListener('input', (e) => {
    if (e.target && e.target.hasAttribute && e.target.hasAttribute('aria-invalid')) {
      syncAria(e.target);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initRealGA4Script(state.ga4MeasurementId);
  loadCatalog();
  renderDepartments();
  renderSportPills();
  renderStarterBundles();
  renderProductsGrid();
  updateCartBadge();
  initModernWebFallbacks();
});
