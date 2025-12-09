# Nebula Hold'em

A cinematic Texas Hold'em experience built with Next.js (frontend) and an Express-based poker engine (backend). The backend stores its state inside JSON files so you can run everything locally without any external database.

## Requirements

- Node.js 18+
- npm 9+

## Project structure

```
poker/
├── server/              # Express poker engine + JSON data store
│   ├── data/            # users.json + table.json (acts as DB)
│   └── src/             # game engine + HTTP routes
└── src/                 # Next.js frontend
```

## Running the backend

```bash
npm run server          # runs nodemon in server/
```

The engine starts on [http://localhost:4000](http://localhost:4000) and exposes:

- `POST /login` — validates email/password from `server/data/users.json`
- `GET /table` — returns sanitized table state
- `POST /table/new-hand` — shuffles and starts a brand-new hand
- `POST /table/action` — executes hero actions (`fold`, `call`, `raise`, `check`, `bet`)

State is persisted to `server/data/table.json`, so you can stop/restart the engine without losing stacks.

## Running the frontend

In a separate terminal:

```bash
npm run dev
# Frontend: http://localhost:3000
```

The frontend reads `NEXT_PUBLIC_API_BASE` (defaults to `http://localhost:4000`). If you run the backend on a different port, set it inside `.env.local`:

```
NEXT_PUBLIC_API_BASE=http://localhost:5000
```

## Demo login

Use the built-in demo player:

```
Email:    pilot@nebula.gg
Password: nebula123
```

After logging in you'll see a session badge in the hero bar and the poker table will stream real game state from the backend. The action panel lets you fold/call/raise/check/bet, and the engine will advance the hand, deal streets, and evaluate winners.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run server` | Start the Express poker engine with nodemon |
| `npm run server:start` | Start the engine without nodemon |
| `npm run dev` | Run the Next.js frontend |
| `npm run build` | Build the frontend for production |
| `npm run lint` | Run ESLint across the repo |

## Notes

- All gameplay data (users, table state, logs) lives in plain JSON files. Feel free to tweak them manually or seed new users.
- The poker engine deals realistic cards, auto-plays the bots, and evaluates showdowns using `poker-hand-evaluator`.
- Frontend and backend are decoupled via HTTP so you can host them separately if needed.
