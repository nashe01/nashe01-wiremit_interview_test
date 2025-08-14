import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  firstName: string;
  middleName?: string;
  secondName: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: Omit<User, 'id'> & { password: string; confirmPassword: string }) => Promise<boolean>;
  logout: () => void;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is logged in on page load
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find((u: any) => u.email === email && u.password === password);
    
    if (foundUser) {
      const userWithoutPassword = { ...foundUser };
      delete userWithoutPassword.password;
      setUser(userWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const signup = async (userData: Omit<User, 'id'> & { password: string; confirmPassword: string }): Promise<boolean> => {
    if (userData.password !== userData.confirmPassword) {
      return false;
    }

    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = users.find((u: any) => u.email === userData.email);
    
    if (userExists) {
      return false;
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      firstName: userData.firstName,
      middleName: userData.middleName,
      secondName: userData.secondName,
      email: userData.email,
      password: userData.password
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Auto login after signup
    const userWithoutPassword = { ...newUser };
    delete userWithoutPassword.password;
    setUser(userWithoutPassword);
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const value = {
    user,
    login,
    signup,
    logout,
    isLoggedIn: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};