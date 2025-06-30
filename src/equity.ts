import { Card } from "./card";
import { Hand } from "./hand";
import { Deck } from "./deck";

export interface PlayerHand {
  holeCards: Card[];
}

export type Equity = number;

export class EquityCalculator {
  static calculateExactEquity(
    players: PlayerHand[],
    communityCards: Card[] = []
  ): Equity[] {
    if (players.length < 2) {
      throw new Error("At least 2 players are required for equity calculation");
    }

    if (communityCards.length > 5) {
      throw new Error("Community cards cannot exceed 5 cards");
    }

    // Create deck and remove known cards
    const deck = new Deck();

    players.forEach((player) => {
      player.holeCards.forEach((card) => {
        deck.removeCard(card);
      });
    });

    communityCards.forEach((card) => {
      deck.removeCard(card);
    });

    const results: Equity[] = players.map(() => 0);

    const restCardCombinations =
      communityCards.length < 5
        ? deck.generateCombinations(5 - communityCards.length)
        : [[]];

    for (const combination of restCardCombinations) {
      const completeCommunity = [...communityCards, ...combination];

      // Evaluate each player's best hand
      const playerHands = players.map((player) =>
        Hand.of(player.holeCards, completeCommunity)
      );
      const compareResult = Hand.multiCompare(playerHands);

      const winnerNumber = compareResult.reduce(
        (a, b) => Number(a) + Number(b),
        0
      );

      if (winnerNumber === 1) {
        const index = compareResult.findIndex((v) => v);
        results[index]++;
      } else {
        for (let i = 0; i < compareResult.length; i++) {
          if (compareResult[i]) results[i] += 1 / winnerNumber;
        }
      }
    }

    const totalOutcomes = restCardCombinations.length;
    for (let i = 0; i < results.length; i++) {
      results[i] = (results[i] / totalOutcomes) * 100;
    }

    return results;
  }
}
