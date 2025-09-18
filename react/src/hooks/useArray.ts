/**
 * Problem link - https://bigfrontend.dev/react/useArray
 */

import { useCallback, useState } from 'react';

type UseArrayActions<T> = {
  push: (item: T) => void;
  removeByIndex: (index: number) => void;
};

export function useArray<T>(initialValue: T[]): { value: T[] } & UseArrayActions<T> {
  const [value, setValue] = useState<Array<T>>(initialValue);

  const push = useCallback((item: T) => {
    setValue(prevValue => [...prevValue, item]);
  }, []);

  const removeByIndex = useCallback((index: number) => {
    setValue(prevValue => {
      return [...prevValue.slice(0, index), ...prevValue.slice(index + 1)];
    });
  }, []);

  return {
    value,
    push,
    removeByIndex,
  };
}
