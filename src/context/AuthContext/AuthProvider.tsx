import { useCallback, useEffect, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { isUnauthorizedAuthError, logout, refreshAccessToken } from '../../features/auth/api';
import { pushToast } from '../../lib/toastBus';
import { AuthContext, type AuthStatus } from './AuthContext';

function toError(error: unknown, fallbackMessage: string): Error {
  return error instanceof Error ? error : new Error(fallbackMessage);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [authStatus, setAuthStatus] = useState<AuthStatus>('checking');
  const [restoreError, setRestoreError] = useState<Error | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const queryClient = useQueryClient();
  const refreshRequestIdRef = useRef(0);
  const initialRestoreStartedRef = useRef(false);
  const isLoggingOutRef = useRef(false);
  const canRefreshSessionRef = useRef(true);

  const requestRefreshToken = useCallback(async (isInitialRestore: boolean): Promise<string> => {
    if (isInitialRestore) {
      canRefreshSessionRef.current = true;
    }

    if (!canRefreshSessionRef.current) {
      throw new Error('Session refresh is disabled after logout.');
    }

    const requestId = ++refreshRequestIdRef.current;

    if (isInitialRestore) {
      setAuthStatus('checking');
      setRestoreError(null);
    }

    try {
      const { accessToken: nextAccessToken } = await refreshAccessToken();

      if (requestId !== refreshRequestIdRef.current) {
        throw new Error('Session request was superseded.');
      }

      setAccessToken(nextAccessToken);
      setAuthStatus('authenticated');
      setRestoreError(null);

      return nextAccessToken;
    } catch (error) {
      if (requestId !== refreshRequestIdRef.current) {
        throw toError(error, 'Session request was superseded.');
      }

      const refreshError = toError(error, 'Unable to restore your session.');

      setAccessToken(null);
      setAuthStatus('unauthenticated');
      setRestoreError(isUnauthorizedAuthError(refreshError) ? null : refreshError);

      if (isUnauthorizedAuthError(refreshError)) {
        canRefreshSessionRef.current = false;
      }

      throw refreshError;
    }
  }, []);

  const retrySessionRestore = useCallback(async () => {
    await requestRefreshToken(true);
  }, [requestRefreshToken]);

  const refreshSession = useCallback(async () => {
    return requestRefreshToken(false);
  }, [requestRefreshToken]);

  const signIn = useCallback((nextAccessToken: string) => {
    refreshRequestIdRef.current += 1;
    initialRestoreStartedRef.current = true;
    canRefreshSessionRef.current = true;
    setAccessToken(nextAccessToken);
    setAuthStatus('authenticated');
    setRestoreError(null);
  }, []);

  const signOut = useCallback(async () => {
    if (isLoggingOutRef.current) {
      return;
    }

    isLoggingOutRef.current = true;
    refreshRequestIdRef.current += 1;
    initialRestoreStartedRef.current = true;
    canRefreshSessionRef.current = false;
    setIsLoggingOut(true);
    setAccessToken(null);
    setAuthStatus('unauthenticated');
    setRestoreError(null);

    await queryClient.cancelQueries({ queryKey: ['auth'] });
    queryClient.removeQueries({ queryKey: ['auth'] });

    try {
      await logout();
    } catch (error) {
      const logoutError = toError(error, 'Unable to log out.');
      pushToast(
        `${logoutError.message} Local access was cleared, but the server session may still be active.`,
        'error'
      );
    } finally {
      isLoggingOutRef.current = false;
      setIsLoggingOut(false);
    }
  }, [queryClient]);

  useEffect(() => {
    if (initialRestoreStartedRef.current) {
      return;
    }

    initialRestoreStartedRef.current = true;
    void retrySessionRestore().catch(() => undefined);
  }, [retrySessionRestore]);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        authStatus,
        restoreError,
        isLoggingOut,
        signIn,
        refreshSession,
        retrySessionRestore,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
