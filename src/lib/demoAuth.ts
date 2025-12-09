export type DemoUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  title: string;
  stack: number;
  avatar: string;
};

export type DemoUserProfile = Omit<DemoUser, "password">;

export const DEMO_USER: DemoUser = {
  id: "nebula-pilot",
  name: "Nebula Pilot",
  email: "pilot@nebula.gg",
  password: "nebula123",
  title: "Masters Feature Seat",
  stack: 150_000,
  avatar: "🂡",
};

export const DEMO_STORAGE_KEY = "nebula-demo-user";
