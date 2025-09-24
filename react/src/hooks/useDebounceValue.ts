/**
 * Problem link - https://bigfrontend.dev/react/useDebounce
 */

import { useRef, useState, useEffect } from 'react';

const useDebounceValue = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const timeoutRef = useRef<NodeJS.Timeout>(undefined);

  useEffect(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeoutRef.current);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounceValue;
