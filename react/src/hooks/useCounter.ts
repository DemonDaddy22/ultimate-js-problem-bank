import { useState } from 'react';

const useCounter = (initial: number = 0, step: number = 1) => {
  const [count, setCount] = useState<number>(initial);

  const updateCount = (diff: number) => {
    setCount(prev => prev + diff);
  };

  const handleIncrement = (customStep: number = step) => {
    updateCount(customStep);
  };

  const handleDecrement = (customStep: number = step) => {
    updateCount(-customStep);
  };

  const handleReset = (resetTo: number = initial) => {
    setCount(resetTo);
  };

  return {
    count,
    increment: handleIncrement,
    decrement: handleDecrement,
    reset: handleReset,
  };
};

export default useCounter;
