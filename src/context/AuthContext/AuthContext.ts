import { createContext } from 'react';

export type AuthStatus = 'checking' | 'authenticated' | 'unauthenticated';

type AuthContextType = {
  accessToken: string | null;
  authStatus: AuthStatus;
  restoreError: Error | null;
  isLoggingOut: boolean;
  signIn: (accessToken: string) => void;
  refreshSession: () => Promise<string>;
  retrySessionRestore: () => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);
