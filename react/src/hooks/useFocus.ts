/**
 * Problem link - https://bigfrontend.dev/react/useFocus
 */

import { useState, useRef, useCallback, Ref } from 'react';

const useFocus = <T extends HTMLElement>(): [Ref<T>, boolean] => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const element = useRef<T | null>(null);

  const setInFocus = () => setIsFocused(true);

  const setNotInFocus = () => setIsFocused(false);

  const addListeners = useCallback((node: T) => {
    node.addEventListener('focus', setInFocus);
    node.addEventListener('blur', setNotInFocus);
  }, []);

  const removeListeners = useCallback((node: T) => {
    node.removeEventListener('focus', setInFocus);
    node.removeEventListener('blur', setNotInFocus);
  }, []);

  const ref = useCallback(
    (node: T) => {
      if (element.current) {
        removeListeners(element.current);
      }
      if (node) {
        addListeners(node);
      }
      element.current = node;
    },
    [addListeners, removeListeners]
  );

  return [ref, isFocused];
};

export default useFocus;
