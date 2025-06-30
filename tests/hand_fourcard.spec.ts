import { expect, test, describe } from "vitest";
import { Hand } from "src/hand";
import { Card } from "src/card";
import { Rank, Suit, HandRank } from "src/constants";

describe("Hand - Four of a Kind", () => {
  test("should correctly identify basic Four of a Kind", () => {
    const cards = [
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Clubs, Rank.Ace),
      new Card(Suit.Spades, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
    ];
    const hand = new Hand(cards);
    expect(hand.getRank()).toBe(HandRank.FourOfAKind);
    expect(hand.getHandCards()).toEqual([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Clubs, Rank.Ace),
      new Card(Suit.Spades, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
    ]);
  });

  test("should correctly identify Four of a Kind with different ranks", () => {
    const cards = [
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Diamonds, Rank.King),
      new Card(Suit.Clubs, Rank.King),
      new Card(Suit.Spades, Rank.King),
      new Card(Suit.Hearts, Rank.Ace),
    ];
    const hand = new Hand(cards);
    expect(hand.getRank()).toBe(HandRank.FourOfAKind);
    expect(hand.getHandCards()).toEqual([
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Diamonds, Rank.King),
      new Card(Suit.Clubs, Rank.King),
      new Card(Suit.Spades, Rank.King),
      new Card(Suit.Hearts, Rank.Ace),
    ]);
  });

  test("should not identify as Four of a Kind when cards are similar but different", () => {
    const cards = [
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Clubs, Rank.Ace),
      new Card(Suit.Spades, Rank.King),
      new Card(Suit.Hearts, Rank.King),
    ];
    const hand = new Hand(cards);
    expect(hand.getRank()).not.toBe(HandRank.FourOfAKind);
  });

  test("should correctly identify Four of a Kind when cards are unordered", () => {
    const cards = [
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Spades, Rank.Ace),
      new Card(Suit.Clubs, Rank.Ace),
      new Card(Suit.Hearts, Rank.Ace),
    ];
    const hand = new Hand(cards);
    expect(hand.getRank()).toBe(HandRank.FourOfAKind);
    expect(hand.getHandCards()).toEqual([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Clubs, Rank.Ace),
      new Card(Suit.Spades, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
    ]);
  });
});

describe("Compare - Four of a Kind", () => {
  test("should compare Four of a Kind hands by quad rank", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Diamonds, Rank.King),
      new Card(Suit.Clubs, Rank.King),
      new Card(Suit.Spades, Rank.King),
      new Card(Suit.Hearts, Rank.Two),
    ]);

    const hand2 = new Hand([
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Diamonds, Rank.Queen),
      new Card(Suit.Clubs, Rank.Queen),
      new Card(Suit.Spades, Rank.Queen),
      new Card(Suit.Hearts, Rank.Ace),
    ]);

    expect(hand1.getRank()).toBe(HandRank.FourOfAKind);
    expect(hand2.getRank()).toBe(HandRank.FourOfAKind);
    expect(hand1.compare(hand2)).toBeGreaterThan(0);
    expect(hand2.compare(hand1)).toBeLessThan(0);
  });

  test("should differentiate Four of a Kind hands by kicker", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Diamonds, Rank.Queen),
      new Card(Suit.Clubs, Rank.Queen),
      new Card(Suit.Spades, Rank.Queen),
      new Card(Suit.Hearts, Rank.King),
    ]);

    const hand2 = new Hand([
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Diamonds, Rank.Queen),
      new Card(Suit.Clubs, Rank.Queen),
      new Card(Suit.Spades, Rank.Queen),
      new Card(Suit.Hearts, Rank.Ten),
    ]);

    expect(hand1.getRank()).toBe(HandRank.FourOfAKind);
    expect(hand2.getRank()).toBe(HandRank.FourOfAKind);
    expect(hand1.compare(hand2)).toBeGreaterThan(0);
    expect(hand2.compare(hand1)).toBeLessThan(0);
  });

  test("should rank Four of a Kind above Full House", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Diamonds, Rank.Queen),
      new Card(Suit.Clubs, Rank.Queen),
      new Card(Suit.Spades, Rank.Queen),
      new Card(Suit.Hearts, Rank.Ten),
    ]);

    const hand2 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Clubs, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Diamonds, Rank.King),
    ]);

    expect(hand1.getRank()).toBe(HandRank.FourOfAKind);
    expect(hand2.getRank()).toBe(HandRank.FullHouse);
    expect(hand1.compare(hand2)).toBeGreaterThan(0);
    expect(hand2.compare(hand1)).toBeLessThan(0);
  });

  test("should rank Four of a Kind above Flush", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.Ten),
      new Card(Suit.Diamonds, Rank.Ten),
      new Card(Suit.Clubs, Rank.Ten),
      new Card(Suit.Spades, Rank.Ten),
      new Card(Suit.Hearts, Rank.Two),
    ]);

    const hand2 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Hearts, Rank.Nine),
    ]);

    expect(hand1.getRank()).toBe(HandRank.FourOfAKind);
    expect(hand2.getRank()).toBe(HandRank.Flush);
    expect(hand1.compare(hand2)).toBeGreaterThan(0);
    expect(hand2.compare(hand1)).toBeLessThan(0);
  });

  test("should rank Four of a Kind above Straight", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.Nine),
      new Card(Suit.Diamonds, Rank.Nine),
      new Card(Suit.Clubs, Rank.Nine),
      new Card(Suit.Spades, Rank.Nine),
      new Card(Suit.Hearts, Rank.Five),
    ]);

    const hand2 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.King),
      new Card(Suit.Clubs, Rank.Queen),
      new Card(Suit.Spades, Rank.Jack),
      new Card(Suit.Hearts, Rank.Ten),
    ]);

    expect(hand1.getRank()).toBe(HandRank.FourOfAKind);
    expect(hand2.getRank()).toBe(HandRank.Straight);
    expect(hand1.compare(hand2)).toBeGreaterThan(0);
    expect(hand2.compare(hand1)).toBeLessThan(0);
  });

  test("should rank Four of a Kind above Three of a Kind", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.Eight),
      new Card(Suit.Diamonds, Rank.Eight),
      new Card(Suit.Clubs, Rank.Eight),
      new Card(Suit.Spades, Rank.Eight),
      new Card(Suit.Hearts, Rank.Four),
    ]);

    const hand2 = new Hand([
      new Card(Suit.Hearts, Rank.Seven),
      new Card(Suit.Diamonds, Rank.Seven),
      new Card(Suit.Clubs, Rank.Seven),
      new Card(Suit.Spades, Rank.Five),
      new Card(Suit.Hearts, Rank.Two),
    ]);

    expect(hand1.getRank()).toBe(HandRank.FourOfAKind);
    expect(hand2.getRank()).toBe(HandRank.ThreeOfAKind);
    expect(hand1.compare(hand2)).toBeGreaterThan(0);
    expect(hand2.compare(hand1)).toBeLessThan(0);
  });

  test("should rank Four of a Kind above Two Pair", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.Six),
      new Card(Suit.Diamonds, Rank.Six),
      new Card(Suit.Clubs, Rank.Six),
      new Card(Suit.Spades, Rank.Six),
      new Card(Suit.Hearts, Rank.Five),
    ]);

    const hand2 = new Hand([
      new Card(Suit.Hearts, Rank.Four),
      new Card(Suit.Diamonds, Rank.Four),
      new Card(Suit.Clubs, Rank.Two),
      new Card(Suit.Spades, Rank.Two),
      new Card(Suit.Hearts, Rank.Ace),
    ]);

    expect(hand1.getRank()).toBe(HandRank.FourOfAKind);
    expect(hand2.getRank()).toBe(HandRank.TwoPair);
    expect(hand1.compare(hand2)).toBeGreaterThan(0);
    expect(hand2.compare(hand1)).toBeLessThan(0);
  });

  test("should rank Four of a Kind above One Pair", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.Five),
      new Card(Suit.Diamonds, Rank.Five),
      new Card(Suit.Clubs, Rank.Five),
      new Card(Suit.Spades, Rank.Five),
      new Card(Suit.Hearts, Rank.Two),
    ]);

    const hand2 = new Hand([
      new Card(Suit.Hearts, Rank.Three),
      new Card(Suit.Diamonds, Rank.Three),
      new Card(Suit.Clubs, Rank.Two),
      new Card(Suit.Spades, Rank.Seven),
      new Card(Suit.Hearts, Rank.Ace),
    ]);

    expect(hand1.getRank()).toBe(HandRank.FourOfAKind);
    expect(hand2.getRank()).toBe(HandRank.OnePair);
    expect(hand1.compare(hand2)).toBeGreaterThan(0);
    expect(hand2.compare(hand1)).toBeLessThan(0);
  });

  test("should rank Four of a Kind above High Card", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.Four),
      new Card(Suit.Diamonds, Rank.Four),
      new Card(Suit.Clubs, Rank.Four),
      new Card(Suit.Spades, Rank.Four),
      new Card(Suit.Hearts, Rank.Two),
    ]);

    const hand2 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.King),
      new Card(Suit.Clubs, Rank.Queen),
      new Card(Suit.Spades, Rank.Jack),
      new Card(Suit.Hearts, Rank.Nine),
    ]);

    expect(hand1.getRank()).toBe(HandRank.FourOfAKind);
    expect(hand2.getRank()).toBe(HandRank.HighCard);
    expect(hand1.compare(hand2)).toBeGreaterThan(0);
    expect(hand2.compare(hand1)).toBeLessThan(0);
  });
});
