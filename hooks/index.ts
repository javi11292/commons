import { useCallback, useLayoutEffect, useRef, useState } from "react";

export function useEvent<T>(handler: (...args: T[]) => unknown) {
  const ref = useRef(handler);

  useLayoutEffect(() => {
    ref.current = handler;
  });

  return useCallback((...args: T[]) => {
    const fn = ref.current;
    return fn(...args);
  }, []);
}

export function useLoading<T>(callback: (...args: T[]) => Promise<unknown>) {
  const [loading, setLoading] = useState(false);

  const trigger = useEvent(async (...args: T[]) => {
    setLoading(true);
    try {
      await callback(...args);
    } finally {
      setLoading(false);
    }
  });

  return { loading, trigger };
}
