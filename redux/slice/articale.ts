import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export type DataType = {
  id: number;
  isSaved: boolean;
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
  searchResults: DataType[];
  selectedTag: string;
  error?: string;
  page: number;
  hasMore: boolean;
};

const initialState: ArticleSliceType = {
  isLoading: false,
  data: [],
  saved: [],
  searchResults: [],
  error: undefined,
  selectedTag: "All",
  page: 1,
  hasMore: true,
};

export const fetchArticales = createAsyncThunk<DataType[], number>(
  "fetchArticales",
  async (page) => {
    const response = await axios.get(
      `https://dev.to/api/articles?page=${page}&per_page=10`,
    );

    return response.data.map((a: any) => ({
      id: a.id,
      title: a.title,
      isSaved: false,
      url: a.url,
      cover_image: a.cover_image,
      published_at: a.published_at,
      tag_list: a.tag_list,
      user: a.user.name,
      profile_image: a.user.profile_image_90,
    }));
  },
);

export const searchArticlesByTag = createAsyncThunk<DataType[]>(
  "searchByTag",
  async (tag) => {
    const response = await axios.get(`https://dev.to/api/articles?tag=${tag}`);

    return Promise.all(
      response.data.map((a: any) => ({
        id: a.id,
        title: a.title,
        isSaved: false,
        url: a.url,
        cover_image: a.cover_image,
        published_at: a.published_at,
        tag_list: a.tag_list,
        user: a.user.name,
        profile_image: a.user.profile_image_90,
      })),
    );
  },
);

const articaleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    toggleFavourite: (state, action: PayloadAction<DataType>) => {
      const exists = state.saved.find((item) => item.id === action.payload.id);

      if (exists) {
        state.saved = state.saved.filter(
          (item) => item.id !== action.payload.id,
        );
      } else {
        state.saved.push({
          ...action.payload,
          isSaved: true,
        });
      }
    },
    clearSearch: (state) => {
      state.searchResults = [];
    },

    clearFavourites: (state) => {
      state.saved = [];
    },
    selectTage: (state, action) => {
      state.selectedTag = action.payload;
    },
    resetArticles: (state) => {
      state.data = [];
      state.page = 1;
      state.hasMore = true;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchArticales.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(fetchArticales.fulfilled, (state, action) => {
        state.isLoading = false;
        const existingIds = new Set(state.data.map((item) => item.id));
        const newItems = action.payload.filter(
          (item) => !existingIds.has(item.id),
        );

        if (action.payload.length === 0) {
          state.hasMore = false;
        } else {
          state.data.push(...newItems);
          state.page += 1;
        }
      })
      .addCase(fetchArticales.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(searchArticlesByTag.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(searchArticlesByTag.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchArticlesByTag.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  toggleFavourite,
  clearFavourites,
  clearSearch,
  selectTage,
  resetArticles,
} = articaleSlice.actions;

export default articaleSlice.reducer;
