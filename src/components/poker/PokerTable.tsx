"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Flame, Sparkles, Timer, Trophy } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";

type Player = {
  name: string;
  stack: number;
  status: string;
  avatar: string;
  position: string;
};

type Card = {
  label: string;
  suit: "spades" | "hearts" | "clubs" | "diamonds";
};

const players: Player[] = [
  {
    name: "Maverick",
    stack: 1450,
    status: "Raises 2BB",
    avatar: "🂡",
    position: "top-6 left-1/2 -translate-x-1/2",
  },
  {
    name: "Aurora",
    stack: 1875,
    status: "Calls instantly",
    avatar: "🂮",
    position: "top-1/2 left-4 -translate-y-1/2",
  },
  {
    name: "NeonFox",
    stack: 980,
    status: "Thinking...",
    avatar: "🂭",
    position: "top-1/2 right-6 -translate-y-1/2",
  },
  {
    name: "Shade",
    stack: 2200,
    status: "Hero call",
    avatar: "🂱",
    position: "bottom-6 left-16",
  },
  {
    name: "Lumen",
    stack: 1610,
    status: "Dealer",
    avatar: "🂽",
    position: "bottom-6 right-16",
  },
];

const cardStages: Card[][] = [
  [
    { label: "A", suit: "spades" },
    { label: "K", suit: "spades" },
  ],
  [
    { label: "J", suit: "spades" },
    { label: "10", suit: "spades" },
    { label: "Q", suit: "spades" },
  ],
  [
    { label: "2", suit: "clubs" },
    { label: "A", suit: "hearts" },
    { label: "K", suit: "spades" },
    { label: "Q", suit: "spades" },
    { label: "10", suit: "spades" },
  ],
];

const liveFeed = [
  { action: "Shade bluffs all-in for 2.3 ETH", time: "12:56" },
  { action: "Maverick snap calls with nut flush", time: "12:55" },
  { action: "Aurora folds queens face-up", time: "12:54" },
  { action: "Pot swells to 4.8 ETH", time: "12:53" },
];

const suitColor: Record<Card["suit"], string> = {
  spades: "text-slate-100",
  clubs: "text-emerald-300",
  hearts: "text-rose-300",
  diamonds: "text-cyan-200",
};

const suitSymbol: Record<Card["suit"], string> = {
  spades: "♠",
  clubs: "♣",
  hearts: "♥",
  diamonds: "♦",
};

export function PokerTable() {
  const [activeSeat, setActiveSeat] = useState(0);
  const [stageIndex, setStageIndex] = useState(0);

  useEffect(() => {
    const seatInterval = setInterval(() => {
      setActiveSeat((prev) => (prev + 1) % players.length);
    }, 3200);

    return () => clearInterval(seatInterval);
  }, []);

  useEffect(() => {
    const cardsInterval = setInterval(() => {
      setStageIndex((prev) => (prev + 1) % cardStages.length);
    }, 5200);

    return () => clearInterval(cardsInterval);
  }, []);

  const currentCards = useMemo(() => cardStages[stageIndex], [stageIndex]);
  const potSize = useMemo(() => 4.8 + stageIndex * 0.4, [stageIndex]);

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
            <h2 className="mt-2 text-3xl font-semibold text-white">
              Neon Mirage High Stakes Table
            </h2>
          </div>
          <div className="flex gap-3 text-sm text-slate-400">
            <div className="rounded-2xl border border-white/10 px-4 py-2 text-right">
              <p className="text-xs uppercase tracking-[0.3em]">Blind Level</p>
              <p className="text-lg font-semibold text-white">20 / 40</p>
            </div>
            <div className="rounded-2xl border border-white/10 px-4 py-2 text-right">
              <p className="text-xs uppercase tracking-[0.3em]">Players</p>
              <p className="text-lg font-semibold text-white">05</p>
            </div>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="relative overflow-hidden rounded-[32px] border border-slate-700/60 bg-gradient-to-br from-emerald-900/20 via-slate-900 to-slate-950 p-8">
            <div className="absolute inset-0 rounded-[32px] bg-[radial-gradient(circle,_rgba(16,185,129,0.2),transparent_60%)]" />
            <div className="relative z-10">
              <motion.div
                key={stageIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mx-auto flex w-fit flex-col items-center justify-center rounded-2xl border border-emerald-400/30 bg-slate-950/70 px-6 py-4 text-center"
              >
                <p className="text-xs uppercase tracking-[0.4em] text-emerald-200/80">
                  Pot Size
                </p>
                <p className="text-3xl font-bold text-white">
                  {potSize.toFixed(1)} ETH
                </p>
                <p className="text-xs text-slate-400">Multiplier ×{(1.5 + stageIndex * 0.25).toFixed(1)}</p>
              </motion.div>

              <div className="relative mt-8 h-[380px]">
                <div className="absolute inset-16 rounded-[200px] border border-emerald-300/40 bg-gradient-to-b from-emerald-900/70 to-slate-900 shadow-inner shadow-emerald-700/40" />
                <div className="relative z-10 flex flex-col items-center gap-3 pt-12">
                  <p className="text-xs uppercase tracking-[0.5em] text-slate-400">Board</p>
                  <div className="flex gap-3">
                    <AnimatePresence mode="wait" initial={false}>
                      {currentCards.map((card, index) => (
                        <motion.div
                          key={`${stageIndex}-${card.label}-${card.suit}-${index}`}
                          initial={{ opacity: 0, y: 40, rotate: -15 + index * 6 }}
                          animate={{ opacity: 1, y: 0, rotate: -6 + index * 3 }}
                          exit={{ opacity: 0, y: -40, rotate: 10 }}
                          transition={{ duration: 0.5, delay: index * 0.08 }}
                          className="relative h-28 w-20 rounded-2xl border border-white/20 bg-slate-900/90 px-3 py-4 text-center text-2xl font-semibold text-white shadow-[0_20px_45px_rgba(2,6,23,0.85)]"
                        >
                          <span className={clsx("block text-3xl", suitColor[card.suit])}>{card.label}</span>
                          <span className={clsx("text-lg", suitColor[card.suit])}>{suitSymbol[card.suit]}</span>
                          <span className="absolute inset-1 rounded-2xl border border-white/5" />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                {players.map((player, index) => (
                  <motion.div
                    key={player.name}
                    animate={{
                      scale: activeSeat === index ? 1.05 : 1,
                      filter: activeSeat === index ? "brightness(1.15)" : "brightness(0.9)",
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className={clsx(
                      "absolute flex w-48 flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-slate-100 shadow-lg backdrop-blur",
                      player.position,
                      activeSeat === index ? "ring-2 ring-emerald-300/80" : "opacity-80",
                    )}
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
                      <strong className="text-lg text-white">{player.stack} BB</strong>
                    </div>
                    <div className="chip-stack">
                      <span style={{ height: "16px" }} />
                      <span />
                      <span style={{ height: "28px" }} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="glow-ring glass-panel relative overflow-hidden p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Momentum</p>
                  <p className="text-2xl font-semibold text-white">Aggressive table</p>
                </div>
                <Flame className="h-10 w-10 text-rose-400" />
              </div>
              <p className="mt-2 text-sm text-slate-300">
                Expect fireworks – average VPIP is 48% and pots are 3.2× higher than last orbit.
              </p>
              <div className="mt-4 h-1.5 w-full rounded-full bg-white/10">
                <motion.span
                  key={stageIndex}
                  initial={{ width: 0 }}
                  animate={{ width: `${60 + stageIndex * 15}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="block h-full rounded-full bg-gradient-to-r from-rose-400 via-amber-300 to-emerald-300"
                />
              </div>
            </div>

            <div className="glass-panel p-5">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-slate-400">
                <Timer className="h-4 w-4 text-cyan-300" />
                Action Feed
              </div>
              <div className="gradient-divider my-4" />
              <ul className="flex flex-col gap-3 text-sm text-slate-300">
                {liveFeed.map((item) => (
                  <li key={item.time} className="flex items-start justify-between">
                    <span className="max-w-[220px] text-white/90">{item.action}</span>
                    <span className="text-xs text-slate-500">{item.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-panel p-5">
              <div className="flex items-center gap-3">
                <Trophy className="h-10 w-10 text-amber-300" />
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Upcoming Feature Table</p>
                  <h4 className="text-xl font-semibold text-white">Nebula Masters · Day 1</h4>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-slate-300">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Buy-in</p>
                  <p className="text-white">1.5 ETH</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Seats</p>
                  <p className="text-white">Max 9</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Start</p>
                  <p className="text-white">20:00 UTC</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Format</p>
                  <p className="text-white">Deep Stack</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
