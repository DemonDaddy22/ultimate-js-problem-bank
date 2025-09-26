import { lazy } from 'react';

export const lazyLoad = (path: string, namedModule?: string) => {
  return lazy(() => {
    const promise = import(path);
    if (!namedModule) {
      return promise;
    }
    return promise.then(module => ({
      default: module[namedModule],
    }));
  });
};
