import m1 from "@/assets/model-1.jpg";
import m2 from "@/assets/model-2.jpg";
import m3 from "@/assets/model-3.jpg";
import m4 from "@/assets/model-4.jpg";
import m5 from "@/assets/model-5.jpg";
import m6 from "@/assets/model-6.jpg";
import m7 from "@/assets/model-7.jpg";
import m8 from "@/assets/model-8.jpg";
import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";

export const TELEGRAM_BOT_URL = "https://t.me/andres_models_bot";

export const NAV = [
  { href: "#models", label: "Модели" },
  { href: "#top10", label: "Топ-10" },
  { href: "#courses", label: "Курсы" },
  { href: "#projects", label: "Проекты" },
  { href: "#award", label: "Премия" },
  { href: "#about", label: "О нас" },
];

export type ModelStatus = "New Face" | "Rising" | "Pro";

export const MODELS: { name: string; city: string; height: number; status: ModelStatus; photo: string }[] = [
  { name: "Алина Соколова", city: "Алматы", height: 178, status: "New Face", photo: m1 },
  { name: "Марк Белов", city: "Астана", height: 187, status: "Rising", photo: m2 },
  { name: "Аружан Ермекова", city: "Шымкент", height: 174, status: "New Face", photo: m3 },
  { name: "Дана Жумабаева", city: "Алматы", height: 180, status: "Pro", photo: m4 },
  { name: "Алихан Серикбаев", city: "Астана", height: 189, status: "Rising", photo: m5 },
  { name: "Айгерим Нурланова", city: "Алматы", height: 176, status: "New Face", photo: m6 },
  { name: "Томирис Абенова", city: "Шымкент", height: 175, status: "Rising", photo: m7 },
  { name: "Ерасыл Ахметов", city: "Астана", height: 185, status: "Pro", photo: m8 },
];

export const BENEFITS = [
  { value: "0\u00a0₸", title: "Вход", text: "Никаких платных курсов и взносов. Агентство зарабатывает только вместе с вами." },
  { value: "16\u00a0000\u00a0₸", title: "Ставка за съемку", text: "От 16 000 ₸ за коммерческую съемку — фиксированная оплата с первого контракта." },
  { value: "ТФП", title: "Портфолио", text: "Бесплатные съемки с фотографами, стилистами и визажистами агентства." },
  { value: "48\u00a0ч", title: "Ответ агента", text: "Персональный агент рассмотрит анкету и свяжется с вами за двое суток." },
];

export const STATS = [
  { value: "1\u00a0475", label: "анкет в базе" },
  { value: "3", label: "города" },
  { value: "36", label: "съемок в год" },
  { value: "27+", label: "брендов-партнеров" },
];

export const STEPS = [
  { title: "Анкета", text: "Заполните короткую форму или напишите боту: имя, город, рост и пара фото без фильтров." },
  { title: "Отбор", text: "Скаутинг-команда оценивает параметры и фотогеничность. Опыт не нужен — нужен характер." },
  { title: "Снэпы и тест", text: "Делаем базовые снэпы и первую ТФП-съемку в вашем городе или онлайн-кастинг." },
  { title: "Портфолио", text: "Собираем бук, карточку модели и размещаем вас в каталоге агентства." },
  { title: "Контракты", text: "Агент предлагает вас брендам и площадкам: каталоги, лукбуки, кампании, показы." },
];

export const PROJECTS = [
  { date: "06.12", month: "Декабрь 2026", city: "Алматы", format: "ТФП", title: "Rooftop Editorial", text: "Уличная съемка на крыше для журнального разворота.", photo: p1 },
  { date: "14.12", month: "Декабрь 2026", city: "Астана", format: "Коммерция", title: "Lookbook SS27", text: "Лукбук весенней коллекции локального бренда одежды.", photo: p2 },
  { date: "21.12", month: "Декабрь 2026", city: "Шымкент", format: "Коммерция", title: "Campaign «Бетон»", text: "Имиджевая кампания в индустриальном пространстве.", photo: p3 },
];

export const NOMINEES = [
  { name: "Дана Жумабаева", city: "Алматы", votes: 4820, photo: m4 },
  { name: "Алина Соколова", city: "Алматы", votes: 4315, photo: m1 },
  { name: "Айгерим Нурланова", city: "Алматы", votes: 3980, photo: m6 },
  { name: "Аружан Ермекова", city: "Шымкент", votes: 3410, photo: m3 },
  { name: "Томирис Абенова", city: "Шымкент", votes: 2875, photo: m7 },
];

/** Award final: 20 December 2026, 19:00 Moscow time. */
export const AWARD_DEADLINE = new Date("2026-12-20T19:00:00+03:00");

export const MARQUEE_ITEMS = MODELS.map((m) => `${m.name} — ${m.city}`);

/* ——— Unsplash placeholders (rendered black & white on the page) ——— */
const unsplash = (id: string, w = 1200) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const MODEL_OF_MONTH = {
  name: "Айгерим Нурланова",
  city: "Алматы",
  month: "Ноябрь",
  photo: m6,
  story:
    "Год назад Айгерим отправила анкету через Telegram-бота — без портфолио и опыта. Сегодня за ее плечами 14 коммерческих съемок, лукбук для алматинского бренда и первый показ на Kazakhstan Fashion Week.",
  quote: "В агентстве меня научили не позировать, а быть собой в кадре. Это и продает.",
  params: [
    { label: "Рост", value: "176 см" },
    { label: "Параметры", value: "82-60-89" },
    { label: "Обувь", value: "39" },
    { label: "Глаза", value: "Карие" },
    { label: "Волосы", value: "Темные" },
  ],
  portfolio: [
    { src: unsplash("1488426862026-3ee34a7d66df"), caption: "Beauty-съемка, студия Алматы" },
    { src: unsplash("1524504388940-b1c1722653e1"), caption: "Editorial для журнального разворота" },
    { src: unsplash("1544005313-94ddf0286df2"), caption: "Lookbook осень-зима" },
    { src: unsplash("1485968579580-b6d095142e6e"), caption: "Street style, Астана" },
  ],
};

export const BOOKING_URL = TELEGRAM_BOT_URL;

export type TopPhoto = {
  src: string;
  /** Tailwind aspect ratio class: vertical and horizontal frames mixed. */
  ratio: "portrait" | "tall" | "landscape" | "square";
  model: string;
  photographer: string;
  title: string;
  description: string;
};

export const TOP_PHOTOS: TopPhoto[] = [
  { src: unsplash("1502823403499-6ccfcf4fb453"), ratio: "tall", model: "Айгерим Нурланова", photographer: "Данияр Сапаров", title: "Профиль", description: "Студийный портрет с жестким контровым светом. Алматы, ноябрь." },
  { src: unsplash("1509631179647-0177331693ae"), ratio: "portrait", model: "Дана Жумабаева", photographer: "Мадина Касымова", title: "Неон", description: "Fashion-съемка для капсульной коллекции местного бренда." },
  { src: unsplash("1512316609839-ce289d3eba0a", 1600), ratio: "landscape", model: "Алина Соколова", photographer: "Данияр Сапаров", title: "Огни", description: "Вечерний editorial в ресторане на Кок-Тобе." },
  { src: unsplash("1531746020798-e6953c6e8e04"), ratio: "square", model: "Аружан Ермекова", photographer: "Мадина Касымова", title: "Чистое лицо", description: "Beauty-тест без ретуши — первые снэпы новой модели." },
  { src: unsplash("1554412933-514a83d2f3c8"), ratio: "tall", model: "Томирис Абенова", photographer: "Данияр Сапаров", title: "Шляпа", description: "Кампания верхней одежды, студия в Шымкенте." },
  { src: unsplash("1534528741775-53994a69daeb"), ratio: "portrait", model: "Дана Жумабаева", photographer: "Мадина Касымова", title: "Тишина", description: "Портрет для карточки модели, мягкий цветной фон." },
  { src: unsplash("1506794778202-cad84cf45f1d"), ratio: "portrait", model: "Алихан Серикбаев", photographer: "Данияр Сапаров", title: "Взгляд", description: "Мужской портрет для имиджевой кампании трикотажа." },
  { src: unsplash("1496747611176-843222e1e57c", 1600), ratio: "landscape", model: "Аружан Ермекова", photographer: "Мадина Касымова", title: "Ветер", description: "Летний лукбук на побережье Капчагая." },
  { src: unsplash("1581044777550-4cfa60707c03"), ratio: "tall", model: "Айгерим Нурланова", photographer: "Мадина Касымова", title: "Поле", description: "Outdoor-съемка в степи на закате, ТФП-проект." },
  { src: unsplash("1495385794356-15371f348c31"), ratio: "portrait", model: "Томирис Абенова", photographer: "Данияр Сапаров", title: "Комбинезон", description: "Коммерческая съемка для онлайн-магазина, Астана." },
];

export type CourseCategory = "base" | "pro" | "kids";

export const COURSE_TABS: { value: CourseCategory | "all"; label: string }[] = [
  { value: "all", label: "Все курсы" },
  { value: "base", label: "Базовый курс" },
  { value: "pro", label: "Pro-интенсив" },
  { value: "kids", label: "Детская школа" },
];

export const COURSE_CATEGORY_LABEL: Record<CourseCategory, string> = {
  base: "Базовый курс · Дефиле и фотопозирование",
  pro: "Pro-интенсив",
  kids: "Детская школа",
};

export const COURSES: {
  id: string;
  category: CourseCategory;
  title: string;
  city: string;
  start: string;
  duration: string;
  schedule: string;
  seatsLeft: number;
  program: [string, string, string];
}[] = [
  { id: "base-almaty-dec", category: "base", title: "Базовый курс модели", city: "Алматы", start: "15 декабря", duration: "2 месяца", schedule: "Сб, Вс с 12:00 до 15:00", seatsLeft: 3, program: ["Дефиле и походка на подиуме", "Актерское мастерство в кадре", "Снэпы и первое портфолио"] },
  { id: "base-astana-jan", category: "base", title: "Базовый курс модели", city: "Астана", start: "12 января", duration: "2 месяца", schedule: "Вт, Чт с 19:00 до 21:30", seatsLeft: 8, program: ["Дефиле и походка на подиуме", "Фотопозирование и работа с камерой", "Снэпы и первое портфолио"] },
  { id: "pro-almaty-jan", category: "pro", title: "Pro-интенсив: подиум и кастинги", city: "Алматы", start: "20 января", duration: "3 недели", schedule: "Пн, Ср, Пт с 18:00 до 21:00", seatsLeft: 2, program: ["Сложное дефиле и показы", "Актерское мастерство для рекламы", "Подготовка бука к кастингам"] },
  { id: "pro-shymkent-feb", category: "pro", title: "Pro-интенсив: коммерческая съемка", city: "Шымкент", start: "3 февраля", duration: "4 недели", schedule: "Сб с 11:00 до 16:00", seatsLeft: 5, program: ["Позирование для e-commerce", "Работа со светом и стилистом", "Съемка портфолио с фотографом"] },
  { id: "kids-almaty-dec", category: "kids", title: "Детская школа, 7–12 лет", city: "Алматы", start: "21 декабря", duration: "3 месяца", schedule: "Вс с 11:00 до 13:00", seatsLeft: 4, program: ["Осанка и детское дефиле", "Уверенность и игра перед камерой", "Фотосессия и детское портфолио"] },
  { id: "kids-astana-jan", category: "kids", title: "Teen-школа, 13–16 лет", city: "Астана", start: "18 января", duration: "3 месяца", schedule: "Сб с 14:00 до 16:30", seatsLeft: 6, program: ["Дефиле и работа с образом", "Актерское мастерство", "Снэпы и первое портфолио"] },
];

export const SELECTION_TERMS = [
  "Возраст от 7 до 35 лет",
  "Рост: девушки от 165 см, юноши от 178 см, дети — без ограничений",
  "Опыт не нужен, достаточно желания учиться",
  "Пробное занятие и консультация скаута — бесплатно",
];
