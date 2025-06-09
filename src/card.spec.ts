import { expect, test } from "vitest";
import { Card } from "./card";
import { Rank, Suit } from "./constants";

test("カードが正しく作成される", () => {
  const card = new Card(Suit.Hearts, Rank.Ace);
  expect(card.suit).toBe(Suit.Hearts);
  expect(card.rank).toBe(Rank.Ace);
});

test("equalsメソッドが正しく動作する", () => {
  const card1 = new Card(Suit.Hearts, Rank.Ace);
  const card2 = new Card(Suit.Hearts, Rank.Ace);
  const card3 = new Card(Suit.Diamonds, Rank.Ace);
  const card4 = new Card(Suit.Hearts, Rank.King);

  expect(card1.equals(card2)).toBe(true);
  expect(card1.equals(card3)).toBe(false);
  expect(card1.equals(card4)).toBe(false);
});

test("compareRankメソッドが正しく動作する", () => {
  const ace = new Card(Suit.Hearts, Rank.Ace);
  const king = new Card(Suit.Hearts, Rank.King);
  const queen = new Card(Suit.Hearts, Rank.Queen);

  expect(ace.compareRank(king)).toBeGreaterThan(0);
  expect(king.compareRank(queen)).toBeGreaterThan(0);
  expect(queen.compareRank(ace)).toBeLessThan(0);
  expect(ace.compareRank(ace)).toBe(0);
});
