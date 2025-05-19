
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

type User = {
  id: string;
  email: string;
  name?: string;
  emergencyContact?: string;
  alertPermissions?: string[];
};

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  updateUserProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user database for demo purposes
const mockUsers: Record<string, { password: string, user: User }> = {
  'user@example.com': {
    password: 'password123',
    user: {
      id: '1',
      email: 'user@example.com',
      name: 'Demo User',
      emergencyContact: '555-1234',
      alertPermissions: ['friend1@example.com', 'family@example.com']
    }
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(r => setTimeout(r, 1000));
    
    const userRecord = mockUsers[email];
    
    if (userRecord && userRecord.password === password) {
      setUser(userRecord.user);
      localStorage.setItem('user', JSON.stringify(userRecord.user));
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
      throw new Error('Invalid email or password');
    }
    
    setIsLoading(false);
  };

  const signup = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(r => setTimeout(r, 1000));
    
    if (mockUsers[email]) {
      toast({
        title: "Signup failed",
        description: "Email already in use",
        variant: "destructive",
      });
      throw new Error('Email already in use');
    }
    
    // Create new user
    const newUser: User = {
      id: Math.floor(Math.random() * 1000).toString(),
      email,
    };
    
    // In a real app, this would be an API call
    mockUsers[email] = { password, user: newUser };
    
    // Auto login after signup
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    
    toast({
      title: "Signup successful",
      description: "Account created! Please complete your profile.",
    });
    
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  const updateUserProfile = (data: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    // Update mock database
    if (mockUsers[user.email]) {
      mockUsers[user.email].user = updatedUser;
    }
    
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully",
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
