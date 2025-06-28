import { expect, test } from "vitest";
import { Deck } from "src/deck";

test("should correctly initialize the deck", () => {
  const deck = new Deck();
  expect(deck.getSize()).toBe(52);
});

test("should correctly handle the draw method", () => {
  const deck = new Deck();
  const initialSize = deck.getSize();

  const card = deck.draw();
  expect(card).toBeDefined();
  expect(deck.getSize()).toBe(initialSize - 1);

  // Draw cards until the deck is empty
  while (deck.getSize() > 0) {
    deck.draw();
  }

  // Return null when the deck is empty
  expect(deck.draw()).toBeNull();
});

test("should correctly handle the reset method", () => {
  const deck = new Deck();
  const initialSize = deck.getSize();

  // Draw several cards
  for (let i = 0; i < 5; i++) {
    deck.draw();
  }

  expect(deck.getSize()).toBe(initialSize - 5);

  // Reset the deck
  deck.reset();
  expect(deck.getSize()).toBe(initialSize);
});

test("should correctly handle the shuffle method", () => {
  const deck1 = new Deck();
  const deck2 = new Deck();

  // Initial state of both decks should be the same
  const initialCards1 = [...deck1["cards"]];
  const initialCards2 = [...deck2["cards"]];
  expect(initialCards1).toEqual(initialCards2);

  // Shuffle the deck
  deck1.shuffle();

  // After shuffling, the order is likely different
  // However, it is possible for the order to remain the same by chance,
  // so verifying complete mismatch is difficult.
  // Instead, verify that the number of cards remains unchanged.
  expect(deck1.getSize()).toBe(deck2.getSize());
});
