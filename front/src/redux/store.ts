import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/user.slice";

const reducers = combineReducers({
  user: userReducer,
});

export const store = configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
