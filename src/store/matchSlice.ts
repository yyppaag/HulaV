import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {Match, Message} from '@types';

interface MatchState {
  matches: Match[];
  isLoading: boolean;
  error: string | null;
}

const initialState: MatchState = {
  matches: [],
  isLoading: false,
  error: null,
};

// Async thunks
export const loadMatches = createAsyncThunk('match/loadMatches', async () => {
  // TODO: Replace with actual API call
  // const response = await matchApi.getMatches();

  // Mock matches for now
  const mockMatches: Match[] = [];

  return mockMatches;
});

export const addMatch = createAsyncThunk('match/addMatch', async (match: Match) => {
  // TODO: Replace with actual API call
  // await matchApi.addMatch(match);

  return match;
});

// Slice
const matchSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {
    updateMatch: (
      state,
      action: PayloadAction<{matchId: string; lastMessage: Message}>,
    ) => {
      const {matchId, lastMessage} = action.payload;
      const matchIndex = state.matches.findIndex(m => m.id === matchId);
      if (matchIndex !== -1) {
        state.matches[matchIndex].lastMessage = lastMessage;
      }
    },
    clearMatches: state => {
      state.matches = [];
    },
  },
  extraReducers: builder => {
    // Load matches
    builder.addCase(loadMatches.pending, state => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(loadMatches.fulfilled, (state, action) => {
      state.matches = action.payload;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(loadMatches.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to load matches';
    });

    // Add match
    builder.addCase(addMatch.fulfilled, (state, action) => {
      state.matches = [action.payload, ...state.matches];
    });
  },
});

export const {updateMatch, clearMatches} = matchSlice.actions;
export default matchSlice.reducer;
