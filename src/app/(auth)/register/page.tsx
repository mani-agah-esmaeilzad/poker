"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { BadgeCheck, Flame, Lock, Sparkles } from "lucide-react";

const perks = [
  { title: "Immersive tutorial", description: "Shadow a pro across three cinematic orbits." },
  { title: "Wallet pairing", description: "Secure multi-chain pairing with one swipe." },
  { title: "Creator skins", description: "Unlock animated HUD themes built by streamers." },
];

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords need to match before we can deploy your avatar.");
      return;
    }
    setMessage("Welcome to Nebula Hold'em – provisioning your profile...");
    setTimeout(() => setMessage("Profile ready! Continue to wallet linking."), 1400);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 px-6 py-16 text-white sm:px-10">
      <div className="floating-chip" style={{ top: "28%", left: "12%" }} />
      <div className="floating-chip" style={{ bottom: "16%", right: "14%" }} />

      <div className="mx-auto max-w-5xl grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="glass-panel space-y-6 p-10"
        >
          <p className="text-xs uppercase tracking-[0.5em] text-slate-400">Become legendary</p>
          <h1 className="text-4xl font-semibold">Create your cinematic poker identity</h1>
          <p className="text-slate-300">
            Build a single login that syncs your bankroll overlays, holographic avatar, and social rail presence. We keep
            things English only to welcome the global stage.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {perks.map((perk) => (
              <div key={perk.title} className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-emerald-300">{perk.title}</p>
                <p className="mt-2 text-slate-300">{perk.description}</p>
              </div>
            ))}
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-6 text-sm text-slate-300">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Bonus drop</p>
            <p className="mt-2 text-lg text-white">Register today to claim 800 Nebula XP and priority access to Masters events.</p>
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="glow-ring glass-panel flex flex-col gap-5 p-8"
        >
          <div className="flex items-center gap-3">
            <Lock className="h-10 w-10 text-emerald-300" />
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Sign up</p>
              <p className="text-2xl font-semibold text-white">Secure account onboarding</p>
            </div>
          </div>
          <label className="text-sm text-slate-300">
            Username
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="BluffArtist"
              className="mt-2 w-full rounded-2xl border border-white/15 bg-slate-950/70 px-4 py-3 text-base text-white focus:border-emerald-300 focus:outline-none"
            />
          </label>
          <label className="text-sm text-slate-300">
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@pokerverse.com"
              className="mt-2 w-full rounded-2xl border border-white/15 bg-slate-950/70 px-4 py-3 text-base text-white focus:border-emerald-300 focus:outline-none"
            />
          </label>
          <label className="text-sm text-slate-300">
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              className="mt-2 w-full rounded-2xl border border-white/15 bg-slate-950/70 px-4 py-3 text-base text-white focus:border-emerald-300 focus:outline-none"
            />
          </label>
          <label className="text-sm text-slate-300">
            Confirm password
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="••••••••"
              className="mt-2 w-full rounded-2xl border border-white/15 bg-slate-950/70 px-4 py-3 text-base text-white focus:border-emerald-300 focus:outline-none"
            />
          </label>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em]">
              <Flame className="h-4 w-4 text-amber-300" /> Preferred table mode
            </div>
            <select className="mt-3 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white focus:border-emerald-300 focus:outline-none">
              <option>Texas Hold&apos;em · Deep stack</option>
              <option>Texas Hold&apos;em · Turbo orbit</option>
              <option>Bounty Hold&apos;em · Progressive</option>
            </select>
          </div>

          <button type="submit" className="btn-primary flex items-center justify-center gap-2 text-base">
            Create account
            <Sparkles className="h-4 w-4" />
          </button>
          {message && <p className="text-sm text-emerald-300">{message}</p>}
          <p className="text-sm text-slate-400">
            Already registered? <Link href="/login" className="text-white">Login</Link>
          </p>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em]">
              <BadgeCheck className="h-4 w-4 text-cyan-300" /> Compliance ready
            </div>
            <p className="mt-2">2FA, biometric fallback codes, and wallet multi-sig are included by default.</p>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
