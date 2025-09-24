/**
 * Build a search input that fetches results from an API but only triggers the request after the user **stops typing for 500ms**.
 * Bonus: Cancel previous API calls when typing continues.
 * Bonus: Render the results.
 */

'use client';

import { ChangeEvent, FormEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { debounce } from 'lodash';
import styles from '@/styles/search-box.module.css';
import SearchResults from './components/Results';

const API_URL = 'https://dummyjson.com/products/search?q=';

const SearchBox: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [data, setData] = useState<Array<unknown>>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchResults = useCallback(async (searchQuery: string) => {
    if (abortControllerRef.current) {
      // if there's an ongoing request, cancel it
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}${searchQuery.trim()}`, {
        signal: abortControllerRef.current.signal,
      });
      const results = await response.json();
      setData(results.products ?? ([] as Array<Product>));
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  // memoise else it will be re-created on every re-render
  const debouncedFetchResults = useMemo(() => {
    return debounce(fetchResults, 500, { leading: false, trailing: true });
  }, [fetchResults]);

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const queryValue = event.currentTarget.value;
    setQuery(queryValue);
    debouncedFetchResults(queryValue);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    debouncedFetchResults.cancel();
    fetchResults(query);
    setQuery('');
  };

  useEffect(() => {
    return () => {
      debouncedFetchResults.cancel();
    };
  }, [debouncedFetchResults]);

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input type='text' name='search-box' value={query} className={styles.input} onChange={handleQueryChange} />
      {error ? <h3 className={styles.error}>Something went wrong. Please try searching for something else</h3> : null}
      <SearchResults results={data as Array<Product>} />
    </form>
  );
};

export default SearchBox;
