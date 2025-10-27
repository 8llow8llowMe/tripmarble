import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { format } from 'date-fns';

interface SearchQuery {
  query: string;
  date: string;
}

interface RecentQueryState {
  queries: SearchQuery[];
}

const initialState: RecentQueryState = {
  queries: [],
};

export const recentQuery = createSlice({
  name: 'recentQuery',
  initialState,
  reducers: {
    addRecentQuery(state, action: PayloadAction<string>) {
      const query = action.payload;
      const date = format(new Date(), 'MM.dd');
      const newQuery: SearchQuery = { query, date };

      const existingIndex = state.queries.findIndex((item) => item.query === query);

      console.log('newQuery', newQuery);

      if (existingIndex !== -1) {
        state.queries.splice(existingIndex, 1);
        state.queries.unshift(newQuery);
      } else {
        state.queries.unshift(newQuery);
      }
    },

    removeRecentQuery(state, action: PayloadAction<string>) {
      state.queries = state.queries.filter((query) => query.query !== action.payload);
    },

    resetRecentQueries(state) {
      state.queries = [];
    },
  },
});

export const { addRecentQuery, removeRecentQuery, resetRecentQueries } = recentQuery.actions;
export default recentQuery.reducer;
