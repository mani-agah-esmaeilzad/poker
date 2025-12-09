"use client";

import { motion } from "framer-motion";
import {
  Eye,
  Layers,
  PlayCircle,
  Shuffle,
  Timer,
  Trophy,
  Users2,
} from "lucide-react";

type Step = {
  title: string;
  subtitle: string;
  bullets: string[];
  Icon: typeof Shuffle;
};

const workflow: Step[] = [
  {
    title: "Setup & Blinds",
    subtitle: "Dealer button rotation & blind posting",
    bullets: [
      "The button rotates every hand to keep positions fair.",
      "Seats immediately left of the button auto-post small and big blinds.",
      "Before cards fly, the engine syncs stacks, seats, and ambient sound.",
    ],
    Icon: Shuffle,
  },
  {
    title: "Pre-Flop",
    subtitle: "Two hole cards + opening betting round",
    bullets: [
      "Every player receives exactly two concealed cards.",
      "Action begins with the seat left of the big blind.",
      "Permitted actions: fold, call, raise, shove.",
    ],
    Icon: PlayCircle,
  },
  {
    title: "Flop / Turn / River",
    subtitle: "Board cards & betting cadence",
    bullets: [
      "Flop reveals three cards at once before a full betting orbit.",
      "Turn and river are single-card reveals with a 60s action timer.",
      "If 90 seconds expire, the engine snaps the hand to a fold.",
    ],
    Icon: Layers,
  },
  {
    title: "Showdown & Payout",
    subtitle: "Crown winners and sync the leaderboard",
    bullets: [
      "Best five-card combo scoops the pot automatically.",
      "Dealer feed broadcasts the action and redistributes stacks.",
      "End of tournament pushes prizes straight into withdraw wallets.",
    ],
    Icon: Trophy,
  },
];

const engineHighlights = [
  {
    title: "Poker Game Room UI",
    description:
      "3D table, reactive seats, avatars, chips, and cards with dealing audio cues.",
    icon: Users2,
  },
  {
    title: "Dealer Updates",
    description:
      "HUD copy such as “Player X bets 40k”, “Dealing flop”, “Waiting on Aurora”.",
    icon: Eye,
  },
  {
    title: "Action timer",
    description:
      "60 second primary clock plus 30 second grace; at 90 seconds the player auto-folds.",
    icon: Timer,
  },
];

export function TournamentWorkflow() {
  return (
    <section className="mt-16">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.6em] text-slate-400">
            Tournament workflow
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-white">
            From registration to showdown
          </h2>
          <p className="text-sm text-slate-400">
            Every requirement from the PDF is mapped to a tangible UI sequence ready for front-end development.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {workflow.map(({ title, subtitle, bullets, Icon }) => (
          <motion.div
            key={title}
            whileHover={{ y: -4 }}
            className="glass-panel flex flex-col gap-3 p-6"
          >
            <div className="flex items-center gap-3">
              <span className="rounded-2xl bg-white/10 p-2">
                <Icon className="h-5 w-5 text-emerald-300" />
              </span>
              <div>
                <p className="text-sm uppercase tracking-[0.4em] text-slate-400">
                  {subtitle}
                </p>
                <h3 className="text-xl font-semibold text-white">{title}</h3>
              </div>
            </div>
            <ul className="flex flex-col gap-2 text-sm text-slate-300">
              {bullets.map((bullet) => (
                <li key={bullet} className="flex gap-2">
                  <span className="text-emerald-300">•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {engineHighlights.map(({ title, description, icon: Icon }) => (
          <div
            key={title}
            className="glow-ring card-shine flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-slate-300"
          >
            <Icon className="h-5 w-5 text-cyan-300" />
            <h4 className="text-lg font-semibold text-white">{title}</h4>
            <p>{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
