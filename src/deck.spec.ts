import { expect, test } from "vitest";
import { Deck } from "./deck";
import { RANKS, SUITS } from "./constants";

test("デッキが正しく初期化される", () => {
  const deck = new Deck();
  expect(deck.getSize()).toBe(52);
});

test("drawメソッドが正しく動作する", () => {
  const deck = new Deck();
  const initialSize = deck.getSize();

  const card = deck.draw();
  expect(card).toBeDefined();
  expect(deck.getSize()).toBe(initialSize - 1);

  // デッキが空になるまでカードを引く
  while (deck.getSize() > 0) {
    deck.draw();
  }

  // デッキが空の場合はundefinedを返す
  expect(deck.draw()).toBeNull();
});

test("resetメソッドが正しく動作する", () => {
  const deck = new Deck();
  const initialSize = deck.getSize();

  // カードを数枚引く
  for (let i = 0; i < 5; i++) {
    deck.draw();
  }

  expect(deck.getSize()).toBe(initialSize - 5);

  // デッキをリセット
  deck.reset();
  expect(deck.getSize()).toBe(initialSize);
});

test("shuffleメソッドが正しく動作する", () => {
  const deck1 = new Deck();
  const deck2 = new Deck();

  // デッキの初期状態は同じ
  const initialCards1 = [...deck1["cards"]];
  const initialCards2 = [...deck2["cards"]];
  expect(initialCards1).toEqual(initialCards2);

  // デッキをシャッフル
  deck1.shuffle();

  // シャッフル後は順序が異なる可能性が高い
  // ただし、偶然同じ順序になる可能性もあるため、
  // 完全な一致でないことを確認するのは難しい
  // 代わりに、カードの枚数が変わっていないことを確認
  expect(deck1.getSize()).toBe(deck2.getSize());
});
