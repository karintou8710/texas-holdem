import { expect, test, describe } from "vitest";
import { Hand } from "./hand";
import { Card } from "./card";
import { Rank, Suit, HandRank } from "./constants";

describe("ロイヤルストレートフラッシュの判定", () => {
  test("基本的なロイヤルストレートフラッシュ", () => {
    const cards = [
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Hearts, Rank.Ten),
    ];
    const hand = new Hand(cards);
    expect(hand.getRank()).toBe(HandRank.RoyalFlush);
    expect(hand.getHandCards()).toEqual([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Hearts, Rank.Ten),
    ]);
  });

  test("7枚のカードからロイヤルストレートフラッシュを判定", () => {
    const cards = [
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Hearts, Rank.Ten),
      new Card(Suit.Diamonds, Rank.Two),
      new Card(Suit.Clubs, Rank.Three),
    ];
    const hand = new Hand(cards);
    expect(hand.getRank()).toBe(HandRank.RoyalFlush);
    expect(hand.getHandCards()).toEqual([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Hearts, Rank.Ten),
    ]);
  });

  test("異なるスートのロイヤルストレートフラッシュ", () => {
    const cards = [
      new Card(Suit.Spades, Rank.Ace),
      new Card(Suit.Spades, Rank.King),
      new Card(Suit.Spades, Rank.Queen),
      new Card(Suit.Spades, Rank.Jack),
      new Card(Suit.Spades, Rank.Ten),
    ];
    const hand = new Hand(cards);
    expect(hand.getRank()).toBe(HandRank.RoyalFlush);
    expect(hand.getHandCards()).toEqual([
      new Card(Suit.Spades, Rank.Ace),
      new Card(Suit.Spades, Rank.King),
      new Card(Suit.Spades, Rank.Queen),
      new Card(Suit.Spades, Rank.Jack),
      new Card(Suit.Spades, Rank.Ten),
    ]);
  });

  test("ロイヤルストレートフラッシュに似ているが、異なるケース", () => {
    const cards = [
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Hearts, Rank.Nine), // TenではなくNine
    ];
    const hand = new Hand(cards);
    expect(hand.getRank()).not.toBe(HandRank.RoyalFlush);
  });

  test("異なるスートのカードが混ざっているケース", () => {
    const cards = [
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Diamonds, Rank.Ten), // スートが異なる
    ];
    const hand = new Hand(cards);
    expect(hand.getRank()).not.toBe(HandRank.RoyalFlush);
  });

  test("ロイヤルストレートフラッシュのカードが順不同", () => {
    const cards = [
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Hearts, Rank.Ten),
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Hearts, Rank.King),
    ];
    const hand = new Hand(cards);
    expect(hand.getRank()).toBe(HandRank.RoyalFlush);
    expect(hand.getHandCards()).toEqual([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Hearts, Rank.Ten),
    ]);
  });
});

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

  test("7枚のカードからストレートフラッシュを判定", () => {
    const cards = [
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Hearts, Rank.Ten),
      new Card(Suit.Hearts, Rank.Nine),
      new Card(Suit.Diamonds, Rank.Two),
      new Card(Suit.Clubs, Rank.Three),
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
    expect(hand.getRank()).not.toBe(HandRank.StraightFlush);
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
    expect(hand.getRank()).not.toBe(HandRank.StraightFlush);
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
