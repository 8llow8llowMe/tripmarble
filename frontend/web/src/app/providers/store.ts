import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/entities/users/model/user/userSlice";
import formReducer from "@/entities/users/model/form/formSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      form: formReducer,
      user: userReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
