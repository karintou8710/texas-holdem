import { EquityCalculator, PlayerHand } from "src/equity";
import { Card } from "src/card";
import { Suit, Rank } from "src/constants";

const players: PlayerHand[] = [
  {
    holeCards: [
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Spades, Rank.Ace),
    ],
  },
  {
    holeCards: [
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Diamonds, Rank.King),
    ],
  },
];

const communityCards = [
  new Card(Suit.Hearts, Rank.Two),
  new Card(Suit.Clubs, Rank.Three),
  new Card(Suit.Spades, Rank.Four),
];

const results = EquityCalculator.calculateExactEquity(players, communityCards);

console.log("Equity Results:", results);
