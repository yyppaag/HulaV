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
          bio: 'Adventure seeker, coffee lover, and aspiring photographer 📷',
          photos: [
            {id: '1', url: 'https://picsum.photos/400/600?random=1', order: 0},
            {id: '2', url: 'https://picsum.photos/400/600?random=2', order: 1},
            {id: '3', url: 'https://picsum.photos/400/600?random=3', order: 2},
          ],
          interests: ['Travel', 'Photography', 'Hiking', 'Coffee'],
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
        {
          id: '2',
          name: 'Emma',
          email: 'emma@example.com',
          dateOfBirth: '1997-08-22',
          age: 26,
          gender: 'female',
          bio: 'Yoga instructor by day, foodie by night 🧘‍♀️ Love trying new restaurants!',
          photos: [
            {id: '4', url: 'https://picsum.photos/400/600?random=4', order: 0},
            {id: '5', url: 'https://picsum.photos/400/600?random=5', order: 1},
          ],
          interests: ['Yoga', 'Food', 'Fitness', 'Cooking'],
          location: {latitude: 40.7580, longitude: -73.9855, city: 'New York'},
          distance: 8,
          preferences: {
            ageRange: {min: 24, max: 32},
            distance: 30,
            genderPreference: 'male',
            showMe: true,
          },
          verified: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '3',
          name: 'Jessica',
          email: 'jessica@example.com',
          dateOfBirth: '1994-12-10',
          age: 29,
          gender: 'female',
          bio: 'Artist & designer. Dog mom to a golden retriever 🐕',
          photos: [
            {id: '6', url: 'https://picsum.photos/400/600?random=6', order: 0},
            {id: '7', url: 'https://picsum.photos/400/600?random=7', order: 1},
            {id: '8', url: 'https://picsum.photos/400/600?random=8', order: 2},
            {id: '9', url: 'https://picsum.photos/400/600?random=9', order: 3},
          ],
          interests: ['Art', 'Design', 'Dogs', 'Museums'],
          location: {latitude: 40.7489, longitude: -73.9680, city: 'New York'},
          distance: 3,
          preferences: {
            ageRange: {min: 27, max: 38},
            distance: 25,
            genderPreference: 'male',
            showMe: true,
          },
          verified: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '4',
          name: 'Olivia',
          email: 'olivia@example.com',
          dateOfBirth: '1996-03-18',
          age: 27,
          gender: 'female',
          bio: 'Marketing professional who loves concerts and indie music 🎵',
          photos: [
            {id: '10', url: 'https://picsum.photos/400/600?random=10', order: 0},
            {id: '11', url: 'https://picsum.photos/400/600?random=11', order: 1},
            {id: '12', url: 'https://picsum.photos/400/600?random=12', order: 2},
          ],
          interests: ['Music', 'Concerts', 'Festivals', 'Travel'],
          location: {latitude: 40.7614, longitude: -73.9776, city: 'New York'},
          distance: 6,
          preferences: {
            ageRange: {min: 25, max: 33},
            distance: 40,
            genderPreference: 'everyone',
            showMe: true,
          },
          verified: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '5',
          name: 'Sophia',
          email: 'sophia@example.com',
          dateOfBirth: '1998-06-25',
          age: 25,
          gender: 'female',
          bio: 'Tech startup enthusiast. Always up for brunch and beach days! ☀️',
          photos: [
            {id: '13', url: 'https://picsum.photos/400/600?random=13', order: 0},
            {id: '14', url: 'https://picsum.photos/400/600?random=14', order: 1},
          ],
          interests: ['Technology', 'Startups', 'Beach', 'Brunch'],
          location: {latitude: 40.7282, longitude: -73.7949, city: 'New York'},
          distance: 12,
          preferences: {
            ageRange: {min: 23, max: 30},
            distance: 35,
            genderPreference: 'male',
            showMe: true,
          },
          verified: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];

      set({profiles: mockProfiles, isLoading: false, currentIndex: 0});
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
