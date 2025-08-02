import { BoardCell } from "./types";

export function createDummyBoardData(count: number): BoardCell[] {
  const types = ["음식점", "카페", "관광지", "공원"];
  const data: BoardCell[] = [];
  for (let row = 0; row < count; row++) {
    for (let col = 0; col < count; col++) {
      if (row === 0 || row === count - 1 || col === 0 || col === count - 1) {
        const idx = data.length;
        data.push({
          index: idx,
          row,
          col,
          title: `${types[idx % types.length]}`,
          type: types[idx % types.length],
        });
      }
    }
  }
  return data;
}
