import {create} from 'zustand';
import {Match, Message} from '@types';

interface MatchState {
  matches: Match[];
  isLoading: boolean;
  error: string | null;
  setMatches: (matches: Match[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  loadMatches: () => Promise<void>;
  addMatch: (match: Match) => void;
  updateMatch: (matchId: string, lastMessage: Message) => void;
}

export const useMatchStore = create<MatchState>((set, get) => ({
  matches: [],
  isLoading: false,
  error: null,

  setMatches: (matches: Match[]) => {
    set({matches});
  },

  setLoading: (loading: boolean) => {
    set({isLoading: loading});
  },

  setError: (error: string | null) => {
    set({error});
  },

  loadMatches: async () => {
    try {
      set({isLoading: true, error: null});

      // TODO: Replace with actual API call
      // const response = await matchApi.getMatches();

      // Mock matches for now
      const mockMatches: Match[] = [];

      set({matches: mockMatches, isLoading: false});
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : 'Failed to load matches',
        isLoading: false,
      });
    }
  },

  addMatch: (match: Match) => {
    const {matches} = get();
    set({matches: [match, ...matches]});
  },

  updateMatch: (matchId: string, lastMessage: Message) => {
    const {matches} = get();
    const updatedMatches = matches.map(match =>
      match.id === matchId ? {...match, lastMessage} : match,
    );
    set({matches: updatedMatches});
  },
}));
