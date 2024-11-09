import { create } from 'zustand';

// Lee el estado de autenticación y usuario desde localStorage al iniciar
const initialState = {
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
  user: JSON.parse(localStorage.getItem('user')) || null,
};

export const useAuthStore = create((set) => ({
  ...initialState,
  login: (userData) => {
    // Guarda el estado de autenticación y usuario en el store
    set({ isAuthenticated: true, user: userData });
    // Almacena en localStorage
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', JSON.stringify(userData));
  },
  logout: () => {
    // Restablece el estado de autenticación y usuario en el store
    set({ isAuthenticated: false, user: null });
    // Remueve los datos de localStorage
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
  },
}));



