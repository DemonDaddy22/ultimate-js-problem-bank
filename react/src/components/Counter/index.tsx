/**
 * Problem link - https://bigfrontend.dev/react/The-React-Counter
 */

'use client';
import React, { useState } from 'react';
import styles from '@/styles/counter.module.css';

const Counter: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  const handleIncrement = () => {
    setCount(prevCount => prevCount + 1);
  };

  const handleDecrement = () => {
    setCount(prevCount => prevCount - 1);
  };

  return (
    <section className={styles.counterContainer}>
      <h1 className={styles.counterHeading}>{count}</h1>
      <div className={styles.buttonContainer}>
        <button onClick={handleIncrement} className={styles.buttonIncrement}>
          +
        </button>
        <button onClick={handleDecrement} className={styles.buttonDecrement}>
          -
        </button>
      </div>
    </section>
  );
};

export default React.memo(Counter);
