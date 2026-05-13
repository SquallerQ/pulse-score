import { NavLink } from 'react-router-dom';

import { ThemeToggler } from './ThemeToggle/ThemeToggle';
import styles from './Header.module.css';

export function Header() {
  return (
    <div className={styles.container}>
      <div className={styles.buttonsContainer}>
        <NavLink to="/" end className={({ isActive }) => (isActive ? styles.active : styles.link)}>
          Main
        </NavLink>
        <NavLink to="/history" className={({ isActive }) => (isActive ? styles.active : styles.link)}>
          History
        </NavLink>
      </div>
      <ThemeToggler />
    </div>
  );
}
