/**
 * Problem link - https://bigfrontend.dev/react/useHover
 */

import { Ref, useCallback, useState, useRef } from 'react';

const useHover = <T extends HTMLElement>(): [Ref<T>, boolean] => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const element = useRef<T | null>(null);

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => setIsHovered(false);

  const addEventListeners = useCallback((node: T) => {
    node.addEventListener('mouseenter', handleMouseEnter);
    node.addEventListener('mouseleave', handleMouseLeave);
  }, []);

  const removeEventListeners = useCallback((node: T) => {
    node.removeEventListener('mouseenter', handleMouseEnter);
    node.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  const ref = useCallback(
    (node: T) => {
      // if ref.current changes, remove event listeners from the old element
      if (element.current) {
        removeEventListeners(element.current);
      }
      // add event listeners to the new element
      if (node) {
        addEventListeners(node);
      }
      element.current = node;
    },
    [addEventListeners, removeEventListeners]
  );

  return [ref, isHovered];
};

export default useHover;
