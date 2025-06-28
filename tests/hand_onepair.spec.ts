import { expect, test, describe } from "vitest";
import { Hand } from "src/hand";
import { Card } from "src/card";
import { Rank, Suit, HandRank } from "src/constants";

describe("Hand - One Pair", () => {
  test("should correctly identify One Pair", () => {
    const cards = [
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Clubs, Rank.King),
      new Card(Suit.Spades, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
    ];
    const hand = new Hand(cards);
    expect(hand.getRank()).toBe(HandRank.OnePair);
    expect(hand.getHandCards()).toEqual([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Clubs, Rank.King),
      new Card(Suit.Spades, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
    ]);
  });

  test("should not identify One Pair when cards are all different", () => {
    const cards = [
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.King),
      new Card(Suit.Clubs, Rank.Queen),
      new Card(Suit.Spades, Rank.Jack),
      new Card(Suit.Hearts, Rank.Nine),
    ];
    const hand = new Hand(cards);
    expect(hand.getRank()).not.toBe(HandRank.OnePair);
  });

  test("should correctly sort cards within One Pair", () => {
    const cards = [
      new Card(Suit.Spades, Rank.Two),
      new Card(Suit.Hearts, Rank.Five),
      new Card(Suit.Diamonds, Rank.Three),
      new Card(Suit.Clubs, Rank.Two),
      new Card(Suit.Hearts, Rank.Four),
    ];
    const hand = new Hand(cards);
    expect(hand.getRank()).toBe(HandRank.OnePair);
    expect(hand.getHandCards()).toEqual([
      new Card(Suit.Clubs, Rank.Two),
      new Card(Suit.Spades, Rank.Two),
      new Card(Suit.Hearts, Rank.Five),
      new Card(Suit.Hearts, Rank.Four),
      new Card(Suit.Diamonds, Rank.Three),
    ]);
  });
});
