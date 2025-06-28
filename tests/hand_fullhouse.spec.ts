import { expect, test, describe } from "vitest";
import { Hand } from "src/hand";
import { Card } from "src/card";
import { Rank, Suit, HandRank } from "src/constants";

describe("Hand - Full House", () => {
  test("should correctly identify a Full House", () => {
    const cards = [
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Clubs, Rank.Ace),
      new Card(Suit.Spades, Rank.King),
      new Card(Suit.Hearts, Rank.King),
    ];
    const hand = new Hand(cards);
    expect(hand.getRank()).toBe(HandRank.FullHouse);
    expect(hand.getHandCards()).toEqual([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Clubs, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Spades, Rank.King),
    ]);
  });

  test("should not identify a Full House when there is no three of a kind", () => {
    const cards = [
      new Card(Suit.Clubs, Rank.King),
      new Card(Suit.Spades, Rank.King),
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Hearts, Rank.Queen),
    ];
    const hand = new Hand(cards);
    expect(hand.getRank()).not.toBe(HandRank.FullHouse);
  });

  test("should not identify a Full House when there is no pair", () => {
    const cards = [
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.King),
      new Card(Suit.Clubs, Rank.Queen),
      new Card(Suit.Spades, Rank.Jack),
      new Card(Suit.Hearts, Rank.Ten),
    ];
    const hand = new Hand(cards);
    expect(hand.getRank()).not.toBe(HandRank.FullHouse);
  });

  test("should correctly sort cards within a Full House", () => {
    const cards = [
      new Card(Suit.Spades, Rank.Three),
      new Card(Suit.Clubs, Rank.Two),
      new Card(Suit.Hearts, Rank.Two),
      new Card(Suit.Hearts, Rank.Three),
      new Card(Suit.Diamonds, Rank.Two),
    ];
    const hand = new Hand(cards);
    expect(hand.getRank()).toBe(HandRank.FullHouse);
    expect(hand.getHandCards()).toEqual([
      new Card(Suit.Hearts, Rank.Two),
      new Card(Suit.Diamonds, Rank.Two),
      new Card(Suit.Clubs, Rank.Two),
      new Card(Suit.Hearts, Rank.Three),
      new Card(Suit.Spades, Rank.Three),
    ]);
  });
});
