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

describe("Compare - Royal Flush", () => {
  test("should correctly rank higher Straight Flush over lower one", () => {
    const higherHand = new Hand([
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Hearts, Rank.Ten),
      new Card(Suit.Hearts, Rank.Nine),
    ]);

    const lowerHand = new Hand([
      new Card(Suit.Spades, Rank.Queen),
      new Card(Suit.Spades, Rank.Jack),
      new Card(Suit.Spades, Rank.Ten),
      new Card(Suit.Spades, Rank.Nine),
      new Card(Suit.Spades, Rank.Eight),
    ]);

    expect(higherHand.compare(lowerHand)).toBeGreaterThan(0);
    expect(lowerHand.compare(higherHand)).toBeLessThan(0);
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

    expect(hand1.compare(hand2)).toBe(0);
    expect(hand2.compare(hand1)).toBe(0);
  });

  test("should correctly rank 65432 over 5432A", () => {
    const higherHand = new Hand([
      new Card(Suit.Hearts, Rank.Six),
      new Card(Suit.Hearts, Rank.Five),
      new Card(Suit.Hearts, Rank.Four),
      new Card(Suit.Hearts, Rank.Three),
      new Card(Suit.Hearts, Rank.Two),
    ]);

    const lowerHand = new Hand([
      new Card(Suit.Hearts, Rank.Five),
      new Card(Suit.Hearts, Rank.Four),
      new Card(Suit.Hearts, Rank.Three),
      new Card(Suit.Hearts, Rank.Two),
      new Card(Suit.Hearts, Rank.Ace),
    ]);

    expect(higherHand.compare(lowerHand)).toBeGreaterThan(0);
    expect(lowerHand.compare(higherHand)).toBeLessThan(0);
  });

  test("should correctly rank Straight Flush higher than Four of a Kind", () => {
    const straightFlush = new Hand([
      new Card(Suit.Hearts, Rank.Six),
      new Card(Suit.Hearts, Rank.Five),
      new Card(Suit.Hearts, Rank.Four),
      new Card(Suit.Hearts, Rank.Three),
      new Card(Suit.Hearts, Rank.Two),
    ]);

    const fourOfKind = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Clubs, Rank.Ace),
      new Card(Suit.Spades, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
    ]);

    expect(straightFlush.compare(fourOfKind)).toBeGreaterThan(0);
    expect(fourOfKind.compare(straightFlush)).toBeLessThan(0);
  });

  test("should correctly rank Straight Flush higher than Full House", () => {
    const straightFlush = new Hand([
      new Card(Suit.Hearts, Rank.Six),
      new Card(Suit.Hearts, Rank.Five),
      new Card(Suit.Hearts, Rank.Four),
      new Card(Suit.Hearts, Rank.Three),
      new Card(Suit.Hearts, Rank.Two),
    ]);

    const fullHouse = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Clubs, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Diamonds, Rank.King),
    ]);

    expect(straightFlush.compare(fullHouse)).toBeGreaterThan(0);
    expect(fullHouse.compare(straightFlush)).toBeLessThan(0);
  });

  test("should correctly rank Straight Flush higher than Flush", () => {
    const straightFlush = new Hand([
      new Card(Suit.Hearts, Rank.Six),
      new Card(Suit.Hearts, Rank.Five),
      new Card(Suit.Hearts, Rank.Four),
      new Card(Suit.Hearts, Rank.Three),
      new Card(Suit.Hearts, Rank.Two),
    ]);

    const flush = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Hearts, Rank.Nine),
      new Card(Suit.Hearts, Rank.Seven),
    ]);

    expect(straightFlush.compare(flush)).toBeGreaterThan(0);
    expect(flush.compare(straightFlush)).toBeLessThan(0);
  });

  test("should correctly rank Straight Flush higher than Straight", () => {
    const straightFlush = new Hand([
      new Card(Suit.Hearts, Rank.Six),
      new Card(Suit.Hearts, Rank.Five),
      new Card(Suit.Hearts, Rank.Four),
      new Card(Suit.Hearts, Rank.Three),
      new Card(Suit.Hearts, Rank.Two),
    ]);

    const straight = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.King),
      new Card(Suit.Clubs, Rank.Queen),
      new Card(Suit.Spades, Rank.Jack),
      new Card(Suit.Hearts, Rank.Ten),
    ]);

    expect(straightFlush.compare(straight)).toBeGreaterThan(0);
    expect(straight.compare(straightFlush)).toBeLessThan(0);
  });

  test("should correctly rank Straight Flush higher than Three of a Kind", () => {
    const straightFlush = new Hand([
      new Card(Suit.Hearts, Rank.Six),
      new Card(Suit.Hearts, Rank.Five),
      new Card(Suit.Hearts, Rank.Four),
      new Card(Suit.Hearts, Rank.Three),
      new Card(Suit.Hearts, Rank.Two),
    ]);

    const threeOfKind = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Clubs, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Diamonds, Rank.Queen),
    ]);

    expect(straightFlush.compare(threeOfKind)).toBeGreaterThan(0);
    expect(threeOfKind.compare(straightFlush)).toBeLessThan(0);
  });

  test("should correctly rank Straight Flush higher than Two Pair", () => {
    const straightFlush = new Hand([
      new Card(Suit.Hearts, Rank.Six),
      new Card(Suit.Hearts, Rank.Five),
      new Card(Suit.Hearts, Rank.Four),
      new Card(Suit.Hearts, Rank.Three),
      new Card(Suit.Hearts, Rank.Two),
    ]);

    const twoPair = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Diamonds, Rank.King),
      new Card(Suit.Clubs, Rank.Queen),
    ]);

    expect(straightFlush.compare(twoPair)).toBeGreaterThan(0);
    expect(twoPair.compare(straightFlush)).toBeLessThan(0);
  });

  test("should correctly rank Straight Flush higher than One Pair", () => {
    const straightFlush = new Hand([
      new Card(Suit.Hearts, Rank.Six),
      new Card(Suit.Hearts, Rank.Five),
      new Card(Suit.Hearts, Rank.Four),
      new Card(Suit.Hearts, Rank.Three),
      new Card(Suit.Hearts, Rank.Two),
    ]);

    const onePair = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Diamonds, Rank.Queen),
      new Card(Suit.Clubs, Rank.Jack),
    ]);

    expect(straightFlush.compare(onePair)).toBeGreaterThan(0);
    expect(onePair.compare(straightFlush)).toBeLessThan(0);
  });

  test("should correctly rank Straight Flush higher than High Card", () => {
    const straightFlush = new Hand([
      new Card(Suit.Hearts, Rank.Six),
      new Card(Suit.Hearts, Rank.Five),
      new Card(Suit.Hearts, Rank.Four),
      new Card(Suit.Hearts, Rank.Three),
      new Card(Suit.Hearts, Rank.Two),
    ]);

    const highCard = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Diamonds, Rank.Jack),
      new Card(Suit.Clubs, Rank.Nine),
    ]);

    expect(straightFlush.compare(highCard)).toBeGreaterThan(0);
    expect(highCard.compare(straightFlush)).toBeLessThan(0);
  });
});
