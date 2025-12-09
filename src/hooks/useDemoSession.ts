"use client";

import { useState } from "react";
import {
  DEMO_STORAGE_KEY,
  DemoUserProfile,
  verifyDemoCredentials,
} from "@/lib/demoAuth";

function readStoredUser(): DemoUserProfile | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(DEMO_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as DemoUserProfile;
  } catch {
    window.localStorage.removeItem(DEMO_STORAGE_KEY);
    return null;
  }
}

export function useDemoSession() {
  const [user, setUser] = useState<DemoUserProfile | null>(() => readStoredUser());
  const hydrated = typeof window !== "undefined";

  const login = (email: string, password: string) => {
    const profile = verifyDemoCredentials(email, password);
    if (!profile) {
      return null;
    }
    window.localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(profile));
    setUser(profile);
    return profile;
  };

  const logout = () => {
    window.localStorage.removeItem(DEMO_STORAGE_KEY);
    setUser(null);
  };

  return {
    user,
    hydrated,
    login,
    logout,
  };
}
