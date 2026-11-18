import { Reveal } from "./Reveal";
import { BENEFITS } from "./data";

export function Benefits() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
      <Reveal className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <h2 className="display max-w-3xl text-4xl md:text-6xl">Условия без мелкого шрифта</h2>
        <p className="eyebrow text-muted-foreground">01 — Преимущества</p>
      </Reveal>

      <div className="grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-4">
        {BENEFITS.map((b, i) => (
          <Reveal key={b.title} delay={i * 0.08} className="h-full">
            <article className="group flex h-full min-h-[320px] flex-col justify-between border-b border-r border-border p-7 transition-colors duration-700 ease-editorial hover:bg-ink hover:text-ink-foreground md:p-8">
              <span className="eyebrow text-muted-foreground transition-colors duration-700 group-hover:text-ink-muted">
                0{i + 1} / {b.title}
              </span>
              <div>
                <p className="display whitespace-nowrap text-[clamp(2.5rem,3.6vw,3.75rem)]">{b.value}</p>
                <p className="mt-6 text-sm leading-relaxed text-muted-foreground transition-colors duration-700 group-hover:text-ink-muted">
                  {b.text}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
