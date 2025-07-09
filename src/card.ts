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

  // ex) As -> Ace of Spades
  static fromWord(word: string): Card {
    if (word.length !== 2) {
      throw new Error(`Invalid card word: ${word}`);
    }

    const [rank, suit] = [word[0], word[1]];
    return new Card(this.getSuitFromLetter(suit), this.getRankFromLetter(rank));
  }

  static getSuitFromLetter(letter: string): Suit {
    if (letter === "h") return Suit.Hearts;
    else if (letter === "d") return Suit.Diamonds;
    else if (letter === "c") return Suit.Clubs;
    else if (letter === "s") return Suit.Spades;
    else throw new Error(`Invalid suit letter: ${letter}`);
  }

  static getRankFromLetter(letter: string): Rank {
    if (letter === "2") return Rank.Two;
    else if (letter === "3") return Rank.Three;
    else if (letter === "4") return Rank.Four;
    else if (letter === "5") return Rank.Five;
    else if (letter === "6") return Rank.Six;
    else if (letter === "7") return Rank.Seven;
    else if (letter === "8") return Rank.Eight;
    else if (letter === "9") return Rank.Nine;
    else if (letter === "T") return Rank.Ten;
    else if (letter === "J") return Rank.Jack;
    else if (letter === "Q") return Rank.Queen;
    else if (letter === "K") return Rank.King;
    else if (letter === "A") return Rank.Ace;
    else throw new Error(`Invalid rank letter: ${letter}`);
  }
}
