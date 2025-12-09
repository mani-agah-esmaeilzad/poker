"use client";

import clsx from "clsx";
import { useState } from "react";

type Level = {
  level: string;
  blinds: string;
  ante: string;
  duration: string;
};

type Structure = {
  label: string;
  subtitle: string;
  summary: string;
  levels: Level[];
};

const structures: Structure[] = [
  {
    label: "≤ 50K Stack",
    subtitle: "Opens at 25 / 50",
    summary:
      "Fast levels (4–20 minutes) that ramp all the way up to 200k / 400k blinds.",
    levels: [
      { level: "1", blinds: "25 / 50", ante: "-", duration: "4m" },
      { level: "4", blinds: "200 / 400", ante: "-", duration: "10m" },
      { level: "8", blinds: "2k / 4k", ante: "-", duration: "15m" },
      { level: "12", blinds: "25k / 50k", ante: "5k", duration: "20m" },
      { level: "Final", blinds: "200k / 400k", ante: "80k", duration: "20m" },
    ],
  },
  {
    label: "50K – 100K",
    subtitle: "Opens at 100 / 200",
    summary: "Mid-tier progression tuned for offline/online events with average stacks.",
    levels: [
      { level: "1", blinds: "100 / 200", ante: "-", duration: "12m" },
      { level: "3", blinds: "400 / 800", ante: "-", duration: "12m" },
      { level: "6", blinds: "2k / 4k", ante: "500", duration: "15m" },
      { level: "9", blinds: "10k / 20k", ante: "2k", duration: "18m" },
      { level: "Final", blinds: "20k / 40k", ante: "4k", duration: "20m" },
    ],
  },
  {
    label: "100K – 500K",
    subtitle: "Opens at 500 / 1k",
    summary:
      "Deep-stack pacing for feature tables and streams, growing toward 40k / 80k.",
    levels: [
      { level: "1", blinds: "500 / 1k", ante: "-", duration: "15m" },
      { level: "4", blinds: "2k / 4k", ante: "500", duration: "15m" },
      { level: "7", blinds: "6k / 12k", ante: "1k", duration: "18m" },
      { level: "10", blinds: "15k / 30k", ante: "2k", duration: "20m" },
      { level: "Final", blinds: "40k / 80k", ante: "8k", duration: "20m" },
    ],
  },
];

export function BlindStructure() {
  const [active, setActive] = useState(structures[0].label);
  const selected = structures.find((item) => item.label === active) ?? structures[0];

  return (
    <section className="glass-panel flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
          Blind structure
        </p>
        <h3 className="text-2xl font-semibold text-white">
          Level timelines based on starting stack
        </h3>
        <p className="text-sm text-slate-400">
          Pulled directly from the PDF so back-end logic can wire up the exact same schedule.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        {structures.map(({ label, subtitle }) => (
          <button
            key={label}
            onClick={() => setActive(label)}
            className={clsx(
              "w-full rounded-2xl border px-4 py-3 text-left text-sm transition sm:w-auto sm:rounded-full sm:text-center",
              label === active
                ? "border-emerald-300/60 bg-emerald-400/20 text-white"
                : "border-white/10 text-slate-300 hover:border-white/40",
            )}
          >
            <span className="block text-xs uppercase tracking-[0.3em] text-slate-400">
              {subtitle}
            </span>
            {label}
          </button>
        ))}
      </div>

      <p className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
        {selected.summary}
      </p>

      <div className="overflow-x-auto rounded-3xl border border-white/10">
        <table className="min-w-[520px] w-full text-sm text-slate-200">
          <thead className="bg-white/5 text-xs uppercase tracking-[0.3em] text-slate-400">
            <tr>
              <th className="px-4 py-3 text-left">Level</th>
              <th className="px-4 py-3 text-left">Blinds</th>
              <th className="px-4 py-3 text-left">Ante</th>
              <th className="px-4 py-3 text-left">Duration</th>
            </tr>
          </thead>
          <tbody>
            {selected.levels.map(({ level, blinds, ante, duration }) => (
              <tr
                key={`${selected.label}-${level}`}
                className="border-t border-white/5 odd:bg-white/0 even:bg-white/5"
              >
                <td className="px-4 py-3 font-medium text-white">{level}</td>
                <td className="px-4 py-3">{blinds}</td>
                <td className="px-4 py-3">{ante}</td>
                <td className="px-4 py-3">{duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
