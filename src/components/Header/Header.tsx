import styles from './Header.module.css';
import { ThemeToggler } from './ThemeToggle/ThemeToggle';

export function Header() {

  return (
    <div className={styles.container}>
      <ThemeToggler />
    </div>
  );
}
