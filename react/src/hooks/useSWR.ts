/**
 * Problem link - https://bigfrontend.dev/react/useSWR-1
 */

import { Reducer, useCallback, useEffect, useReducer, useRef } from 'react';

type State<T, E> = {
  [key: string]: Partial<Response<T, E>>;
};

type Action<T, E> = {
  key: string;
} & ({ actionType: 'SET_DATA'; data: T } | { actionType: 'SET_ERROR'; error: E });

type Response<T, E> = {
  data: T;
  error: E;
};

const reducer = <T, E>(state: Partial<State<T, E>>, action: Action<T, E>): Partial<State<T, E>> => {
  switch (action.actionType) {
    case 'SET_DATA':
      return {
        ...state,
        [action.key]: { data: action.data },
      };
    case 'SET_ERROR':
      return {
        ...state,
        [action.key]: { error: action.error },
      };
    default:
      return state;
  }
};

const useSWR = <T, E>(_key: string, fetcher: () => T | Promise<T>): Partial<Response<T, E>> => {
  const typedReducer: Reducer<Partial<State<T, E>>, Action<T, E>> = reducer;
  const [state, dispatch] = useReducer(typedReducer, {});

  const fetcherResponseRef = useRef<T | Promise<T>>(fetcher());
  const isFetcherResponsePromise = fetcherResponseRef.current instanceof Promise;

  const executeFetcher = useCallback(async () => {
    try {
      const data = await fetcherResponseRef.current;
      dispatch({ actionType: 'SET_DATA', key: _key, data });
    } catch (error) {
      dispatch({ actionType: 'SET_ERROR', key: _key, error: error as E });
    }
  }, [_key]);

  useEffect(() => {
    if (isFetcherResponsePromise) {
      executeFetcher();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [executeFetcher]);

  return isFetcherResponsePromise ? { ...state[_key] } : { data: fetcherResponseRef.current as T };
};

export default useSWR;
