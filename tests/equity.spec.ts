import { expect, test, describe } from "vitest";
import { EquityCalculator } from "src/equity";
import { Card } from "src/card";
import { HoleCards } from "src/holecards";
import { Suit, Rank } from "src/constants";
import { round } from "src/utils";

describe("calculateExactEquity - Exact calculation", () => {
  test("should calculate exact equity with all community cards known", () => {
    const players: HoleCards[] = [
      new HoleCards(
        new Card(Suit.Hearts, Rank.Ace),
        new Card(Suit.Spades, Rank.King)
      ),
      new HoleCards(
        new Card(Suit.Hearts, Rank.Queen),
        new Card(Suit.Diamonds, Rank.Jack)
      ),
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
    const players: HoleCards[] = [
      new HoleCards(
        new Card(Suit.Hearts, Rank.Ace),
        new Card(Suit.Spades, Rank.Ace)
      ),
      new HoleCards(
        new Card(Suit.Hearts, Rank.King),
        new Card(Suit.Diamonds, Rank.King)
      ),
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

    expect(round(results[0], 2)).toBe(91.21);
    expect(round(results[1], 2)).toBe(8.79);
  });

  test("should calculate exact equity with some unknown cards", () => {
    const players: HoleCards[] = [
      new HoleCards(
        new Card(Suit.Hearts, Rank.Ace),
        new Card(Suit.Hearts, Rank.King)
      ),
      new HoleCards(
        new Card(Suit.Spades, Rank.Five),
        new Card(Suit.Diamonds, Rank.Five)
      ),
    ];

    const communityCards = [
      new Card(Suit.Spades, Rank.King),
      new Card(Suit.Hearts, Rank.Five),
      new Card(Suit.Hearts, Rank.Two),
    ];

    const results = EquityCalculator.calculateExactEquity(
      players,
      communityCards
    );

    expect(round(results[0], 2)).toBe(30.71);
    expect(round(results[1], 2)).toBe(69.29);
  });
});
