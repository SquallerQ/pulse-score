import { createContext } from 'react';

type AuthContextType = {
  accessToken: string | null;
  setAccessToken: (accessToken: string | null) => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);
