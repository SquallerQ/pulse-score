import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchCurrentUserWithRefresh, refreshAccessToken } from '../../features/auth/api';

import { useAuth } from '../../context/AuthContext/useAuth';

import styles from './ProfilePage.module.css';

export function ProfilePage() {
  const { accessToken, setAccessToken } = useAuth();

  const refreshQuery = useQuery({
    queryKey: ['auth', 'refresh'],
    queryFn: refreshAccessToken,
    enabled: accessToken === null,
    retry: false,
  });

  const restoredAccessToken = refreshQuery.data?.accessToken ?? null;
  const activeAccessToken = accessToken ?? restoredAccessToken;

  useEffect(() => {
    if (restoredAccessToken) {
      setAccessToken(restoredAccessToken);
    }
  }, [restoredAccessToken, setAccessToken]);

  const currentUserQuery = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: () => {
      if (!activeAccessToken) {
        throw new Error('Access token is missing.');
      }

      return fetchCurrentUserWithRefresh(activeAccessToken);
    },
    enabled: activeAccessToken !== null,
  });

  const renewedAccessToken = currentUserQuery.data?.accessToken ?? null;

  useEffect(() => {
    if (renewedAccessToken && renewedAccessToken !== accessToken) {
      setAccessToken(renewedAccessToken);
    }
  }, [accessToken, renewedAccessToken, setAccessToken]);

  if (!activeAccessToken && refreshQuery.isPending) {
    return (
      <main className={styles.page}>
        <section className={styles.card}>
          <p>Restoring your session...</p>
        </section>
      </main>
    );
  }

  if (!activeAccessToken) {
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
      </section>
    </main>
  );
}
