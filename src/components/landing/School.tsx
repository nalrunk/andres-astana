import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { enrollmentSchema } from "@/lib/enrollment";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { COURSES, COURSE_CATEGORY_LABEL, COURSE_TABS, SELECTION_TERMS, type CourseCategory } from "./data";

const SUCCESS_TEXT = "Заявка принята! Наш скаут свяжется с вами в течение дня.";

const courseLabel = (c: (typeof COURSES)[number]) => `${c.title} · ${c.city} · старт ${c.start}`;

const seatsWord = (n: number) => {
  const m10 = n % 10;
  const m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return "место";
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return "места";
  return "мест";
};

/** Course schedule + enrollment form; «Записаться» preselects the course in the form below. */
export function School() {
  const [selected, setSelected] = useState("");

  const enroll = (id: string) => {
    setSelected(id);
    document.getElementById("enroll")?.scrollIntoView({ block: "start" });
  };

  return (
    <>
      <Courses onEnroll={enroll} />
      <EnrollForm course={selected} onCourseChange={setSelected} />
    </>
  );
}

function Courses({ onEnroll }: { onEnroll: (id: string) => void }) {
  const [tab, setTab] = useState<CourseCategory | "all">("all");
  const list = tab === "all" ? COURSES : COURSES.filter((c) => c.category === tab);

  return (
    <section id="courses" className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
      <Reveal className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="eyebrow mb-6 text-muted-foreground">09 — Школа моделей</p>
          <h2 className="display text-4xl md:text-7xl">
            Расписание
            <br />
            курсов
          </h2>
        </div>
        <p className="max-w-sm text-muted-foreground">
          Ближайшие потоки в Алматы, Астане и Шымкенте. Группы до 12 человек, занятия ведут действующие модели и
          фотографы агентства.
        </p>
      </Reveal>

      <div role="tablist" aria-label="Тип курса" className="mb-10 flex gap-0 overflow-x-auto border-b border-border">
        {COURSE_TABS.map((t) => (
          <button
            key={t.value}
            type="button"
            role="tab"
            aria-selected={tab === t.value}
            onClick={() => setTab(t.value)}
            className={cn(
              "eyebrow -mb-px shrink-0 border-b-2 px-4 py-4 transition-colors duration-300 md:px-6",
              tab === t.value
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <ul className="border-t border-foreground">
        {list.map((c) => (
          <li
            key={c.id}
            className="grid gap-6 border-b border-border py-8 transition-colors duration-500 hover:bg-secondary md:grid-cols-12 md:items-start md:px-4"
          >
            <div className="md:col-span-3">
              <p className="font-display text-2xl tracking-tight">Старт: {c.start}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {c.duration} · {c.city}
              </p>
            </div>
            <div className="md:col-span-5">
              <p className="eyebrow text-muted-foreground">{COURSE_CATEGORY_LABEL[c.category]}</p>
              <h3 className="mt-2 text-lg font-semibold uppercase tracking-wide">{c.title}</h3>
              <ul className="mt-4 space-y-2">
                {c.program.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm">
                    <span className="mt-2 h-px w-4 shrink-0 bg-foreground" aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-sm md:col-span-2">
              <p>{c.schedule}</p>
              <p className={cn("mt-2", c.seatsLeft <= 3 ? "font-semibold text-foreground" : "text-muted-foreground")}>
                Осталось {c.seatsLeft} {seatsWord(c.seatsLeft)}
              </p>
            </div>
            <div className="md:col-span-2 md:text-right">
              <Button variant="editorialOutline" size="lg" onClick={() => onEnroll(c.id)} className="w-full md:w-auto">
                Записаться
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

type Values = { fullName: string; age: string; height: string; contact: string; consent: boolean };
type ErrorKey = keyof Values | "course";
const empty: Values = { fullName: "", age: "", height: "", contact: "", consent: false };

const inputClass = (invalid: boolean) =>
  cn(
    "mt-3 w-full border-b bg-transparent pb-3 font-display text-xl tracking-tight text-foreground outline-none transition-colors duration-300 placeholder:text-muted-foreground/50 focus:border-foreground md:text-2xl",
    invalid ? "border-destructive" : "border-input",
  );

function EnrollForm({ course, onCourseChange }: { course: string; onCourseChange: (id: string) => void }) {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState<Partial<Record<ErrorKey, string>>>({});
  const [done, setDone] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  const set = (k: keyof Values) => (v: string | boolean) => setValues((s) => ({ ...s, [k]: v }));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const result = enrollmentSchema.safeParse({ ...values, course });
    if (!result.success) {
      const next: Partial<Record<ErrorKey, string>> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as ErrorKey;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    setSending(true);
    window.setTimeout(() => {
      setSending(false);
      setDone(result.data.fullName.split(/\s+/)[0] ?? "");
      setValues(empty);
      toast.success(SUCCESS_TEXT);
    }, 700);
  };

  const field = (id: "fullName" | "age" | "height" | "contact", label: string, placeholder: string, numeric = false) => (
    <div>
      <label htmlFor={`enroll-${id}`} className="eyebrow text-muted-foreground">
        {label}
      </label>
      <input
        id={`enroll-${id}`}
        inputMode={numeric ? "numeric" : undefined}
        placeholder={placeholder}
        value={values[id]}
        onChange={(e) => set(id)(e.target.value)}
        aria-invalid={!!errors[id]}
        aria-describedby={errors[id] ? `enroll-${id}-error` : undefined}
        className={inputClass(!!errors[id])}
      />
      {errors[id] && (
        <p id={`enroll-${id}-error`} className="mt-2 text-sm text-destructive">
          {errors[id]}
        </p>
      )}
    </div>
  );

  return (
    <section id="enroll" className="mx-auto max-w-[1440px] scroll-mt-20 px-5 pb-24 md:px-10 md:pb-32">
      <div className="grid border-2 border-foreground lg:grid-cols-12">
        <Reveal className="border-b-2 border-foreground p-6 md:p-12 lg:col-span-5 lg:border-b-0 lg:border-r-2">
          <p className="eyebrow mb-8 text-muted-foreground">10 — Запись на курс</p>
          <h2 className="display text-[clamp(1.9rem,8.5vw,3.25rem)] lg:text-[clamp(2rem,3.4vw,3.25rem)]">
            Начни
            <br />
            карьеру
            <br />в моделинге
          </h2>
          <p className="eyebrow mb-4 mt-12 text-muted-foreground">Условия отбора</p>
          <ul className="space-y-3">
            {SELECTION_TERMS.map((t) => (
              <li key={t} className="flex items-start gap-3 text-sm leading-relaxed">
                <Check className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="p-6 md:p-12 lg:col-span-7">
          {done ? (
            <div className="flex h-full min-h-[420px] flex-col justify-center" role="status">
              <p className="eyebrow text-muted-foreground">Готово</p>
              <p className="display mt-6 text-[clamp(2rem,5vw,3.5rem)]">Заявка принята!</p>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
                {done}, наш скаут свяжется с вами в течение дня.
              </p>
              <Button
                variant="editorialOutline"
                size="xl"
                className="mt-10 self-start"
                onClick={() => {
                  setDone(null);
                  onCourseChange("");
                }}
              >
                Записаться еще на курс
              </Button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="flex flex-col gap-8">
              {field("fullName", "Имя и фамилия", "Аружан Ермекова")}
              <div className="grid grid-cols-2 gap-6">
                {field("age", "Возраст", "19", true)}
                {field("height", "Рост, см", "174", true)}
              </div>
              {field("contact", "Телефон или Telegram", "+7 701 000 00 00")}

              <div>
                <label htmlFor="enroll-course" className="eyebrow text-muted-foreground">
                  Курс
                </label>
                <Select value={course} onValueChange={onCourseChange}>
                  <SelectTrigger
                    id="enroll-course"
                    aria-invalid={!!errors.course}
                    className={cn(
                      "mt-3 h-14 rounded-none border-x-0 border-t-0 px-0 text-left text-base shadow-none focus:ring-0",
                      errors.course ? "border-destructive" : "border-input",
                    )}
                  >
                    <SelectValue placeholder="Выберите курс" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none">
                    {COURSES.map((c) => (
                      <SelectItem key={c.id} value={c.id} className="rounded-none">
                        {courseLabel(c)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.course && <p className="mt-2 text-sm text-destructive">{errors.course}</p>}
              </div>

              <div>
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="enroll-consent"
                    checked={values.consent}
                    onCheckedChange={(v) => set("consent")(v === true)}
                    aria-invalid={!!errors.consent}
                    className={cn("mt-0.5 h-5 w-5 rounded-none", errors.consent && "border-destructive")}
                  />
                  <label htmlFor="enroll-consent" className="cursor-pointer text-sm leading-relaxed">
                    Согласен(на) на обработку персональных данных
                  </label>
                </div>
                {errors.consent && <p className="mt-2 text-sm text-destructive">{errors.consent}</p>}
              </div>

              <Button type="submit" variant="editorial" size="xl" disabled={sending} className="self-start">
                {sending ? "Отправляем…" : "Отправить заявку"} <ArrowRight />
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
