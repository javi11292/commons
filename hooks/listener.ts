import { useEffect, useState } from "react";

export const useListener = <T>(listeners: Set<unknown>, initial: T) => {
  const [state, setState] = useState(initial);

  useEffect(() => {
    listeners.add(setState);

    return () => {
      listeners.delete(setState);
    };
  }, [listeners]);

  return state;
};
