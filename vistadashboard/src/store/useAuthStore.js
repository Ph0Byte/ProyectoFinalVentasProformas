import { create } from 'zustand';

const initialState = {
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
  user: JSON.parse(localStorage.getItem('user')) || null,
};

export const useAuthStore = create((set) => ({
  ...initialState,
  login: (userData) => {
    set({ isAuthenticated: true, user: userData });
    // Almacena en localStorage
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', JSON.stringify(userData));
  },
  logout: () => {
    set({ isAuthenticated: false, user: null });
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
  },
}));



