import { Card } from "./card";
import { HandRank, Rank } from "./constants";
import { getCombinations } from "./utils";

export class Hand {
  private handRank: HandRank;
  private handCards: Card[];

  constructor(private cards: Card[]) {
    if (cards.length !== 5) {
      throw new Error("A hand must consist of exactly 5 cards.");
    }

    this.handRank = this.evaluate();
    this.handCards = this.sort(this.cards, this.handRank);
  }

  static of(holeCards: Card[], communityCards: Card[]) {
    if (holeCards.length !== 2 || communityCards.length < 3) {
      throw new Error("Invalid number of cards for hand evaluation.");
    }

    const cards = [...holeCards, ...communityCards];
    const combinations = getCombinations(cards, 5);
    return combinations.map((combo) => new Hand(combo));
  }

  public getRank(): HandRank {
    return this.handRank;
  }

  public getHandCards(): Card[] {
    return this.handCards;
  }

  public compare(other: Hand): number {
    // 役の強さを比較
    if (this.handRank !== other.handRank) {
      return this.compareHandRanks(this.handRank, other.handRank);
    }

    // 同じ役の場合、キッカーの強さを比較
    return this.compareKickers(other);
  }

  private compareHandRanks(rank1: HandRank, rank2: HandRank): number {
    return rank1 - rank2;
  }

  private compareKickers(other: Hand): number {
    if (this.handRank !== other.handRank) {
      throw new Error("Cannot compare hands of different ranks.");
    }

    const rankCounts1 = this.getRankCounts();
    const rankCounts2 = other.getRankCounts();

    switch (this.handRank) {
      case HandRank.RoyalFlush:
        // ロイヤルストレートフラッシュは常に同じ強さ
        return 0;

      case HandRank.StraightFlush:
      case HandRank.Straight:
        // ストレートの最上位カードを比較
        const highCard1 = this.handCards[0].rank;
        const highCard2 = other.handCards[0].rank;
        return highCard1 - highCard2;

      case HandRank.Flush:
        // フラッシュは5枚のカードを順番に比較
        return this.compareKickerRanks(rankCounts1, rankCounts2, 5);

      case HandRank.FourOfAKind:
        // フォーカードの数字を比較し、同じ場合はキッカーを比較
        const fourRank1 = this.getFourOfAKindRank(rankCounts1);
        const fourRank2 = this.getFourOfAKindRank(rankCounts2);
        if (fourRank1 !== fourRank2) return fourRank1 - fourRank2;
        return (
          this.getTopKickerRank(rankCounts1) -
          this.getTopKickerRank(rankCounts2)
        );

      case HandRank.FullHouse:
        // スリーカードの数字を比較し、同じ場合はペアの数字を比較
        const threeRank1 = this.getThreeOfAKindRank(rankCounts1);
        const threeRank2 = this.getThreeOfAKindRank(rankCounts2);
        if (threeRank1 !== threeRank2) return threeRank1 - threeRank2;
        const pairRank1 = this.getPairRank(rankCounts1);
        const pairRank2 = this.getPairRank(rankCounts2);
        return pairRank1 - pairRank2;

      case HandRank.ThreeOfAKind:
        // スリーカードの数字を比較し、同じ場合はキッカーを比較
        const threeRank1_3 = this.getThreeOfAKindRank(rankCounts1);
        const threeRank2_3 = this.getThreeOfAKindRank(rankCounts2);
        if (threeRank1_3 !== threeRank2_3) return threeRank1_3 - threeRank2_3;
        return this.compareKickerRanks(rankCounts1, rankCounts2, 2);

      case HandRank.TwoPair:
        // 高いペアを比較し、同じ場合は低いペアを比較、それも同じ場合はキッカーを比較
        const highPair1 = this.getHighPairRank(rankCounts1);
        const highPair2 = this.getHighPairRank(rankCounts2);
        if (highPair1 !== highPair2) return highPair1 - highPair2;
        const lowPair1 = this.getLowPairRank(rankCounts1);
        const lowPair2 = this.getLowPairRank(rankCounts2);
        if (lowPair1 !== lowPair2) return lowPair1 - lowPair2;
        return (
          this.getTopKickerRank(rankCounts1) -
          this.getTopKickerRank(rankCounts2)
        );

      case HandRank.OnePair:
        // ペアの数字を比較し、同じ場合はキッカーを比較
        const pairRank1_1 = this.getPairRank(rankCounts1);
        const pairRank2_1 = this.getPairRank(rankCounts2);
        if (pairRank1_1 !== pairRank2_1) return pairRank1_1 - pairRank2_1;
        return this.compareKickerRanks(rankCounts1, rankCounts2, 3);

      case HandRank.HighCard:
        // キッカーを順番に比較
        return this.compareKickerRanks(rankCounts1, rankCounts2, 5);

      default:
        return 0;
    }
  }

  private getRankCounts(): Map<Rank, number> {
    const rankCounts = new Map<Rank, number>();
    for (const card of this.cards) {
      rankCounts.set(card.rank, (rankCounts.get(card.rank) || 0) + 1);
    }
    return rankCounts;
  }

  private getFourOfAKindRank(rankCounts: Map<Rank, number>): Rank {
    const rank = Array.from(rankCounts.entries()).find(
      ([_, count]) => count === 4
    )?.[0];

    if (!rank) {
      throw new Error("No Four of a Kind found in the hand.");
    }

    return rank;
  }

  private getThreeOfAKindRank(rankCounts: Map<Rank, number>): Rank {
    return (
      Array.from(rankCounts.entries()).find(([_, count]) => count === 3)?.[0] ||
      Rank.Two
    );
  }

  private getPairRank(rankCounts: Map<Rank, number>): Rank {
    return (
      Array.from(rankCounts.entries()).find(([_, count]) => count === 2)?.[0] ||
      Rank.Two
    );
  }

  private getHighPairRank(rankCounts: Map<Rank, number>): Rank {
    return (
      Array.from(rankCounts.entries())
        .filter(([_, count]) => count === 2)
        .sort((a, b) => b[0] - a[0])[0]?.[0] || Rank.Two
    );
  }

  private getLowPairRank(rankCounts: Map<Rank, number>): Rank {
    return (
      Array.from(rankCounts.entries())
        .filter(([_, count]) => count === 2)
        .sort((a, b) => b[0] - a[0])[1]?.[0] || Rank.Two
    );
  }

  private getTopKickerRank(rankCounts: Map<Rank, number>): Rank {
    return (
      Array.from(rankCounts.entries())
        .filter(([_, count]) => count === 1)
        .sort((a, b) => b[0] - a[0])[0]?.[0] || Rank.Two
    );
  }

  private compareKickerRanks(
    rankCounts1: Map<Rank, number>,
    rankCounts2: Map<Rank, number>,
    count: number
  ): number {
    const kickers1 = Array.from(rankCounts1.entries())
      .filter(([_, count]) => count === 1)
      .sort((a, b) => b[0] - a[0])
      .slice(0, count);
    const kickers2 = Array.from(rankCounts2.entries())
      .filter(([_, count]) => count === 1)
      .sort((a, b) => b[0] - a[0])
      .slice(0, count);

    for (let i = 0; i < count; i++) {
      if (kickers1[i]?.[0] !== kickers2[i]?.[0]) {
        return (kickers1[i]?.[0] || Rank.Two) - (kickers2[i]?.[0] || Rank.Two);
      }
    }
    return 0;
  }

  private evaluate(): HandRank {
    if (this.isRoyalFlush()) {
      return HandRank.RoyalFlush;
    } else if (this.isStraightFlush()) {
      return HandRank.StraightFlush;
    } else if (this.isFourOfAKind()) {
      return HandRank.FourOfAKind;
    } else if (this.isFullHouse()) {
      return HandRank.FullHouse;
    } else if (this.isFlush()) {
      return HandRank.Flush;
    } else if (this.isStraight()) {
      return HandRank.Straight;
    } else if (this.isThreeOfAKind()) {
      return HandRank.ThreeOfAKind;
    } else if (this.isTwoPair()) {
      return HandRank.TwoPair;
    } else if (this.isOnePair()) {
      return HandRank.OnePair;
    }
    return HandRank.HighCard;
  }

  private isRoyalFlush(): boolean {
    const isStraightFlush = this.isStraightFlush();
    return (
      isStraightFlush &&
      this.cards.some((card) => card.rank === Rank.Ace) &&
      this.cards.some((card) => card.rank === Rank.King) // Account for low straight (A-5-4-3-2)
    );
  }

  private isStraightFlush(): boolean {
    return this.isFlush() && this.isStraight();
  }

  private isFourOfAKind(): boolean {
    const rankCounts = this.getRankCounts();
    return Array.from(rankCounts.values()).some((count) => count === 4);
  }

  private isFullHouse(): boolean {
    const rankCounts = this.getRankCounts();
    const counts = Array.from(rankCounts.values());
    return counts.includes(3) && counts.includes(2);
  }

  private isFlush(): boolean {
    const firstSuit = this.cards[0].suit;
    return this.cards.every((card) => card.suit === firstSuit);
  }

  private isStraight(): boolean {
    const uniqueRanks = Array.from(
      new Set(this.cards.map((card) => card.rank))
    ).sort((a, b) => a - b);
    if (uniqueRanks.length < 5) return false;

    // A-5-4-3-2のストレートを考慮
    if (this.isLowStraight()) return true;

    // 通常のストレート
    if (uniqueRanks[4] - uniqueRanks[0] === 4) return true;

    return false;
  }

  private isThreeOfAKind(): boolean {
    const rankCounts = this.getRankCounts();
    return Array.from(rankCounts.values()).some((count) => count === 3);
  }

  private isLowStraight(): boolean {
    const lowStraight = [Rank.Ace, Rank.Two, Rank.Three, Rank.Four, Rank.Five];
    return lowStraight.every((rank) =>
      this.cards.some((card) => card.rank === rank)
    );
  }

  private isTwoPair(): boolean {
    const rankCounts = this.getRankCounts();
    const pairs = Array.from(rankCounts.values()).filter(
      (count) => count === 2
    );
    return pairs.length === 2;
  }

  private isOnePair(): boolean {
    const rankCounts = this.getRankCounts();
    return Array.from(rankCounts.values()).some((count) => count === 2);
  }

  private sort(cards: Card[], handRank: HandRank): Card[] {
    if (
      handRank === HandRank.RoyalFlush ||
      handRank === HandRank.StraightFlush ||
      handRank === HandRank.Flush ||
      handRank === HandRank.Straight ||
      handRank === HandRank.HighCard
    ) {
      // Handle 5-4-3-2-A straight
      if (this.isLowStraight()) {
        return [...cards].sort((a, b) => {
          if (a.rank === Rank.Ace) return 1;
          if (b.rank === Rank.Ace) return -1;
          return b.rank - a.rank;
        });
      }

      return [...cards].sort((a, b) => b.rank - a.rank);
    } else {
      const rankCounts = this.getRankCounts();
      const sortedByRankCount = Array.from(rankCounts.entries()).sort(
        ([rankA, countA], [rankB, countB]) => {
          if (countA !== countB) {
            return countB - countA; // Sort by count descending
          }
          return rankB - rankA; // Sort by rank descending
        }
      );

      const sortedCards: Card[] = [];
      for (const [rank] of sortedByRankCount) {
        const cardsOfRank = cards.filter((card) => card.rank === rank);
        cardsOfRank.sort((a, b) => a.suit - b.suit); // Sort by suit ascending
        sortedCards.push(...cardsOfRank);
      }

      return sortedCards;
    }
  }
}
