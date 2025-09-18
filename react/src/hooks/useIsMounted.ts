/**
 * Problem link - https://bigfrontend.dev/react/implement-useismounted
 */

import { useEffect, useRef } from 'react';

const useIsMounted = (): (() => boolean) => {
  // your code here
  const isMounted = useRef<boolean>(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  return () => isMounted.current;
};

export default useIsMounted;
