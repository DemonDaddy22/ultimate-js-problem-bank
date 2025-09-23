/**
 * Implement a counter component that supports **increment, decrement, and reset** using a custom `useCounter` hook.
 * Bonus: Add a prop to set the step value (e.g., increment by 5).
 */

'use client';
import useCounter from '@/hooks/useCounter';
import styles from '@/styles/counter-with-hook.module.css';

const CounterWithHook: React.FC = () => {
  const { count, increment, decrement, reset } = useCounter();

  return (
    <section className={styles.container}>
      <h1 className={styles.count}>{count}</h1>
      <div className={styles.buttonsContainer}>
        <button className={styles.buttonIncrement} onClick={() => increment()}>
          Increment
        </button>
        <button className={styles.buttonIncrement} onClick={() => increment(5)}>
          Increment by 5
        </button>
        <button className={styles.buttonDecrement} onClick={() => decrement()}>
          Decrement
        </button>
        <button className={styles.buttonDecrement} onClick={() => decrement(2)}>
          Decrement by 2
        </button>
        <button className={styles.buttonReset} onClick={() => reset()}>
          Reset
        </button>
      </div>
    </section>
  );
};

export default CounterWithHook;
