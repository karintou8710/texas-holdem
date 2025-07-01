import { expect, test, describe } from "vitest";
import { HoleCards } from "src/holecards";
import { Card } from "src/card";
import { Suit, Rank } from "src/constants";

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
});
