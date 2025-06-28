import { expect, test, describe } from "vitest";
import { Hand } from "src/hand";
import { Card } from "src/card";
import { Rank, Suit, HandRank } from "src/constants";

describe("Hand - Three of a Kind", () => {
  test("should correctly identify Three of a Kind", () => {
    const cards = [
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Clubs, Rank.Ace),
      new Card(Suit.Spades, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
    ];
    const hand = new Hand(cards);
    expect(hand.getRank()).toBe(HandRank.ThreeOfAKind);
    expect(hand.getHandCards()).toEqual([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Clubs, Rank.Ace),
      new Card(Suit.Spades, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
    ]);
  });

  test("should not identify Three of a Kind when there are only pairs", () => {
    const cards = [
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Clubs, Rank.King),
      new Card(Suit.Spades, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
    ];
    const hand = new Hand(cards);
    expect(hand.getRank()).toBe(HandRank.TwoPair);
  });

  test("should not identify Three of a Kind when cards are all different", () => {
    const cards = [
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.King),
      new Card(Suit.Clubs, Rank.Queen),
      new Card(Suit.Spades, Rank.Jack),
      new Card(Suit.Hearts, Rank.Ten),
    ];
    const hand = new Hand(cards);
    expect(hand.getRank()).not.toBe(HandRank.ThreeOfAKind);
  });
});
