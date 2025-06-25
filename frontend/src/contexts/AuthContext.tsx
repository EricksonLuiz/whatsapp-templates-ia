
import React, { createContext, useContext, useState } from 'react';

interface User {
  id: string;
  login: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (login: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (login: string, password: string) => {
    // Simulação de login - em produção seria integrado com backend
    if (login === 'admin' && password === 'admin') {
      setUser({ id: '1', login: 'admin', isAdmin: true });
      return true;
    }
    if (login === 'user' && password === 'user') {
      setUser({ id: '2', login: 'user', isAdmin: false });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
