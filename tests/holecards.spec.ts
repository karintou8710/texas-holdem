import { expect, test, describe } from "vitest";
import { HoleCards } from "../src/holecards";
import { Card } from "../src/card";
import { Suit, Rank } from "../src/constants";

describe("HoleCards", () => {
  describe("Constructor", () => {
    test("should create hole cards with two different cards", () => {
      const card1 = new Card(Suit.Hearts, Rank.Ace);
      const card2 = new Card(Suit.Spades, Rank.King);
      const holeCards = new HoleCards(card1, card2);

      expect(holeCards.getCards()).toEqual([card1, card2]);
    });

    test("should throw error when creating with identical cards", () => {
      const card1 = new Card(Suit.Hearts, Rank.Ace);
      const card2 = new Card(Suit.Hearts, Rank.Ace);

      expect(() => new HoleCards(card1, card2)).toThrow(
        "Hole cards cannot be identical"
      );
    });

    test("should allow same rank with different suits", () => {
      const card1 = new Card(Suit.Hearts, Rank.Ace);
      const card2 = new Card(Suit.Spades, Rank.Ace);
      const holeCards = new HoleCards(card1, card2);

      expect(holeCards.getCards()).toEqual([card1, card2]);
    });

    test("should allow same suit with different ranks", () => {
      const card1 = new Card(Suit.Hearts, Rank.Ace);
      const card2 = new Card(Suit.Hearts, Rank.King);
      const holeCards = new HoleCards(card1, card2);

      expect(holeCards.getCards()).toEqual([card1, card2]);
    });
  });

  describe("fromWords", () => {
    test("should create hole cards from valid 4-character word", () => {
      const holeCards = HoleCards.fromWords("AhKs");
      const cards = holeCards.getCards();

      expect(cards[0].suit).toBe(Suit.Hearts);
      expect(cards[0].rank).toBe(Rank.Ace);
      expect(cards[1].suit).toBe(Suit.Spades);
      expect(cards[1].rank).toBe(Rank.King);
    });

    test("should create hole cards with same rank different suits", () => {
      const holeCards = HoleCards.fromWords("AsAh");
      const cards = holeCards.getCards();

      expect(cards[0].suit).toBe(Suit.Spades);
      expect(cards[0].rank).toBe(Rank.Ace);
      expect(cards[1].suit).toBe(Suit.Hearts);
      expect(cards[1].rank).toBe(Rank.Ace);
    });

    test("should create hole cards with same suit different ranks", () => {
      const holeCards = HoleCards.fromWords("AhKh");
      const cards = holeCards.getCards();

      expect(cards[0].suit).toBe(Suit.Hearts);
      expect(cards[0].rank).toBe(Rank.Ace);
      expect(cards[1].suit).toBe(Suit.Hearts);
      expect(cards[1].rank).toBe(Rank.King);
    });

    test("should work with numbered cards", () => {
      const holeCards = HoleCards.fromWords("2c3d");
      const cards = holeCards.getCards();

      expect(cards[0].suit).toBe(Suit.Clubs);
      expect(cards[0].rank).toBe(Rank.Two);
      expect(cards[1].suit).toBe(Suit.Diamonds);
      expect(cards[1].rank).toBe(Rank.Three);
    });

    test("should work with ten cards", () => {
      const holeCards = HoleCards.fromWords("TsJh");
      const cards = holeCards.getCards();

      expect(cards[0].suit).toBe(Suit.Spades);
      expect(cards[0].rank).toBe(Rank.Ten);
      expect(cards[1].suit).toBe(Suit.Hearts);
      expect(cards[1].rank).toBe(Rank.Jack);
    });

    test("should throw error for identical cards", () => {
      expect(() => HoleCards.fromWords("AhAh")).toThrow(
        "Hole cards cannot be identical"
      );
    });

    test("should throw error for word length not equal to 4", () => {
      expect(() => HoleCards.fromWords("Ah")).toThrow(
        "Invalid hole cards word: Ah"
      );
      expect(() => HoleCards.fromWords("AhK")).toThrow(
        "Invalid hole cards word: AhK"
      );
      expect(() => HoleCards.fromWords("AhKsQ")).toThrow(
        "Invalid hole cards word: AhKsQ"
      );
      expect(() => HoleCards.fromWords("")).toThrow(
        "Invalid hole cards word: "
      );
    });

    test("should throw error for invalid card words", () => {
      expect(() => HoleCards.fromWords("XhKs")).toThrow();
      expect(() => HoleCards.fromWords("AhXs")).toThrow();
      expect(() => HoleCards.fromWords("AyKs")).toThrow();
      expect(() => HoleCards.fromWords("AhKz")).toThrow();
    });

    test("should work with all valid suits", () => {
      const combinations = ["AhKs", "AsKc", "AcKd", "AdKh"];

      combinations.forEach((word) => {
        expect(() => HoleCards.fromWords(word)).not.toThrow();
      });
    });

    test("should work with all valid ranks", () => {
      const ranks = [
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "T",
        "J",
        "Q",
        "K",
        "A",
      ];

      for (let i = 0; i < ranks.length - 1; i++) {
        const word = `${ranks[i]}h${ranks[i + 1]}s`;
        expect(() => HoleCards.fromWords(word)).not.toThrow();
      }
    });
  });
});
