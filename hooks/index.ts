import { useCallback, useRef } from "react";

export const useEvent = <T>(handler: (...args: T[]) => unknown) => {
  const ref = useRef(handler);

  ref.current = handler;

  return useCallback((...args: T[]) => {
    const fn = ref.current;
    return fn(...args);
  }, []);
};
