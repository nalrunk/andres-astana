import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { applicationSchema } from "@/lib/application";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

type Field = "name" | "city" | "height" | "contact";

const FIELDS: { id: Field; label: string; placeholder: string; type?: string; inputMode?: "numeric" }[] = [
  { id: "name", label: "Имя", placeholder: "Аружан" },
  { id: "city", label: "Город", placeholder: "Алматы" },
  { id: "height", label: "Рост, см", placeholder: "175", inputMode: "numeric" },
  { id: "contact", label: "Соцсети или Telegram", placeholder: "@username или ссылка" },
];

const empty: Record<Field, string> = { name: "", city: "", height: "", contact: "" };

export function Apply() {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [sending, setSending] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const result = applicationSchema.safeParse(values);
    if (!result.success) {
      const next: Partial<Record<Field, string>> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as Field;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    setSending(true);
    window.setTimeout(() => {
      setSending(false);
      setValues(empty);
      toast.success("Анкета отправлена", {
        description: `${result.data.name}, агент свяжется с вами в течение 48 часов.`,
      });
    }, 700);
  };

  return (
    <section id="apply" className="bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-16 px-5 py-24 md:px-10 md:py-36 lg:grid-cols-12">
        <Reveal className="lg:col-span-6">
          <p className="eyebrow mb-8 text-ink-muted">11 — Анкета модели</p>
          <h2 className="display text-[clamp(2.25rem,9vw,4.25rem)]">
            Твое
            <br />
            лицо —
            <br />
            следующее
          </h2>
          <p className="mt-10 max-w-md text-lg leading-relaxed text-ink-muted">
            Четыре поля и минута времени. Без опыта, без вложений — ответ агента в течение 48 часов.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="lg:col-span-6 lg:pt-16">
          <form onSubmit={onSubmit} noValidate className="flex flex-col gap-8">
            {FIELDS.map((f) => (
              <div key={f.id}>
                <label htmlFor={f.id} className="eyebrow text-ink-muted">
                  {f.label}
                </label>
                <input
                  id={f.id}
                  name={f.id}
                  inputMode={f.inputMode}
                  placeholder={f.placeholder}
                  value={values[f.id]}
                  onChange={(e) => setValues((v) => ({ ...v, [f.id]: e.target.value }))}
                  aria-invalid={!!errors[f.id]}
                  aria-describedby={errors[f.id] ? `${f.id}-error` : undefined}
                  className={cn(
                    "mt-3 w-full border-b bg-transparent pb-3 font-display text-2xl tracking-tight text-ink-foreground outline-none transition-colors duration-300 placeholder:text-ink-muted/50 focus:border-ink-foreground md:text-3xl",
                    errors[f.id] ? "border-destructive" : "border-ink-border",
                  )}
                />
                {errors[f.id] && (
                  <p id={`${f.id}-error`} className="mt-2 text-sm text-destructive">
                    {errors[f.id]}
                  </p>
                )}
              </div>
            ))}
            <Button type="submit" variant="inverse" size="xl" disabled={sending} className="mt-4 self-start">
              {sending ? "Отправляем…" : "Отправить анкету"} <ArrowRight />
            </Button>
            <p className="text-xs text-ink-muted">
              Нажимая кнопку, вы соглашаетесь на обработку персональных данных.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
