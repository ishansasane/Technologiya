import { configureStore } from "@reduxjs/toolkit";
import articleReducer from "./slice/articale";
import languagereducer from "./slice/settings";
export const store = configureStore({
  reducer: {
    article: articleReducer,
    language: languagereducer,
  },
});

export type RootType = ReturnType<typeof store.getState>;
