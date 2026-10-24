// src/components/Toast/toastBus.js
const listeners = new Set();

export function toast(message, tone = "default") {
  listeners.forEach((listener) => listener(message, tone));
}

export function subscribeToast(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
