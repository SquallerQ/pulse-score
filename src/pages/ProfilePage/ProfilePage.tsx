import { useQuery } from '@tanstack/react-query';
import { Link, useLocation } from 'react-router-dom';
import { fetchCurrentUserWithRefresh, refreshAccessToken } from '../../features/auth/api';
import styles from './ProfilePage.module.css';

type ProfileNavigationState = {
  accessToken: string;
};

function hasAccessToken(value: unknown): value is ProfileNavigationState {
  return typeof value === 'object' && value !== null && 'accessToken' in value && typeof value.accessToken === 'string';
}

export function ProfilePage() {
  const location = useLocation();
  const navigationState: unknown = location.state;
  const navigationAccessToken = hasAccessToken(navigationState) ? navigationState.accessToken : null;

  const refreshQuery = useQuery({
    queryKey: ['auth', 'refresh'],
    queryFn: refreshAccessToken,
    enabled: navigationAccessToken === null,
    retry: false,
  });

  const accessToken = navigationAccessToken ?? refreshQuery.data?.accessToken ?? null;

  const currentUserQuery = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: () => {
      if (!accessToken) {
        throw new Error('Access token is missing.');
      }

      return fetchCurrentUserWithRefresh(accessToken);
    },
    enabled: accessToken !== null,
  });

  if (!navigationAccessToken && refreshQuery.isPending) {
    return (
      <main className={styles.page}>
        <section className={styles.card}>
          <p>Restoring your session...</p>
        </section>
      </main>
    );
  }

  if (!accessToken) {
    return (
      <main className={styles.page}>
        <section className={styles.card}>
          <h1>Authentication required</h1>
          <p>This test page needs a token from a successful sign-in.</p>
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

  const user = currentUserQuery.data;

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <p className={styles.eyebrow}>Protected endpoint</p>
        <h1>Welcome, {user.name}</h1>
        <p>{user.email}</p>
      </section>
    </main>
  );
}
