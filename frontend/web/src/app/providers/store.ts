import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/entities/users/model/user/userSlice";
import formReducer from "@/entities/users/model/form/formSlice";
import createGameReducer from "@/features/game/create-game/model/createGameSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      form: formReducer,
      user: userReducer,
      createGame: createGameReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
