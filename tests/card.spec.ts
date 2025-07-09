import { expect, test, describe } from "vitest";
import { Card } from "src/card";
import { Rank, Suit } from "src/constants";

test("should correctly create a card", () => {
  const card = new Card(Suit.Hearts, Rank.Ace);
  expect(card.suit).toBe(Suit.Hearts);
  expect(card.rank).toBe(Rank.Ace);
});

test("should correctly evaluate equality using equals method", () => {
  const card1 = new Card(Suit.Hearts, Rank.Ace);
  const card2 = new Card(Suit.Hearts, Rank.Ace);
  const card3 = new Card(Suit.Diamonds, Rank.Ace);
  const card4 = new Card(Suit.Hearts, Rank.King);

  expect(card1.equals(card2)).toBe(true);
  expect(card1.equals(card3)).toBe(false);
  expect(card1.equals(card4)).toBe(false);
});

test("should correctly compare ranks using compareRank method", () => {
  const ace = new Card(Suit.Hearts, Rank.Ace);
  const king = new Card(Suit.Hearts, Rank.King);
  const queen = new Card(Suit.Hearts, Rank.Queen);

  expect(ace.compareRank(king)).toBeGreaterThan(0);
  expect(king.compareRank(queen)).toBeGreaterThan(0);
  expect(queen.compareRank(ace)).toBeLessThan(0);
  expect(ace.compareRank(ace)).toBe(0);
});

describe("Card.fromWord", () => {
  test("should parse valid card words correctly", () => {
    // Aces
    expect(Card.fromWord("Ah")).toEqual(new Card(Suit.Hearts, Rank.Ace));
    expect(Card.fromWord("Ad")).toEqual(new Card(Suit.Diamonds, Rank.Ace));
    expect(Card.fromWord("Ac")).toEqual(new Card(Suit.Clubs, Rank.Ace));
    expect(Card.fromWord("As")).toEqual(new Card(Suit.Spades, Rank.Ace));

    // Kings
    expect(Card.fromWord("Kh")).toEqual(new Card(Suit.Hearts, Rank.King));
    expect(Card.fromWord("Kd")).toEqual(new Card(Suit.Diamonds, Rank.King));
    expect(Card.fromWord("Kc")).toEqual(new Card(Suit.Clubs, Rank.King));
    expect(Card.fromWord("Ks")).toEqual(new Card(Suit.Spades, Rank.King));

    // Queens
    expect(Card.fromWord("Qh")).toEqual(new Card(Suit.Hearts, Rank.Queen));
    expect(Card.fromWord("Qd")).toEqual(new Card(Suit.Diamonds, Rank.Queen));
    expect(Card.fromWord("Qc")).toEqual(new Card(Suit.Clubs, Rank.Queen));
    expect(Card.fromWord("Qs")).toEqual(new Card(Suit.Spades, Rank.Queen));

    // Jacks
    expect(Card.fromWord("Jh")).toEqual(new Card(Suit.Hearts, Rank.Jack));
    expect(Card.fromWord("Jd")).toEqual(new Card(Suit.Diamonds, Rank.Jack));
    expect(Card.fromWord("Jc")).toEqual(new Card(Suit.Clubs, Rank.Jack));
    expect(Card.fromWord("Js")).toEqual(new Card(Suit.Spades, Rank.Jack));

    // Tens
    expect(Card.fromWord("Th")).toEqual(new Card(Suit.Hearts, Rank.Ten));
    expect(Card.fromWord("Td")).toEqual(new Card(Suit.Diamonds, Rank.Ten));
    expect(Card.fromWord("Tc")).toEqual(new Card(Suit.Clubs, Rank.Ten));
    expect(Card.fromWord("Ts")).toEqual(new Card(Suit.Spades, Rank.Ten));
  });

  test("should parse number cards correctly", () => {
    // Nines
    expect(Card.fromWord("9h")).toEqual(new Card(Suit.Hearts, Rank.Nine));
    expect(Card.fromWord("9d")).toEqual(new Card(Suit.Diamonds, Rank.Nine));
    expect(Card.fromWord("9c")).toEqual(new Card(Suit.Clubs, Rank.Nine));
    expect(Card.fromWord("9s")).toEqual(new Card(Suit.Spades, Rank.Nine));

    // Eights
    expect(Card.fromWord("8h")).toEqual(new Card(Suit.Hearts, Rank.Eight));
    expect(Card.fromWord("8d")).toEqual(new Card(Suit.Diamonds, Rank.Eight));
    expect(Card.fromWord("8c")).toEqual(new Card(Suit.Clubs, Rank.Eight));
    expect(Card.fromWord("8s")).toEqual(new Card(Suit.Spades, Rank.Eight));

    // Sevens
    expect(Card.fromWord("7h")).toEqual(new Card(Suit.Hearts, Rank.Seven));
    expect(Card.fromWord("7d")).toEqual(new Card(Suit.Diamonds, Rank.Seven));
    expect(Card.fromWord("7c")).toEqual(new Card(Suit.Clubs, Rank.Seven));
    expect(Card.fromWord("7s")).toEqual(new Card(Suit.Spades, Rank.Seven));

    // Sixes
    expect(Card.fromWord("6h")).toEqual(new Card(Suit.Hearts, Rank.Six));
    expect(Card.fromWord("6d")).toEqual(new Card(Suit.Diamonds, Rank.Six));
    expect(Card.fromWord("6c")).toEqual(new Card(Suit.Clubs, Rank.Six));
    expect(Card.fromWord("6s")).toEqual(new Card(Suit.Spades, Rank.Six));

    // Fives
    expect(Card.fromWord("5h")).toEqual(new Card(Suit.Hearts, Rank.Five));
    expect(Card.fromWord("5d")).toEqual(new Card(Suit.Diamonds, Rank.Five));
    expect(Card.fromWord("5c")).toEqual(new Card(Suit.Clubs, Rank.Five));
    expect(Card.fromWord("5s")).toEqual(new Card(Suit.Spades, Rank.Five));

    // Fours
    expect(Card.fromWord("4h")).toEqual(new Card(Suit.Hearts, Rank.Four));
    expect(Card.fromWord("4d")).toEqual(new Card(Suit.Diamonds, Rank.Four));
    expect(Card.fromWord("4c")).toEqual(new Card(Suit.Clubs, Rank.Four));
    expect(Card.fromWord("4s")).toEqual(new Card(Suit.Spades, Rank.Four));

    // Threes
    expect(Card.fromWord("3h")).toEqual(new Card(Suit.Hearts, Rank.Three));
    expect(Card.fromWord("3d")).toEqual(new Card(Suit.Diamonds, Rank.Three));
    expect(Card.fromWord("3c")).toEqual(new Card(Suit.Clubs, Rank.Three));
    expect(Card.fromWord("3s")).toEqual(new Card(Suit.Spades, Rank.Three));

    // Twos
    expect(Card.fromWord("2h")).toEqual(new Card(Suit.Hearts, Rank.Two));
    expect(Card.fromWord("2d")).toEqual(new Card(Suit.Diamonds, Rank.Two));
    expect(Card.fromWord("2c")).toEqual(new Card(Suit.Clubs, Rank.Two));
    expect(Card.fromWord("2s")).toEqual(new Card(Suit.Spades, Rank.Two));
  });

  test("should throw error for invalid card words", () => {
    // Invalid length
    expect(() => Card.fromWord("A")).toThrow("Invalid card word: A");
    expect(() => Card.fromWord("Ace")).toThrow("Invalid card word: Ace");
    expect(() => Card.fromWord("")).toThrow("Invalid card word: ");

    // Invalid rank
    expect(() => Card.fromWord("1h")).toThrow("Invalid rank letter: 1");
    expect(() => Card.fromWord("Xh")).toThrow("Invalid rank letter: X");
    expect(() => Card.fromWord("0h")).toThrow("Invalid rank letter: 0");

    // Invalid suit
    expect(() => Card.fromWord("Ax")).toThrow("Invalid suit letter: x");
    expect(() => Card.fromWord("Ay")).toThrow("Invalid suit letter: y");
    expect(() => Card.fromWord("AH")).toThrow("Invalid suit letter: H");
    expect(() => Card.fromWord("AD")).toThrow("Invalid suit letter: D");
  });

  test("should be case sensitive for ranks and suits", () => {
    // Lowercase ranks should work
    expect(() => Card.fromWord("ah")).toThrow("Invalid rank letter: a");
    expect(() => Card.fromWord("kh")).toThrow("Invalid rank letter: k");

    // Uppercase suits should fail
    expect(() => Card.fromWord("AH")).toThrow("Invalid suit letter: H");
    expect(() => Card.fromWord("AD")).toThrow("Invalid suit letter: D");
  });

  test("created cards should have correct properties", () => {
    const aceOfHearts = Card.fromWord("Ah");
    expect(aceOfHearts.suit).toBe(Suit.Hearts);
    expect(aceOfHearts.rank).toBe(Rank.Ace);

    const twoOfSpades = Card.fromWord("2s");
    expect(twoOfSpades.suit).toBe(Suit.Spades);
    expect(twoOfSpades.rank).toBe(Rank.Two);

    const kingOfDiamonds = Card.fromWord("Kd");
    expect(kingOfDiamonds.suit).toBe(Suit.Diamonds);
    expect(kingOfDiamonds.rank).toBe(Rank.King);
  });

  test("cards created from words should be equal to cards created with constructor", () => {
    expect(Card.fromWord("Ah").equals(new Card(Suit.Hearts, Rank.Ace))).toBe(
      true
    );
    expect(Card.fromWord("2s").equals(new Card(Suit.Spades, Rank.Two))).toBe(
      true
    );
    expect(Card.fromWord("Kd").equals(new Card(Suit.Diamonds, Rank.King))).toBe(
      true
    );
  });
});
