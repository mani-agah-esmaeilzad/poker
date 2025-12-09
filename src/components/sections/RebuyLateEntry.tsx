"use client";

import { Repeat, ShieldCheck, Ticket } from "lucide-react";

const cards = [
  {
    title: "Rebuy",
    icon: Repeat,
    bullets: [
      "Available only during the first 30 minutes of play.",
      "Players return with the original starting stack.",
      "UI can capture whether missed blinds should be deducted.",
    ],
    chip: "Admin toggle",
  },
  {
    title: "Late Entry",
    icon: Ticket,
    bullets: [
      "Allowed up to 30 minutes after kickoff.",
      "Missed blinds are subtracted from the player’s stack.",
      "Only SB/BB per orbit are charged to keep seating balanced.",
    ],
    chip: "Automatic penalty",
  },
];

export function RebuyLateEntry() {
  return (
    <section className="glass-panel flex flex-col gap-5 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
            Rebuy & late entry
          </p>
          <h3 className="text-2xl font-semibold text-white">
            Extra lives & late arrivals
          </h3>
          <p className="text-sm text-slate-400">
            Every nuance from the PDF is expressed visually so the back end just hooks up the toggles and penalties.
          </p>
        </div>
        <ShieldCheck className="h-8 w-8 text-emerald-300" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {cards.map(({ title, icon: Icon, bullets, chip }) => (
          <div
            key={title}
            className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-slate-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-cyan-300">
                  {chip}
                </p>
                <h4 className="text-xl font-semibold text-white">{title}</h4>
              </div>
              <Icon className="h-5 w-5 text-emerald-300" />
            </div>
            <ul className="mt-3 space-y-2">
              {bullets.map((bullet) => (
                <li key={bullet} className="flex gap-2">
                  <span className="text-cyan-300">•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
