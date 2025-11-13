import {create} from 'zustand';
import {UserProfile} from '@types';

interface ProfileState {
  profiles: UserProfile[];
  currentIndex: number;
  isLoading: boolean;
  error: string | null;
  likedProfiles: string[];
  passedProfiles: string[];
  setProfiles: (profiles: UserProfile[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  likeProfile: (profileId: string) => void;
  passProfile: (profileId: string) => void;
  superLikeProfile: (profileId: string) => void;
  loadProfiles: () => Promise<void>;
  nextProfile: () => void;
}

export const useProfileStore = create<ProfileState>((set, get) => ({
  profiles: [],
  currentIndex: 0,
  isLoading: false,
  error: null,
  likedProfiles: [],
  passedProfiles: [],

  setProfiles: (profiles: UserProfile[]) => {
    set({profiles, currentIndex: 0});
  },

  setLoading: (loading: boolean) => {
    set({isLoading: loading});
  },

  setError: (error: string | null) => {
    set({error});
  },

  likeProfile: (profileId: string) => {
    const {likedProfiles} = get();
    set({likedProfiles: [...likedProfiles, profileId]});
    get().nextProfile();
  },

  passProfile: (profileId: string) => {
    const {passedProfiles} = get();
    set({passedProfiles: [...passedProfiles, profileId]});
    get().nextProfile();
  },

  superLikeProfile: (profileId: string) => {
    // TODO: Implement super like API call
    const {likedProfiles} = get();
    set({likedProfiles: [...likedProfiles, profileId]});
    get().nextProfile();
  },

  loadProfiles: async () => {
    try {
      set({isLoading: true, error: null});

      // TODO: Replace with actual API call
      // const response = await profileApi.getProfiles();

      // Mock profiles for now
      const mockProfiles: UserProfile[] = [
        {
          id: '1',
          name: 'Sarah',
          email: 'sarah@example.com',
          dateOfBirth: '1995-05-15',
          age: 28,
          gender: 'female',
          bio: 'Love hiking and traveling! 🌍',
          photos: [
            {id: '1', url: 'https://via.placeholder.com/400', order: 1},
          ],
          interests: ['Travel', 'Hiking', 'Photography'],
          location: {latitude: 40.7128, longitude: -74.006, city: 'New York'},
          distance: 5,
          preferences: {
            ageRange: {min: 25, max: 35},
            distance: 50,
            genderPreference: 'male',
            showMe: true,
          },
          verified: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];

      set({profiles: mockProfiles, isLoading: false});
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : 'Failed to load profiles',
        isLoading: false,
      });
    }
  },

  nextProfile: () => {
    const {currentIndex, profiles} = get();
    if (currentIndex < profiles.length - 1) {
      set({currentIndex: currentIndex + 1});
    }
  },
}));
