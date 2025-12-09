"use client";

import { LogOut } from "lucide-react";
import type { DemoUserProfile } from "@/lib/demoAuth";

type SessionBadgeProps = {
  user: DemoUserProfile;
  onLogout: () => void;
};

export function SessionBadge({ user, onLogout }: SessionBadgeProps) {
  return (
    <div className="flex items-center gap-3 rounded-full border border-emerald-300/50 bg-emerald-400/10 px-4 py-2 text-sm text-white shadow-lg">
      <span className="text-xl">{user.avatar}</span>
      <div className="flex flex-col leading-tight">
        <span className="text-xs uppercase tracking-[0.4em] text-emerald-200">
          Logged in
        </span>
        <span className="font-semibold">{user.name}</span>
      </div>
      <button
        onClick={onLogout}
        className="rounded-full border border-white/20 p-2 text-xs text-white transition hover:border-white/80"
      >
        <LogOut className="h-4 w-4" />
      </button>
    </div>
  );
}
