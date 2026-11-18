import { QRCodeSVG } from "qrcode.react";
import { useMotionPreference, type MotionLevel } from "@/lib/motion-preference";
import { cn } from "@/lib/utils";
import { NAV, TELEGRAM_BOT_URL } from "./data";

const LEVELS: { value: MotionLevel; label: string }[] = [
  { value: "full", label: "Полная" },
  { value: "off", label: "Выкл" },
];

export function Footer() {
  const { level, setLevel } = useMotionPreference();

  return (
    <footer className="bg-background">
      <div className="mx-auto max-w-[1440px] px-5 pt-20 md:px-10">
        <div className="grid gap-12 border-b border-border pb-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-3xl font-semibold tracking-[0.2em]">ANDRES</p>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Виртуальное модельное агентство. Ищем новые лица по всей стране.
            </p>
          </div>

          <nav className="md:col-span-3" aria-label="Меню в подвале">
            <p className="eyebrow mb-5 text-muted-foreground">Навигация</p>
            <ul className="space-y-3">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="text-sm uppercase tracking-wide hover:underline">
                    {n.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#apply" className="text-sm uppercase tracking-wide hover:underline">
                  Стать моделью
                </a>
              </li>
            </ul>
          </nav>

          <div className="flex items-start gap-5 md:col-span-4 md:justify-end">
            <a
              href={TELEGRAM_BOT_URL}
              target="_blank"
              rel="noreferrer"
              className="block border border-foreground p-3 text-foreground transition-colors duration-500 hover:bg-secondary"
              aria-label="Открыть Telegram-бота агентства"
            >
              <QRCodeSVG value={TELEGRAM_BOT_URL} size={112} bgColor="transparent" fgColor="currentColor" level="M" />
            </a>
            <div>
              <p className="eyebrow text-muted-foreground">Telegram-бот</p>
              <p className="mt-2 text-sm">Отсканируйте, чтобы подать анкету за 2 минуты</p>
              <a href={TELEGRAM_BOT_URL} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm underline">
                @andres_models_bot
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-muted-foreground">© 2026 ANDRES Model Agency. Все права защищены.</p>

          <div className="flex items-center gap-4">
            <span className="eyebrow text-muted-foreground">Анимация</span>
            <div role="radiogroup" aria-label="Уровень анимации" className="flex border border-foreground">
              {LEVELS.map((l) => (
                <button
                  key={l.value}
                  type="button"
                  role="radio"
                  aria-checked={level === l.value}
                  onClick={() => setLevel(l.value)}
                  className={cn(
                    "eyebrow px-4 py-2 transition-colors duration-300",
                    level === l.value ? "bg-foreground text-background" : "text-foreground hover:bg-secondary",
                  )}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <p
        className="display select-none overflow-hidden whitespace-nowrap text-center text-[18vw] leading-[0.8] text-secondary"
        aria-hidden="true"
      >
        ANDRES
      </p>
    </footer>
  );
}
