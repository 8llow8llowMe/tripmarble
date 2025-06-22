export const defaultMeta = {
  title: "TripMarble",
  description: "여행을 즐겁게, TripMarble",
  image: "/og-image.png",
  url: "https://tripmarble.app",
};

export function buildMeta(title: string, description?: string) {
  return {
    title: `TripMarble | ${title}`,
    description: description ?? defaultMeta.description,
  };
}
