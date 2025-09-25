import InfiniteScrolling from '@/components/InfiniteScrolling';
import ReduxProvider from '@/store/ReduxProvider';
import styles from '@/styles/page.module.css';

const Home = () => {
  return (
    <main className={styles.main}>
      <ReduxProvider>
        <InfiniteScrolling />
      </ReduxProvider>
    </main>
  );
};

export default Home;
