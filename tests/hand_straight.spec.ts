import { expect, test, describe } from "vitest";
import { Hand } from "src/hand";
import { Card } from "src/card";
import { Rank, Suit, HandRank } from "src/constants";

describe("Hand - Straight", () => {
  test("should correctly identify a Straight", () => {
    const cards = [
      new Card(Suit.Hearts, Rank.Six),
      new Card(Suit.Hearts, Rank.Five),
      new Card(Suit.Clubs, Rank.Four),
      new Card(Suit.Spades, Rank.Three),
      new Card(Suit.Diamonds, Rank.Two),
    ];
    const hand = new Hand(cards);
    expect(hand.getRank()).toBe(HandRank.Straight);
    expect(hand.getHandCards()).toEqual([
      new Card(Suit.Hearts, Rank.Six),
      new Card(Suit.Hearts, Rank.Five),
      new Card(Suit.Clubs, Rank.Four),
      new Card(Suit.Spades, Rank.Three),
      new Card(Suit.Diamonds, Rank.Two),
    ]);
  });

  test("should not identify a Straight when cards are not consecutive", () => {
    const cards = [
      new Card(Suit.Hearts, Rank.Five),
      new Card(Suit.Clubs, Rank.Four),
      new Card(Suit.Spades, Rank.Three),
      new Card(Suit.Diamonds, Rank.Two),
      new Card(Suit.Hearts, Rank.Seven),
    ];
    const hand = new Hand(cards);
    expect(hand.getRank()).not.toBe(HandRank.Straight);
  });

  test("should correctly identify an Ace-low Straight", () => {
    const cards = [
      new Card(Suit.Hearts, Rank.Five),
      new Card(Suit.Clubs, Rank.Four),
      new Card(Suit.Spades, Rank.Three),
      new Card(Suit.Diamonds, Rank.Two),
      new Card(Suit.Hearts, Rank.Ace),
    ];
    const hand = new Hand(cards);
    expect(hand.getRank()).toBe(HandRank.Straight);
    expect(hand.getHandCards()).toEqual([
      new Card(Suit.Hearts, Rank.Five),
      new Card(Suit.Clubs, Rank.Four),
      new Card(Suit.Spades, Rank.Three),
      new Card(Suit.Diamonds, Rank.Two),
      new Card(Suit.Hearts, Rank.Ace),
    ]);
  });

  test("should correctly identify an Ace-high Straight", () => {
    const cards = [
      new Card(Suit.Hearts, Rank.Ten),
      new Card(Suit.Clubs, Rank.Jack),
      new Card(Suit.Spades, Rank.Queen),
      new Card(Suit.Diamonds, Rank.King),
      new Card(Suit.Hearts, Rank.Ace),
    ];
    const hand = new Hand(cards);
    expect(hand.getRank()).toBe(HandRank.Straight);
    expect(hand.getHandCards()).toEqual([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.King),
      new Card(Suit.Spades, Rank.Queen),
      new Card(Suit.Clubs, Rank.Jack),
      new Card(Suit.Hearts, Rank.Ten),
    ]);
  });

  test("should not identify a Straight when there are duplicate cards", () => {
    const cards = [
      new Card(Suit.Hearts, Rank.Five),
      new Card(Suit.Clubs, Rank.Five),
      new Card(Suit.Spades, Rank.Three),
      new Card(Suit.Diamonds, Rank.Two),
      new Card(Suit.Hearts, Rank.Six),
    ];
    const hand = new Hand(cards);
    expect(hand.getRank()).not.toBe(HandRank.Straight);
  });
});

describe("Compare - Straight", () => {
  test("should correctly rank higher Straight over lower one", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.Ten),
      new Card(Suit.Clubs, Rank.Jack),
      new Card(Suit.Spades, Rank.Queen),
      new Card(Suit.Diamonds, Rank.King),
      new Card(Suit.Hearts, Rank.Ace),
    ]);

    const hand2 = new Hand([
      new Card(Suit.Hearts, Rank.Nine),
      new Card(Suit.Clubs, Rank.Ten),
      new Card(Suit.Spades, Rank.Jack),
      new Card(Suit.Diamonds, Rank.Queen),
      new Card(Suit.Hearts, Rank.King),
    ]);

    expect(hand1.getRank()).toBe(HandRank.Straight);
    expect(hand2.getRank()).toBe(HandRank.Straight);
    expect(hand1.compare(hand2)).toBeGreaterThan(0);
    expect(hand2.compare(hand1)).toBeLessThan(0);
  });

  test("should correctly rank 65432 over 5432A", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.Six),
      new Card(Suit.Clubs, Rank.Five),
      new Card(Suit.Spades, Rank.Four),
      new Card(Suit.Diamonds, Rank.Three),
      new Card(Suit.Hearts, Rank.Two),
    ]);

    const hand2 = new Hand([
      new Card(Suit.Hearts, Rank.Five),
      new Card(Suit.Clubs, Rank.Four),
      new Card(Suit.Spades, Rank.Three),
      new Card(Suit.Diamonds, Rank.Two),
      new Card(Suit.Hearts, Rank.Ace),
    ]);

    expect(hand1.getRank()).toBe(HandRank.Straight);
    expect(hand2.getRank()).toBe(HandRank.Straight);
    expect(hand1.compare(hand2)).toBeGreaterThan(0);
    expect(hand2.compare(hand1)).toBeLessThan(0);
  });

  test("should correctly rank Straight higher than Three of a Kind", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.Six),
      new Card(Suit.Clubs, Rank.Five),
      new Card(Suit.Spades, Rank.Four),
      new Card(Suit.Diamonds, Rank.Three),
      new Card(Suit.Hearts, Rank.Two),
    ]);

    const hand2 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Clubs, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Diamonds, Rank.Queen),
    ]);

    expect(hand1.getRank()).toBe(HandRank.Straight);
    expect(hand2.getRank()).toBe(HandRank.ThreeOfAKind);
    expect(hand1.compare(hand2)).toBeGreaterThan(0);
    expect(hand2.compare(hand1)).toBeLessThan(0);
  });

  test("should correctly rank Straight higher than Two Pair", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.Six),
      new Card(Suit.Clubs, Rank.Five),
      new Card(Suit.Spades, Rank.Four),
      new Card(Suit.Diamonds, Rank.Three),
      new Card(Suit.Hearts, Rank.Two),
    ]);

    const hand2 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Diamonds, Rank.King),
      new Card(Suit.Clubs, Rank.Queen),
    ]);

    expect(hand1.getRank()).toBe(HandRank.Straight);
    expect(hand2.getRank()).toBe(HandRank.TwoPair);
    expect(hand1.compare(hand2)).toBeGreaterThan(0);
    expect(hand2.compare(hand1)).toBeLessThan(0);
  });

  test("should correctly rank Straight higher than One Pair", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.Six),
      new Card(Suit.Clubs, Rank.Five),
      new Card(Suit.Spades, Rank.Four),
      new Card(Suit.Diamonds, Rank.Three),
      new Card(Suit.Hearts, Rank.Two),
    ]);

    const hand2 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Diamonds, Rank.Queen),
      new Card(Suit.Clubs, Rank.Jack),
    ]);

    expect(hand1.getRank()).toBe(HandRank.Straight);
    expect(hand2.getRank()).toBe(HandRank.OnePair);
    expect(hand1.compare(hand2)).toBeGreaterThan(0);
    expect(hand2.compare(hand1)).toBeLessThan(0);
  });

  test("should correctly rank Straight higher than High Card", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.Six),
      new Card(Suit.Clubs, Rank.Five),
      new Card(Suit.Spades, Rank.Four),
      new Card(Suit.Diamonds, Rank.Three),
      new Card(Suit.Hearts, Rank.Two),
    ]);

    const hand2 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Diamonds, Rank.Jack),
      new Card(Suit.Clubs, Rank.Nine),
    ]);

    expect(hand1.getRank()).toBe(HandRank.Straight);
    expect(hand2.getRank()).toBe(HandRank.HighCard);
    expect(hand1.compare(hand2)).toBeGreaterThan(0);
    expect(hand2.compare(hand1)).toBeLessThan(0);
  });
});
