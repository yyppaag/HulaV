import {create} from 'zustand';
import {User} from '@types';
import {storage} from '@utils';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,

  setUser: (user: User | null) => {
    set({user, isAuthenticated: !!user});
  },

  setLoading: (loading: boolean) => {
    set({isLoading: loading});
  },

  setError: (error: string | null) => {
    set({error});
  },

  login: async (email: string, password: string) => {
    try {
      set({isLoading: true, error: null});

      // TODO: Replace with actual API call
      // const response = await authApi.login({email, password});

      // Mock response for now
      const mockUser: User = {
        id: '1',
        email,
        name: 'Test User',
        dateOfBirth: '1995-01-01',
        gender: 'male',
        photos: [],
        interests: [],
        location: {latitude: 0, longitude: 0},
        preferences: {
          ageRange: {min: 18, max: 35},
          distance: 50,
          genderPreference: 'everyone',
          showMe: true,
        },
        verified: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await storage.setAuthToken('mock-token');
      await storage.setUserData(mockUser);

      set({user: mockUser, isAuthenticated: true, isLoading: false});
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Login failed',
        isLoading: false,
      });
      throw error;
    }
  },

  signup: async (email: string, password: string, name: string) => {
    try {
      set({isLoading: true, error: null});

      // TODO: Replace with actual API call
      // const response = await authApi.signup({email, password, name});

      // Mock response for now
      const mockUser: User = {
        id: '1',
        email,
        name,
        dateOfBirth: '',
        gender: 'male',
        photos: [],
        interests: [],
        location: {latitude: 0, longitude: 0},
        preferences: {
          ageRange: {min: 18, max: 35},
          distance: 50,
          genderPreference: 'everyone',
          showMe: true,
        },
        verified: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await storage.setAuthToken('mock-token');
      await storage.setUserData(mockUser);

      set({user: mockUser, isAuthenticated: true, isLoading: false});
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Signup failed',
        isLoading: false,
      });
      throw error;
    }
  },

  logout: async () => {
    try {
      set({isLoading: true});

      // TODO: Replace with actual API call
      // await authApi.logout();

      await storage.removeAuthToken();
      await storage.clear();

      set({user: null, isAuthenticated: false, isLoading: false});
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Logout failed',
        isLoading: false,
      });
      throw error;
    }
  },

  initialize: async () => {
    try {
      set({isLoading: true});

      const token = await storage.getAuthToken();
      if (!token) {
        set({isLoading: false});
        return;
      }

      const userData = await storage.getUserData<User>();
      if (userData) {
        set({user: userData, isAuthenticated: true, isLoading: false});
      } else {
        set({isLoading: false});
      }
    } catch (error) {
      console.error('Initialize error:', error);
      set({isLoading: false});
    }
  },
}));
