import { Card } from "./card";

export class HoleCards {
  private cards: Card[];

  constructor(card1: Card, card2: Card) {
    if (card1.equals(card2)) {
      throw new Error(`Hole cards cannot be identical`);
    }
    this.cards = [card1, card2];
  }

  getCards(): Card[] {
    return [...this.cards];
  }

  toString(): string {
    return `${this.cards[0].toString()}, ${this.cards[1].toString()}`;
  }

  static fromWords(word: string): HoleCards {
    if (word.length !== 4) {
      throw new Error(`Invalid hole cards word: ${word}`);
    }

    const card1 = Card.fromWord(word.slice(0, 2));
    const card2 = Card.fromWord(word.slice(2, 4));

    return new HoleCards(card1, card2);
  }
}
