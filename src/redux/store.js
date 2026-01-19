import { configureStore } from "@reduxjs/toolkit";
import UserAuthReducer from "./slice/UserAuth";
import HoroscopeReducer from "./slice/HoroscopesSlice";
import AstroAuthReducer from "./slice/AstroAuth";

export const store = configureStore({
  reducer: {
    userAuth: UserAuthReducer,
    horoscope: HoroscopeReducer,
    astroAuth: AstroAuthReducer,
  },
});
