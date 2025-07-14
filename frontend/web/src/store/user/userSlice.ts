import apiClient from "@/apis/client";
import { UserState } from "@/types/userType";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 초기 상태
const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

// 비동기 Thunk: 내 정보 조회
export const fetchMe = createAsyncThunk(
  "user/fetchMe",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiClient.get("/members/me");
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message ?? "Error");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.user = action.payload.dataBody;
        state.loading = false;
      })
      .addCase(fetchMe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
