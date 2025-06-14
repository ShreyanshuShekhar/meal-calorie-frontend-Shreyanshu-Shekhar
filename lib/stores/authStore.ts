import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Types
interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  setToken: (token: string) => void;
  setUser: (user: User) => void;
  logout: () => void;
}

// Initial State
const initialState: AuthState = {
  token: null,
  user: null,
  setToken: () => {},
  setUser: () => {},
  logout: () => {}
};

// Store
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      ...initialState,
      
      // Actions that dispatch to reducer
      setToken: (token) => set({ token }),
      setUser: (user) => set({ user }),
      logout: () => set({ token: null, user: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
); 