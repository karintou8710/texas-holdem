import { Rank, Suit } from "./constants";

export class Card {
  constructor(public readonly suit: Suit, public readonly rank: Rank) {}

  equals(other: Card) {
    return this.suit === other.suit && this.rank === other.rank;
  }

  // より強ければ正、弱ければ負、同じなら0を返す
  compareRank(other: Card) {
    return this.rank - other.rank;
  }

  toString(): string {
    return `${this.suit}-${this.rank}`;
  }
}
