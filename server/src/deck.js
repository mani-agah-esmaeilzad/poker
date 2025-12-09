const ranks = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];
const suits = [
  { key: "S", label: "spades", symbol: "♠", color: "slate" },
  { key: "H", label: "hearts", symbol: "♥", color: "rose" },
  { key: "D", label: "diamonds", symbol: "♦", color: "cyan" },
  { key: "C", label: "clubs", symbol: "♣", color: "emerald" },
];

function buildDeck() {
  const deck = [];
  for (const suit of suits) {
    for (const rank of ranks) {
      deck.push({
        code: `${rank}${suit.key}`,
        label: rank,
        suit: suit.label,
        symbol: suit.symbol,
        color: suit.color,
      });
    }
  }
  return shuffle(deck);
}

function shuffle(deck) {
  const copy = [...deck];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function drawCard(state) {
  const card = state.deck.pop();
  if (!card) {
    throw new Error("Deck is empty");
  }
  return card;
}

module.exports = {
  buildDeck,
  drawCard,
};
