/**
 * Build a signup form with inputs for email, password, and confirm password.
 * Validate email format and matching passwords.
 * Disable submit until valid.
 */

'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import styles from '@/styles/form-validation.module.css';

type FormInput = 'email' | 'password' | 'confirm-password';

type FormError = {
  email: string | null;
  password: string | null;
  confirmPassword: string | null;
};

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const FormValidation: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<FormError>({
    email: null,
    password: null,
    confirmPassword: null,
  });

  const checkFormValidity = () => {
    if (EMAIL_REGEX.test(email) && password && password === confirmPassword) {
      return true;
    }
    return false;
  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (checkFormValidity()) {
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setError({
        email: null,
        password: null,
        confirmPassword: null,
      });
    } else {
      setError({
        email: EMAIL_REGEX.test(email) ? '' : 'Email is invalid',
        password: password && password === confirmPassword ? '' : 'Password is invalid',
        confirmPassword: confirmPassword && password === confirmPassword ? '' : 'Password does not match',
      });
    }
  };

  const handleFormInputChange = (event: ChangeEvent<HTMLInputElement>, type: FormInput) => {
    const value = event.currentTarget.value;
    switch (type) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'confirm-password':
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  // remove the disable prop from button for error validations to work
  return (
    <form onSubmit={handleFormSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor='email' className={styles.formLabel}>
          Email
        </label>
        <input
          id='email'
          name='email'
          type='email'
          value={email}
          className={styles.formInput}
          onChange={e => handleFormInputChange(e, 'email')}
          required
        />
        <p className={error.email ? styles.errorVisible : styles.error}>{error.email}</p>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor='password' className={styles.formLabel}>
          Password
        </label>
        <input
          id='password'
          name='password'
          type='password'
          value={password}
          className={styles.formInput}
          onChange={e => handleFormInputChange(e, 'password')}
          required
        />
        <p className={error.password ? styles.errorVisible : styles.error}>{error.password}</p>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor='confirm-password' className={styles.formLabel}>
          Confirm Password
        </label>
        <input
          id='confirm-password'
          name='confirm-password'
          type='password'
          value={confirmPassword}
          className={styles.formInput}
          onChange={e => handleFormInputChange(e, 'confirm-password')}
          required
        />
        <p className={error.confirmPassword ? styles.errorVisible : styles.error}>{error.confirmPassword}</p>
      </div>
      <button disabled={!checkFormValidity()} className={styles.formButton} onClick={handleFormSubmit}>
        Submit
      </button>
    </form>
  );
};

export default FormValidation;
