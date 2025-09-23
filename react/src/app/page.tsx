import TodoListWithFilter from '@/components/TodoListWithFilter';
import styles from '@/styles/page.module.css';

const Home = () => {
  return (
    <main className={styles.main}>
      <TodoListWithFilter />
    </main>
  );
};

export default Home;
