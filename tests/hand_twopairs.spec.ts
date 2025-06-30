import { expect, test, describe } from "vitest";
import { Hand } from "src/hand";
import { Card } from "src/card";
import { Rank, Suit, HandRank } from "src/constants";

describe("Hand - Two Pairs", () => {
  test("should correctly identify Two Pairs", () => {
    const cards = [
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Clubs, Rank.King),
      new Card(Suit.Spades, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
    ];
    const hand = new Hand(cards);
    expect(hand.getRank()).toBe(HandRank.TwoPair);
    expect(hand.getHandCards()).toEqual([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Clubs, Rank.King),
      new Card(Suit.Spades, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
    ]);
  });

  test("should not identify Two Pairs when there is only one pair", () => {
    const cards = [
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Clubs, Rank.King),
      new Card(Suit.Spades, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
    ];
    const hand = new Hand(cards);
    expect(hand.getRank()).not.toBe(HandRank.TwoPair);
  });

  test("should identify Two Pairs regardless of card order", () => {
    const cards = [
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Clubs, Rank.King),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Spades, Rank.King),
      new Card(Suit.Hearts, Rank.Ace),
    ];
    const hand = new Hand(cards);
    expect(hand.getRank()).toBe(HandRank.TwoPair);
    expect(hand.getHandCards()).toEqual([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Clubs, Rank.King),
      new Card(Suit.Spades, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
    ]);
  });
});

describe("Compare - Two Pair", () => {
  test("should correctly compare two Two Pair hands with different higher pairs", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Clubs, Rank.King),
      new Card(Suit.Spades, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
    ]);

    const hand2 = new Hand([
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Diamonds, Rank.King),
      new Card(Suit.Clubs, Rank.Queen),
      new Card(Suit.Spades, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
    ]);

    expect(hand1.getRank()).toBe(HandRank.TwoPair);
    expect(hand2.getRank()).toBe(HandRank.TwoPair);
    expect(hand1.compare(hand2)).toBeGreaterThan(0);
    expect(hand2.compare(hand1)).toBeLessThan(0);
  });

  test("should correctly compare two Two Pair hands with same higher pair but different lower pair", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Clubs, Rank.King),
      new Card(Suit.Spades, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
    ]);

    const hand2 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Clubs, Rank.Queen),
      new Card(Suit.Spades, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
    ]);

    expect(hand1.getRank()).toBe(HandRank.TwoPair);
    expect(hand2.getRank()).toBe(HandRank.TwoPair);
    expect(hand1.compare(hand2)).toBeGreaterThan(0);
    expect(hand2.compare(hand1)).toBeLessThan(0);
  });

  test("should correctly compare two Two Pair hands with same pairs but different kicker", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Clubs, Rank.King),
      new Card(Suit.Spades, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
    ]);

    const hand2 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Clubs, Rank.King),
      new Card(Suit.Spades, Rank.King),
      new Card(Suit.Hearts, Rank.Jack),
    ]);

    expect(hand1.getRank()).toBe(HandRank.TwoPair);
    expect(hand2.getRank()).toBe(HandRank.TwoPair);
    expect(hand1.compare(hand2)).toBeGreaterThan(0);
    expect(hand2.compare(hand1)).toBeLessThan(0);
  });

  test("should correctly rank Two Pair higher than One Pair", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.Two),
      new Card(Suit.Diamonds, Rank.Two),
      new Card(Suit.Clubs, Rank.Three),
      new Card(Suit.Spades, Rank.Three),
      new Card(Suit.Hearts, Rank.Four),
    ]);

    const hand2 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Clubs, Rank.King),
      new Card(Suit.Spades, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
    ]);

    expect(hand1.getRank()).toBe(HandRank.TwoPair);
    expect(hand2.getRank()).toBe(HandRank.OnePair);
    expect(hand1.compare(hand2)).toBeGreaterThan(0);
    expect(hand2.compare(hand1)).toBeLessThan(0);
  });

  test("should correctly rank Two Pair higher than High Card", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.Two),
      new Card(Suit.Diamonds, Rank.Two),
      new Card(Suit.Clubs, Rank.Three),
      new Card(Suit.Spades, Rank.Three),
      new Card(Suit.Hearts, Rank.Four),
    ]);

    const hand2 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.King),
      new Card(Suit.Clubs, Rank.Queen),
      new Card(Suit.Spades, Rank.Jack),
      new Card(Suit.Hearts, Rank.Nine),
    ]);

    expect(hand1.getRank()).toBe(HandRank.TwoPair);
    expect(hand2.getRank()).toBe(HandRank.HighCard);
    expect(hand1.compare(hand2)).toBeGreaterThan(0);
    expect(hand2.compare(hand1)).toBeLessThan(0);
  });
});
