// src/components/Toast/Toast.jsx
import { useEffect, useState } from 'react';
import { subscribeToast } from "./toastBus";
import "./Toast.css";

const TOAST_DURATION = 2600;

function Toast() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    return subscribeToast((message, tone) => {
      const id = `${Date.now()}-${Math.random()}`;
      setItems((prev) => [...prev, { id, message, tone }]);
      window.setTimeout(() => {
        setItems((prev) => prev.filter((item) => item.id !== id));
      }, TOAST_DURATION);
    });
  }, []);

  if (items.length === 0) return null;

  return (
    <div className="toast-viewport" role="status" aria-live="polite">
      {items.map((item) => (
        <div key={item.id} className={`toast toast-${item.tone}`}>
          <span className="toast-dot" aria-hidden="true" />
          {item.message}
        </div>
      ))}
    </div>
  );
}

export default Toast;
