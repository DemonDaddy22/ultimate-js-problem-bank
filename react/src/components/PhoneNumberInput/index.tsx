/**
 * Problem link - https://bigfrontend.dev/react/The-React-Counter
 */

'use client';
import React, { ChangeEvent, useState } from 'react';
import styles from '@/styles/phone-number-input.module.css';

const NON_DIGIT_CHARS_REGEX = /\D/g;

const MAX_LEN = 10;

const PhoneNumberInput: React.FC = () => {
  // your code here
  const [phone, setPhone] = useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const currValue = event.currentTarget.value.replace(NON_DIGIT_CHARS_REGEX, '');

    if (currValue.length > MAX_LEN) {
      return;
    }

    let valueToSet = '';
    if (currValue.length < 4) {
      valueToSet = currValue;
    } else if (currValue.length >= 4 && currValue.length <= 6) {
      valueToSet = `(${currValue.slice(0, 3)})${currValue.slice(3)}`;
    } else if (currValue.length > 6) {
      valueToSet = `(${currValue.slice(0, 3)})${currValue.slice(3, 6)}-${currValue.slice(6)}`;
    }
    setPhone(valueToSet);
    // bring cursor to the end of input
    inputRef.current?.setSelectionRange(valueToSet.length, valueToSet.length);
  };

  return (
    <section className={styles.inputContainer}>
      <input
        ref={inputRef}
        value={phone}
        type='text'
        pattern='[0-9]*'
        maxLength={13}
        data-testid='phone-number-input'
        onChange={handleInputChange}
        className={styles.input}
      />
    </section>
  );
};

export default React.memo(PhoneNumberInput);
