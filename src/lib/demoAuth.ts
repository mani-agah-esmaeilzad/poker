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

export function verifyDemoCredentials(
  email: string,
  password: string,
): DemoUserProfile | null {
  if (
    email.trim().toLowerCase() === DEMO_USER.email &&
    password === DEMO_USER.password
  ) {
    const profile: DemoUserProfile = {
      id: DEMO_USER.id,
      name: DEMO_USER.name,
      email: DEMO_USER.email,
      title: DEMO_USER.title,
      stack: DEMO_USER.stack,
      avatar: DEMO_USER.avatar,
    };
    return profile;
  }
  return null;
}
