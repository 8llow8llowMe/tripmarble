export const TYPE_COLORS: Record<string, string> = {
  음식점: "#FFE5E5",
  카페: "#E5FFE8",
  관광지: "#E5ECFF",
  공원: "#F1E5FF",
  기타: "#F7F7F7",
};

export function getCell3DColors(type: string): [string, string] {
  switch (type) {
    case "음식점":
      return ["#ffc7c7", "#fa7676"];
    case "카페":
      return ["#cdfcd7", "#5ed17d"];
    case "관광지":
      return ["#c9e7ff", "#6bb9f3"];
    case "공원":
      return ["#e2d4fd", "#a694e8"];
    default:
      return ["#eee", "#bbb"];
  }
}
