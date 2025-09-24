import { useCallback, useEffect, useReducer, useRef } from 'react';

type State<T, E> = {
  data: T;
  error: E;
  loading: boolean;
};

type Action<T, E> =
  | { type: 'SET_DATA'; payload: T }
  | { type: 'SET_ERROR'; payload: E }
  | { type: 'SET_LOADING'; payload: boolean };

const reducer = <T, E>(state: State<T, E>, action: Action<T, E>) => {
  switch (action.type) {
    case 'SET_DATA':
      return {
        ...state,
        data: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

const initialState = <T, E>(): State<T | null, E | null> => ({
  data: null,
  error: null,
  loading: false,
});

const useFetch = <T, E extends Error = Error>(
  endpoint: string,
  options: RequestInit = {},
  useAbort: boolean = true
) => {
  const abortControllerRef = useRef<AbortController | null>(null);

  const [state, dispatch] = useReducer(reducer<T | null, E | null>, initialState<T, E>());

  const fetchResponse = useCallback(async () => {
    if (useAbort && abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    if (useAbort) {
      abortControllerRef.current = new AbortController();
    }
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await fetch(endpoint, {
        ...options,
        ...(useAbort && { signal: abortControllerRef.current?.signal }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`) as E;
      }

      const results = await response.json();
      dispatch({ type: 'SET_DATA', payload: results });
      dispatch({ type: 'SET_ERROR', payload: null });
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        return; // ignore aborts
      }
      dispatch({ type: 'SET_ERROR', payload: err as E });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [endpoint, options, useAbort]);

  useEffect(() => {
    fetchResponse();

    return () => {
      if (useAbort && abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchResponse, useAbort]);

  return { ...state, refetch: fetchResponse };
};

export default useFetch;
