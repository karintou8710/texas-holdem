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
