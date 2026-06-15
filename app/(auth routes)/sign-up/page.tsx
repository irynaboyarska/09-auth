'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAxiosError } from 'axios';
import { register, type RegisterRequest } from '@/lib/api/clientApi';
import css from './SignUpPage.module.css';

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = async (formData: FormData) => {
    setError('');

    try {
      const formValues: RegisterRequest = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      };
      await register(formValues);
      router.push('/profile');
    } catch (err) {
      if (isAxiosError(err)) {
        setError(err.response?.data?.error ?? err.message);
        return;
      }

      setError('Oops... some error');
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>

      <form action={handleSubmit} className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" className={css.input} required />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" className={css.input} required />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}
