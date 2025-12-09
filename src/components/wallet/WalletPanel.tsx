"use client";

import { motion } from "framer-motion";
import { Activity, Link2, ShieldCheck, WalletCards, Zap } from "lucide-react";
import { useMemo, useState } from "react";
import clsx from "clsx";

const connectors = [
  { name: "Nebula Wallet", latency: "45ms", badge: "Recommended" },
  { name: "MetaMask", latency: "62ms", badge: "Popular" },
  { name: "Phantom", latency: "49ms", badge: "New" },
  { name: "Rainbow", latency: "55ms", badge: "Trusted" },
];

const networks = ["Base", "Ethereum", "Polygon", "Arbitrum"];

export function WalletPanel() {
  const [connected, setConnected] = useState(false);
  const [connector, setConnector] = useState(connectors[0].name);
  const [network, setNetwork] = useState(networks[0]);
  const [address, setAddress] = useState<string>("");

  const shortenedAddress = useMemo(() => {
    if (!address) return "--";
    return `${address.slice(0, 6)}···${address.slice(-4)}`;
  }, [address]);

  const handleConnect = () => {
    if (connected) {
      setConnected(false);
      setAddress("");
      return;
    }
    const random = Math.random().toString(16).slice(2, 10);
    setAddress(`0x${random}bA21`);
    setConnected(true);
  };

  return (
    <section className="glass-panel relative overflow-hidden border border-white/10 p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(14,165,233,0.2),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0,_rgba(236,72,153,0.15),transparent_45%)]" />
      <div className="relative z-10 flex flex-col gap-5">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Wallet bridge</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">Connect with style</h3>
          </div>
          <ShieldCheck className="h-10 w-10 text-emerald-300" />
        </header>

        <div className="wallet-grid">
          {connectors.map((option) => (
            <motion.button
              key={option.name}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setConnector(option.name)}
              className={clsx(
                "card-shine rounded-2xl border px-4 py-3 text-left text-sm shadow-lg",
                connector === option.name
                  ? "border-cyan-300/60 bg-white/10"
                  : "border-white/10 bg-white/5 hover:border-cyan-200/25",
              )}
            >
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-slate-400">
                <span>{option.badge}</span>
                <span>{option.latency}</span>
              </div>
              <p className="mt-1 text-base font-semibold text-white">{option.name}</p>
            </motion.button>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Network</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {networks.map((item) => (
                <button
                  key={item}
                  onClick={() => setNetwork(item)}
                  className={clsx(
                    "rounded-full border px-3 py-1 text-xs",
                    network === item
                      ? "border-emerald-300/60 bg-emerald-400/20 text-white"
                      : "border-white/10 text-slate-400 hover:border-white/30",
                  )}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Selected</p>
            <p className="mt-3 text-lg font-semibold text-white">{connector}</p>
            <p className="text-xs text-slate-400">Network · {network}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Address</p>
            <p className="mt-3 text-lg font-semibold text-white">{shortenedAddress}</p>
            <p className="text-xs text-slate-400">Status · {connected ? "Connected" : "Secure"}</p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleConnect}
          className="btn-primary flex items-center gap-2 self-start border-none"
        >
          {connected ? <Link2 className="h-5 w-5" /> : <WalletCards className="h-5 w-5" />}
          {connected ? "Disconnect" : "Connect wallet"}
        </motion.button>

        <div className="flex flex-wrap gap-6 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-amber-300" />
            Gas optimized routing
          </div>
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-cyan-300" />
            Live liquidity pulse
          </div>
        </div>
      </div>
    </section>
  );
}
