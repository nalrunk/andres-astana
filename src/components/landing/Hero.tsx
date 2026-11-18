import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMotionOn } from "@/lib/motion-preference";
import hero from "@/assets/hero.jpg";
import { MARQUEE_ITEMS } from "./data";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const on = useMotionOn();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <section id="top" ref={ref} className="relative overflow-hidden pt-16 md:pt-20">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-5 pb-12 pt-10 md:px-10 lg:grid-cols-12 lg:gap-8 lg:pb-16 lg:pt-16">
        <motion.div style={on ? { y: titleY } : {}} className="flex flex-col justify-between lg:col-span-7">
          <div>
            <motion.p
              initial={on ? { opacity: 0, y: 20 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease }}
              className="eyebrow flex items-center gap-3 text-muted-foreground"
            >
              <span className="inline-block h-px w-10 bg-foreground" />
              Виртуальное модельное агентство · Набор 2026
            </motion.p>

            <h1 className="display mt-8 text-[clamp(3.5rem,11vw,10.5rem)]">
              {["Новые", "лица"].map((word, i) => (
                <span key={word} className="block overflow-hidden pb-[0.06em]">
                  <motion.span
                    className="block"
                    initial={on ? { y: "110%" } : false}
                    animate={{ y: "0%" }}
                    transition={{ duration: 1.1, delay: 0.15 + i * 0.12, ease }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>
          </div>

          <motion.div
            initial={on ? { opacity: 0, y: 24 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease }}
            className="mt-10 max-w-xl"
          >
            <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
              Ищем модели по всей стране — без опыта, портфолио и платных курсов. Подайте анкету онлайн, а
              остальное агентство возьмет на себя.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="editorial" size="xl">
                <a href="#apply">
                  Стать моделью <ArrowDownRight />
                </a>
              </Button>
              <Button asChild variant="editorialOutline" size="xl">
                <a href="#models">Смотреть каталог</a>
              </Button>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={on ? { opacity: 0, scale: 1.04 } : false}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease }}
          className="relative aspect-[4/5] overflow-hidden bg-muted lg:col-span-5"
        >
          <motion.img
            src={hero}
            alt="Модель агентства ANDRES в черном костюме оверсайз"
            width={1280}
            height={1600}
            style={on ? { y: imgY, scale: 1.15 } : {}}
            className="photo-bw h-full w-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-5">
            <span className="eyebrow bg-background px-3 py-2 text-foreground">Issue №01 — Winter</span>
            <span className="eyebrow bg-background px-3 py-2 text-foreground">ANDRES</span>
          </div>
        </motion.div>
      </div>

      <Marquee />
    </section>
  );
}

function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="overflow-hidden border-y border-foreground bg-ink py-5 text-ink-foreground" aria-hidden="true">
      <div className="flex w-max animate-marquee">
        {items.map((item, i) => (
          <span key={i} className="flex shrink-0 items-center font-display text-2xl uppercase tracking-tight md:text-4xl">
            <span className="px-8">{item}</span>
            <span className="text-ink-muted">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
