import { expect, test, describe } from "vitest";
import { EquityCalculator, PlayerHand } from "src/equity";
import { Card } from "src/card";
import { Suit, Rank } from "src/constants";

describe("calculateExactEquity - Exact calculation", () => {
  test("should calculate exact equity with all community cards known", () => {
    const players: PlayerHand[] = [
      {
        holeCards: [
          new Card(Suit.Hearts, Rank.Ace),
          new Card(Suit.Spades, Rank.King),
        ],
      },
      {
        holeCards: [
          new Card(Suit.Hearts, Rank.Queen),
          new Card(Suit.Diamonds, Rank.Jack),
        ],
      },
    ];

    const communityCards = [
      new Card(Suit.Hearts, Rank.Ten),
      new Card(Suit.Hearts, Rank.Nine),
      new Card(Suit.Hearts, Rank.Eight),
      new Card(Suit.Clubs, Rank.Seven),
      new Card(Suit.Spades, Rank.Two),
    ];

    const results = EquityCalculator.calculateExactEquity(
      players,
      communityCards
    );

    expect(results).toHaveLength(2);

    // Player 2 should win with Q-high straight
    expect(results[0]).toBe(0);
    expect(results[1]).toBe(100);
  });

  test("should calculate exact equity with some unknown cards", () => {
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

    const results = EquityCalculator.calculateExactEquity(
      players,
      communityCards
    );

    expect(results).toHaveLength(2);

    // AA should have higher equity than KK
    expect(results[0]).toBeGreaterThan(results[1]);
  });
});
