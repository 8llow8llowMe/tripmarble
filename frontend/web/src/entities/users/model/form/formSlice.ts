import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormState {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  nickname: string;
}

const initialState: FormState = {
  email: "",
  password: "",
  confirmPassword: "",
  name: "",
  nickname: "",
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateField: (
      state,
      action: PayloadAction<{ key: keyof FormState; value: string }>
    ) => {
      state[action.payload.key] = action.payload.value;
    },
    resetForm: () => initialState,
  },
});

export const { updateField, resetForm } = formSlice.actions;
export default formSlice.reducer;
