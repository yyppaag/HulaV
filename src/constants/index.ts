export * from './colors';
export * from './theme';

export const APP_NAME = 'Hula';
export const API_BASE_URL = __DEV__
  ? 'http://localhost:3000/api'
  : 'https://api.hula.com';

export const MAX_PROFILE_PHOTOS = 6;
export const MIN_AGE = 18;
export const MAX_AGE = 100;
export const MAX_DISTANCE = 160; // km
export const DEFAULT_DISTANCE = 80; // km
