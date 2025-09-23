import { useEffect, useRef } from 'react';

type StorageType = 'local' | 'session';

const useStorage = <T>(storage: StorageType = 'local') => {
  const store = useRef<Storage | null>(null);

  useEffect(() => {
    store.current = storage === 'session' ? window.sessionStorage : window.localStorage;
  }, [storage]);

  const handleGetItem = (key: string) => {
    try {
      const item = store.current?.getItem(key);
      return JSON.parse(item ?? 'null');
    } catch (error) {
      return null;
    }
  };

  const handleAddItem = (key: string, value: T) => {
    try {
      const item = JSON.stringify(value);
      store.current?.setItem(key, item);
    } catch (error) {
      // do nothing for now
    }
  };

  const handleRemoveItem = (key: string) => {
    try {
      store.current?.removeItem(key);
    } catch (error) {
      // do nothing for now
    }
  };

  return {
    getItem: handleGetItem,
    setItem: handleAddItem,
    removeItem: handleRemoveItem,
    size: store.current?.length ?? 0,
  };
};

export default useStorage;
