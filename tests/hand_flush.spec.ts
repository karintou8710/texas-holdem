import { expect, test, describe } from "vitest";
import { Hand } from "src/hand";
import { Card } from "src/card";
import { Rank, Suit, HandRank } from "src/constants";

describe("Hand - Flush", () => {
  test("should correctly identify a Flush", () => {
    const cards = [
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Hearts, Rank.Nine),
    ];
    const hand = new Hand(cards);
    expect(hand.getRank()).toBe(HandRank.Flush);
    expect(hand.getHandCards()).toEqual([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Hearts, Rank.Nine),
    ]);
  });

  test("should not identify a Flush when suits are mixed", () => {
    const cards = [
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Hearts, Rank.Ten),
    ];
    const hand = new Hand(cards);
    expect(hand.getRank()).toBe(HandRank.Straight);
    expect(hand.getHandCards()).toEqual([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Hearts, Rank.Ten),
    ]);
  });

  test("should correctly sort cards within a Flush", () => {
    const cards = [
      new Card(Suit.Spades, Rank.Ace),
      new Card(Suit.Spades, Rank.Five),
      new Card(Suit.Spades, Rank.Three),
      new Card(Suit.Spades, Rank.Four),
      new Card(Suit.Spades, Rank.Six),
    ];
    const hand = new Hand(cards);
    expect(hand.getRank()).toBe(HandRank.Flush);
    expect(hand.getHandCards()).toEqual([
      new Card(Suit.Spades, Rank.Ace),
      new Card(Suit.Spades, Rank.Six),
      new Card(Suit.Spades, Rank.Five),
      new Card(Suit.Spades, Rank.Four),
      new Card(Suit.Spades, Rank.Three),
    ]);
  });
});
