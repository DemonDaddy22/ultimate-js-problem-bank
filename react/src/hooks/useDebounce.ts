import { useCallback, useEffect, useRef } from 'react';

type Callback<T> = (...args: T[]) => void;

const useDebounce = <T>(callback: Callback<T>, delay: number) => {
  const timeoutId = useRef<ReturnType<typeof setTimeout>>(undefined);
  const callbackRef = useRef<Callback<T>>(callback);

  const debouncedFunction = useCallback(
    (...args: T[]) => {
      clearTimeout(timeoutId.current);
      timeoutId.current = setTimeout(() => callbackRef.current(...args), delay);
    },
    [delay]
  );

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, []);

  return debouncedFunction;
};

export default useDebounce;
