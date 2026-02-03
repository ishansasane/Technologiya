import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { isLoading } from "expo-font";

type DataType = {
  id: number;
  title: string;
  url: string;
  cover_image: string;
  published_at: string;
  tag_list: string[];
  user: string;
  profile_image: string;
};

type ArticleSliceType = {
  isLoading: boolean;
  data: DataType[];
  saved: DataType[];
  error: string | undefined;
};

const initialState: ArticleSliceType = {
  isLoading: false,
  data: [],
  saved: [],
  error: undefined,
};

export const fetchArticales = createAsyncThunk("fetchArticales", async () => {
  const responce = (await axios.get("https://dev.to/api/articles")).data;
  return Promise.all(
    responce.map((a) => {
      return {
        id: a.id,
        title: a.title,
        url: a.url,
        cover_image: a.cover_image,
        published_at: a.published_at,
        tag_list: a.tag_list,
        user: a.user.name,
        profile_image: a.user.profile_image_90,
      };
    }),
  );
});

const articaleSlice = createSlice({
  name: "article",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArticales.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchArticales.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchArticales.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export default articaleSlice.reducer;
