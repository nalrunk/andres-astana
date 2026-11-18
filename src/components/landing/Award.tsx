import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useMotionOn } from "@/lib/motion-preference";
import { Reveal } from "./Reveal";
import { AWARD_DEADLINE, NOMINEES } from "./data";

const VOTE_KEY = "andres-award-vote";

function timeLeft(target: Date, now: number) {
  const diff = Math.max(0, target.getTime() - now);
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function Award() {
  const on = useMotionOn();
  const [now, setNow] = useState<number | null>(null);
  const [votes, setVotes] = useState(() => NOMINEES.map((n) => n.votes));
  const [votedFor, setVotedFor] = useState<string | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    const saved = window.localStorage.getItem(VOTE_KEY);
    if (saved) {
      setVotedFor(saved);
      setVotes(NOMINEES.map((n) => (n.name === saved ? n.votes + 1 : n.votes)));
    }
    return () => window.clearInterval(id);
  }, []);

  const t = now === null ? null : timeLeft(AWARD_DEADLINE, now);
  const max = Math.max(...votes);
  const total = votes.reduce((a, b) => a + b, 0);

  const vote = (name: string, index: number) => {
    if (votedFor) return;
    setVotedFor(name);
    setVotes((v) => v.map((x, i) => (i === index ? x + 1 : x)));
    window.localStorage.setItem(VOTE_KEY, name);
    toast.success("Голос учтен", { description: `Спасибо! Вы проголосовали за ${name}.` });
  };

  const units = [
    { label: "дней", value: t?.days },
    { label: "часов", value: t?.hours },
    { label: "минут", value: t?.minutes },
    { label: "секунд", value: t?.seconds },
  ];

  return (
    <section id="award" className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow mb-6 text-muted-foreground">06 — Премия</p>
          <h2 className="display text-4xl md:text-6xl">
            New Face
            <br />
            Award 2026
          </h2>
          <p className="mt-8 max-w-md text-muted-foreground">
            Ежегодная премия агентства. Победительница получает контракт на кампанию бренда-партнера и съемку для
            обложки. Голосование открыто до финала 20 декабря.
          </p>

          <div className="mt-12 grid grid-cols-4 border-l border-t border-foreground">
            {units.map((u) => (
              <div key={u.label} className="min-w-0 border-b border-r border-foreground p-2.5 sm:p-3 md:p-5">
                <p className="display text-2xl tabular-nums sm:text-3xl md:text-5xl">
                  {u.value === undefined ? "––" : String(u.value).padStart(2, "0")}
                </p>
                <p className="mt-2 text-[0.6rem] uppercase tracking-[0.12em] text-muted-foreground sm:tracking-[0.2em]">{u.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="lg:col-span-7">
          <div className="mb-4 flex items-center justify-between">
            <p className="eyebrow text-muted-foreground">Топ-5 участниц</p>
            <p className="eyebrow text-muted-foreground">{total.toLocaleString("ru-RU")} голосов</p>
          </div>
          <div role="list">
            {NOMINEES.map((n, i) => {
              const count = votes[i] ?? n.votes;
              const share = Math.round((count / total) * 100);
              const width = `${(count / max) * 100}%`;
              const isVoted = votedFor === n.name;
              return (
                <Reveal key={n.name} delay={i * 0.06}>
                  <div role="listitem" className="flex items-center gap-4 border-t border-border py-5 md:gap-6">
                    <span className="font-display w-6 text-sm text-muted-foreground">0{i + 1}</span>
                    <img
                      src={n.photo}
                      alt={n.name}
                      width={768}
                      height={1024}
                      loading="lazy"
                      className="photo-bw h-16 w-12 shrink-0 object-cover md:h-20 md:w-16"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold uppercase tracking-wide md:text-base">{n.name}</p>
                          <p className="text-xs text-muted-foreground">{n.city}</p>
                        </div>
                        <p className="font-display shrink-0 text-sm tabular-nums">{share}%</p>
                      </div>
                      <div className="mt-3 h-1 w-full bg-accent">
                        {on ? (
                          <motion.div
                            className="h-full bg-foreground"
                            initial={{ width: 0 }}
                            whileInView={{ width }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, delay: 0.2 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                          />
                        ) : (
                          <div className="h-full bg-foreground" style={{ width }} />
                        )}
                      </div>
                    </div>
                    <Button
                      variant={isVoted ? "editorial" : "editorialOutline"}
                      size="sm"
                      className="h-9 shrink-0 px-3 md:px-5"
                      disabled={!!votedFor && !isVoted}
                      onClick={() => vote(n.name, i)}
                      aria-pressed={isVoted}
                    >
                      {isVoted ? "Ваш голос" : "Голосовать"}
                    </Button>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">Один голос с одного устройства.</p>
        </div>
      </div>
    </section>
  );
}
