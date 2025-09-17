/**
 * Problem link - https://bigfrontend.dev/react/useIsFirstRender
 */

import { useRef, useEffect } from 'react';

export function useIsFirstRender(): boolean {
  const renderRef = useRef<boolean>(true);

  useEffect(() => {
    renderRef.current = false;
  }, []);

  return renderRef.current;
}
