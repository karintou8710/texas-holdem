import { Card } from "./card";
import { RANKS, SUITS } from "./constants";
import { getCombinations } from "./utils";

export class Deck {
  private cards: Card[] = [];

  constructor() {
    this.cards = this.createDeck();
  }

  private createDeck() {
    const deck: Card[] = [];
    for (const suit of SUITS) {
      for (const rank of RANKS) {
        deck.push(new Card(suit, rank));
      }
    }
    return deck;
  }

  public shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  public draw() {
    if (this.cards.length === 0) {
      return null;
    }

    return this.cards.pop();
  }

  public getSize() {
    return this.cards.length;
  }

  public getCards(): Card[] {
    return [...this.cards]; // Return a copy to prevent external modification
  }

  public removeCard(card: Card) {
    const index = this.cards.findIndex(
      (c) => c.suit === card.suit && c.rank === card.rank
    );
    if (index !== -1) {
      this.cards.splice(index, 1);
    }
  }

  public reset() {
    this.cards = this.createDeck();
  }

  public generateCombinations(count: number): Card[][] {
    return getCombinations(this.cards, count);
  }
}
