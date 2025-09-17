/**
 * Problem link - https://bigfrontend.dev/react/usePrevious
 */

import { useEffect, useRef } from 'react';

export function usePrevious<T>(value: T): T | undefined {
  const prevRef = useRef<T | undefined>(undefined);

  useEffect(() => {
    prevRef.current = value;
  }, [value]);

  return prevRef.current;
}
