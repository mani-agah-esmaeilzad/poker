"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  Flame,
  Loader2,
  Sparkles,
  Timer,
  Trophy,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import {
  fetchTableState,
  requestHeroAction,
  requestNewHand,
  type ApiCard,
  type ApiTableState,
} from "@/lib/api";

const seatPositions = [
  "bottom-6 left-1/2 -translate-x-1/2",
  "left-6 bottom-1/4",
  "left-6 top-1/4",
  "right-6 top-1/4",
  "right-6 bottom-1/4",
];

const colorMap: Record<string, string> = {
  slate: "text-slate-100",
  rose: "text-rose-300",
  cyan: "text-cyan-300",
  emerald: "text-emerald-300",
};

const actionLabels: Record<string, string> = {
  fold: "Fold",
  call: "Call",
  raise: "Raise",
  check: "Check",
  bet: "Bet",
  "new-hand": "New hand",
};

export function PokerTable() {
  const [table, setTable] = useState<ApiTableState | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hero = useMemo(() => table?.players.find((player) => player.isHero) ?? null, [table]);
  const boardCards = useMemo(() => {
    if (!table) return [] as (ApiCard | null)[];
    const padded = [...table.board];
    while (padded.length < 5) {
      padded.push(null);
    }
    return padded;
  }, [table]);

  const loadTable = async () => {
    try {
      const snapshot = await fetchTableState();
      setTable(snapshot);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Unable to reach the poker engine.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    const bootstrap = async () => {
      if (!mounted) return;
      await loadTable();
    };
    bootstrap();
    const interval = setInterval(() => {
      loadTable();
    }, 4000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const runAction = async (action: string) => {
    setActionLoading(true);
    setError(null);
    try {
      const updated =
        action === "new-hand" ? await requestNewHand() : await requestHeroAction(action);
      setTable(updated);
    } catch (err) {
      console.error(err);
      setError("Action failed. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  const callAmount = useMemo(() => {
    if (!table || !hero) return 0;
    return Math.max(0, table.currentBet - hero.bet);
  }, [table, hero]);

  const stageCopy = table?.stage ? table.stage.toUpperCase() : "IDLE";
  const actionButtons = table?.heroOptions ?? [];

  return (
    <section className="glass-panel relative mt-16 overflow-hidden border border-white/10 p-6 shadow-[0_45px_120px_rgba(2,6,23,0.8)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),transparent_65%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(16,185,129,0.12),transparent_55%)]" />
      <div className="relative z-10 flex flex-col gap-8">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-slate-400">
              <Sparkles className="h-4 w-4 text-emerald-300" />
              Live Texas Hold&apos;em Arena
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-white">Nebula Mirage Feature Table</h2>
            <p className="text-sm text-slate-400">Stage · {stageCopy}</p>
          </div>
          <div className="flex gap-3 text-sm text-slate-400">
            <div className="rounded-2xl border border-white/10 px-4 py-2 text-right">
              <p className="text-xs uppercase tracking-[0.3em]">Pot</p>
              <p className="text-lg font-semibold text-white">{table?.pot ?? 0} chips</p>
            </div>
            <div className="rounded-2xl border border-white/10 px-4 py-2 text-right">
              <p className="text-xs uppercase tracking-[0.3em]">Players</p>
              <p className="text-lg font-semibold text-white">{table?.players.length ?? 0}</p>
            </div>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="relative overflow-hidden rounded-[32px] border border-slate-700/60 bg-gradient-to-br from-emerald-900/20 via-slate-900 to-slate-950 p-8">
            <div className="absolute inset-0 rounded-[32px] bg-[radial-gradient(circle,_rgba(16,185,129,0.2),transparent_60%)]" />
            <div className="relative z-10">
              <div className="mx-auto flex w-fit flex-col items-center justify-center rounded-2xl border border-emerald-400/30 bg-slate-950/70 px-6 py-4 text-center">
                <p className="text-xs uppercase tracking-[0.4em] text-emerald-200/80">Pot Size</p>
                <p className="text-3xl font-bold text-white">{table?.pot ?? 0} chips</p>
                <p className="text-xs text-slate-400">Current bet · {table?.currentBet ?? 0}</p>
              </div>

              <div className="relative mt-8 h-[380px]">
                <div className="absolute inset-16 rounded-[200px] border border-emerald-300/40 bg-gradient-to-b from-emerald-900/70 to-slate-900 shadow-inner shadow-emerald-700/40" />
                <div className="relative z-10 flex flex-col items-center gap-3 pt-12">
                  <p className="text-xs uppercase tracking-[0.5em] text-slate-400">Board</p>
                  <div className="flex gap-3">
                    <AnimatePresence mode="wait" initial={false}>
                      {boardCards.map((card, index) => (
                        <motion.div
                          key={`${card?.code ?? "blank"}-${index}`}
                          initial={{ opacity: 0, y: 40, rotate: -15 + index * 6 }}
                          animate={{ opacity: 1, y: 0, rotate: -6 + index * 3 }}
                          exit={{ opacity: 0, y: -40, rotate: 10 }}
                          transition={{ duration: 0.5, delay: index * 0.08 }}
                          className={clsx(
                            "relative h-28 w-20 rounded-2xl border border-white/10 bg-slate-900/90 px-3 py-4 text-center text-2xl font-semibold text-white shadow-[0_20px_45px_rgba(2,6,23,0.85)]",
                            !card && "opacity-40",
                          )}
                        >
                          {card ? (
                            <>
                              <span className={clsx("block text-3xl", colorMap[card.color] ?? "text-slate-100")}>{card.label}</span>
                              <span className={clsx("text-lg", colorMap[card.color] ?? "text-slate-100")}>{card.symbol}</span>
                            </>
                          ) : (
                            <span className="text-sm text-slate-500">?</span>
                          )}
                          <span className="absolute inset-1 rounded-2xl border border-white/5" />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                {(table?.players ?? []).map((player) => (
                  <motion.div
                    key={player.id}
                    className={clsx(
                      "absolute flex w-48 flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-slate-100 shadow-lg backdrop-blur",
                      seatPositions[player.seat] ?? "top-1/2 left-1/2 -translate-x-1/2",
                      player.folded && "opacity-60",
                      player.isHero && "ring-2 ring-emerald-300/80",
                    )}
                    animate={{
                      scale: player.isHero ? 1.05 : 1,
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-base font-semibold text-white">{player.name}</p>
                        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{player.status}</p>
                      </div>
                      <span className="text-xl">{player.avatar}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span>Stack</span>
                      <strong className="text-lg text-white">{player.stack}</strong>
                    </div>
                    {player.isHero && (
                      <div className="flex gap-2">
                        {player.hand.map((card) => (
                          <div
                            key={card.code}
                            className="flex h-12 w-8 flex-col items-center justify-center rounded-xl border border-white/20 bg-slate-900 text-white"
                          >
                            <span className={clsx("text-lg", colorMap[card.color] ?? "text-slate-100")}>{card.label}</span>
                            <span className={clsx("text-xs", colorMap[card.color] ?? "text-slate-100")}>{card.symbol}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="glass-panel flex flex-col gap-4 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Your move</p>
                  <p className="text-lg text-white">Choose an action</p>
                </div>
                <Timer className="h-6 w-6 text-cyan-300" />
              </div>
              <div className="flex flex-wrap gap-3">
                {actionButtons.map((action) => (
                  <button
                    key={action}
                    disabled={actionLoading}
                    onClick={() => runAction(action)}
                    className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/70 disabled:opacity-50"
                  >
                    {getActionLabel(action, callAmount, table?.minRaise ?? 0)}
                  </button>
                ))}
              </div>
              {table?.winner && (
                <div className="rounded-2xl border border-amber-300/40 bg-amber-400/10 p-4 text-sm text-amber-100">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.4em]">
                    <Trophy className="h-4 w-4" /> Winner
                  </div>
                  <p className="mt-2 text-lg font-semibold text-white">{table.winner.players.join(" & ")}</p>
                  {table.winner.rank && <p className="text-xs text-amber-200">{table.winner.rank}</p>}
                </div>
              )}
              {error && (
                <div className="rounded-2xl border border-rose-400/40 bg-rose-400/10 p-3 text-sm text-rose-100">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    {error}
                  </div>
                </div>
              )}
              <button
                onClick={() => runAction("new-hand")}
                className="btn-primary flex items-center justify-center gap-2"
                disabled={actionLoading}
              >
                {actionLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Start new hand"}
              </button>
            </div>

            <div className="glass-panel flex flex-col gap-4 p-5">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-slate-400">
                <Flame className="h-4 w-4 text-rose-300" /> Live feed
              </div>
              <ul className="flex flex-col gap-3 text-sm text-slate-300">
                {(table?.log ?? []).map((entry) => (
                  <li key={entry} className="border-b border-white/5 pb-2 last:border-b-0 last:pb-0">
                    {entry}
                  </li>
                ))}
                {!table?.log?.length && <li>No recent actions.</li>}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/80">
          <div className="flex items-center gap-3 text-sm text-slate-200">
            <Loader2 className="h-5 w-5 animate-spin" />
            Connecting to poker engine...
          </div>
        </div>
      )}
    </section>
  );
}

function getActionLabel(action: string, callAmount: number, minRaise: number) {
  if (action === "call" && callAmount > 0) {
    return `${actionLabels[action]} ${callAmount}`;
  }
  if (action === "raise") {
    return `${actionLabels[action]} +${minRaise}`;
  }
  if (action === "bet") {
    return "Bet";
  }
  if (action === "new-hand") {
    return "Start new hand";
  }
  return actionLabels[action] ?? action;
}
