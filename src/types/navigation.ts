import {NavigatorScreenParams} from '@react-navigation/native';
import {UserProfile} from './user';

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
  ProfileDetail: {profile: UserProfile};
  EditProfile: undefined;
  Settings: undefined;
  Chat: {matchId: string};
};

export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Signup: undefined;
  PhoneVerification: {phoneNumber: string};
  ProfileSetup: undefined;
  PhotoUpload: undefined;
  Interests: undefined;
};

export type MainTabParamList = {
  Discover: undefined;
  Matches: undefined;
  Messages: undefined;
  Profile: undefined;
};
