import { useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "./Reveal";
import { BOOKING_URL, MODEL_OF_MONTH as M } from "./data";

export function ModelOfMonth() {
  const [open, setOpen] = useState(false);

  return (
    <section id="model-of-month" className="border-t border-border">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-7">
          <div className="group relative aspect-[4/5] overflow-hidden bg-muted lg:aspect-[5/6]">
            <img
              src={M.photo}
              alt={`${M.name} — модель месяца`}
              width={768}
              height={1024}
              loading="lazy"
              className="photo-bw h-full w-full object-cover object-top transition-transform duration-[1600ms] ease-editorial group-hover:scale-105"
            />
            <span className="eyebrow absolute left-4 top-4 bg-background px-3 py-2 text-[0.62rem] text-foreground md:left-6 md:top-6">
              Model of the month / {M.month}
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.12} className="flex flex-col justify-end lg:col-span-5">
          <p className="eyebrow mb-6 text-muted-foreground">04 — Модель месяца</p>
          <h2 className="display text-[clamp(2.25rem,10vw,4rem)] lg:text-[clamp(2.5rem,4.4vw,3.75rem)]">
            {M.name.split(" ").map((w) => (
              <span key={w} className="block">
                {w}
              </span>
            ))}
          </h2>
          <p className="eyebrow mt-4 text-muted-foreground">{M.city}</p>

          <blockquote className="mt-10 border-l-2 border-foreground pl-5 font-display text-lg leading-snug tracking-tight md:text-xl">
            «{M.quote}»
          </blockquote>
          <p className="mt-6 leading-relaxed text-muted-foreground">{M.story}</p>

          <dl className="mt-10 border-t border-foreground">
            {M.params.map((p) => (
              <div key={p.label} className="flex items-baseline justify-between border-b border-border py-3">
                <dt className="eyebrow text-muted-foreground">{p.label}</dt>
                <dd className="font-display text-base">{p.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row lg:flex-col 2xl:flex-row">
            <Button variant="editorial" size="xl" onClick={() => setOpen(true)}>
              Смотреть портфолио
            </Button>
            <Button variant="editorialOutline" size="xl" asChild>
              <a href={BOOKING_URL} target="_blank" rel="noreferrer">
                Забронировать модель <ArrowRight />
              </a>
            </Button>
          </div>
        </Reveal>
      </div>

      <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-ink/90 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
          <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-50 max-h-[92vh] w-[calc(100%-2rem)] max-w-6xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto bg-background p-5 data-[state=open]:animate-in data-[state=open]:fade-in-0 md:p-10">
            <div className="mb-8 flex items-start justify-between gap-6">
              <div>
                <p className="eyebrow text-muted-foreground">Портфолио</p>
                <DialogPrimitive.Title className="display mt-3 text-3xl md:text-5xl">{M.name}</DialogPrimitive.Title>
                <DialogPrimitive.Description className="sr-only">
                  Дополнительные кадры из портфолио модели месяца
                </DialogPrimitive.Description>
              </div>
              <DialogPrimitive.Close
                className="border border-foreground p-3 transition-colors duration-300 hover:bg-foreground hover:text-background"
                aria-label="Закрыть портфолио"
              >
                <X className="h-5 w-5" />
              </DialogPrimitive.Close>
            </div>
            <div className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
              {M.portfolio.map((f) => (
                <figure key={f.src}>
                  <div className="aspect-[3/4] overflow-hidden bg-muted">
                    <img src={f.src} alt={f.caption} loading="lazy" className="photo-bw h-full w-full object-cover" />
                  </div>
                  <figcaption className="mt-3 text-xs text-muted-foreground md:text-sm">{f.caption}</figcaption>
                </figure>
              ))}
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </section>
  );
}
