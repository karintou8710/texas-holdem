import { expect, test, describe } from "vitest";
import { Hand } from "src/hand";
import { Card } from "src/card";
import { Rank, Suit, HandRank } from "src/constants";

describe("Hand - Three of a Kind", () => {
  test("should correctly identify Three of a Kind", () => {
    const cards = [
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Clubs, Rank.Ace),
      new Card(Suit.Spades, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
    ];
    const hand = new Hand(cards);
    expect(hand.getRank()).toBe(HandRank.ThreeOfAKind);
    expect(hand.getHandCards()).toEqual([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Clubs, Rank.Ace),
      new Card(Suit.Spades, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
    ]);
  });

  test("should not identify Three of a Kind when there are only pairs", () => {
    const cards = [
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Clubs, Rank.King),
      new Card(Suit.Spades, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
    ];
    const hand = new Hand(cards);
    expect(hand.getRank()).not.toBe(HandRank.ThreeOfAKind);
  });

  test("should identify Three of a Kind with cards in different order", () => {
    const cards = [
      new Card(Suit.Spades, Rank.King),
      new Card(Suit.Diamonds, Rank.Seven),
      new Card(Suit.Hearts, Rank.Seven),
      new Card(Suit.Clubs, Rank.Seven),
      new Card(Suit.Hearts, Rank.Two),
    ];
    const hand = new Hand(cards);
    expect(hand.getRank()).toBe(HandRank.ThreeOfAKind);
    expect(hand.getHandCards()).toEqual([
      new Card(Suit.Hearts, Rank.Seven),
      new Card(Suit.Diamonds, Rank.Seven),
      new Card(Suit.Clubs, Rank.Seven),
      new Card(Suit.Spades, Rank.King),
      new Card(Suit.Hearts, Rank.Two),
    ]);
  });
});

describe("Compare - Three of a Kind", () => {
  test("should correctly compare two Three of a Kind hands with different triplet ranks", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Clubs, Rank.Ace),
      new Card(Suit.Spades, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
    ]);

    const hand2 = new Hand([
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Diamonds, Rank.King),
      new Card(Suit.Clubs, Rank.King),
      new Card(Suit.Spades, Rank.Ace),
      new Card(Suit.Hearts, Rank.Queen),
    ]);

    expect(hand1.getRank()).toBe(HandRank.ThreeOfAKind);
    expect(hand2.getRank()).toBe(HandRank.ThreeOfAKind);
    expect(hand1.compare(hand2)).toBeGreaterThan(0);
    expect(hand2.compare(hand1)).toBeLessThan(0);
  });

  test("should correctly compare two Three of a Kind hands with same triplet but different kickers", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Clubs, Rank.Ace),
      new Card(Suit.Spades, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
    ]);

    const hand2 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Clubs, Rank.Ace),
      new Card(Suit.Spades, Rank.Jack),
      new Card(Suit.Hearts, Rank.Ten),
    ]);

    expect(hand1.getRank()).toBe(HandRank.ThreeOfAKind);
    expect(hand2.getRank()).toBe(HandRank.ThreeOfAKind);
    expect(hand1.compare(hand2)).toBeGreaterThan(0);
    expect(hand2.compare(hand1)).toBeLessThan(0);
  });

  test("should correctly rank Three of a Kind higher than Two Pair", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.Two),
      new Card(Suit.Diamonds, Rank.Two),
      new Card(Suit.Clubs, Rank.Two),
      new Card(Suit.Spades, Rank.Three),
      new Card(Suit.Hearts, Rank.Four),
    ]);

    const hand2 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Clubs, Rank.King),
      new Card(Suit.Spades, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
    ]);

    expect(hand1.getRank()).toBe(HandRank.ThreeOfAKind);
    expect(hand2.getRank()).toBe(HandRank.TwoPair);
    expect(hand1.compare(hand2)).toBeGreaterThan(0);
    expect(hand2.compare(hand1)).toBeLessThan(0);
  });

  test("should correctly rank Three of a Kind higher than One Pair", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.Two),
      new Card(Suit.Diamonds, Rank.Two),
      new Card(Suit.Clubs, Rank.Two),
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

    expect(hand1.getRank()).toBe(HandRank.ThreeOfAKind);
    expect(hand2.getRank()).toBe(HandRank.OnePair);
    expect(hand1.compare(hand2)).toBeGreaterThan(0);
    expect(hand2.compare(hand1)).toBeLessThan(0);
  });

  test("should correctly rank Three of a Kind higher than High Card", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.Two),
      new Card(Suit.Diamonds, Rank.Two),
      new Card(Suit.Clubs, Rank.Two),
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

    expect(hand1.getRank()).toBe(HandRank.ThreeOfAKind);
    expect(hand2.getRank()).toBe(HandRank.HighCard);
    expect(hand1.compare(hand2)).toBeGreaterThan(0);
    expect(hand2.compare(hand1)).toBeLessThan(0);
  });
});
