import { ArrowUpRight, MapPin } from "lucide-react";
import { Reveal } from "./Reveal";
import { PROJECTS } from "./data";

export function Projects() {
  return (
    <section id="projects" className="bg-secondary">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <Reveal className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-6 text-muted-foreground">07 — Афиша</p>
            <h2 className="display text-4xl md:text-6xl">Ближайшие съемки</h2>
          </div>
          <p className="max-w-sm text-muted-foreground">
            Модели агентства получают приглашения на проекты в своем городе. Места ограничены.
          </p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <article className="group flex h-full flex-col bg-background">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={p.photo}
                    alt={p.title}
                    width={1024}
                    height={768}
                    loading="lazy"
                    className="photo-bw h-full w-full object-cover transition-transform duration-[1200ms] ease-editorial group-hover:scale-105"
                  />
                  <span className="eyebrow absolute left-4 top-4 bg-background px-3 py-1.5 text-foreground">{p.format}</span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-end justify-between border-b border-border pb-5">
                    <div>
                      <p className="display text-5xl">{p.date}</p>
                      <p className="eyebrow mt-2 text-muted-foreground">{p.month}</p>
                    </div>
                    <p className="flex items-center gap-1.5 text-sm">
                      <MapPin className="h-4 w-4" /> {p.city}
                    </p>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold uppercase tracking-wide">{p.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
                  <a
                    href="#apply"
                    className="eyebrow mt-6 inline-flex items-center gap-2 self-start border-b border-foreground pb-1 transition-all duration-500 hover:gap-4"
                  >
                    Хочу на съемку <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
