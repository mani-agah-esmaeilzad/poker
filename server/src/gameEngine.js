const PokerHand = require("poker-hand-evaluator");
const { buildDeck } = require("./deck");
const { getUsers, loadTable, saveTable } = require("./store");

const HERO_ID = "nebula-pilot";
const SMALL_BLIND = 25;
const BIG_BLIND = 50;
const STAGES = ["preflop", "flop", "turn", "river", "showdown"];

const BOT_PROFILES = [
  { id: "bot-maverick", name: "Maverick", avatar: "🂮", stack: 145000 },
  { id: "bot-aurora", name: "Aurora", avatar: "🂭", stack: 168000 },
  { id: "bot-neon", name: "NeonFox", avatar: "🂱", stack: 132000 },
  { id: "bot-shade", name: "Shade", avatar: "🂾", stack: 180000 },
];

function createEmptyTable() {
  return {
    tableId: "nebula-holdem",
    stage: "idle",
    pot: 0,
    currentBet: 0,
    minRaise: BIG_BLIND,
    board: [],
    players: [],
    deck: [],
    log: ["Table initialized"],
    heroOptions: ["new-hand"],
    winner: null,
    lastAction: null,
  };
}

function ensureTableState() {
  let state = loadTable();
  if (!state) {
    state = createEmptyTable();
    saveTable(state);
  }
  return state;
}

function getHeroProfile() {
  const users = getUsers();
  const hero = users.find((user) => user.id === HERO_ID);
  if (hero) {
    return hero;
  }
  return {
    id: HERO_ID,
    name: "Nebula Pilot",
    email: "pilot@nebula.gg",
    avatar: "🂡",
    stack: 150000,
    title: "Masters Feature Seat",
  };
}

function createPlayer(profile, seat, stack, deck) {
  return {
    id: profile.id,
    name: profile.name,
    avatar: profile.avatar,
    title: profile.title ?? "Pro",
    seat,
    stack,
    bet: 0,
    status: "Waiting",
    isHero: profile.id === HERO_ID,
    folded: false,
    hand: [drawCardFromDeck(deck), drawCardFromDeck(deck)],
  };
}

function drawCardFromDeck(stateDeck) {
  if (!stateDeck || stateDeck.length === 0) {
    throw new Error("Deck exhausted");
  }
  return stateDeck.pop();
}

function startNewHand() {
  const prev = ensureTableState();
  const deck = buildDeck();
  const state = createEmptyTable();
  state.deck = deck;
  state.stage = "preflop";
  state.log = [];
  state.winner = null;

  const heroProfile = getHeroProfile();
  const heroPrev = prev.players?.find((p) => p.id === heroProfile.id);
  const heroStack = heroPrev ? heroPrev.stack : heroProfile.stack;
  const hero = createPlayer(heroProfile, 0, heroStack, deck);

  const bots = BOT_PROFILES.map((bot, index) => {
    const prevBot = prev.players?.find((p) => p.id === bot.id);
    const botStack = prevBot ? prevBot.stack : bot.stack;
    return createPlayer(bot, index + 1, botStack, deck);
  });

  state.players = [hero, ...bots];

  postBlinds(state);

  state.heroOptions = ["fold", "call", "raise"];
  appendLog(state, "New hand started. Blinds are 25/50 chips.");
  saveTable(state);
  return sanitizeState(state);
}

function postBlinds(state) {
  const hero = state.players[0];
  const bigBlind = state.players[1];

  hero.bet = SMALL_BLIND;
  hero.stack = Math.max(0, hero.stack - SMALL_BLIND);
  hero.status = `Posts ${SMALL_BLIND}`;

  bigBlind.bet = BIG_BLIND;
  bigBlind.stack = Math.max(0, bigBlind.stack - BIG_BLIND);
  bigBlind.status = `Posts ${BIG_BLIND}`;

  state.pot = SMALL_BLIND + BIG_BLIND;
  state.currentBet = BIG_BLIND;
  state.minRaise = BIG_BLIND;
}

function sanitizeState(state) {
  const clone = JSON.parse(JSON.stringify(state));
  clone.players = clone.players.map((player) => {
    const masked = { ...player };
    if (!player.isHero && clone.stage !== "showdown") {
      masked.hand = player.hand.map(() => ({ code: "??", label: "?", suit: "", symbol: "?", color: "slate" }));
    }
    masked.bet = Number(masked.bet);
    masked.stack = Number(masked.stack);
    return masked;
  });
  delete clone.deck;
  return clone;
}

function getTableState() {
  const state = ensureTableState();
  return sanitizeState(state);
}

function loginUser(email, password) {
  const users = getUsers();
  const match = users.find(
    (user) => user.email.toLowerCase() === email.toLowerCase() && user.password === password,
  );
  if (!match) return null;
  const { password: _password, ...profile } = match;
  return profile;
}

function handleHeroAction(action) {
  const state = ensureTableState();
  if (state.stage === "idle") {
    return { ok: false, message: "Start a new hand first." };
  }
  const hero = state.players.find((player) => player.isHero);
  if (!hero || hero.folded) {
    return { ok: false, message: "Hero is not active." };
  }

  switch (action) {
    case "fold":
      hero.folded = true;
      hero.status = "Folds";
      appendLog(state, `${hero.name} folds.`);
      settleOnFold(state, hero);
      break;
    case "call":
      performCall(state, hero);
      break;
    case "raise":
      performRaise(state, hero);
      break;
    case "check":
      performCheck(state, hero);
      break;
    case "bet":
      performBet(state, hero);
      break;
    default:
      return { ok: false, message: "Unknown action" };
  }

  saveTable(state);
  return { ok: true };
}

function performCall(state, hero) {
  const required = Math.max(0, state.currentBet - hero.bet);
  if (required === 0) {
    performCheck(state, hero);
    return;
  }
  invest(hero, required, state);
  hero.bet = state.currentBet;
  hero.status = `Calls ${state.currentBet}`;
  appendLog(state, `${hero.name} calls ${state.currentBet}.`);
  botsCall(state, state.currentBet);
  advanceStage(state, hero);
}

function performRaise(state, hero) {
  const target = state.currentBet + state.minRaise;
  const required = Math.max(0, target - hero.bet);
  invest(hero, required, state);
  hero.bet = target;
  hero.status = `Raises to ${target}`;
  state.currentBet = target;
  state.minRaise *= 2;
  appendLog(state, `${hero.name} raises to ${target}.`);
  botsCall(state, target);
  advanceStage(state, hero);
}

function performCheck(state, hero) {
  hero.status = "Checks";
  appendLog(state, `${hero.name} checks.`);
  botsCheck(state);
  advanceStage(state, hero);
}

function performBet(state, hero) {
  const betSize = getStageBetSize(state.stage);
  invest(hero, betSize, state);
  hero.bet += betSize;
  hero.status = `Bets ${betSize}`;
  state.currentBet = hero.bet;
  appendLog(state, `${hero.name} bets ${betSize}.`);
  botsCall(state, hero.bet);
  advanceStage(state, hero);
}

function invest(player, amount, state) {
  const chips = Math.min(amount, player.stack);
  player.stack -= chips;
  state.pot += chips;
}

function botsCall(state, targetBet) {
  state.players.forEach((player) => {
    if (player.isHero || player.folded) return;
    const required = Math.max(0, targetBet - player.bet);
    if (required === 0) {
      player.status = targetBet === 0 ? "Checks" : `Calls ${targetBet}`;
      return;
    }
    invest(player, required, state);
    player.bet += required;
    player.status = `Calls ${targetBet}`;
  });
}

function botsCheck(state) {
  state.players.forEach((player) => {
    if (player.isHero || player.folded) return;
    player.status = "Checks";
  });
}

function advanceStage(state, hero) {
  resetBets(state);
  const idx = STAGES.indexOf(state.stage);
  if (idx === -1) return;
  if (state.stage === "preflop") {
    burnCard(state);
    dealCommunity(state, 3);
    state.stage = "flop";
    state.minRaise = getStageBetSize(state.stage);
    state.heroOptions = ["check", "bet"];
    appendLog(state, "Dealing the flop.");
  } else if (state.stage === "flop") {
    burnCard(state);
    dealCommunity(state, 1);
    state.stage = "turn";
    state.minRaise = getStageBetSize(state.stage);
    state.heroOptions = ["check", "bet"];
    appendLog(state, "Dealing the turn.");
  } else if (state.stage === "turn") {
    burnCard(state);
    dealCommunity(state, 1);
    state.stage = "river";
    state.minRaise = getStageBetSize(state.stage);
    state.heroOptions = ["check", "bet"];
    appendLog(state, "Dealing the river.");
  } else if (state.stage === "river") {
    revealShowdown(state);
  } else if (state.stage === "showdown") {
    state.heroOptions = ["new-hand"];
  }
}

function dealCommunity(state, count) {
  for (let i = 0; i < count; i += 1) {
    state.board.push(drawCardFromDeck(state.deck));
  }
}

function burnCard(state) {
  if (state.deck.length > 0) {
    state.deck.pop();
  }
}

function resetBets(state) {
  state.players.forEach((player) => {
    player.bet = 0;
  });
  state.currentBet = 0;
}

function getStageBetSize(stage) {
  switch (stage) {
    case "flop":
      return 100;
    case "turn":
      return 200;
    case "river":
      return 400;
    default:
      return BIG_BLIND;
  }
}

function settleOnFold(state, hero) {
  const remaining = state.players.filter((player) => !player.folded);
  const winner = remaining.find((player) => !player.isHero) || remaining[0];
  if (winner) {
    winner.stack += state.pot;
    appendLog(state, `${winner.name} wins ${state.pot} chips by default.`);
    state.winner = { players: [winner.name], method: "Fold" };
  }
  state.pot = 0;
  state.stage = "showdown";
  state.heroOptions = ["new-hand"];
}

function revealShowdown(state) {
  while (state.board.length < 5 && state.deck.length) {
    state.board.push(drawCardFromDeck(state.deck));
  }
  const results = evaluateWinners(state);
  if (results.length) {
    const potShare = Math.floor(state.pot / results.length);
    results.forEach((entry) => {
      entry.player.stack += potShare;
    });
    state.winner = {
      players: results.map((entry) => entry.player.name),
      rank: results[0].rank,
    };
    appendLog(state, `${state.winner.players.join(" & ")} win ${potShare} chips with ${results[0].rank}.`);
  }
  state.pot = 0;
  state.stage = "showdown";
  state.heroOptions = ["new-hand"];
}

function evaluateWinners(state) {
  const active = state.players.filter((player) => !player.folded);
  const boardCodes = state.board.map((card) => card.code);
  let best = [];
  let bestScore = Infinity;

  active.forEach((player) => {
    const cards = [...player.hand.map((card) => card.code), ...boardCodes];
    const outcome = bestFive(cards);
    if (!outcome) return;
    if (outcome.score < bestScore) {
      bestScore = outcome.score;
      best = [{ player, rank: outcome.rank, hand: outcome.cards }];
    } else if (outcome.score === bestScore) {
      best.push({ player, rank: outcome.rank, hand: outcome.cards });
    }
  });

  return best;
}

function bestFive(cards) {
  if (cards.length < 5) return null;
  const combos = kCombinations(cards, 5);
  let best = null;
  combos.forEach((combo) => {
    const hand = new PokerHand(combo.join(" "));
    const score = hand.getScore();
    if (!best || score < best.score) {
      best = { score, rank: hand.getRank(), cards: combo };
    }
  });
  return best;
}

function kCombinations(set, k) {
  const results = [];
  const combo = [];
  function helper(start, depth) {
    if (depth === k) {
      results.push([...combo]);
      return;
    }
    for (let i = start; i < set.length; i += 1) {
      combo[depth] = set[i];
      helper(i + 1, depth + 1);
    }
  }
  helper(0, 0);
  return results;
}

function appendLog(state, message) {
  state.log.unshift(`${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} · ${message}`);
  if (state.log.length > 20) {
    state.log = state.log.slice(0, 20);
  }
}

module.exports = {
  startNewHand,
  handleHeroAction,
  getTableState,
  loginUser,
  ensureTableState,
};
