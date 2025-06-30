import { expect, test, describe } from "vitest";
import { Hand } from "src/hand";
import { Card } from "src/card";
import { Rank, Suit, HandRank } from "src/constants";

describe("Hand - Royal Flush", () => {
  test("should correctly identify basic Royal Flush", () => {
    const cards = [
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Hearts, Rank.Ten),
    ];
    const hand = new Hand(cards);
    expect(hand.getRank()).toBe(HandRank.RoyalFlush);
    expect(hand.getHandCards()).toEqual([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Hearts, Rank.Ten),
    ]);
  });

  test("should correctly identify Royal Flush with different suits", () => {
    const cards = [
      new Card(Suit.Spades, Rank.Ace),
      new Card(Suit.Spades, Rank.King),
      new Card(Suit.Spades, Rank.Queen),
      new Card(Suit.Spades, Rank.Jack),
      new Card(Suit.Spades, Rank.Ten),
    ];
    const hand = new Hand(cards);
    expect(hand.getRank()).toBe(HandRank.RoyalFlush);
    expect(hand.getHandCards()).toEqual([
      new Card(Suit.Spades, Rank.Ace),
      new Card(Suit.Spades, Rank.King),
      new Card(Suit.Spades, Rank.Queen),
      new Card(Suit.Spades, Rank.Jack),
      new Card(Suit.Spades, Rank.Ten),
    ]);
  });

  test("should not identify as Royal Flush when cards are similar but different", () => {
    const cards = [
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Hearts, Rank.Nine), // Not Ten
    ];
    const hand = new Hand(cards);
    expect(hand.getRank()).not.toBe(HandRank.RoyalFlush);
  });

  test("should not identify as Royal Flush when cards have mixed suits", () => {
    const cards = [
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Diamonds, Rank.Ten), // Different suit
    ];
    const hand = new Hand(cards);
    expect(hand.getRank()).not.toBe(HandRank.RoyalFlush);
  });

  test("should correctly identify Royal Flush when cards are unordered", () => {
    const cards = [
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Hearts, Rank.Ten),
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Hearts, Rank.King),
    ];
    const hand = new Hand(cards);
    expect(hand.getRank()).toBe(HandRank.RoyalFlush);
    expect(hand.getHandCards()).toEqual([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Hearts, Rank.Ten),
    ]);
  });
});

describe("Compare - Royal Flush", () => {
  test("should handle comparison between Royal Flushes of different suits correctly", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Hearts, Rank.Ten),
    ]);

    const hand2 = new Hand([
      new Card(Suit.Spades, Rank.Ace),
      new Card(Suit.Spades, Rank.King),
      new Card(Suit.Spades, Rank.Queen),
      new Card(Suit.Spades, Rank.Jack),
      new Card(Suit.Spades, Rank.Ten),
    ]);

    expect(hand1.getRank()).toBe(HandRank.RoyalFlush);
    expect(hand2.getRank()).toBe(HandRank.RoyalFlush);
    expect(hand1.compare(hand2)).toBe(0);
    expect(hand2.compare(hand1)).toBe(0);
  });

  test("should correctly compare Royal Flush against Straight Flush", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Hearts, Rank.Ten),
    ]);
    const hand2 = new Hand([
      new Card(Suit.Spades, Rank.King),
      new Card(Suit.Spades, Rank.Queen),
      new Card(Suit.Spades, Rank.Jack),
      new Card(Suit.Spades, Rank.Ten),
      new Card(Suit.Spades, Rank.Nine),
    ]);

    expect(hand1.getRank()).toBe(HandRank.RoyalFlush);
    expect(hand2.getRank()).toBe(HandRank.StraightFlush);
    expect(hand1.compare(hand2)).toBeGreaterThan(0);
    expect(hand2.compare(hand1)).toBeLessThan(0);
  });

  test("should correctly compare Royal Flush against Four of a Kind", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Hearts, Rank.Ten),
    ]);
    const hand2 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Clubs, Rank.Ace),
      new Card(Suit.Spades, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
    ]);

    expect(hand1.getRank()).toBe(HandRank.RoyalFlush);
    expect(hand2.getRank()).toBe(HandRank.FourOfAKind);
    expect(hand1.compare(hand2)).toBeGreaterThan(0);
    expect(hand2.compare(hand1)).toBeLessThan(0);
  });

  test("should correctly compare Royal Flush against Full House", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Hearts, Rank.Ten),
    ]);
    const hand2 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Clubs, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Diamonds, Rank.King),
    ]);

    expect(hand1.getRank()).toBe(HandRank.RoyalFlush);
    expect(hand2.getRank()).toBe(HandRank.FullHouse);
    expect(hand1.compare(hand2)).toBeGreaterThan(0);
    expect(hand2.compare(hand1)).toBeLessThan(0);
  });

  test("should correctly compare Royal Flush against Flush", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Hearts, Rank.Ten),
    ]);
    const hand2 = new Hand([
      new Card(Suit.Spades, Rank.Ace),
      new Card(Suit.Spades, Rank.King),
      new Card(Suit.Spades, Rank.Queen),
      new Card(Suit.Spades, Rank.Jack),
      new Card(Suit.Spades, Rank.Nine),
    ]);

    expect(hand1.getRank()).toBe(HandRank.RoyalFlush);
    expect(hand2.getRank()).toBe(HandRank.Flush);
    expect(hand1.compare(hand2)).toBeGreaterThan(0);
    expect(hand2.compare(hand1)).toBeLessThan(0);
  });

  test("should correctly compare Royal Flush against Straight", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Hearts, Rank.Ten),
    ]);
    const hand2 = new Hand([
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Diamonds, Rank.Queen),
      new Card(Suit.Clubs, Rank.Jack),
      new Card(Suit.Spades, Rank.Ten),
      new Card(Suit.Hearts, Rank.Nine),
    ]);

    expect(hand1.getRank()).toBe(HandRank.RoyalFlush);
    expect(hand2.getRank()).toBe(HandRank.Straight);
    expect(hand1.compare(hand2)).toBeGreaterThan(0);
    expect(hand2.compare(hand1)).toBeLessThan(0);
  });

  test("should correctly compare Royal Flush against Three of a Kind", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Hearts, Rank.Ten),
    ]);
    const hand2 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Clubs, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Diamonds, Rank.Queen),
    ]);

    expect(hand1.getRank()).toBe(HandRank.RoyalFlush);
    expect(hand2.getRank()).toBe(HandRank.ThreeOfAKind);
    expect(hand1.compare(hand2)).toBeGreaterThan(0);
    expect(hand2.compare(hand1)).toBeLessThan(0);
  });

  test("should correctly compare Royal Flush against Two Pair", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Hearts, Rank.Ten),
    ]);
    const hand2 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Clubs, Rank.King),
      new Card(Suit.Spades, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
    ]);

    expect(hand1.getRank()).toBe(HandRank.RoyalFlush);
    expect(hand2.getRank()).toBe(HandRank.TwoPair);
    expect(hand1.compare(hand2)).toBeGreaterThan(0);
    expect(hand2.compare(hand1)).toBeLessThan(0);
  });

  test("should correctly compare Royal Flush against One Pair", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Hearts, Rank.Ten),
    ]);
    const hand2 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Clubs, Rank.King),
      new Card(Suit.Spades, Rank.Queen),
      new Card(Suit.Hearts, Rank.Ten),
    ]);

    expect(hand1.getRank()).toBe(HandRank.RoyalFlush);
    expect(hand2.getRank()).toBe(HandRank.OnePair);
    expect(hand1.compare(hand2)).toBeGreaterThan(0);
    expect(hand2.compare(hand1)).toBeLessThan(0);
  });

  test("should correctly compare Royal Flush against High Card", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Hearts, Rank.Ten),
    ]);
    const hand2 = new Hand([
      new Card(Suit.Spades, Rank.Ace),
      new Card(Suit.Diamonds, Rank.King),
      new Card(Suit.Clubs, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Spades, Rank.Nine),
    ]);

    expect(hand1.getRank()).toBe(HandRank.RoyalFlush);
    expect(hand2.getRank()).toBe(HandRank.HighCard);
    expect(hand1.compare(hand2)).toBeGreaterThan(0);
    expect(hand2.compare(hand1)).toBeLessThan(0);
  });
});
