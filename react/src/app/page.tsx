import CounterWithHook from '@/components/CounterWithHook';
import styles from '@/styles/page.module.css';

const Home = () => {
  return (
    <main className={styles.main}>
      <CounterWithHook />
    </main>
  );
};

export default Home;
