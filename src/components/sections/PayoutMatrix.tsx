"use client";

import { motion } from "framer-motion";
import { Coins, Gem, HandCoins } from "lucide-react";

type Payout = {
  label: string;
  rake: string;
  Icon: typeof Coins;
  description: string;
  rows: { place: string; share: string }[];
};

const payoutPlans: Payout[] = [
  {
    label: "3 winners",
    description: "Short-handed high-stakes finales.",
    rake: "40% platform fee",
    Icon: Gem,
    rows: [
      { place: "1st", share: "30%" },
      { place: "2nd", share: "20%" },
      { place: "3rd", share: "10%" },
    ],
  },
  {
    label: "4 winners",
    description: "Default structure for primary events.",
    rake: "45% platform fee",
    Icon: HandCoins,
    rows: [
      { place: "1st", share: "25%" },
      { place: "2nd", share: "15%" },
      { place: "3rd", share: "10%" },
      { place: "4th", share: "5%" },
    ],
  },
  {
    label: "8 winners",
    description: "Used for marathons and leaderboard majors.",
    rake: "40% platform fee",
    Icon: Coins,
    rows: [
      { place: "1st", share: "20%" },
      { place: "2nd", share: "15%" },
      { place: "3rd", share: "10%" },
      { place: "4th", share: "5%" },
      { place: "5th", share: "4%" },
      { place: "6th", share: "3%" },
      { place: "7th", share: "2%" },
      { place: "8th", share: "1%" },
    ],
  },
];

export function PayoutMatrix() {
  return (
    <section className="glass-panel flex flex-col gap-5 p-6">
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
          Prize distribution
        </p>
        <h3 className="text-2xl font-semibold text-white">
          Tournament ending scenarios & payouts
        </h3>
        <p className="text-sm text-slate-400">
          When the remaining seats equal the paid positions we trigger the “finish now?” modal, and admins can still edit these splits.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {payoutPlans.map(({ label, description, rake, rows, Icon }) => (
          <motion.div
            key={label}
            whileHover={{ y: -4 }}
            className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-emerald-300">
                  {label}
                </p>
                <p className="text-white">{description}</p>
              </div>
              <Icon className="h-5 w-5 text-cyan-300" />
            </div>
            <p className="mt-1 text-xs text-slate-400">{rake}</p>
            <div className="mt-3 space-y-1">
              {rows.map(({ place, share }) => (
                <div
                  key={`${label}-${place}`}
                  className="flex items-center justify-between rounded-xl border border-white/5 bg-slate-950/50 px-3 py-2"
                >
                  <span className="font-semibold text-white">{place}</span>
                  <span>{share}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
