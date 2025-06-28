import { expect, test, describe } from "vitest";
import { Hand } from "src/hand";
import { Card } from "src/card";
import { Rank, Suit, HandRank } from "src/constants";

describe("ストレートフラッシュの判定", () => {
  test("基本的なストレートフラッシュ", () => {
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

  test("異なるスートのストレートフラッシュ", () => {
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

  test("ストレートフラッシュに似ているが、異なるケース", () => {
    const cards = [
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Hearts, Rank.Ten),
      new Card(Suit.Hearts, Rank.Eight), // NineではなくEight
    ];
    const hand = new Hand(cards);
    expect(hand.getRank()).toBe(HandRank.Flush);
    expect(hand.getHandCards()).toEqual([
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Hearts, Rank.Ten),
      new Card(Suit.Hearts, Rank.Eight),
    ]);
  });

  test("異なるスートのカードが混ざっているケース", () => {
    const cards = [
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Hearts, Rank.Ten),
      new Card(Suit.Diamonds, Rank.Nine), // スートが異なる
    ];
    const hand = new Hand(cards);
    expect(hand.getRank()).toBe(HandRank.Straight);
    expect(hand.getHandCards()).toEqual([
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Hearts, Rank.Ten),
      new Card(Suit.Diamonds, Rank.Nine),
    ]);
  });

  test("ストレートフラッシュのカードが順不同", () => {
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
});
