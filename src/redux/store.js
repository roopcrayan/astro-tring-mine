import { configureStore } from "@reduxjs/toolkit";
import UserAuthReducer from "./slice/UserAuth";
import HoroscopeReducer from "./slice/HoroscopesSlice";

export const store = configureStore({
  reducer: {
    userAuth: UserAuthReducer,
    horoscope: HoroscopeReducer,
  },
});
