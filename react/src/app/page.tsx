import ReduxProvider from '@/store/ReduxProvider';
import GreetingModal from '@/components/Modal/GreetingModal';
import styles from '@/styles/page.module.css';
import ErrorBoundary from '@/components/ErrorBoundary';

const Home = () => {
  return (
    <main className={styles.main}>
      <ErrorBoundary>
        <ReduxProvider>
          <GreetingModal />
        </ReduxProvider>
      </ErrorBoundary>
    </main>
  );
};

export default Home;
