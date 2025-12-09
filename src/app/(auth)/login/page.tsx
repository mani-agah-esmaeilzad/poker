"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight, Eye, EyeOff, ShieldCheck, Sparkles } from "lucide-react";
import { useDemoSession } from "@/hooks/useDemoSession";
import { DEMO_USER } from "@/lib/demoAuth";

const highlights = [
  "Biometric failover keys",
  "Session handoff to mobile HUD",
  "Adaptive 2FA when bankroll spikes",
];

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useDemoSession();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(null);
    setError(null);
    if (!email.trim() || !password.trim()) {
      setError("Enter both your email and password.");
      return;
    }
    setLoading(true);
    const profile = await login(email, password);
    if (!profile) {
      setError("Invalid credentials. Use the provided demo account details.");
      setLoading(false);
      return;
    }
    setStatus(`Welcome back, ${profile.name}. Redirecting you to the table...`);
    setTimeout(() => {
      router.push("/");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 px-6 py-16 text-white sm:px-10">
      <div className="floating-chip" style={{ top: "18%", right: "18%" }} />
      <div className="floating-chip" style={{ bottom: "12%", left: "14%" }} />

      <div className="mx-auto max-w-5xl grid-glow relative grid gap-12 border border-white/10 bg-white/5 p-10 backdrop-blur-xl lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          <p className="text-xs uppercase tracking-[0.6em] text-slate-300">Welcome back</p>
          <h1 className="mt-4 text-4xl font-semibold">Log into Nebula Hold&apos;em</h1>
          <p className="mt-4 text-slate-300">
            Rejoin your cinematic poker universe. Resume unfinished hands, sync your HUD layouts, and drop into the cash
            streets instantly.
          </p>
          <div className="mt-8 space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6">
            {highlights.map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-slate-200">
                <ShieldCheck className="h-4 w-4 text-emerald-300" />
                {item}
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-3xl border border-white/10 bg-slate-900/40 p-6 text-sm text-slate-300">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Tonight&apos;s reminder</p>
            <p className="mt-2 text-lg text-white">Your seat in the Nebula Masters feature table is waiting.</p>
            <p>Live cards flip in 22 minutes.</p>
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="glass-panel relative flex flex-col gap-5 p-8"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Secure login</p>
          <label className="text-sm text-slate-300">
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@pokerverse.com"
              className="mt-2 w-full rounded-2xl border border-white/15 bg-slate-950/70 px-4 py-3 text-base text-white focus:border-cyan-400 focus:outline-none"
            />
          </label>
          <label className="text-sm text-slate-300">
            Password
            <div className="mt-2 flex items-center gap-2 rounded-2xl border border-white/15 bg-slate-950/70 px-4">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent py-3 text-base text-white focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="text-slate-400 transition hover:text-white"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </label>
          <div className="flex items-center justify-between text-sm text-slate-400">
            <label className="flex items-center gap-2 text-xs">
              <input type="checkbox" className="h-4 w-4 rounded border-white/30 bg-transparent" /> Keep me signed in
            </label>
            <Link href="#" className="text-cyan-300 hover:text-cyan-200">
              Forgot password?
            </Link>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary mt-2 flex items-center justify-center gap-2 text-base disabled:opacity-60"
          >
            Login
            <ArrowRight className="h-4 w-4" />
          </button>
          {error && <p className="text-sm text-rose-300">{error}</p>}
          {status && <p className="text-sm text-emerald-300">{status}</p>}
          <p className="text-sm text-slate-400">
            Need an account? <Link href="/register" className="text-white">Register now</Link>
          </p>
          <div className="rounded-2xl border border-cyan-300/30 bg-cyan-400/10 p-4 text-sm text-cyan-100">
            <p className="text-xs uppercase tracking-[0.4em]">Demo credentials</p>
            <div className="mt-2 flex flex-col gap-1">
              <span>Email: <strong>{DEMO_USER.email}</strong></span>
              <span>Password: <strong>{DEMO_USER.password}</strong></span>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em]">
              <Sparkles className="h-4 w-4 text-amber-300" /> Featured login perks
            </div>
            <p className="mt-2">
              Syncs wallet permissions, auto-loads your HUD layout, and queues your avatar for holographic entrance.
            </p>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
