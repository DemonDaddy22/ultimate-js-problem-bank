/**
 * Problem link - https://bigfrontend.dev/react/useclickoutside
 */

import { RefObject, useEffect, useRef } from 'react';

const useClickOutside = (callback: () => void): RefObject<HTMLElement | null> => {
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (elementRef.current && !elementRef.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      elementRef.current = null;
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [callback]);

  return elementRef;
};

export default useClickOutside;
