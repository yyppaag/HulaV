export interface User {
  id: string;
  email: string;
  name: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  bio?: string;
  photos: UserPhoto[];
  interests: string[];
  location: Location;
  preferences: UserPreferences;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserPhoto {
  id: string;
  url: string;
  order: number;
  isVerified?: boolean;
}

export interface Location {
  latitude: number;
  longitude: number;
  city?: string;
  country?: string;
}

export interface UserPreferences {
  ageRange: {
    min: number;
    max: number;
  };
  distance: number;
  genderPreference: 'male' | 'female' | 'everyone';
  showMe: boolean;
}

export interface UserProfile extends User {
  age: number;
  distance?: number;
}
