import { expect, test, describe } from "vitest";
import { Hand } from "src/hand";
import { Card } from "src/card";
import { Rank, Suit, HandRank } from "src/constants";

describe("Hand - Straight Flush", () => {
  test("should correctly identify basic Straight Flush", () => {
    const cards = [
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Hearts, Rank.Ten),
      new Card(Suit.Hearts, Rank.Nine),
    ];
    const hand = new Hand(cards);
    expect(hand.getRank()).toBe(HandRank.StraightFlush);
    expect(hand.getHandCards()).toEqual([
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Hearts, Rank.Ten),
      new Card(Suit.Hearts, Rank.Nine),
    ]);
  });

  test("should correctly identify Straight Flush with different suits", () => {
    const cards = [
      new Card(Suit.Spades, Rank.King),
      new Card(Suit.Spades, Rank.Queen),
      new Card(Suit.Spades, Rank.Jack),
      new Card(Suit.Spades, Rank.Ten),
      new Card(Suit.Spades, Rank.Nine),
    ];
    const hand = new Hand(cards);
    expect(hand.getRank()).toBe(HandRank.StraightFlush);
    expect(hand.getHandCards()).toEqual([
      new Card(Suit.Spades, Rank.King),
      new Card(Suit.Spades, Rank.Queen),
      new Card(Suit.Spades, Rank.Jack),
      new Card(Suit.Spades, Rank.Ten),
      new Card(Suit.Spades, Rank.Nine),
    ]);
  });

  test("should not identify as Straight Flush when cards are similar but different", () => {
    const cards = [
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Hearts, Rank.Ten),
      new Card(Suit.Hearts, Rank.Eight), // Not Nine
    ];
    const hand = new Hand(cards);
    expect(hand.getRank()).not.toBe(HandRank.StraightFlush);
  });

  test("should not identify as Straight Flush when cards have mixed suits", () => {
    const cards = [
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Hearts, Rank.Ten),
      new Card(Suit.Diamonds, Rank.Nine), // Different suit
    ];
    const hand = new Hand(cards);
    expect(hand.getRank()).not.toBe(HandRank.StraightFlush);
  });

  test("should correctly identify Straight Flush when cards are unordered", () => {
    const cards = [
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Hearts, Rank.Nine),
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Hearts, Rank.Ten),
    ];
    const hand = new Hand(cards);
    expect(hand.getRank()).toBe(HandRank.StraightFlush);
    expect(hand.getHandCards()).toEqual([
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Hearts, Rank.Ten),
      new Card(Suit.Hearts, Rank.Nine),
    ]);
  });

  test("should correctly identify Straight Flush for 5432A (unordered)", () => {
    const cards = [
      new Card(Suit.Hearts, Rank.Two),
      new Card(Suit.Hearts, Rank.Five),
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Hearts, Rank.Three),
      new Card(Suit.Hearts, Rank.Four),
    ];
    const hand = new Hand(cards);
    expect(hand.getRank()).toBe(HandRank.StraightFlush);
    expect(hand.getHandCards()).toEqual([
      new Card(Suit.Hearts, Rank.Five),
      new Card(Suit.Hearts, Rank.Four),
      new Card(Suit.Hearts, Rank.Three),
      new Card(Suit.Hearts, Rank.Two),
      new Card(Suit.Hearts, Rank.Ace),
    ]);
  });
});

describe("Compare - Straight Flush", () => {
  test("should correctly rank higher Straight Flush over lower one", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Hearts, Rank.Ten),
      new Card(Suit.Hearts, Rank.Nine),
    ]);

    const hand2 = new Hand([
      new Card(Suit.Spades, Rank.Queen),
      new Card(Suit.Spades, Rank.Jack),
      new Card(Suit.Spades, Rank.Ten),
      new Card(Suit.Spades, Rank.Nine),
      new Card(Suit.Spades, Rank.Eight),
    ]);

    expect(hand1.getRank()).toBe(HandRank.StraightFlush);
    expect(hand2.getRank()).toBe(HandRank.StraightFlush);
    expect(hand1.compare(hand2)).toBeGreaterThan(0);
    expect(hand2.compare(hand1)).toBeLessThan(0);
  });

  test("should correctly identify same rank for equal Straight Flushes", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Hearts, Rank.Ten),
      new Card(Suit.Hearts, Rank.Nine),
    ]);

    const hand2 = new Hand([
      new Card(Suit.Spades, Rank.King),
      new Card(Suit.Spades, Rank.Queen),
      new Card(Suit.Spades, Rank.Jack),
      new Card(Suit.Spades, Rank.Ten),
      new Card(Suit.Spades, Rank.Nine),
    ]);

    expect(hand1.getRank()).toBe(HandRank.StraightFlush);
    expect(hand2.getRank()).toBe(HandRank.StraightFlush);
    expect(hand1.compare(hand2)).toBe(0);
    expect(hand2.compare(hand1)).toBe(0);
  });

  test("should correctly rank 65432 over 5432A", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.Six),
      new Card(Suit.Hearts, Rank.Five),
      new Card(Suit.Hearts, Rank.Four),
      new Card(Suit.Hearts, Rank.Three),
      new Card(Suit.Hearts, Rank.Two),
    ]);

    const hand2 = new Hand([
      new Card(Suit.Hearts, Rank.Five),
      new Card(Suit.Hearts, Rank.Four),
      new Card(Suit.Hearts, Rank.Three),
      new Card(Suit.Hearts, Rank.Two),
      new Card(Suit.Hearts, Rank.Ace),
    ]);

    expect(hand1.getRank()).toBe(HandRank.StraightFlush);
    expect(hand2.getRank()).toBe(HandRank.StraightFlush);
    expect(hand1.compare(hand2)).toBeGreaterThan(0);
    expect(hand2.compare(hand1)).toBeLessThan(0);
  });

  test("should correctly rank Straight Flush higher than Four of a Kind", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.Six),
      new Card(Suit.Hearts, Rank.Five),
      new Card(Suit.Hearts, Rank.Four),
      new Card(Suit.Hearts, Rank.Three),
      new Card(Suit.Hearts, Rank.Two),
    ]);

    const hand2 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Clubs, Rank.Ace),
      new Card(Suit.Spades, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
    ]);

    expect(hand1.getRank()).toBe(HandRank.StraightFlush);
    expect(hand2.getRank()).toBe(HandRank.FourOfAKind);
    expect(hand1.compare(hand2)).toBeGreaterThan(0);
    expect(hand2.compare(hand1)).toBeLessThan(0);
  });

  test("should correctly rank Straight Flush higher than Full House", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.Six),
      new Card(Suit.Hearts, Rank.Five),
      new Card(Suit.Hearts, Rank.Four),
      new Card(Suit.Hearts, Rank.Three),
      new Card(Suit.Hearts, Rank.Two),
    ]);

    const hand2 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Clubs, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Diamonds, Rank.King),
    ]);

    expect(hand1.getRank()).toBe(HandRank.StraightFlush);
    expect(hand2.getRank()).toBe(HandRank.FullHouse);
    expect(hand1.compare(hand2)).toBeGreaterThan(0);
    expect(hand2.compare(hand1)).toBeLessThan(0);
  });

  test("should correctly rank Straight Flush higher than Flush", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.Six),
      new Card(Suit.Hearts, Rank.Five),
      new Card(Suit.Hearts, Rank.Four),
      new Card(Suit.Hearts, Rank.Three),
      new Card(Suit.Hearts, Rank.Two),
    ]);

    const hand2 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Hearts, Rank.Nine),
      new Card(Suit.Hearts, Rank.Seven),
    ]);

    expect(hand1.getRank()).toBe(HandRank.StraightFlush);
    expect(hand2.getRank()).toBe(HandRank.Flush);
    expect(hand1.compare(hand2)).toBeGreaterThan(0);
    expect(hand2.compare(hand1)).toBeLessThan(0);
  });

  test("should correctly rank Straight Flush higher than Straight", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.Six),
      new Card(Suit.Hearts, Rank.Five),
      new Card(Suit.Hearts, Rank.Four),
      new Card(Suit.Hearts, Rank.Three),
      new Card(Suit.Hearts, Rank.Two),
    ]);

    const hand2 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.King),
      new Card(Suit.Clubs, Rank.Queen),
      new Card(Suit.Spades, Rank.Jack),
      new Card(Suit.Hearts, Rank.Ten),
    ]);

    expect(hand1.getRank()).toBe(HandRank.StraightFlush);
    expect(hand2.getRank()).toBe(HandRank.Straight);
    expect(hand1.compare(hand2)).toBeGreaterThan(0);
    expect(hand2.compare(hand1)).toBeLessThan(0);
  });

  test("should correctly rank Straight Flush higher than Three of a Kind", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.Six),
      new Card(Suit.Hearts, Rank.Five),
      new Card(Suit.Hearts, Rank.Four),
      new Card(Suit.Hearts, Rank.Three),
      new Card(Suit.Hearts, Rank.Two),
    ]);

    const hand2 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Clubs, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Diamonds, Rank.Queen),
    ]);

    expect(hand1.getRank()).toBe(HandRank.StraightFlush);
    expect(hand2.getRank()).toBe(HandRank.ThreeOfAKind);
    expect(hand1.compare(hand2)).toBeGreaterThan(0);
    expect(hand2.compare(hand1)).toBeLessThan(0);
  });

  test("should correctly rank Straight Flush higher than Two Pair", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.Six),
      new Card(Suit.Hearts, Rank.Five),
      new Card(Suit.Hearts, Rank.Four),
      new Card(Suit.Hearts, Rank.Three),
      new Card(Suit.Hearts, Rank.Two),
    ]);

    const hand2 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Diamonds, Rank.King),
      new Card(Suit.Clubs, Rank.Queen),
    ]);

    expect(hand1.getRank()).toBe(HandRank.StraightFlush);
    expect(hand2.getRank()).toBe(HandRank.TwoPair);
    expect(hand1.compare(hand2)).toBeGreaterThan(0);
    expect(hand2.compare(hand1)).toBeLessThan(0);
  });

  test("should correctly rank Straight Flush higher than One Pair", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.Six),
      new Card(Suit.Hearts, Rank.Five),
      new Card(Suit.Hearts, Rank.Four),
      new Card(Suit.Hearts, Rank.Three),
      new Card(Suit.Hearts, Rank.Two),
    ]);

    const hand2 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Diamonds, Rank.Queen),
      new Card(Suit.Clubs, Rank.Jack),
    ]);

    expect(hand1.getRank()).toBe(HandRank.StraightFlush);
    expect(hand2.getRank()).toBe(HandRank.OnePair);
    expect(hand1.compare(hand2)).toBeGreaterThan(0);
    expect(hand2.compare(hand1)).toBeLessThan(0);
  });

  test("should correctly rank Straight Flush higher than High Card", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.Six),
      new Card(Suit.Hearts, Rank.Five),
      new Card(Suit.Hearts, Rank.Four),
      new Card(Suit.Hearts, Rank.Three),
      new Card(Suit.Hearts, Rank.Two),
    ]);

    const hand2 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Diamonds, Rank.Jack),
      new Card(Suit.Clubs, Rank.Nine),
    ]);

    expect(hand1.getRank()).toBe(HandRank.StraightFlush);
    expect(hand2.getRank()).toBe(HandRank.HighCard);
    expect(hand1.compare(hand2)).toBeGreaterThan(0);
    expect(hand2.compare(hand1)).toBeLessThan(0);
  });
});
