import ReduxProvider from '@/store/ReduxProvider';
import SearchBox from '@/components/SearchBox';
import styles from '@/styles/page.module.css';

const Home = () => {
  return (
    <main className={styles.main}>
      <ReduxProvider>
        <SearchBox />
      </ReduxProvider>
    </main>
  );
};

export default Home;
