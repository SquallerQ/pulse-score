import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { login } from '../../features/auth/api';
import styles from './LoginPage.module.css';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginMutation = useMutation({
    mutationFn: login,
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    loginMutation.mutate({ email, password });
    console.log(email, password);
  }

  const errorMessage = loginMutation.error instanceof Error ? loginMutation.error.message : 'Unable to sign in';

  return (
    <main className={styles.page}>
      <section className={styles.card} aria-labelledby="login-title">
        <p className={styles.eyebrow}>Pulse Score account</p>
        <h1 id="login-title" className={styles.title}>
          Sign in to the matchday.
        </h1>
        <p className={styles.intro}>Test</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.field}>
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
            />
          </label>

          <label className={styles.field}>
            <span>Password</span>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />
          </label>

          <button className={styles.submit} type="submit" disabled={loginMutation.isPending}>
            {loginMutation.isPending ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        {loginMutation.isError && (
          <p className={styles.message} role="alert">
            {errorMessage}
          </p>
        )}

        {loginMutation.data && (
          <p className={`${styles.message} ${styles.success}`} role="status">
            Signed in as {loginMutation.data.user.name}. Access token received for this browser session.
          </p>
        )}
      </section>
    </main>
  );
}
