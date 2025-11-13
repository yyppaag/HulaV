import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  AUTH_TOKEN: '@hula:auth_token',
  USER_DATA: '@hula:user_data',
  ONBOARDING_COMPLETE: '@hula:onboarding_complete',
};

export const storage = {
  async setItem(key: string, value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error('Storage setItem error:', error);
      throw error;
    }
  },

  async getItem(key: string): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.error('Storage getItem error:', error);
      return null;
    }
  },

  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Storage removeItem error:', error);
      throw error;
    }
  },

  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Storage clear error:', error);
      throw error;
    }
  },

  // Specific methods
  async setAuthToken(token: string): Promise<void> {
    return this.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  },

  async getAuthToken(): Promise<string | null> {
    return this.getItem(STORAGE_KEYS.AUTH_TOKEN);
  },

  async removeAuthToken(): Promise<void> {
    return this.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  },

  async setUserData(data: object): Promise<void> {
    return this.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(data));
  },

  async getUserData<T>(): Promise<T | null> {
    const data = await this.getItem(STORAGE_KEYS.USER_DATA);
    return data ? JSON.parse(data) : null;
  },

  async setOnboardingComplete(complete: boolean): Promise<void> {
    return this.setItem(
      STORAGE_KEYS.ONBOARDING_COMPLETE,
      JSON.stringify(complete),
    );
  },

  async isOnboardingComplete(): Promise<boolean> {
    const data = await this.getItem(STORAGE_KEYS.ONBOARDING_COMPLETE);
    return data ? JSON.parse(data) : false;
  },
};
