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
