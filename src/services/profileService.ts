import {apiClient} from './api';
import {ApiResponse, UserProfile, PaginatedResponse} from '@types';

export const profileService = {
  async getProfiles(
    page: number = 1,
    limit: number = 10,
  ): Promise<ApiResponse<PaginatedResponse<UserProfile>>> {
    return apiClient.get<ApiResponse<PaginatedResponse<UserProfile>>>(
      `/profiles?page=${page}&limit=${limit}`,
    );
  },

  async getProfile(userId: string): Promise<ApiResponse<UserProfile>> {
    return apiClient.get<ApiResponse<UserProfile>>(`/profiles/${userId}`);
  },

  async likeProfile(userId: string): Promise<ApiResponse<{matched: boolean}>> {
    return apiClient.post<ApiResponse<{matched: boolean}>>('/profiles/like', {
      userId,
    });
  },

  async passProfile(userId: string): Promise<ApiResponse<void>> {
    return apiClient.post<ApiResponse<void>>('/profiles/pass', {userId});
  },

  async superLikeProfile(
    userId: string,
  ): Promise<ApiResponse<{matched: boolean}>> {
    return apiClient.post<ApiResponse<{matched: boolean}>>(
      '/profiles/super-like',
      {userId},
    );
  },

  async reportProfile(
    userId: string,
    reason: string,
  ): Promise<ApiResponse<void>> {
    return apiClient.post<ApiResponse<void>>('/profiles/report', {
      userId,
      reason,
    });
  },

  async blockProfile(userId: string): Promise<ApiResponse<void>> {
    return apiClient.post<ApiResponse<void>>('/profiles/block', {userId});
  },
};
