import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { STEPS } from "./data";

export function Steps() {
  const [active, setActive] = useState(0);

  return (
    <section className="border-t border-border">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-14 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <p className="eyebrow mb-6 text-muted-foreground">06 — Как это работает</p>
              <h2 className="display text-4xl md:text-6xl">
                От анкеты
                <br />
                до контракта
              </h2>
              <p className="mt-8 max-w-sm text-muted-foreground">
                Пять шагов, которые проходит каждая модель агентства. Обычно путь до первой оплачиваемой съемки
                занимает 3–6 недель.
              </p>
              <p className="display mt-12 hidden text-[9rem] leading-none text-accent lg:block" aria-hidden="true">
                0{active + 1}
              </p>
            </Reveal>
          </div>
        </div>

        <ol className="lg:col-span-7">
          {STEPS.map((step, i) => (
            <Step key={step.title} index={i} active={active === i} onActivate={() => setActive(i)} {...step} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function Step({
  index,
  title,
  text,
  active,
  onActivate,
}: {
  index: number;
  title: string;
  text: string;
  active: boolean;
  onActivate: () => void;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (inView) onActivate();
  }, [inView, onActivate]);

  return (
    <li ref={ref} className="border-t border-border last:border-b">
      <button
        type="button"
        onClick={onActivate}
        aria-expanded={active}
        className="flex w-full items-start gap-6 py-8 text-left md:gap-10 md:py-10"
      >
        <span
          className={cn(
            "font-display text-sm transition-colors duration-500 md:text-base",
            active ? "text-foreground" : "text-muted-foreground",
          )}
        >
          0{index + 1}
        </span>
        <span className="flex-1">
          <span
            className={cn(
              "display block text-3xl transition-colors duration-500 md:text-5xl",
              active ? "text-foreground" : "text-input",
            )}
          >
            {title}
          </span>
          <AnimatePresence initial={false}>
            {active && (
              <motion.span
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="block overflow-hidden"
              >
                <span className="block max-w-lg pt-5 leading-relaxed text-muted-foreground">{text}</span>
              </motion.span>
            )}
          </AnimatePresence>
        </span>
        <span
          className={cn(
            "mt-2 h-3 w-3 shrink-0 rounded-full border border-foreground transition-colors duration-500",
            active ? "bg-foreground" : "bg-transparent",
          )}
          aria-hidden="true"
        />
      </button>
    </li>
  );
}
