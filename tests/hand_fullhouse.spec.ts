import { expect, test, describe } from "vitest";
import { Hand } from "src/hand";
import { Card } from "src/card";
import { Rank, Suit, HandRank } from "src/constants";

describe("Hand - Full House", () => {
  test("should correctly identify a Full House", () => {
    const cards = [
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Clubs, Rank.Ace),
      new Card(Suit.Spades, Rank.King),
      new Card(Suit.Hearts, Rank.King),
    ];
    const hand = new Hand(cards);
    expect(hand.getRank()).toBe(HandRank.FullHouse);
    expect(hand.getHandCards()).toEqual([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Clubs, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Spades, Rank.King),
    ]);
  });

  test("should not identify a Full House when there is no three of a kind", () => {
    const cards = [
      new Card(Suit.Clubs, Rank.King),
      new Card(Suit.Spades, Rank.King),
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Hearts, Rank.Queen),
    ];
    const hand = new Hand(cards);
    expect(hand.getRank()).not.toBe(HandRank.FullHouse);
  });

  test("should not identify a Full House when there is no pair", () => {
    const cards = [
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.King),
      new Card(Suit.Clubs, Rank.Queen),
      new Card(Suit.Spades, Rank.Jack),
      new Card(Suit.Hearts, Rank.Ten),
    ];
    const hand = new Hand(cards);
    expect(hand.getRank()).not.toBe(HandRank.FullHouse);
  });

  test("should correctly sort cards within a Full House", () => {
    const cards = [
      new Card(Suit.Spades, Rank.Three),
      new Card(Suit.Clubs, Rank.Two),
      new Card(Suit.Hearts, Rank.Two),
      new Card(Suit.Hearts, Rank.Three),
      new Card(Suit.Diamonds, Rank.Two),
    ];
    const hand = new Hand(cards);
    expect(hand.getRank()).toBe(HandRank.FullHouse);
    expect(hand.getHandCards()).toEqual([
      new Card(Suit.Hearts, Rank.Two),
      new Card(Suit.Diamonds, Rank.Two),
      new Card(Suit.Clubs, Rank.Two),
      new Card(Suit.Hearts, Rank.Three),
      new Card(Suit.Spades, Rank.Three),
    ]);
  });
});

describe("Compare - Full House", () => {
  test("should correctly compare Full Houses with different three of a kind", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Diamonds, Rank.King),
      new Card(Suit.Clubs, Rank.King),
      new Card(Suit.Spades, Rank.Two),
      new Card(Suit.Hearts, Rank.Two),
    ]);

    const hand2 = new Hand([
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Diamonds, Rank.Queen),
      new Card(Suit.Clubs, Rank.Queen),
      new Card(Suit.Spades, Rank.Ace),
      new Card(Suit.Hearts, Rank.Ace),
    ]);

    expect(hand1.getRank()).toBe(HandRank.FullHouse);
    expect(hand2.getRank()).toBe(HandRank.FullHouse);
    expect(hand1.compare(hand2)).toBeGreaterThan(0);
    expect(hand2.compare(hand1)).toBeLessThan(0);
  });

  test("should correctly compare Full Houses with same three of a kind but different pairs", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Diamonds, Rank.King),
      new Card(Suit.Clubs, Rank.King),
      new Card(Suit.Spades, Rank.Ace),
      new Card(Suit.Hearts, Rank.Ace),
    ]);

    const hand2 = new Hand([
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Diamonds, Rank.King),
      new Card(Suit.Clubs, Rank.King),
      new Card(Suit.Spades, Rank.Queen),
      new Card(Suit.Hearts, Rank.Queen),
    ]);

    expect(hand1.getRank()).toBe(HandRank.FullHouse);
    expect(hand2.getRank()).toBe(HandRank.FullHouse);
    expect(hand1.compare(hand2)).toBeGreaterThan(0);
    expect(hand2.compare(hand1)).toBeLessThan(0);
  });

  test("should rank Full House higher than Flush", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Diamonds, Rank.King),
      new Card(Suit.Clubs, Rank.King),
      new Card(Suit.Spades, Rank.Two),
      new Card(Suit.Hearts, Rank.Two),
    ]);

    const hand2 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Hearts, Rank.Nine),
    ]);

    expect(hand1.getRank()).toBe(HandRank.FullHouse);
    expect(hand2.getRank()).toBe(HandRank.Flush);
    expect(hand1.compare(hand2)).toBeGreaterThan(0);
    expect(hand2.compare(hand1)).toBeLessThan(0);
  });

  test("should rank Full House higher than Straight", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.Two),
      new Card(Suit.Diamonds, Rank.Two),
      new Card(Suit.Clubs, Rank.Two),
      new Card(Suit.Spades, Rank.Three),
      new Card(Suit.Hearts, Rank.Three),
    ]);

    const hand2 = new Hand([
      new Card(Suit.Hearts, Rank.Six),
      new Card(Suit.Diamonds, Rank.Five),
      new Card(Suit.Clubs, Rank.Four),
      new Card(Suit.Spades, Rank.Three),
      new Card(Suit.Hearts, Rank.Two),
    ]);

    expect(hand1.getRank()).toBe(HandRank.FullHouse);
    expect(hand2.getRank()).toBe(HandRank.Straight);
    expect(hand1.compare(hand2)).toBeGreaterThan(0);
    expect(hand1.compare(hand2)).toBeGreaterThan(0);
    expect(hand2.compare(hand1)).toBeLessThan(0);
  });

  test("should rank Full House higher than Three of a Kind", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.Two),
      new Card(Suit.Diamonds, Rank.Two),
      new Card(Suit.Clubs, Rank.Two),
      new Card(Suit.Spades, Rank.Three),
      new Card(Suit.Hearts, Rank.Three),
    ]);

    const hand2 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Clubs, Rank.Ace),
      new Card(Suit.Spades, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
    ]);

    expect(hand1.getRank()).toBe(HandRank.FullHouse);
    expect(hand2.getRank()).toBe(HandRank.ThreeOfAKind);
    expect(hand1.compare(hand2)).toBeGreaterThan(0);
    expect(hand2.compare(hand1)).toBeLessThan(0);
  });

  test("should rank Full House higher than Two Pair", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.Two),
      new Card(Suit.Diamonds, Rank.Two),
      new Card(Suit.Clubs, Rank.Two),
      new Card(Suit.Spades, Rank.Three),
      new Card(Suit.Hearts, Rank.Three),
    ]);

    const hand2 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Clubs, Rank.King),
      new Card(Suit.Spades, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
    ]);

    expect(hand1.getRank()).toBe(HandRank.FullHouse);
    expect(hand2.getRank()).toBe(HandRank.TwoPair);
    expect(hand1.compare(hand2)).toBeGreaterThan(0);
    expect(hand2.compare(hand1)).toBeLessThan(0);
  });

  test("should rank Full House higher than One Pair", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.Two),
      new Card(Suit.Diamonds, Rank.Two),
      new Card(Suit.Clubs, Rank.Two),
      new Card(Suit.Spades, Rank.Three),
      new Card(Suit.Hearts, Rank.Three),
    ]);

    const hand2 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Clubs, Rank.King),
      new Card(Suit.Spades, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
    ]);

    expect(hand1.getRank()).toBe(HandRank.FullHouse);
    expect(hand2.getRank()).toBe(HandRank.OnePair);
    expect(hand1.compare(hand2)).toBeGreaterThan(0);
    expect(hand2.compare(hand1)).toBeLessThan(0);
  });

  test("should rank Full House higher than High Card", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.Two),
      new Card(Suit.Diamonds, Rank.Two),
      new Card(Suit.Clubs, Rank.Two),
      new Card(Suit.Spades, Rank.Three),
      new Card(Suit.Hearts, Rank.Three),
    ]);

    const hand2 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.King),
      new Card(Suit.Clubs, Rank.Queen),
      new Card(Suit.Spades, Rank.Jack),
      new Card(Suit.Hearts, Rank.Nine),
    ]);

    expect(hand1.getRank()).toBe(HandRank.FullHouse);
    expect(hand2.getRank()).toBe(HandRank.HighCard);
    expect(hand1.compare(hand2)).toBeGreaterThan(0);
    expect(hand2.compare(hand1)).toBeLessThan(0);
  });
});
