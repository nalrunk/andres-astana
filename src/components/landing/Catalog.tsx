import { Reveal } from "./Reveal";
import { MODELS, type ModelStatus } from "./data";
import { cn } from "@/lib/utils";

const statusStyle: Record<ModelStatus, string> = {
  "New Face": "bg-background text-foreground",
  Rising: "bg-ink text-ink-foreground",
  Pro: "bg-ink text-ink-foreground outline outline-1 outline-offset-2 outline-ink",
};

export function Catalog() {
  return (
    <section id="models" className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
      <Reveal className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="eyebrow mb-6 text-muted-foreground">03 — Каталог</p>
          <h2 className="display text-4xl md:text-7xl">
            Новые лица
            <br />
            сезона
          </h2>
        </div>
        <p className="max-w-sm text-muted-foreground">
          Модели, которые пришли к нам без опыта и уже работают с брендами. Следующей можете быть вы.
        </p>
      </Reveal>

      <div className="grid grid-cols-2 gap-x-3 gap-y-10 md:gap-x-6 lg:grid-cols-4">
        {MODELS.map((m, i) => (
          <Reveal key={m.name} delay={(i % 4) * 0.08}>
            <article className="group cursor-pointer">
              <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                <img
                  src={m.photo}
                  alt={`${m.name}, модель из города ${m.city}`}
                  width={768}
                  height={1024}
                  loading="lazy"
                  className="photo-bw h-full w-full object-cover transition-transform duration-[1200ms] ease-editorial group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-ink/0 transition-colors duration-700 group-hover:bg-ink/20" />
                <span className={cn("eyebrow absolute left-3 top-3 px-2 py-1 text-[0.6rem]", statusStyle[m.status])}>
                  {m.status}
                </span>
                <span className="eyebrow absolute bottom-3 right-3 translate-y-2 bg-background px-2 py-1 text-[0.6rem] text-foreground opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  Смотреть бук →
                </span>
              </div>
              <div className="mt-4 flex items-start justify-between gap-2 border-t border-foreground pt-3">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide md:text-base">{m.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground md:text-sm">{m.city}</p>
                </div>
                <p className="font-display text-sm md:text-base">{m.height}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
