import { expect, test, describe } from "vitest";
import { Hand } from "src/hand";
import { Card } from "src/card";
import { Rank, Suit, HandRank } from "src/constants";

describe("Hand - Four of a Kind", () => {
  test("should correctly identify basic Four of a Kind", () => {
    const cards = [
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Clubs, Rank.Ace),
      new Card(Suit.Spades, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
    ];
    const hand = new Hand(cards);
    expect(hand.getRank()).toBe(HandRank.FourOfAKind);
    expect(hand.getHandCards()).toEqual([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Clubs, Rank.Ace),
      new Card(Suit.Spades, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
    ]);
  });

  test("should correctly identify Four of a Kind with different ranks", () => {
    const cards = [
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Diamonds, Rank.King),
      new Card(Suit.Clubs, Rank.King),
      new Card(Suit.Spades, Rank.King),
      new Card(Suit.Hearts, Rank.Ace),
    ];
    const hand = new Hand(cards);
    expect(hand.getRank()).toBe(HandRank.FourOfAKind);
    expect(hand.getHandCards()).toEqual([
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Diamonds, Rank.King),
      new Card(Suit.Clubs, Rank.King),
      new Card(Suit.Spades, Rank.King),
      new Card(Suit.Hearts, Rank.Ace),
    ]);
  });

  test("should not identify as Four of a Kind when cards are similar but different", () => {
    const cards = [
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Clubs, Rank.Ace),
      new Card(Suit.Spades, Rank.King),
      new Card(Suit.Hearts, Rank.King),
    ];
    const hand = new Hand(cards);
    expect(hand.getRank()).not.toBe(HandRank.FourOfAKind);
  });

  test("should correctly identify Four of a Kind when cards are unordered", () => {
    const cards = [
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Spades, Rank.Ace),
      new Card(Suit.Clubs, Rank.Ace),
      new Card(Suit.Hearts, Rank.Ace),
    ];
    const hand = new Hand(cards);
    expect(hand.getRank()).toBe(HandRank.FourOfAKind);
    expect(hand.getHandCards()).toEqual([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Clubs, Rank.Ace),
      new Card(Suit.Spades, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
    ]);
  });
});

describe("Compare - Four of a Kind", () => {
  test("should compare Four of a Kind hands by quad rank", () => {
    const handWithHigherQuad = new Hand([
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Diamonds, Rank.King),
      new Card(Suit.Clubs, Rank.King),
      new Card(Suit.Spades, Rank.King),
      new Card(Suit.Hearts, Rank.Two),
    ]);

    const handWithLowerQuad = new Hand([
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Diamonds, Rank.Queen),
      new Card(Suit.Clubs, Rank.Queen),
      new Card(Suit.Spades, Rank.Queen),
      new Card(Suit.Hearts, Rank.Ace),
    ]);

    expect(handWithHigherQuad.getRank()).toBe(HandRank.FourOfAKind);
    expect(handWithLowerQuad.getRank()).toBe(HandRank.FourOfAKind);
    expect(handWithHigherQuad.compare(handWithLowerQuad)).toBeGreaterThan(0);
    expect(handWithLowerQuad.compare(handWithHigherQuad)).toBeLessThan(0);
  });

  test("should differentiate Four of a Kind hands by kicker", () => {
    const handWithHigherKicker = new Hand([
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Diamonds, Rank.Queen),
      new Card(Suit.Clubs, Rank.Queen),
      new Card(Suit.Spades, Rank.Queen),
      new Card(Suit.Hearts, Rank.King),
    ]);

    const handWithLowerKicker = new Hand([
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Diamonds, Rank.Queen),
      new Card(Suit.Clubs, Rank.Queen),
      new Card(Suit.Spades, Rank.Queen),
      new Card(Suit.Hearts, Rank.Ten),
    ]);

    expect(handWithHigherKicker.getRank()).toBe(HandRank.FourOfAKind);
    expect(handWithLowerKicker.getRank()).toBe(HandRank.FourOfAKind);
    expect(handWithHigherKicker.compare(handWithLowerKicker)).toBeGreaterThan(
      0
    );
    expect(handWithLowerKicker.compare(handWithHigherKicker)).toBeLessThan(0);
  });

  test("should rank Four of a Kind above Full House", () => {
    const fourOfAKind = new Hand([
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Diamonds, Rank.Queen),
      new Card(Suit.Clubs, Rank.Queen),
      new Card(Suit.Spades, Rank.Queen),
      new Card(Suit.Hearts, Rank.Ten),
    ]);

    const fullHouse = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.Ace),
      new Card(Suit.Clubs, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Diamonds, Rank.King),
    ]);

    expect(fourOfAKind.getRank()).toBe(HandRank.FourOfAKind);
    expect(fullHouse.getRank()).toBe(HandRank.FullHouse);
    expect(fourOfAKind.compare(fullHouse)).toBeGreaterThan(0);
    expect(fullHouse.compare(fourOfAKind)).toBeLessThan(0);
  });

  test("should rank Four of a Kind above Flush", () => {
    const fourOfAKind = new Hand([
      new Card(Suit.Hearts, Rank.Ten),
      new Card(Suit.Diamonds, Rank.Ten),
      new Card(Suit.Clubs, Rank.Ten),
      new Card(Suit.Spades, Rank.Ten),
      new Card(Suit.Hearts, Rank.Two),
    ]);

    const flush = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Hearts, Rank.King),
      new Card(Suit.Hearts, Rank.Queen),
      new Card(Suit.Hearts, Rank.Jack),
      new Card(Suit.Hearts, Rank.Nine),
    ]);

    expect(fourOfAKind.getRank()).toBe(HandRank.FourOfAKind);
    expect(flush.getRank()).toBe(HandRank.Flush);
    expect(fourOfAKind.compare(flush)).toBeGreaterThan(0);
    expect(flush.compare(fourOfAKind)).toBeLessThan(0);
  });

  test("should rank Four of a Kind above Straight", () => {
    const fourOfAKind = new Hand([
      new Card(Suit.Hearts, Rank.Nine),
      new Card(Suit.Diamonds, Rank.Nine),
      new Card(Suit.Clubs, Rank.Nine),
      new Card(Suit.Spades, Rank.Nine),
      new Card(Suit.Hearts, Rank.Five),
    ]);

    const straight = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.King),
      new Card(Suit.Clubs, Rank.Queen),
      new Card(Suit.Spades, Rank.Jack),
      new Card(Suit.Hearts, Rank.Ten),
    ]);

    expect(fourOfAKind.getRank()).toBe(HandRank.FourOfAKind);
    expect(straight.getRank()).toBe(HandRank.Straight);
    expect(fourOfAKind.compare(straight)).toBeGreaterThan(0);
    expect(straight.compare(fourOfAKind)).toBeLessThan(0);
  });

  test("should rank Four of a Kind above Three of a Kind", () => {
    const fourOfAKind = new Hand([
      new Card(Suit.Hearts, Rank.Eight),
      new Card(Suit.Diamonds, Rank.Eight),
      new Card(Suit.Clubs, Rank.Eight),
      new Card(Suit.Spades, Rank.Eight),
      new Card(Suit.Hearts, Rank.Four),
    ]);

    const threeOfAKind = new Hand([
      new Card(Suit.Hearts, Rank.Seven),
      new Card(Suit.Diamonds, Rank.Seven),
      new Card(Suit.Clubs, Rank.Seven),
      new Card(Suit.Spades, Rank.Five),
      new Card(Suit.Hearts, Rank.Two),
    ]);

    expect(fourOfAKind.getRank()).toBe(HandRank.FourOfAKind);
    expect(threeOfAKind.getRank()).toBe(HandRank.ThreeOfAKind);
    expect(fourOfAKind.compare(threeOfAKind)).toBeGreaterThan(0);
    expect(threeOfAKind.compare(fourOfAKind)).toBeLessThan(0);
  });

  test("should rank Four of a Kind above Two Pair", () => {
    const fourOfAKind = new Hand([
      new Card(Suit.Hearts, Rank.Six),
      new Card(Suit.Diamonds, Rank.Six),
      new Card(Suit.Clubs, Rank.Six),
      new Card(Suit.Spades, Rank.Six),
      new Card(Suit.Hearts, Rank.Five),
    ]);

    const twoPair = new Hand([
      new Card(Suit.Hearts, Rank.Four),
      new Card(Suit.Diamonds, Rank.Four),
      new Card(Suit.Clubs, Rank.Two),
      new Card(Suit.Spades, Rank.Two),
      new Card(Suit.Hearts, Rank.Ace),
    ]);

    expect(fourOfAKind.getRank()).toBe(HandRank.FourOfAKind);
    expect(twoPair.getRank()).toBe(HandRank.TwoPair);
    expect(fourOfAKind.compare(twoPair)).toBeGreaterThan(0);
    expect(twoPair.compare(fourOfAKind)).toBeLessThan(0);
  });

  test("should rank Four of a Kind above One Pair", () => {
    const fourOfAKind = new Hand([
      new Card(Suit.Hearts, Rank.Five),
      new Card(Suit.Diamonds, Rank.Five),
      new Card(Suit.Clubs, Rank.Five),
      new Card(Suit.Spades, Rank.Five),
      new Card(Suit.Hearts, Rank.Two),
    ]);

    const onePair = new Hand([
      new Card(Suit.Hearts, Rank.Three),
      new Card(Suit.Diamonds, Rank.Three),
      new Card(Suit.Clubs, Rank.Two),
      new Card(Suit.Spades, Rank.Seven),
      new Card(Suit.Hearts, Rank.Ace),
    ]);

    expect(fourOfAKind.getRank()).toBe(HandRank.FourOfAKind);
    expect(onePair.getRank()).toBe(HandRank.OnePair);
    expect(fourOfAKind.compare(onePair)).toBeGreaterThan(0);
    expect(onePair.compare(fourOfAKind)).toBeLessThan(0);
  });

  test("should rank Four of a Kind above High Card", () => {
    const fourOfAKind = new Hand([
      new Card(Suit.Hearts, Rank.Four),
      new Card(Suit.Diamonds, Rank.Four),
      new Card(Suit.Clubs, Rank.Four),
      new Card(Suit.Spades, Rank.Four),
      new Card(Suit.Hearts, Rank.Two),
    ]);

    const highCard = new Hand([
      new Card(Suit.Hearts, Rank.Ace),
      new Card(Suit.Diamonds, Rank.King),
      new Card(Suit.Clubs, Rank.Queen),
      new Card(Suit.Spades, Rank.Jack),
      new Card(Suit.Hearts, Rank.Ten),
    ]);

    expect(fourOfAKind.getRank()).toBe(HandRank.FourOfAKind);
    expect(highCard.getRank()).toBe(HandRank.HighCard);
    expect(fourOfAKind.compare(highCard)).toBeGreaterThan(0);
    expect(highCard.compare(fourOfAKind)).toBeLessThan(0);
  });
});
