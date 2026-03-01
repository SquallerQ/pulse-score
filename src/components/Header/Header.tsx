import styles from './Header.module.css';
import { useTheme } from '../../context/useTheme';

export function Header() {
  const { theme, toggleTheme } = useTheme();
  console.log('Theme:', theme);

  return (
    <div className={styles.container}>
      <button onClick={toggleTheme}></button>
    </div>
  );
}
