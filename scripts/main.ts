import { EquityCalculator } from "src/equity";
import { Card } from "src/card";
import { HoleCards } from "src/holecards";

const players: HoleCards[] = [
  HoleCards.fromWords("AhAs"),
  HoleCards.fromWords("KhKs"),
];

const communityCards = [
  Card.fromWord("2h"),
  Card.fromWord("3c"),
  Card.fromWord("4s"),
];

const results = EquityCalculator.calculateExactEquity(players, communityCards);

console.log("Equity Results:", results);
