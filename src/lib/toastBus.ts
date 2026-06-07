type ToastVariant = 'error' | 'info';

export type ToastItem = {
  id: string;
  message: string;
  variant: ToastVariant;
};

type ToastListener = (toasts: ToastItem[]) => void;

const listeners = new Set<ToastListener>();
let toasts: ToastItem[] = [];
let lastToastKey = '';
let lastToastAt = 0;

function emit() {
  listeners.forEach((listener) => listener(toasts));
}

export function subscribeToToasts(listener: ToastListener) {
  listeners.add(listener);
  listener(toasts);

  return () => {
    listeners.delete(listener);
  };
}

export function pushToast(message: string, variant: ToastVariant = 'info') {
  const toastKey = `${variant}:${message}`;
  const now = Date.now();

  if (toastKey === lastToastKey && now - lastToastAt < 2000) {
    return;
  }

  lastToastKey = toastKey;
  lastToastAt = now;

  const nextToast: ToastItem = {
    id: `${now}-${Math.random().toString(36).slice(2, 8)}`,
    message,
    variant,
  };

  toasts = [...toasts, nextToast];
  emit();

  window.setTimeout(
    () => {
      removeToast(nextToast.id);
    },
    variant === 'error' ? 5000 : 3500
  );
}

export function removeToast(id: string) {
  const nextToasts = toasts.filter((toast) => toast.id !== id);

  if (nextToasts.length === toasts.length) return;

  toasts = nextToasts;
  emit();
}
