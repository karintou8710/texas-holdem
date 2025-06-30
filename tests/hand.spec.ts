import { describe } from "node:test";
import { expect, test } from "vitest";
import { Card } from "../src/card";
import { Hand } from "../src/hand";
import { HandRank, Rank, Suit } from "../src/constants";

describe("method of", () => {
  test("returns high cards with three community cards", () => {
    const holeCards = [
      new Card(Suit.Spades, Rank.Ace),
      new Card(Suit.Spades, Rank.King),
    ];
    const communityCards = [
      new Card(Suit.Spades, Rank.Queen),
      new Card(Suit.Diamonds, Rank.Jack),
      new Card(Suit.Spades, Rank.Nine),
    ];

    const hand = Hand.of(holeCards, communityCards);
    expect(hand.getRank()).toBe(HandRank.HighCard);
    expect(hand.getHandCards()).toEqual([
      new Card(Suit.Spades, Rank.Ace),
      new Card(Suit.Spades, Rank.King),
      new Card(Suit.Spades, Rank.Queen),
      new Card(Suit.Diamonds, Rank.Jack),
      new Card(Suit.Spades, Rank.Nine),
    ]);
  });

  test("returns royal flush with five community cards", () => {
    const holeCards = [
      new Card(Suit.Spades, Rank.Ace),
      new Card(Suit.Spades, Rank.King),
    ];
    const communityCards = [
      new Card(Suit.Spades, Rank.Queen),
      new Card(Suit.Spades, Rank.Jack),
      new Card(Suit.Spades, Rank.Ten),
      new Card(Suit.Hearts, Rank.Nine),
      new Card(Suit.Diamonds, Rank.Eight),
    ];

    const hand = Hand.of(holeCards, communityCards);
    expect(hand.getRank()).toBe(HandRank.RoyalFlush);
    expect(hand.getHandCards()).toEqual([
      new Card(Suit.Spades, Rank.Ace),
      new Card(Suit.Spades, Rank.King),
      new Card(Suit.Spades, Rank.Queen),
      new Card(Suit.Spades, Rank.Jack),
      new Card(Suit.Spades, Rank.Ten),
    ]);
  });

  test("returns full house with five community cards", () => {
    const holeCards = [
      new Card(Suit.Spades, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
    ];
    const communityCards = [
      new Card(Suit.Clubs, Rank.Ace),
      new Card(Suit.Spades, Rank.Jack),
      new Card(Suit.Spades, Rank.Ten),
      new Card(Suit.Hearts, Rank.Nine),
      new Card(Suit.Clubs, Rank.Jack),
    ];

    const hand = Hand.of(holeCards, communityCards);
    expect(hand.getRank()).toBe(HandRank.FullHouse);
    expect(hand.getHandCards()).toEqual([
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Clubs, Rank.Ace),
      new Card(Suit.Spades, Rank.Ace),
      new Card(Suit.Clubs, Rank.Jack),
      new Card(Suit.Spades, Rank.Jack),
    ]);
  });

  test("throws error if hole cards length is not 2", () => {
    const holeCards = [new Card(Suit.Spades, Rank.Ace)];
    const communityCards = [
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Diamonds, Rank.Queen),
      new Card(Suit.Clubs, Rank.Jack),
    ];

    expect(() => Hand.of(holeCards, communityCards)).toThrow(
      "Invalid number of cards for hand evaluation."
    );
  });

  test("throws error if community cards are less than 3", () => {
    const holeCards = [
      new Card(Suit.Spades, Rank.Ace),
      new Card(Suit.Spades, Rank.King),
    ];
    const communityCards = [
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Diamonds, Rank.Jack),
    ];

    expect(() => Hand.of(holeCards, communityCards)).toThrow(
      "Invalid number of cards for hand evaluation."
    );
  });
});

describe("multiCompare", () => {
  test("should identify all winners in case of tie", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.King),
      new Card(Suit.Clubs, Rank.Queen),
      new Card(Suit.Spades, Rank.Jack),
      new Card(Suit.Hearts, Rank.Ten),
    ]);

    const hand2 = new Hand([
      new Card(Suit.Spades, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Diamonds, Rank.Queen),
      new Card(Suit.Clubs, Rank.Jack),
      new Card(Suit.Spades, Rank.Ten),
    ]);

    const hand3 = new Hand([
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Diamonds, Rank.Queen),
      new Card(Suit.Clubs, Rank.Jack),
      new Card(Suit.Spades, Rank.Ten),
      new Card(Suit.Hearts, Rank.Nine),
    ]);

    const hands = [hand1, hand2, hand3];
    const results = Hand.multiCompare(hands);

    expect(results).toEqual([true, true, false]); // hand1 and hand2 tie for best, hand3 loses
  });

  test("should identify single winner", () => {
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

    const fourOfAKind = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Clubs, Rank.Ace),
      new Card(Suit.Spades, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
    ]);

    const hands = [royalFlush, straightFlush, fourOfAKind];
    const results = Hand.multiCompare(hands);

    expect(results).toEqual([true, false, false]); // Only royal flush wins
  });

  test("should handle single hand", () => {
    const hand = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.King),
      new Card(Suit.Clubs, Rank.Queen),
      new Card(Suit.Spades, Rank.Jack),
      new Card(Suit.Hearts, Rank.Ten),
    ]);

    const results = Hand.multiCompare([hand]);
    expect(results).toEqual([true]); // Single hand is always winner
  });

  test("should throw error with empty array", () => {
    expect(() => Hand.multiCompare([])).toThrow("No hands to compare.");
  });
});

describe("getBestHand", () => {
  test("should return the best hand from multiple hands", () => {
    const highCard = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.King),
      new Card(Suit.Clubs, Rank.Queen),
      new Card(Suit.Spades, Rank.Jack),
      new Card(Suit.Hearts, Rank.Nine),
    ]);

    const pair = new Hand([
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Diamonds, Rank.King),
      new Card(Suit.Clubs, Rank.Queen),
      new Card(Suit.Spades, Rank.Jack),
      new Card(Suit.Hearts, Rank.Ten),
    ]);

    const straight = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.King),
      new Card(Suit.Clubs, Rank.Queen),
      new Card(Suit.Spades, Rank.Jack),
      new Card(Suit.Hearts, Rank.Ten),
    ]);

    const hands = [highCard, pair, straight];
    const bestHand = Hand.getBestHand(hands);

    expect(bestHand).toBe(straight);
    expect(bestHand.getRank()).toBe(HandRank.Straight);
  });

  test("should throw error with empty array", () => {
    expect(() => Hand.getBestHand([])).toThrow("No hands to compare.");
  });
});
