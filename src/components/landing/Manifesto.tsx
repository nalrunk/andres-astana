import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useMotionOn } from "@/lib/motion-preference";
import { Reveal } from "./Reveal";
import { STATS } from "./data";

const TEXT =
  "Мы не ищем идеальных. Мы ищем настоящих. Красота — это характер, взгляд и смелость быть собой перед камерой. ANDRES открывает двери в индустрию каждому, кто готов работать — из любого города страны.";

export function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null);
  const on = useMotionOn();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = TEXT.split(" ");

  return (
    <section id="about" className="bg-ink text-ink-foreground">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-40">
        <p className="eyebrow mb-12 text-ink-muted">02 — Манифест</p>
        <p ref={ref} className="font-display text-[clamp(1.75rem,4.4vw,4.25rem)] font-medium leading-[1.12] tracking-[-0.03em]">
          {words.map((word, i) => (
            <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} on={on}>
              {word}
            </Word>
          ))}
        </p>

        <div className="mt-24 grid grid-cols-2 border-t border-ink-border lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1} className="border-b border-ink-border py-8 pr-4 lg:border-b-0">
              <p className="display whitespace-nowrap text-[clamp(1.75rem,6.5vw,3.75rem)]">{s.value}</p>
              <p className="eyebrow mt-4 text-ink-muted">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Word({
  children,
  progress,
  range,
  on,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  on: boolean;
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={on ? { opacity } : {}} className="mr-[0.25em] inline-block">
      {children}
    </motion.span>
  );
}
