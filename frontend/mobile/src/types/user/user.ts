export type UserType = {
  memberId: number;
  email: string;
  name: string;
  nickname: string;
  profileImage: string | null;
  role: string;
  provider: null;
};

export type UserActivityType = {
  memberId: number;
  tripGameCount: number;
  tripSpotReviewCount: number;
  tripSpotReviewPhotoCount: number;
};
