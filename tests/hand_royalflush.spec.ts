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
    const heartsRoyalFlush = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Hearts, Rank.Ten),
    ]);

    const spadesRoyalFlush = new Hand([
      new Card(Suit.Spades, Rank.Ace),
      new Card(Suit.Spades, Rank.King),
      new Card(Suit.Spades, Rank.Queen),
      new Card(Suit.Spades, Rank.Jack),
      new Card(Suit.Spades, Rank.Ten),
    ]);

    expect(heartsRoyalFlush.compare(spadesRoyalFlush)).toBe(0);
    expect(spadesRoyalFlush.compare(heartsRoyalFlush)).toBe(0);
  });

  test("should correctly compare Royal Flush against Straight Flush", () => {
    const royalFlush = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Hearts, Rank.Ten),
    ]);
    const straightFlush = new Hand([
      new Card(Suit.Spades, Rank.King),
      new Card(Suit.Spades, Rank.Queen),
      new Card(Suit.Spades, Rank.Jack),
      new Card(Suit.Spades, Rank.Ten),
      new Card(Suit.Spades, Rank.Nine),
    ]);

    expect(royalFlush.compare(straightFlush)).toBeGreaterThan(0);
    expect(straightFlush.compare(royalFlush)).toBeLessThan(0);
  });

  test("should correctly compare Royal Flush against Four of a Kind", () => {
    const royalFlush = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Hearts, Rank.Ten),
    ]);
    const fourOfAKind = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Clubs, Rank.Ace),
      new Card(Suit.Spades, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
    ]);

    expect(royalFlush.compare(fourOfAKind)).toBeGreaterThan(0);
    expect(fourOfAKind.compare(royalFlush)).toBeLessThan(0);
  });

  test("should correctly compare Royal Flush against Full House", () => {
    const royalFlush = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Hearts, Rank.Ten),
    ]);
    const fullHouse = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Clubs, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Diamonds, Rank.King),
    ]);

    expect(royalFlush.compare(fullHouse)).toBeGreaterThan(0);
    expect(fullHouse.compare(royalFlush)).toBeLessThan(0);
  });

  test("should correctly compare Royal Flush against Flush", () => {
    const royalFlush = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Hearts, Rank.Ten),
    ]);
    const flush = new Hand([
      new Card(Suit.Spades, Rank.Ace),
      new Card(Suit.Spades, Rank.King),
      new Card(Suit.Spades, Rank.Queen),
      new Card(Suit.Spades, Rank.Jack),
      new Card(Suit.Spades, Rank.Nine),
    ]);

    expect(royalFlush.compare(flush)).toBeGreaterThan(0);
    expect(flush.compare(royalFlush)).toBeLessThan(0);
  });

  test("should correctly compare Royal Flush against Straight", () => {
    const royalFlush = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Hearts, Rank.Ten),
    ]);
    const straight = new Hand([
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Diamonds, Rank.Queen),
      new Card(Suit.Clubs, Rank.Jack),
      new Card(Suit.Spades, Rank.Ten),
      new Card(Suit.Hearts, Rank.Nine),
    ]);

    expect(royalFlush.compare(straight)).toBeGreaterThan(0);
    expect(straight.compare(royalFlush)).toBeLessThan(0);
  });

  test("should correctly compare Royal Flush against Three of a Kind", () => {
    const royalFlush = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Hearts, Rank.Ten),
    ]);
    const threeOfAKind = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Clubs, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Diamonds, Rank.Queen),
    ]);

    expect(royalFlush.compare(threeOfAKind)).toBeGreaterThan(0);
    expect(threeOfAKind.compare(royalFlush)).toBeLessThan(0);
  });

  test("should correctly compare Royal Flush against Two Pair", () => {
    const royalFlush = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Hearts, Rank.Ten),
    ]);
    const twoPair = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Clubs, Rank.King),
      new Card(Suit.Spades, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
    ]);

    expect(royalFlush.compare(twoPair)).toBeGreaterThan(0);
    expect(twoPair.compare(royalFlush)).toBeLessThan(0);
  });

  test("should correctly compare Royal Flush against One Pair", () => {
    const royalFlush = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Hearts, Rank.Ten),
    ]);
    const onePair = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Clubs, Rank.King),
      new Card(Suit.Spades, Rank.Queen),
      new Card(Suit.Hearts, Rank.Ten),
    ]);

    expect(royalFlush.compare(onePair)).toBeGreaterThan(0);
    expect(onePair.compare(royalFlush)).toBeLessThan(0);
  });

  test("should correctly compare Royal Flush against High Card", () => {
    const royalFlush = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Hearts, Rank.Ten),
    ]);
    const highCard = new Hand([
      new Card(Suit.Spades, Rank.Ace),
      new Card(Suit.Diamonds, Rank.King),
      new Card(Suit.Clubs, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Spades, Rank.Ten),
    ]);

    expect(royalFlush.compare(highCard)).toBeGreaterThan(0);
    expect(highCard.compare(royalFlush)).toBeLessThan(0);
  });
});
