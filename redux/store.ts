import { configureStore } from "@reduxjs/toolkit";
import articleReducer from "./slice/articale";
export const store = configureStore({
  reducer: {
    article: articleReducer,
  },
});

export type RootType = ReturnType<typeof store.getState>;
