import axios from 'axios';
import { useAuthStore } from './stores/authStore';

// No need for API_URL since we're using relative paths with Next.js API routes
const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Types
export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface CaloriesData {
  dish_name: string;
  servings: number;
}

export interface CaloriesResponse {
  dish_name: string;
  servings: number;
  calories_per_serving: number;
  total_calories: number;
  source: string;
}

// Auth functions
interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
  };
  message?: string;
}

export const authService = {
  register: async (data: RegisterData) => {
    const response = await api.post<AuthResponse>('/api/auth/register', data);
    const { token, user } = response.data;
    useAuthStore.getState().setToken(token);
    useAuthStore.getState().setUser(user);
    return response.data;
  },

  login: async (data: LoginData) => {
    const response = await api.post<AuthResponse>('/api/auth/login', data);
    const { token, user } = response.data;
    useAuthStore.getState().setToken(token);
    useAuthStore.getState().setUser(user);
    return response.data;
  },

  logout: () => {
    useAuthStore.getState().logout();
  }
};

// Calories functions
export const getCalories = async (data: CaloriesData): Promise<CaloriesResponse> => {
  const response = await api.post<CaloriesResponse>('/api/get-calories', data);
  return response.data;
};

export const saveMeal = async (meal: CaloriesResponse): Promise<void> => {
  const meals = JSON.parse(localStorage.getItem('meals') || '[]');
  meals.push(meal);
  localStorage.setItem('meals', JSON.stringify(meals));
};

export const getMeals = async (): Promise<CaloriesResponse[]> => {
  const meals = JSON.parse(localStorage.getItem('meals') || '[]');
  return meals;
};

export const deleteMeal = async (index: number): Promise<void> => {
  const meals = JSON.parse(localStorage.getItem('meals') || '[]');
  meals.splice(index, 1);
  localStorage.setItem('meals', JSON.stringify(meals));
};

// Health check function
export const healthService = {
  checkHealth: async () => {
    const response = await api.get('/api/health');
    return response.data;
  },
};

// Helper function to get auth token
export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

// Helper function to set auth token
export function setAuthToken(token: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('token', token);
}

// Helper function to remove auth token
export function removeAuthToken(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('token');
} 