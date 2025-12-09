const express = require("express");
const cors = require("cors");
const {
  startNewHand,
  handleHeroAction,
  getTableState,
  loginUser,
  ensureTableState,
} = require("./gameEngine");

const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors());
app.use(express.json());

ensureTableState();

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }
  const profile = loginUser(email, password);
  if (!profile) {
    return res.status(401).json({ message: "Invalid credentials." });
  }
  return res.json(profile);
});

app.get("/table", (req, res) => {
  return res.json(getTableState());
});

app.post("/table/new-hand", (req, res) => {
  const state = startNewHand();
  return res.json(state);
});

app.post("/table/action", (req, res) => {
  const { action } = req.body || {};
  if (!action) {
    return res.status(400).json({ message: "Action is required." });
  }
  const result = handleHeroAction(action, req.body);
  if (!result.ok) {
    return res.status(400).json({ message: result.message });
  }
  return res.json(getTableState());
});

app.use((err, req, res, next) => {
  console.error("Unexpected error", err);
  res.status(500).json({ message: "Unexpected server error." });
});

app.listen(PORT, () => {
  console.log(`Poker engine ready on http://localhost:${PORT}`);
});
