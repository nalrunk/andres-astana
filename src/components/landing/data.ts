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
  { href: "#projects", label: "Проекты" },
  { href: "#award", label: "Премия" },
  { href: "#about", label: "О нас" },
];

export type ModelStatus = "New Face" | "Rising" | "Pro";

export const MODELS: { name: string; city: string; height: number; status: ModelStatus; photo: string }[] = [
  { name: "Алина Соколова", city: "Москва", height: 178, status: "New Face", photo: m1 },
  { name: "Марк Белов", city: "Санкт-Петербург", height: 187, status: "Rising", photo: m2 },
  { name: "Ева Миронова", city: "Краснодар", height: 174, status: "New Face", photo: m3 },
  { name: "Дарья Крылова", city: "Екатеринбург", height: 180, status: "Pro", photo: m4 },
  { name: "Илья Громов", city: "Казань", height: 189, status: "Rising", photo: m5 },
  { name: "Айгерим Нурлан", city: "Новосибирск", height: 176, status: "New Face", photo: m6 },
  { name: "Вера Лебедева", city: "Нижний Новгород", height: 175, status: "Rising", photo: m7 },
  { name: "Тимур Ахметов", city: "Уфа", height: 185, status: "Pro", photo: m8 },
];

export const BENEFITS = [
  { value: "0\u00a0₽", title: "Вход", text: "Никаких платных курсов и взносов. Агентство зарабатывает только вместе с вами." },
  { value: "3\u00a0000\u00a0₽", title: "Ставка за съемку", text: "От 3 000 ₽ за коммерческую съемку — фиксированная оплата с первого контракта." },
  { value: "ТФП", title: "Портфолио", text: "Бесплатные съемки с фотографами, стилистами и визажистами агентства." },
  { value: "48\u00a0ч", title: "Ответ агента", text: "Персональный агент рассмотрит анкету и свяжется с вами за двое суток." },
];

export const STATS = [
  { value: "12 400+", label: "анкет в базе" },
  { value: "86", label: "городов" },
  { value: "340", label: "съемок в год" },
  { value: "120+", label: "брендов-партнеров" },
];

export const STEPS = [
  { title: "Анкета", text: "Заполните короткую форму или напишите боту: имя, город, рост и пара фото без фильтров." },
  { title: "Отбор", text: "Скаутинг-команда оценивает параметры и фотогеничность. Опыт не нужен — нужен характер." },
  { title: "Снэпы и тест", text: "Делаем базовые снэпы и первую ТФП-съемку в вашем городе или онлайн-кастинг." },
  { title: "Портфолио", text: "Собираем бук, карточку модели и размещаем вас в каталоге агентства." },
  { title: "Контракты", text: "Агент предлагает вас брендам и площадкам: каталоги, лукбуки, кампании, показы." },
];

export const PROJECTS = [
  { date: "06.12", month: "Декабрь 2026", city: "Москва", format: "ТФП", title: "Rooftop Editorial", text: "Уличная съемка на крыше для журнального разворота.", photo: p1 },
  { date: "14.12", month: "Декабрь 2026", city: "Санкт-Петербург", format: "Коммерция", title: "Lookbook SS27", text: "Лукбук весенней коллекции локального бренда одежды.", photo: p2 },
  { date: "21.12", month: "Декабрь 2026", city: "Казань", format: "Коммерция", title: "Campaign «Бетон»", text: "Имиджевая кампания в индустриальном пространстве.", photo: p3 },
];

export const NOMINEES = [
  { name: "Дарья Крылова", city: "Екатеринбург", votes: 4820, photo: m4 },
  { name: "Алина Соколова", city: "Москва", votes: 4315, photo: m1 },
  { name: "Айгерим Нурлан", city: "Новосибирск", votes: 3980, photo: m6 },
  { name: "Ева Миронова", city: "Краснодар", votes: 3410, photo: m3 },
  { name: "Вера Лебедева", city: "Нижний Новгород", votes: 2875, photo: m7 },
];

/** Award final: 20 December 2026, 19:00 Moscow time. */
export const AWARD_DEADLINE = new Date("2026-12-20T19:00:00+03:00");

export const MARQUEE_ITEMS = MODELS.map((m) => `${m.name} — ${m.city}`);
