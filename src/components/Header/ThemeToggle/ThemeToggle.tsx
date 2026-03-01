import styles from './ThemeToggle.module.css';
import { useTheme } from '../../../context/useTheme';

export function ThemeToggler() {
  const { theme, toggleTheme } = useTheme();
  return (
    <label className={styles.switch}>
      <input type="checkbox" checked={theme === 'dark'} onChange={toggleTheme} />
      <span className={styles.slider}></span>
    </label>
  );
}
