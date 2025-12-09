"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BadgeCheck,
  Crown,
  SatelliteDish,
  Sparkles,
  Star,
  UsersRound,
} from "lucide-react";
import { PokerTable } from "@/components/poker/PokerTable";
import { WalletPanel } from "@/components/wallet/WalletPanel";

const features: { title: string; description: string; Icon: LucideIcon; accent: string }[] = [
  {
    title: "Cinematic entry",
    description: "Dive through neon dust, volumetric lights, and pulsating HUD layers the moment you join.",
    Icon: Sparkles,
    accent: "from-blue-500/70 to-cyan-400/10",
  },
  {
    title: "Adaptive avatars",
    description: "Dynamic player totems react to tilt, win streaks, and timing tells in real-time.",
    Icon: UsersRound,
    accent: "from-purple-500/60 to-indigo-400/20",
  },
  {
    title: "Legendary runs",
    description: "Record breaking hands are stamped into your profile with cinematic recaps you can replay.",
    Icon: Crown,
    accent: "from-amber-400/60 to-lime-300/10",
  },
  {
    title: "Trusted security",
    description: "Multi-sig cold storage and MPC relays make every wallet handshake feel effortless.",
    Icon: BadgeCheck,
    accent: "from-emerald-400/60 to-teal-400/10",
  },
];

const highlights = [
  { label: "Active tables", value: "128" },
  { label: "Hands today", value: "482k" },
  { label: "Biggest pot", value: "12.4 ETH" },
];

const timeline = [
  { label: "Warm-up sprints", detail: "Sit-n-Go bursts every 12 minutes" },
  { label: "Nebula Masters", detail: "Texas Hold'em feature table · TV ready" },
  { label: "Afterglow cash", detail: "Deep stack session with streaming rail" },
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden px-6 pb-28 pt-8 sm:px-10 lg:px-16">
      <div className="floating-chip" style={{ top: "12%", right: "12%" }} />
      <div className="floating-chip" style={{ bottom: "18%", left: "16%" }} />
      <div className="floating-chip" style={{ top: "45%", left: "48%" }} />

      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-center justify-between gap-4 rounded-full border border-white/10 bg-white/5 px-6 py-4 text-sm backdrop-blur">
          <div className="font-semibold tracking-[0.3em] text-white">Nebula Hold&apos;em</div>
          <nav className="flex flex-wrap gap-4 text-slate-300">
            <Link href="#experience" className="hover:text-white">
              Experience
            </Link>
            <Link href="#poker" className="hover:text-white">
              Table
            </Link>
            <Link href="#wallet" className="hover:text-white">
              Wallet
            </Link>
          </nav>
          <div className="flex gap-2 text-sm">
            <Link href="/login" className="btn-ghost">
              Login
            </Link>
            <Link href="/register" className="btn-primary">
              Register
            </Link>
          </div>
        </header>

        <section id="experience" className="mt-14 grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-7"
          >
            <p className="text-xs uppercase tracking-[0.6em] text-slate-400">Texas Hold&apos;em reimagined</p>
            <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              Play a cinematic round of Hold&apos;em with<br />
              <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-pink-400 bg-clip-text text-transparent">
                impossible animations
              </span>
              , living avatars, and responsive HUD layers.
            </h1>
            <p className="max-w-2xl text-lg text-slate-300">
              Every table is an immersive show: volumetric lighting, soft focus chips, and haptic cues that react to
              reads. Built entirely in Next.js with motion design tuned for 120fps screens.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="#poker" className="btn-primary flex items-center gap-2">
                Enter the table
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/register" className="btn-ghost">
                Unlock lobby access
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 text-sm uppercase tracking-[0.3em] text-slate-400">
              {highlights.map((item) => (
                <div key={item.label}>
                  <p>{item.label}</p>
                  <p className="text-2xl font-semibold text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9 }}
            className="glass-panel relative overflow-hidden rounded-[32px] border border-white/10 px-8 py-10"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(236,72,153,0.2),transparent_70%)]" />
            <div className="relative z-10 space-y-6">
              <div>
                <p className="text-xs uppercase tracking-[0.5em] text-amber-300">Tonight&apos;s spotlight</p>
                <p className="mt-2 text-3xl font-semibold text-white">Nebula Masters — Feature Table</p>
                <p className="text-sm text-slate-300">Texas Hold&apos;em · Invite only · Deep stacked</p>
              </div>
              <div className="gradient-divider" />
              <ul className="space-y-3 text-sm text-slate-300">
                {timeline.map((event) => (
                  <li key={event.label} className="flex items-start gap-3">
                    <SatelliteDish className="mt-1 h-4 w-4 text-cyan-300" />
                    <div>
                      <p className="text-white">{event.label}</p>
                      <p>{event.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
                <p>Winners receive a holographic recap, custom HUD skin, and instant wallet drops.</p>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="mt-16 grid gap-6 md:grid-cols-2">
          {features.map(({ title, description, Icon, accent }) => (
            <motion.div
              key={title}
              whileHover={{ y: -6 }}
              className="glow-ring card-shine flex flex-col gap-3 rounded-[26px] border border-white/10 bg-white/5 p-6 text-sm text-slate-300"
            >
              <div className="flex items-center gap-3">
                <div className={`rounded-2xl bg-gradient-to-br ${accent} p-2 text-white`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold text-white">{title}</h3>
              </div>
              <p>{description}</p>
            </motion.div>
          ))}
        </section>

        <section id="poker">
          <PokerTable />
        </section>

        <section id="wallet" className="mt-16 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <WalletPanel />
          <div className="glass-panel flex flex-col justify-between gap-6 p-6 text-slate-300">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Account perks</p>
              <h3 className="mt-2 text-3xl font-semibold text-white">Play protected</h3>
              <p className="mt-2 text-base">
                One login works across your HUD, tournament rail, and creator feed. Register once and sync across devices
                instantly.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-slate-400">Fast onboarding</p>
              <p className="mt-2 text-2xl font-semibold text-white">Create an account, secure biometrics, and drop into a lobby in under 60 seconds.</p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-white">
                <span className="rounded-full border border-white/20 px-3 py-1">Email magic links</span>
                <span className="rounded-full border border-white/20 px-3 py-1">Social signup</span>
                <span className="rounded-full border border-white/20 px-3 py-1">Wallet pairing</span>
              </div>
            </div>
            <div className="flex flex-col gap-4 text-sm">
              <div className="flex items-center gap-3">
                <Star className="h-4 w-4 text-amber-300" />
                Custom avatars that respond to bankroll swings.
              </div>
              <div className="flex items-center gap-3">
                <Sparkles className="h-4 w-4 text-cyan-300" />
                Motion-tuned dealer animations every street.
              </div>
              <div className="flex items-center gap-3">
                <ArrowRight className="h-4 w-4 text-emerald-300" />
                Seamless transition from login to live felt.
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
