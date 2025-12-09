const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000";

type FetchOptions = RequestInit & { raw?: boolean };

async function apiFetch<T>(path: string, options: FetchOptions = {}): Promise<T> {
  const { raw, headers, ...rest } = options;
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...rest,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Request failed");
  }

  return raw ? ((response as unknown) as T) : response.json();
}

export type ApiCard = {
  code: string;
  label: string;
  suit: string;
  symbol: string;
  color: string;
};

export type ApiPlayer = {
  id: string;
  name: string;
  avatar: string;
  title?: string;
  seat: number;
  stack: number;
  bet: number;
  status: string;
  isHero: boolean;
  folded: boolean;
  hand: ApiCard[];
};

export type ApiWinner = {
  players: string[];
  rank?: string;
  method?: string;
};

export type ApiTableState = {
  tableId: string;
  stage: string;
  pot: number;
  currentBet: number;
  minRaise: number;
  board: ApiCard[];
  players: ApiPlayer[];
  log: string[];
  heroOptions: string[];
  winner: ApiWinner | null;
};

export async function loginRequest(email: string, password: string) {
  return apiFetch("/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function fetchTableState(): Promise<ApiTableState> {
  return apiFetch("/table");
}

export function requestNewHand(): Promise<ApiTableState> {
  return apiFetch("/table/new-hand", { method: "POST" });
}

export function requestHeroAction(action: string): Promise<ApiTableState> {
  return apiFetch("/table/action", {
    method: "POST",
    body: JSON.stringify({ action }),
  });
}
