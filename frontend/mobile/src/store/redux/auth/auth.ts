import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  accessToken: string;
  refreshToken: string;
  userId?: string;
  rememberId?: boolean;
}

const initialState: AuthState = {
  accessToken: '',
  refreshToken: '',
  userId: '',
  rememberId: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authorize(state, action: PayloadAction<AuthState>) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.userId = action.payload.userId ?? state.userId;
      state.rememberId = action.payload.rememberId ?? state.rememberId;
    },
    logout(state) {
      state.accessToken = '';
      state.refreshToken = '';
      if (!state.rememberId) state.userId = '';
    },
    setRememberId(state, action: PayloadAction<boolean>) {
      state.rememberId = action.payload;
    },
  },
});

export const { authorize, logout, setRememberId } = authSlice.actions;

export default authSlice.reducer;
