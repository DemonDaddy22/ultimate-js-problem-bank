import ReduxProvider from '@/store/ReduxProvider';
import SearchBox from '@/components/SearchBox';
import styles from '@/styles/page.module.css';
import ErrorBoundary from '@/components/ErrorBoundary';

const Home = () => {
  return (
    <main className={styles.main}>
      <ErrorBoundary>
        <ReduxProvider>
          <SearchBox />
        </ReduxProvider>
      </ErrorBoundary>
    </main>
  );
};

export default Home;
