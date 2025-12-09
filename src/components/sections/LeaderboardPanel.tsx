"use client";

import { motion } from "framer-motion";
import { Medal, Sparkle, Trophy } from "lucide-react";

const leaderboard = [
  { rank: 1, player: "Aurora", points: 1280, cashes: 4 },
  { rank: 2, player: "Maverick", points: 1180, cashes: 5 },
  { rank: 3, player: "Shade", points: 940, cashes: 3 },
  { rank: 4, player: "NeonFox", points: 860, cashes: 2 },
  { rank: 5, player: "Lumen", points: 790, cashes: 4 },
  { rank: 6, player: "Orbit", points: 620, cashes: 2 },
  { rank: 7, player: "Nightshift", points: 540, cashes: 1 },
  { rank: 8, player: "Pulse", points: 500, cashes: 1 },
];

export function LeaderboardPanel() {
  return (
    <section className="glass-panel flex flex-col gap-5 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
            Leaderboard
          </p>
          <h3 className="text-2xl font-semibold text-white">
            Only the top 8 score points
          </h3>
          <p className="text-sm text-slate-400">
            We surface the first 200 ranks publicly, and every player can see their own score inside the profile hub.
          </p>
        </div>
        <Trophy className="h-8 w-8 text-amber-300" />
      </div>

      <div className="overflow-x-auto rounded-3xl border border-white/10 bg-white/5">
        <div className="min-w-[460px]">
          <div className="grid grid-cols-4 gap-2 px-4 py-3 text-xs uppercase tracking-[0.3em] text-slate-500">
            <span>Rank</span>
            <span>Player</span>
            <span>Points</span>
            <span>Cashes</span>
          </div>
          <div className="divide-y divide-white/5">
            {leaderboard.map(({ rank, player, points, cashes }) => (
              <div
                key={player}
                className="grid grid-cols-4 items-center px-4 py-3 text-sm text-slate-200"
              >
                <span className="flex items-center gap-2 text-white">
                  {rank <= 3 ? (
                    <Medal className="h-4 w-4 text-amber-300" />
                  ) : (
                    <Sparkle className="h-4 w-4 text-cyan-300" />
                  )}
                  #{rank}
                </span>
                <span className="font-semibold text-white">{player}</span>
                <span>{points}</span>
                <span>{cashes}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        whileHover={{ scale: 1.01 }}
        className="rounded-2xl border border-emerald-300/40 bg-emerald-400/10 p-4 text-sm text-emerald-100"
      >
        Every tournament seeds custom leaderboard points, so the back end can plug the same schema and hydrate it live.
      </motion.div>
    </section>
  );
}
