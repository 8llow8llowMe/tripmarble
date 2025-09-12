export function getRandomItems<T>(list: T[], count: number): T[] {
  if (!list || list.length === 0) return [];
  if (count >= list.length) return [...list];

  const shuffled = [...list].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
