import { NavLink } from 'react-router-dom';

import { useAuth } from '../../context/AuthContext/useAuth';
import { ThemeToggler } from './ThemeToggle/ThemeToggle';
import styles from './Header.module.css';

export function Header() {
  const { authStatus } = useAuth();

  return (
    <div className={styles.container}>
      <div className={styles.buttonsContainer}>
        <NavLink to="/" end className={({ isActive }) => (isActive ? styles.active : styles.link)}>
          Main
        </NavLink>
        <NavLink
          to="/history?league=PL&season=2024&mode=league"
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
        >
          History
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => (isActive ? styles.active : styles.link)}>
          About
        </NavLink>
        {authStatus === 'checking' ? (
          <span className={styles.authStatus} aria-live="polite">
            Checking...
          </span>
        ) : authStatus === 'authenticated' ? (
          <NavLink to="/me" className={({ isActive }) => (isActive ? styles.active : styles.link)}>
            Profile
          </NavLink>
        ) : (
          <NavLink to="/login" className={({ isActive }) => (isActive ? styles.active : styles.link)}>
            Sign In
          </NavLink>
        )}
      </div>
      <ThemeToggler />
    </div>
  );
}
