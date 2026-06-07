import { useEffect, useState } from 'react';
import { removeToast, subscribeToToasts, type ToastItem } from '../../lib/toastBus';
import styles from './ToastViewport.module.css';

export function ToastViewport() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    return subscribeToToasts(setToasts);
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className={styles.viewport} aria-live="polite" aria-atomic="true">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${styles.toast} ${toast.variant === 'error' ? styles.toastError : styles.toastInfo}`}
          role="status"
        >
          <span className={styles.message}>{toast.message}</span>
          <button
            type="button"
            className={styles.closeButton}
            onClick={() => removeToast(toast.id)}
            aria-label="Close notification"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
