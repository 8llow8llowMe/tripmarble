import { UserType } from '@/types/user/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserSliceState extends UserType {}

const initialState: UserSliceState = {
  memberId: 0,
  email: '',
  name: '',
  nickname: '',
  profileImage: null,
  role: '',
  provider: null,
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<Partial<UserSliceState>>) {
      Object.assign(state, {
        ...state,
        ...action.payload,
      });
    },
    removeUser(state) {
      Object.assign(state, initialState);
    },
  },
});

export const { setUser, removeUser } = UserSlice.actions;
export default UserSlice.reducer;
