import { useCallback, useLayoutEffect, useRef } from "react";

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
