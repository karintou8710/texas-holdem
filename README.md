# @karintou8710/poker

A high-performance TypeScript poker hand evaluator.

## Installation

```bash
npm install @karintou8710/poker
```

## Quick Start

```typescript
import { Card, Hand, Suit, Rank, HandRank } from "@karintou8710/poker";

// Create cards
const holeCards = [
  new Card(Suit.Hearts, Rank.Ace),
  new Card(Suit.Spades, Rank.King),
];

const communityCards = [
  new Card(Suit.Hearts, Rank.Queen),
  new Card(Suit.Hearts, Rank.Jack),
  new Card(Suit.Hearts, Rank.Ten),
  new Card(Suit.Clubs, Rank.Nine),
  new Card(Suit.Diamonds, Rank.Eight),
];

// Evaluate hand
const hand = Hand.of(holeCards, communityCards);
console.log(hand.getRank()); // HandRank.RoyalFlush
```

## Core Features

### Hand Evaluation

```typescript
import { Hand, Card, Suit, Rank } from "@karintou8710/poker";

const cards = [
  new Card(Suit.Hearts, Rank.Ace),
  new Card(Suit.Hearts, Rank.King),
  new Card(Suit.Hearts, Rank.Queen),
  new Card(Suit.Hearts, Rank.Jack),
  new Card(Suit.Hearts, Rank.Ten),
];

const hand = new Hand(cards);
console.log(hand.getRank()); // HandRank.RoyalFlush
```

### Equity Calculation

```typescript
import {
  EquityCalculator,
  HoleCards,
  Card,
  Suit,
  Rank,
} from "@karintou8710/poker";

const players = [
  new HoleCards(
    new Card(Suit.Hearts, Rank.Ace),
    new Card(Suit.Spades, Rank.Ace)
  ),
  new HoleCards(
    new Card(Suit.Hearts, Rank.King),
    new Card(Suit.Diamonds, Rank.King)
  ),
];

const equity = EquityCalculator.calculateExactEquity(players);
console.log(equity); // [91.2, 8.8] - AA vs KK equity
```

### Deck Management

```typescript
import { Deck, Card, Suit, Rank } from "@karintou8710/poker";

const deck = new Deck();
deck.shuffle();

const card = deck.draw();
console.log(card); // Random card

// Remove specific cards
deck.removeCard(new Card(Suit.Hearts, Rank.Ace));
```

## API Reference

### Classes

#### `Card`

- `constructor(suit: Suit, rank: Rank)`
- `equals(other: Card): boolean`
- `toString(): string`

#### `Hand`

- `constructor(cards: Card[])`
- `static of(holeCards: Card[], communityCards: Card[]): Hand`
- `getRank(): HandRank`
- `getHandCards(): Card[]`
- `compare(other: Hand): number`

#### `HoleCards`

- `constructor(card1: Card, card2: Card)`
- `getCards(): Card[]`
- `toString(): string`

#### `Deck`

- `constructor()`
- `shuffle(): void`
- `draw(): Card | null`
- `removeCard(card: Card): void`
- `reset(): void`

#### `EquityCalculator`

- `static calculateExactEquity(players: HoleCards[], communityCards?: Card[]): number[]`

### Enums

#### `Suit`

- `Hearts = 0`
- `Diamonds = 1`
- `Clubs = 2`
- `Spades = 3`

#### `Rank`

- `Two = 2` through `Ace = 14`

#### `HandRank`

- `HighCard = 0`
- `OnePair = 1`
- `TwoPair = 2`
- `ThreeOfAKind = 3`
- `Straight = 4`
- `Flush = 5`
- `FullHouse = 6`
- `FourOfAKind = 7`
- `StraightFlush = 8`
- `RoyalFlush = 9`

## Advanced Usage

### Multiple Hand Comparison

```typescript
import { Hand } from "@koki-kosaki/poker";

const hands = [hand1, hand2, hand3];
const results = Hand.multiCompare(hands);
console.log(results); // [true, false, false] - first hand wins
```

### Custom Combinations

```typescript
import { getCombinations } from "@karintou8710/poker";

const items = [1, 2, 3, 4, 5];
const combinations = getCombinations(items, 3);
console.log(combinations); // All 3-item combinations
```

## Browser Support

Works in all modern browsers and Node.js environments.

## License

MIT
