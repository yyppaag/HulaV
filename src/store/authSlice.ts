import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {User} from '@types';
import {storage} from '@utils';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

// Async thunks
export const login = createAsyncThunk(
  'auth/login',
  async ({email, password}: {email: string; password: string}) => {
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

    return mockUser;
  },
);

export const signup = createAsyncThunk(
  'auth/signup',
  async ({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string;
  }) => {
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

    return mockUser;
  },
);

export const logout = createAsyncThunk('auth/logout', async () => {
  // TODO: Replace with actual API call
  // await authApi.logout();

  await storage.removeAuthToken();
  await storage.clear();
});

export const initialize = createAsyncThunk('auth/initialize', async () => {
  const token = await storage.getAuthToken();
  if (!token) {
    return null;
  }

  const userData = await storage.getUserData<User>();
  return userData;
});

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    // Login
    builder.addCase(login.pending, state => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Login failed';
    });

    // Signup
    builder.addCase(signup.pending, state => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Signup failed';
    });

    // Logout
    builder.addCase(logout.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(logout.fulfilled, state => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Logout failed';
    });

    // Initialize
    builder.addCase(initialize.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(initialize.fulfilled, (state, action) => {
      if (action.payload) {
        state.user = action.payload;
        state.isAuthenticated = true;
      }
      state.isLoading = false;
    });
    builder.addCase(initialize.rejected, (state, action) => {
      console.error('Initialize error:', action.error);
      state.isLoading = false;
    });
  },
});

export const {setUser, setError, clearError} = authSlice.actions;
export default authSlice.reducer;
