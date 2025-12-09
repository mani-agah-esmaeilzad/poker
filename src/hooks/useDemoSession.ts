"use client";

import { useEffect, useState } from "react";
import { DEMO_STORAGE_KEY, DemoUserProfile } from "@/lib/demoAuth";
import { loginRequest } from "@/lib/api";

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
  const [user, setUser] = useState<DemoUserProfile | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let active = true;
    Promise.resolve().then(() => {
      if (!active) return;
      const stored = readStoredUser();
      if (stored) {
        setUser(stored);
      }
      setHydrated(true);
    });
    return () => {
      active = false;
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const profile = await loginRequest(email, password);
      window.localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(profile));
      setUser(profile);
      return profile;
    } catch (error) {
      console.error("Login failed", error);
      return null;
    }
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
