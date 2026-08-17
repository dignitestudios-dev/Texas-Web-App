import { axiosInstance } from '@/lib/axios';
import { AuthResponse, LoginCredentials, RegisterCredentials, User } from '../types/auth.types';

export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  // Replace with actual endpoint
  // const { data } = await axiosInstance.post<AuthResponse>('/auth/login', credentials);
  // return data;
  
  // Mock implementation for scaffold
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: { id: '1', email: credentials.email, name: 'John Doe' },
        token: 'mock-token',
      });
    }, 1000);
  });
};

export const registerUser = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
  // const { data } = await axiosInstance.post<AuthResponse>('/auth/register', credentials);
  // return data;
  
  // Mock implementation
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: { id: '1', email: credentials.email, name: credentials.name },
        token: 'mock-token',
      });
    }, 1000);
  });
};

export const getCurrentUser = async (): Promise<User> => {
  // const { data } = await axiosInstance.get<User>('/auth/me');
  // return data;
  
  // Mock implementation
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: '1', email: 'john@example.com', name: 'John Doe' });
    }, 500);
  });
};
