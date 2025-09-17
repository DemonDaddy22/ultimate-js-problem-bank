/**
 * Problem link - https://bigfrontend.dev/react/usetimeout
 */

import { useRef, useEffect } from 'react';

const useTimeout = (callback: () => void, delay: number) => {
  const timeoutIdRef = useRef<NodeJS.Timeout>(undefined);
  const callbackRef = useRef<() => void>(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay >= 0) {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = setTimeout(() => callbackRef.current(), delay);
    }

    return () => clearTimeout(timeoutIdRef.current);
  }, [delay]);

  return timeoutIdRef.current;
};

export default useTimeout;
