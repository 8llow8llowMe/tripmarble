import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GameFormState {
  title: string;
  difficulty: "EASY" | "NORMAL" | "HARD";
  startedAt: string;
  endedAt: string;
  representativeRegionId: number | null;
  tripThemeIds: number[];
}

const initialState: GameFormState = {
  title: "",
  difficulty: "NORMAL",
  startedAt: "",
  endedAt: "",
  representativeRegionId: null,
  tripThemeIds: [],
};

const createGameSlice = createSlice({
  name: "createGame",
  initialState,
  reducers: {
    updateGameField: (
      state,
      action: PayloadAction<{
        key: keyof GameFormState;
        value: string | number | number[] | [string, string] | null;
      }>
    ) => {
      const { key, value } = action.payload;
      (state[key] as any) = value;
    },
    resetGameForm: () => initialState,
  },
});

export const { updateGameField, resetGameForm } = createGameSlice.actions;
export default createGameSlice.reducer;
