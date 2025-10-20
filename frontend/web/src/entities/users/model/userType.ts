export interface User {
  id: number;
  email: string;
  name: string;
  nickname: string;
  profileImageUrl: string | null;
  role: string;
  provider: string | null;
}

export interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}
