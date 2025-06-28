import { expect, test, describe } from "vitest";
import { Hand } from "src/hand";
import { Card } from "src/card";
import { Rank, Suit, HandRank } from "src/constants";

describe("Hand - Straight", () => {
  test("should correctly identify a Straight", () => {
    const cards = [
      new Card(Suit.Hearts, Rank.Five),
      new Card(Suit.Clubs, Rank.Four),
      new Card(Suit.Spades, Rank.Three),
      new Card(Suit.Diamonds, Rank.Two),
      new Card(Suit.Hearts, Rank.Six),
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
