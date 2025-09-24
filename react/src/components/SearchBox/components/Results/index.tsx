import styles from '@/styles/search-box.module.css';

type SearchResultsProps = {
  results: Array<Product>;
};

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  return results.length ? (
    <div className={styles.results}>
      {results.map(result => (
        <p key={result.id} className={styles.result}>
          {result.title}
        </p>
      ))}
    </div>
  ) : null;
};

export default SearchResults;
