
// This is a placeholder for authentication service
// In a real implementation, this would interact with a backend API

import { User } from "@/types";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

// Mock function to simulate logging in
export const loginUser = async (credentials: LoginCredentials): Promise<User> => {
  // Simulate API request delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In a real app, this would validate credentials against a backend
  if (credentials.email === "test@example.com" && credentials.password === "password") {
    const user: User = {
      id: "1",
      name: "Test User",
      email: credentials.email,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Store user in localStorage (for demo purposes only - not secure)
    localStorage.setItem("user", JSON.stringify(user));
    
    return user;
  }
  
  // Simulate auth failure
  throw new Error("Invalid credentials");
};

// Mock function to simulate registration
export const registerUser = async (data: RegisterData): Promise<User> => {
  // Simulate API request delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In a real app, this would create a new user in the backend
  const user: User = {
    id: "1",
    name: data.name,
    email: data.email,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  // Store user in localStorage (for demo purposes only - not secure)
  localStorage.setItem("user", JSON.stringify(user));
  
  return user;
};

// Mock function to log out
export const logoutUser = async (): Promise<void> => {
  // Simulate API request delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Remove user from localStorage
  localStorage.removeItem("user");
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return localStorage.getItem("user") !== null;
};

// Get current user
export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem("user");
  return userJson ? JSON.parse(userJson) : null;
};
