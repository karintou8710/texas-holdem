export function getCombinations<T>(array: T[], size: number): T[][] {
  if (size > array.length) return [];
  if (size === 0) return [[]];

  const combinations: T[][] = [];
  const generate = (start: number, combo: T[]) => {
    if (combo.length === size) {
      combinations.push([...combo]);
      return;
    }

    for (let i = start; i < array.length; i++) {
      combo.push(array[i]);
      generate(i + 1, combo);
      combo.pop();
    }
  };

  generate(0, []);
  return combinations;
}
