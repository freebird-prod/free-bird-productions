import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { User, LoginCredentials, InsertUser, AuthResponse } from "./schema";
import { mockUsers } from "./mockData";

interface AuthContextType {
  user: Omit<User, "password"> | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<AuthResponse>;
  register: (userData: InsertUser) => Promise<AuthResponse>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const TOKEN_KEY = "freebird_auth_token";
const USER_KEY = "freebird_user";

// Simple JWT-like token generation (client-side demo)
function generateToken(userId: string): string {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(JSON.stringify({
    userId,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
  }));
  const signature = btoa(`${header}.${payload}.secret`);
  return `${header}.${payload}.${signature}`;
}

function decodeToken(token: string): { userId: string; exp: number } | null {
  try {
    const [, payload] = token.split(".");
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

function isTokenValid(token: string): boolean {
  const decoded = decodeToken(token);
  if (!decoded) return false;
  return decoded.exp > Date.now();
}

// In-memory user store (simulating backend)
let users = [...mockUsers];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Omit<User, "password"> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const token = localStorage.getItem(TOKEN_KEY);
    const savedUser = localStorage.getItem(USER_KEY);

    if (token && savedUser && isTokenValid(token)) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const foundUser = users.find(
      (u) => u.email === credentials.email && u.password === credentials.password
    );

    if (!foundUser) {
      throw new Error("Invalid email or password");
    }

    const token = generateToken(foundUser.id);
    const { password: _, ...userWithoutPassword } = foundUser;

    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(userWithoutPassword));
    setUser(userWithoutPassword);

    return { user: userWithoutPassword, token };
  };

  const register = async (userData: InsertUser): Promise<AuthResponse> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Check if email already exists
    if (users.some((u) => u.email === userData.email)) {
      throw new Error("Email already registered");
    }

    const newUser: User = {
      ...userData,
      id: String(users.length + 1),
      role: "user",
      subscriptionTier: "free",
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);

    const token = generateToken(newUser.id);
    const { password: _, ...userWithoutPassword } = newUser;

    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(userWithoutPassword));
    setUser(userWithoutPassword);

    return { user: userWithoutPassword, token };
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;

    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));

    // Update in-memory store
    const userIndex = users.findIndex((u) => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updates };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Get all users (for admin)
export function getAllUsers(): Omit<User, "password">[] {
  return users.map(({ password: _, ...user }) => user);
}

// Update user subscription (admin action)
export function updateUserSubscription(userId: string, tier: User["subscriptionTier"]) {
  const userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex !== -1) {
    users[userIndex].subscriptionTier = tier;
  }
}
