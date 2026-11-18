import { useCallback, useEffect, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useMotionOn } from "@/lib/motion-preference";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { TOP_PHOTOS, type TopPhoto } from "./data";

const ratioClass: Record<TopPhoto["ratio"], string> = {
  tall: "aspect-[2/3]",
  portrait: "aspect-[4/5]",
  square: "aspect-square",
  landscape: "aspect-[3/2]",
};

const pad = (n: number) => String(n).padStart(2, "0");

export function TopPhotos() {
  const [index, setIndex] = useState<number | null>(null);
  const on = useMotionOn();
  const total = TOP_PHOTOS.length;

  const go = useCallback(
    (step: number) => setIndex((i) => (i === null ? i : (i + step + total) % total)),
    [total],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, go]);

  const current = index === null ? null : TOP_PHOTOS[index];

  return (
    <section id="top10" className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
      <Reveal className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="eyebrow mb-6 text-muted-foreground">05 — Топ-10 месяца</p>
          <h2 className="display text-4xl md:text-7xl">
            Лучшие кадры
            <br />
            ноября
          </h2>
        </div>
        <p className="max-w-sm text-muted-foreground">
          Десять снимков, которые редакция агентства выбрала из всех съемок месяца. Нажмите на фото, чтобы открыть его
          целиком.
        </p>
      </Reveal>

      <div className="columns-2 gap-3 md:columns-3 md:gap-5 lg:columns-4">
        {TOP_PHOTOS.map((p, i) => (
          <Reveal key={p.src} delay={(i % 4) * 0.06} y={24} className="mb-3 break-inside-avoid md:mb-5">
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Открыть фото ${pad(i + 1)}: ${p.title}, модель ${p.model}`}
              className={cn("group relative block w-full overflow-hidden bg-muted text-left", ratioClass[p.ratio])}
            >
              <img
                src={p.src.replace("w=1200", "w=700").replace("w=1600", "w=900")}
                alt={`${p.title} — ${p.model}, фото ${p.photographer}`}
                loading="lazy"
                className="photo-bw h-full w-full object-cover transition-transform duration-[1200ms] ease-editorial group-hover:scale-105"
              />
              <span className="absolute left-0 top-0 bg-background px-2.5 py-1.5 font-display text-xs font-semibold text-foreground md:text-sm">
                {pad(i + 1)}
              </span>
              <span className="absolute inset-x-0 bottom-0 translate-y-full bg-ink/75 p-3 text-ink-foreground transition-transform duration-500 ease-editorial group-hover:translate-y-0 group-focus-visible:translate-y-0 md:p-4">
                <span className="block text-xs font-semibold uppercase tracking-wide md:text-sm">{p.model}</span>
                <span className="mt-1 block text-[0.7rem] text-ink-muted md:text-xs">Фото: {p.photographer}</span>
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      <DialogPrimitive.Root open={index !== null} onOpenChange={(o) => !o && setIndex(null)}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-ink" />
          <DialogPrimitive.Content className="fixed inset-0 z-50 flex flex-col text-ink-foreground outline-none">
            {current && index !== null && (
              <>
                <div className="flex items-center justify-between px-5 py-4 md:px-10 md:py-6">
                  <p className="font-display text-sm">
                    {pad(index + 1)} <span className="text-ink-muted">/ {pad(total)}</span>
                  </p>
                  <DialogPrimitive.Close
                    className="border border-ink-border p-3 transition-colors duration-300 hover:bg-ink-foreground hover:text-ink"
                    aria-label="Закрыть просмотр"
                  >
                    <X className="h-5 w-5" />
                  </DialogPrimitive.Close>
                </div>

                <div className="relative flex min-h-0 flex-1 items-center justify-center px-5 md:px-24">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.img
                      key={current.src}
                      src={current.src}
                      alt={`${current.title} — ${current.model}, фото ${current.photographer}`}
                      initial={on ? { opacity: 0, scale: 0.98 } : false}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: on ? 0 : 1 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="photo-bw max-h-full max-w-full object-contain"
                    />
                  </AnimatePresence>
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Предыдущее фото"
                    className="absolute left-2 top-1/2 -translate-y-1/2 border border-ink-border bg-ink/60 p-3 transition-colors duration-300 hover:bg-ink-foreground hover:text-ink md:left-8 md:p-4"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Следующее фото"
                    className="absolute right-2 top-1/2 -translate-y-1/2 border border-ink-border bg-ink/60 p-3 transition-colors duration-300 hover:bg-ink-foreground hover:text-ink md:right-8 md:p-4"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>

                <div className="grid gap-2 border-t border-ink-border px-5 py-5 md:grid-cols-12 md:px-10 md:py-6">
                  <div className="md:col-span-4">
                    <DialogPrimitive.Title className="display text-2xl md:text-3xl">{current.title}</DialogPrimitive.Title>
                  </div>
                  <DialogPrimitive.Description className="text-sm leading-relaxed text-ink-muted md:col-span-5">
                    {current.description}
                  </DialogPrimitive.Description>
                  <div className="text-sm md:col-span-3 md:text-right">
                    <p>{current.model}</p>
                    <p className="text-ink-muted">Фото: {current.photographer}</p>
                  </div>
                </div>
              </>
            )}
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </section>
  );
}
