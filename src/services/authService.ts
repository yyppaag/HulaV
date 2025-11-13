import {apiClient} from './api';
import {ApiResponse, User} from '@types';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export const authService = {
  async login(data: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    return apiClient.post<ApiResponse<AuthResponse>>('/auth/login', data);
  },

  async signup(data: SignupRequest): Promise<ApiResponse<AuthResponse>> {
    return apiClient.post<ApiResponse<AuthResponse>>('/auth/signup', data);
  },

  async logout(): Promise<ApiResponse<void>> {
    return apiClient.post<ApiResponse<void>>('/auth/logout');
  },

  async verifyPhone(
    phoneNumber: string,
    code: string,
  ): Promise<ApiResponse<void>> {
    return apiClient.post<ApiResponse<void>>('/auth/verify-phone', {
      phoneNumber,
      code,
    });
  },

  async sendVerificationCode(
    phoneNumber: string,
  ): Promise<ApiResponse<void>> {
    return apiClient.post<ApiResponse<void>>('/auth/send-verification', {
      phoneNumber,
    });
  },

  async refreshToken(): Promise<ApiResponse<{token: string}>> {
    return apiClient.post<ApiResponse<{token: string}>>('/auth/refresh');
  },
};
