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
