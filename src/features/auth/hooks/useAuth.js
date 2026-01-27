// Simple auth context for now - will implement proper auth later
import React, { createContext, useContext } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const value = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    login: async () => {},
    register: async () => {},
    logout: async () => {},
    updateUser: () => {}
  };
  
  return React.createElement(AuthContext.Provider, { value: value }, children);
}

export function useAuth() {
  return useContext(AuthContext);
}