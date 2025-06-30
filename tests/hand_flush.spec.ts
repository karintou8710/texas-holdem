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
    expect(hand.getRank()).not.toBe(HandRank.Flush);
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

describe("Compare - Flush", () => {
  test("should correctly compare two Flush hands with different high cards", () => {
    const hand1 = new Hand([
      new Card(Suit.Spades, Rank.Ace),
      new Card(Suit.Spades, Rank.Queen),
      new Card(Suit.Spades, Rank.Jack),
      new Card(Suit.Spades, Rank.Nine),
      new Card(Suit.Spades, Rank.Eight),
    ]);

    const hand2 = new Hand([
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Hearts, Rank.Nine),
      new Card(Suit.Hearts, Rank.Eight),
    ]);

    expect(hand1.getRank()).toBe(HandRank.Flush);
    expect(hand2.getRank()).toBe(HandRank.Flush);
    expect(hand1.compare(hand2)).toBeGreaterThan(0);
    expect(hand2.compare(hand1)).toBeLessThan(0);
  });

  test("should correctly compare two Flush hands with same high card but different second highest", () => {
    const hand1 = new Hand([
      new Card(Suit.Spades, Rank.Ace),
      new Card(Suit.Spades, Rank.Queen),
      new Card(Suit.Spades, Rank.Ten),
      new Card(Suit.Spades, Rank.Nine),
      new Card(Suit.Spades, Rank.Eight),
    ]);

    const hand2 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Hearts, Rank.Ten),
      new Card(Suit.Hearts, Rank.Nine),
      new Card(Suit.Hearts, Rank.Eight),
    ]);

    expect(hand1.getRank()).toBe(HandRank.Flush);
    expect(hand2.getRank()).toBe(HandRank.Flush);
    expect(hand1.compare(hand2)).toBeGreaterThan(0);
    expect(hand2.compare(hand1)).toBeLessThan(0);
  });

  test("should correctly compare two Flush hands with same high card but different third highest", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Hearts, Rank.Nine),
      new Card(Suit.Hearts, Rank.Eight),
    ]);

    const hand2 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Hearts, Rank.Ten),
      new Card(Suit.Hearts, Rank.Nine),
      new Card(Suit.Hearts, Rank.Eight),
    ]);

    expect(hand1.getRank()).toBe(HandRank.Flush);
    expect(hand2.getRank()).toBe(HandRank.Flush);
    expect(hand1.compare(hand2)).toBeGreaterThan(0);
    expect(hand2.compare(hand1)).toBeLessThan(0);
  });

  test("should correctly compare two Flush hands with same high card but different 4th highest", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Hearts, Rank.Ten),
      new Card(Suit.Hearts, Rank.Nine),
    ]);

    const hand2 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Hearts, Rank.Nine),
      new Card(Suit.Hearts, Rank.Eight),
    ]);

    expect(hand1.getRank()).toBe(HandRank.Flush);
    expect(hand2.getRank()).toBe(HandRank.Flush);
    expect(hand1.compare(hand2)).toBeGreaterThan(0);
    expect(hand2.compare(hand1)).toBeLessThan(0);
  });

  test("should correctly compare two Flush hands with same high card but different 5th highest", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Hearts, Rank.Ten),
      new Card(Suit.Hearts, Rank.Nine),
    ]);

    const hand2 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Hearts, Rank.Ten),
      new Card(Suit.Hearts, Rank.Eight),
    ]);

    expect(hand1.getRank()).toBe(HandRank.Flush);
    expect(hand2.getRank()).toBe(HandRank.Flush);
    expect(hand1.compare(hand2)).toBeGreaterThan(0);
    expect(hand2.compare(hand1)).toBeLessThan(0);
  });

  test("should identify a tie when two Flush hands have exactly same cards in different suits", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Hearts, Rank.Ten),
      new Card(Suit.Hearts, Rank.Nine),
    ]);

    const hand2 = new Hand([
      new Card(Suit.Spades, Rank.Ace),
      new Card(Suit.Spades, Rank.Queen),
      new Card(Suit.Spades, Rank.Jack),
      new Card(Suit.Spades, Rank.Ten),
      new Card(Suit.Spades, Rank.Nine),
    ]);

    expect(hand1.getRank()).toBe(HandRank.Flush);
    expect(hand2.getRank()).toBe(HandRank.Flush);
    expect(hand1.compare(hand2)).toBe(0);
  });

  test("should rank higher than Straight", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.Ten),
      new Card(Suit.Hearts, Rank.Eight),
      new Card(Suit.Hearts, Rank.Seven),
      new Card(Suit.Hearts, Rank.Five),
      new Card(Suit.Hearts, Rank.Three),
    ]);

    const hand2 = new Hand([
      new Card(Suit.Hearts, Rank.Ten),
      new Card(Suit.Diamonds, Rank.Nine),
      new Card(Suit.Clubs, Rank.Eight),
      new Card(Suit.Hearts, Rank.Seven),
      new Card(Suit.Spades, Rank.Six),
    ]);

    expect(hand1.getRank()).toBe(HandRank.Flush);
    expect(hand2.getRank()).toBe(HandRank.Straight);
    expect(hand1.compare(hand2)).toBeGreaterThan(0);
    expect(hand2.compare(hand1)).toBeLessThan(0);
  });

  test("should rank higher than Three of a Kind", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.Ten),
      new Card(Suit.Hearts, Rank.Nine),
      new Card(Suit.Hearts, Rank.Eight),
      new Card(Suit.Hearts, Rank.Seven),
      new Card(Suit.Hearts, Rank.Five),
    ]);

    const hand2 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Clubs, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Spades, Rank.Queen),
    ]);

    expect(hand1.getRank()).toBe(HandRank.Flush);
    expect(hand2.getRank()).toBe(HandRank.ThreeOfAKind);
    expect(hand1.compare(hand2)).toBeGreaterThan(0);
    expect(hand2.compare(hand1)).toBeLessThan(0);
  });

  test("should rank higher than Two Pair", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.Ten),
      new Card(Suit.Hearts, Rank.Nine),
      new Card(Suit.Hearts, Rank.Eight),
      new Card(Suit.Hearts, Rank.Seven),
      new Card(Suit.Hearts, Rank.Five),
    ]);

    const hand2 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Clubs, Rank.King),
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Spades, Rank.Queen),
    ]);

    expect(hand1.getRank()).toBe(HandRank.Flush);
    expect(hand2.getRank()).toBe(HandRank.TwoPair);
    expect(hand1.compare(hand2)).toBeGreaterThan(0);
    expect(hand2.compare(hand1)).toBeLessThan(0);
  });

  test("should rank higher than One Pair", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.Ten),
      new Card(Suit.Hearts, Rank.Nine),
      new Card(Suit.Hearts, Rank.Eight),
      new Card(Suit.Hearts, Rank.Seven),
      new Card(Suit.Hearts, Rank.Five),
    ]);

    const hand2 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Clubs, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Spades, Rank.Jack),
    ]);

    expect(hand1.getRank()).toBe(HandRank.Flush);
    expect(hand2.getRank()).toBe(HandRank.OnePair);
    expect(hand1.compare(hand2)).toBeGreaterThan(0);
    expect(hand2.compare(hand1)).toBeLessThan(0);
  });

  test("should rank higher than High Card", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.Ten),
      new Card(Suit.Hearts, Rank.Nine),
      new Card(Suit.Hearts, Rank.Eight),
      new Card(Suit.Hearts, Rank.Seven),
      new Card(Suit.Hearts, Rank.Five),
    ]);

    const hand2 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.King),
      new Card(Suit.Clubs, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Spades, Rank.Nine),
    ]);

    expect(hand1.getRank()).toBe(HandRank.Flush);
    expect(hand2.getRank()).toBe(HandRank.HighCard);
    expect(hand1.compare(hand2)).toBeGreaterThan(0);
    expect(hand2.compare(hand1)).toBeLessThan(0);
  });
});
