import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchCurrentUserWithRefresh } from '../../features/auth/api';
import { useAuth } from '../../context/AuthContext/useAuth';
import styles from './ProfilePage.module.css';

export function ProfilePage() {
  const { accessToken, authStatus, restoreError, isLoggingOut, refreshSession, retrySessionRestore, signOut } =
    useAuth();

  const currentUserQuery = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: () => {
      if (!accessToken) {
        throw new Error('Access token is missing.');
      }

      return fetchCurrentUserWithRefresh(accessToken, refreshSession);
    },
    enabled: authStatus === 'authenticated' && accessToken !== null,
  });

  function handleLogout() {
    void signOut();
  }

  if (authStatus === 'checking') {
    return (
      <main className={styles.page}>
        <section className={styles.card}>
          <p>Restoring your session...</p>
        </section>
      </main>
    );
  }

  if (restoreError) {
    return (
      <main className={styles.page}>
        <section className={styles.card}>
          <h1>Unable to restore your session</h1>
          <p>{restoreError.message}</p>
          <button type="button" onClick={() => void retrySessionRestore()}>
            Try again
          </button>
          <Link to="/login">Go to sign in</Link>
        </section>
      </main>
    );
  }

  if (authStatus !== 'authenticated' || !accessToken) {
    return (
      <main className={styles.page}>
        <section className={styles.card}>
          <h1>Authentication required</h1>
          <Link to="/login">Go to sign in</Link>
        </section>
      </main>
    );
  }

  if (currentUserQuery.isPending) {
    return (
      <main className={styles.page}>
        <section className={styles.card}>
          <p>Loading your profile...</p>
        </section>
      </main>
    );
  }

  if (currentUserQuery.isError) {
    const message =
      currentUserQuery.error instanceof Error ? currentUserQuery.error.message : 'Unable to load profile.';

    return (
      <main className={styles.page}>
        <section className={styles.card}>
          <h1>Unable to load profile</h1>
          <p>{message}</p>
          <Link to="/login">Try signing in again</Link>
        </section>
      </main>
    );
  }

  const user = currentUserQuery.data.user;

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <p className={styles.eyebrow}>Protected endpoint</p>
        <h1>Welcome, {user.name}</h1>
        <p>{user.email}</p>
        <button type="button" onClick={handleLogout} disabled={isLoggingOut}>
          {isLoggingOut ? 'Logging out...' : 'Logout'}
        </button>
      </section>
    </main>
  );
}
