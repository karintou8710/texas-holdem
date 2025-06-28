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
