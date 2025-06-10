import { Card } from "./card";
import { HandRank, Rank } from "./constants";

export class Hand {
  private handRank: HandRank;
  private handCards: Card[];

  constructor(private cards: Card[]) {
    if (cards.length < 5) {
      throw new Error("5枚以上のカードが必要です");
    }
    const result = this.evaluate();
    this.handRank = result.rank;
    this.handCards = this.sort(result.cards);
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

  private sort(cards: Card[]): Card[] {
    return [...cards].sort((a, b) => {
      const rankComparison = b.rank - a.rank;
      if (rankComparison !== 0) {
        return rankComparison;
      }

      return b.suit - a.suit;
    });
  }

  private compareHandRanks(rank1: HandRank, rank2: HandRank): number {
    return rank1 - rank2;
  }

  private compareKickers(other: Hand): number {
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
        if (highCard1 !== highCard2) return highCard1 - highCard2;

        // A-5-4-3-2のストレートの場合、5を最上位カードとして扱う
        if (this.isLowStraight()) {
          return 0; // 同じ低いストレートは同じ強さ
        }
        return 0;

      case HandRank.Flush:
        // フラッシュは5枚のカードを順番に比較
        return this.compareKickerRanks(rankCounts1, rankCounts2, 5);

      case HandRank.FourOfAKind:
        // フォーカードの数字を比較し、同じ場合はキッカーを比較
        const fourRank1 = this.getFourOfAKindRank(rankCounts1);
        const fourRank2 = this.getFourOfAKindRank(rankCounts2);
        if (fourRank1 !== fourRank2) return fourRank1 - fourRank2;
        return (
          this.getKickerRank(rankCounts1) - this.getKickerRank(rankCounts2)
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
          this.getKickerRank(rankCounts1) - this.getKickerRank(rankCounts2)
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
    return (
      Array.from(rankCounts.entries()).find(([_, count]) => count === 4)?.[0] ||
      Rank.Two
    );
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

  private getKickerRank(rankCounts: Map<Rank, number>): Rank {
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

  private evaluate(): { rank: HandRank; cards: Card[] } {
    // 役の判定を強い順に行う
    if (this.isRoyalFlush()) {
      return { rank: HandRank.RoyalFlush, cards: this.getRoyalFlushCards() };
    } else if (this.isStraightFlush()) {
      return {
        rank: HandRank.StraightFlush,
        cards: this.getStraightFlushCards(),
      };
    } else if (this.isFourOfAKind()) {
      return { rank: HandRank.FourOfAKind, cards: this.getFourOfAKindCards() };
    } else if (this.isFullHouse()) {
      return { rank: HandRank.FullHouse, cards: this.getFullHouseCards() };
    } else if (this.isFlush()) {
      return { rank: HandRank.Flush, cards: this.getFlushCards() };
    } else if (this.isStraight()) {
      return { rank: HandRank.Straight, cards: this.getStraightCards() };
    } else if (this.isThreeOfAKind()) {
      return {
        rank: HandRank.ThreeOfAKind,
        cards: this.getThreeOfAKindCards(),
      };
    } else if (this.isTwoPair()) {
      return { rank: HandRank.TwoPair, cards: this.getTwoPairCards() };
    } else if (this.isOnePair()) {
      return { rank: HandRank.OnePair, cards: this.getOnePairCards() };
    }
    return { rank: HandRank.HighCard, cards: this.getHighCardCards() };
  }

  private isRoyalFlush(): boolean {
    return (
      this.isStraightFlush() &&
      this.cards.some((card) => card.rank === Rank.Ace)
    );
  }

  private getRoyalFlushCards(): Card[] {
    return this.getStraightFlushCards();
  }

  private isStraightFlush(): boolean {
    return this.isFlush() && this.isStraight();
  }

  private getStraightFlushCards(): Card[] {
    const flushCards = this.getFlushCards();
    return this.getStraightCardsFrom(flushCards);
  }

  private isFourOfAKind(): boolean {
    const rankCounts = this.getRankCounts();
    return Array.from(rankCounts.values()).some((count) => count === 4);
  }

  private getFourOfAKindCards(): Card[] {
    const rankCounts = this.getRankCounts();
    const fourRank = Array.from(rankCounts.entries()).find(
      ([_, count]) => count === 4
    )?.[0];
    if (!fourRank) return [];

    const fourCards = this.cards.filter((card) => card.rank === fourRank);
    const kicker = this.cards
      .filter((card) => card.rank !== fourRank)
      .sort((a, b) => b.rank - a.rank)[0];
    return [...fourCards, kicker];
  }

  private isFullHouse(): boolean {
    const rankCounts = this.getRankCounts();
    const counts = Array.from(rankCounts.values());
    return counts.includes(3) && counts.includes(2);
  }

  private getFullHouseCards(): Card[] {
    const rankCounts = this.getRankCounts();
    const threeRank = Array.from(rankCounts.entries()).find(
      ([_, count]) => count === 3
    )?.[0];
    const twoRank = Array.from(rankCounts.entries()).find(
      ([_, count]) => count === 2
    )?.[0];
    if (!threeRank || !twoRank) return [];

    const threeCards = this.cards.filter((card) => card.rank === threeRank);
    const twoCards = this.cards.filter((card) => card.rank === twoRank);
    return [...threeCards, ...twoCards];
  }

  private isFlush(): boolean {
    const firstSuit = this.cards[0].suit;
    return this.cards.every((card) => card.suit === firstSuit);
  }

  private getFlushCards(): Card[] {
    return [...this.cards].sort((a, b) => b.rank - a.rank).slice(0, 5);
  }

  private isStraight(): boolean {
    const uniqueRanks = Array.from(
      new Set(this.cards.map((card) => card.rank))
    ).sort((a, b) => a - b);
    if (uniqueRanks.length < 5) return false;

    // A-5-4-3-2のストレートを考慮
    if (uniqueRanks.includes(Rank.Ace) && uniqueRanks.includes(Rank.Two)) {
      const lowStraight = [
        Rank.Ace,
        Rank.Two,
        Rank.Three,
        Rank.Four,
        Rank.Five,
      ];
      if (lowStraight.every((rank) => uniqueRanks.includes(rank))) return true;
    }

    // 通常のストレート
    for (let i = 0; i <= uniqueRanks.length - 5; i++) {
      const straight = uniqueRanks.slice(i, i + 5);
      if (straight[4] - straight[0] === 4) return true;
    }
    return false;
  }

  private getStraightCardsFrom(cards: Card[]): Card[] {
    const uniqueRanks = Array.from(
      new Set(cards.map((card) => card.rank))
    ).sort((a, b) => a - b);

    // A-5-4-3-2のストレートを考慮
    if (uniqueRanks.includes(Rank.Ace) && uniqueRanks.includes(Rank.Two)) {
      const lowStraight = [
        Rank.Ace,
        Rank.Two,
        Rank.Three,
        Rank.Four,
        Rank.Five,
      ];
      if (lowStraight.every((rank) => uniqueRanks.includes(rank))) {
        return lowStraight
          .map((rank) => cards.find((card) => card.rank === rank))
          .filter((card): card is Card => card !== undefined);
      }
    }

    // 通常のストレート
    for (let i = 0; i <= uniqueRanks.length - 5; i++) {
      const straight = uniqueRanks.slice(i, i + 5);
      if (straight[4] - straight[0] === 4) {
        return straight
          .map((rank) => cards.find((card) => card.rank === rank))
          .filter((card): card is Card => card !== undefined);
      }
    }
    return [];
  }

  private getStraightCards(): Card[] {
    return this.getStraightCardsFrom(this.cards);
  }

  private isThreeOfAKind(): boolean {
    const rankCounts = this.getRankCounts();
    return Array.from(rankCounts.values()).some((count) => count === 3);
  }

  private getThreeOfAKindCards(): Card[] {
    const rankCounts = this.getRankCounts();
    const threeRank = Array.from(rankCounts.entries()).find(
      ([_, count]) => count === 3
    )?.[0];
    if (!threeRank) return [];

    const threeCards = this.cards.filter((card) => card.rank === threeRank);
    const kickers = this.cards
      .filter((card) => card.rank !== threeRank)
      .sort((a, b) => b.rank - a.rank)
      .slice(0, 2);
    return [...threeCards, ...kickers];
  }

  private isTwoPair(): boolean {
    const rankCounts = this.getRankCounts();
    const pairs = Array.from(rankCounts.values()).filter(
      (count) => count === 2
    );
    return pairs.length === 2;
  }

  private getTwoPairCards(): Card[] {
    const rankCounts = this.getRankCounts();
    const pairs = Array.from(rankCounts.entries())
      .filter(([_, count]) => count === 2)
      .sort((a, b) => b[0] - a[0])
      .slice(0, 2);

    if (pairs.length !== 2) return [];

    const pairCards = pairs.flatMap(([rank]) =>
      this.cards.filter((card) => card.rank === rank)
    );
    const kicker = this.cards
      .filter((card) => !pairs.some(([rank]) => rank === card.rank))
      .sort((a, b) => b.rank - a.rank)[0];
    return [...pairCards, kicker];
  }

  private isOnePair(): boolean {
    const rankCounts = this.getRankCounts();
    return Array.from(rankCounts.values()).some((count) => count === 2);
  }

  private getOnePairCards(): Card[] {
    const rankCounts = this.getRankCounts();
    const pairRank = Array.from(rankCounts.entries()).find(
      ([_, count]) => count === 2
    )?.[0];
    if (!pairRank) return [];

    const pairCards = this.cards.filter((card) => card.rank === pairRank);
    const kickers = this.cards
      .filter((card) => card.rank !== pairRank)
      .sort((a, b) => b.rank - a.rank)
      .slice(0, 3);
    return [...pairCards, ...kickers];
  }

  private getHighCardCards(): Card[] {
    return [...this.cards].sort((a, b) => b.rank - a.rank).slice(0, 5);
  }

  private isLowStraight(): boolean {
    return (
      this.handCards.some((card) => card.rank === Rank.Ace) &&
      this.handCards.some((card) => card.rank === Rank.Two) &&
      this.handCards.some((card) => card.rank === Rank.Three) &&
      this.handCards.some((card) => card.rank === Rank.Four) &&
      this.handCards.some((card) => card.rank === Rank.Five)
    );
  }
}
