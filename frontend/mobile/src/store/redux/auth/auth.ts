import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  accessToken: string;
  memberId: number;
}

const initialState: AuthState = {
  accessToken: '',
  memberId: 0,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authorize(state, action: PayloadAction<AuthState>) {
      state.accessToken = action.payload.accessToken;
      state.memberId = action.payload.memberId;
    },
    logout(state) {
      state.accessToken = '';
      state.memberId = 0;
    },
  },
});

export const { authorize, logout } = authSlice.actions;

export default authSlice.reducer;
