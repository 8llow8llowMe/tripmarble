export type getCustomPositionType = (
  index: number,
  count: number
) => { customX: number; customY: number };

/**
 * index를 받아 (customX, customY) 좌표 반환
 * count: 한 변의 칸 수 (ex: 5)
 * index: 0부터 시작하여 시계 방향으로 0번째는 오른쪽 아래
 */
export function getCustomPosition(
  index: number,
  count: number
): { customX: number; customY: number } {
  const length = 4 * (count - 1); // 총 칸 수
  const pos = index % length;
  const max = count - 1;

  if (pos < max) {
    // 아래 변 (오른쪽 아래 -> 왼쪽 아래)
    return { customX: max - pos, customY: max };
  } else if (pos < max * 2) {
    // 왼쪽 변 (왼쪽 아래 -> 왼쪽 위)
    return { customX: 0, customY: max - (pos - max) };
  } else if (pos < max * 3) {
    // 위 변 (왼쪽 위 -> 오른쪽 위)
    return { customX: pos - max * 2, customY: 0 };
  } else {
    // 오른쪽 변 (오른쪽 위 -> 오른쪽 아래)
    return { customX: max, customY: pos - max * 3 };
  }
}
