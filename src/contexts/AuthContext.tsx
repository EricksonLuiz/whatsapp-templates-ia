import React, { createContext, useContext, useState } from "react";

interface User {
  id: string;
  login: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (login: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Começa deslogado
  const [user, setUser] = useState<User | null>(null);
  const [loading] = useState(false);

  // Login simulado
  const login = async (login: string, password: string) => {
    setUser({
      id: "1",
      login: login || "mockuser",
      isAdmin: true,
    });
    localStorage.setItem("token", "mocktoken");
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated: !!user, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
