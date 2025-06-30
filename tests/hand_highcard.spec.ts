import { expect, test, describe } from "vitest";
import { Hand } from "src/hand";
import { Card } from "src/card";
import { Rank, Suit, HandRank } from "src/constants";

describe("Hand - High Card", () => {
  test("should correctly identify High Card", () => {
    const cards = [
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.King),
      new Card(Suit.Clubs, Rank.Queen),
      new Card(Suit.Spades, Rank.Jack),
      new Card(Suit.Hearts, Rank.Nine),
    ];
    const hand = new Hand(cards);
    expect(hand.getRank()).toBe(HandRank.HighCard);
    expect(hand.getHandCards()).toEqual([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.King),
      new Card(Suit.Clubs, Rank.Queen),
      new Card(Suit.Spades, Rank.Jack),
      new Card(Suit.Hearts, Rank.Nine),
    ]);
  });

  test("should correctly sort cards within High Card", () => {
    const cards = [
      new Card(Suit.Spades, Rank.Five),
      new Card(Suit.Clubs, Rank.Three),
      new Card(Suit.Hearts, Rank.Two),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Hearts, Rank.Six),
    ];
    const hand = new Hand(cards);
    expect(hand.getRank()).toBe(HandRank.HighCard);
    expect(hand.getHandCards()).toEqual([
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Hearts, Rank.Six),
      new Card(Suit.Spades, Rank.Five),
      new Card(Suit.Clubs, Rank.Three),
      new Card(Suit.Hearts, Rank.Two),
    ]);
  });
});

describe("Compare - High Card", () => {
  test("should correctly compare two High Card hands with different high cards", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.King),
      new Card(Suit.Clubs, Rank.Queen),
      new Card(Suit.Spades, Rank.Jack),
      new Card(Suit.Hearts, Rank.Nine),
    ]);

    const hand2 = new Hand([
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Diamonds, Rank.Queen),
      new Card(Suit.Clubs, Rank.Jack),
      new Card(Suit.Spades, Rank.Ten),
      new Card(Suit.Hearts, Rank.Eight),
    ]);

    expect(hand1.getRank()).toBe(HandRank.HighCard);
    expect(hand2.getRank()).toBe(HandRank.HighCard);
    expect(hand1.compare(hand2)).toBeGreaterThan(0);
    expect(hand2.compare(hand1)).toBeLessThan(0);
  });

  test("should correctly compare two High Card hands with same high card but different second highest", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Queen),
      new Card(Suit.Clubs, Rank.Jack),
      new Card(Suit.Spades, Rank.Ten),
      new Card(Suit.Hearts, Rank.Nine),
    ]);

    const hand2 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Jack),
      new Card(Suit.Clubs, Rank.Ten),
      new Card(Suit.Spades, Rank.Nine),
      new Card(Suit.Hearts, Rank.Eight),
    ]);

    expect(hand1.getRank()).toBe(HandRank.HighCard);
    expect(hand2.getRank()).toBe(HandRank.HighCard);
    expect(hand1.compare(hand2)).toBeGreaterThan(0);
    expect(hand2.compare(hand1)).toBeLessThan(0);
  });

  test("should correctly compare two High Card hands with same high and second highest but different third", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Queen),
      new Card(Suit.Clubs, Rank.Jack),
      new Card(Suit.Spades, Rank.Ten),
      new Card(Suit.Hearts, Rank.Eight),
    ]);

    const hand2 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Queen),
      new Card(Suit.Clubs, Rank.Ten),
      new Card(Suit.Spades, Rank.Nine),
      new Card(Suit.Hearts, Rank.Eight),
    ]);

    expect(hand1.getRank()).toBe(HandRank.HighCard);
    expect(hand2.getRank()).toBe(HandRank.HighCard);
    expect(hand1.compare(hand2)).toBeGreaterThan(0);
    expect(hand2.compare(hand1)).toBeLessThan(0);
  });

  test("should correctly compare two High Card hands with same top 3 but different 4th highest", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Queen),
      new Card(Suit.Clubs, Rank.Jack),
      new Card(Suit.Spades, Rank.Ten),
      new Card(Suit.Hearts, Rank.Eight),
    ]);

    const hand2 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Queen),
      new Card(Suit.Clubs, Rank.Jack),
      new Card(Suit.Spades, Rank.Nine),
      new Card(Suit.Hearts, Rank.Eight),
    ]);

    expect(hand1.getRank()).toBe(HandRank.HighCard);
    expect(hand2.getRank()).toBe(HandRank.HighCard);
    expect(hand1.compare(hand2)).toBeGreaterThan(0);
    expect(hand2.compare(hand1)).toBeLessThan(0);
  });

  test("should correctly compare two High Card hands with same top 4 but different 5th highest", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Queen),
      new Card(Suit.Clubs, Rank.Jack),
      new Card(Suit.Spades, Rank.Ten),
      new Card(Suit.Hearts, Rank.Nine),
    ]);

    const hand2 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Queen),
      new Card(Suit.Clubs, Rank.Jack),
      new Card(Suit.Spades, Rank.Ten),
      new Card(Suit.Hearts, Rank.Eight),
    ]);

    expect(hand1.getRank()).toBe(HandRank.HighCard);
    expect(hand2.getRank()).toBe(HandRank.HighCard);
    expect(hand1.compare(hand2)).toBeGreaterThan(0);
    expect(hand2.compare(hand1)).toBeLessThan(0);
  });

  test("should identify a tie when two High Card hands have exactly same cards", () => {
    const hand1 = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Queen),
      new Card(Suit.Clubs, Rank.Jack),
      new Card(Suit.Spades, Rank.Ten),
      new Card(Suit.Hearts, Rank.Nine),
    ]);

    const hand2 = new Hand([
      new Card(Suit.Spades, Rank.Ace),
      new Card(Suit.Clubs, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Diamonds, Rank.Ten),
      new Card(Suit.Spades, Rank.Nine),
    ]);

    expect(hand1.getRank()).toBe(HandRank.HighCard);
    expect(hand2.getRank()).toBe(HandRank.HighCard);
    expect(hand1.compare(hand2)).toBe(0);
    expect(hand2.compare(hand1)).toBe(0);
  });
});
