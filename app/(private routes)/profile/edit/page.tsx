'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { isAxiosError } from 'axios';
import { updateMe, type UpdateMeRequest } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import css from './EditProfilePage.module.css';

export default function EditProfilePage() {
  const router = useRouter();
  const user = useAuthStore(state => state.user);
  const setUser = useAuthStore(state => state.setUser);
  const [username, setUsername] = useState(user?.username ?? '');
  const [error, setError] = useState('');

  const handleSubmit = async (formData: FormData) => {
    setError('');

    try {
      const formValues: UpdateMeRequest = {
        username: formData.get('username') as string,
      };

      const updatedUser = await updateMe(formValues);
      setUser(updatedUser);
      router.push('/profile');
    } catch (err) {
      if (isAxiosError(err)) {
        setError(err.response?.data?.error ?? err.message);
        return;
      }

      setError('Oops... some error');
    }
  };

  const handleCancel = () => {
    router.push('/profile');
  };

  if (!user) {
    return null;
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>
        <Image
          src={user.avatar}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />
        <form action={handleSubmit} className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              name="username"
              type="text"
              className={css.input}
              value={username}
              onChange={event => setUsername(event.target.value)}
              required
            />
          </div>
          <p>Email: {user.email}</p>
          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button type="button" className={css.cancelButton} onClick={handleCancel}>
              Cancel
            </button>
          </div>
          {error && <p>{error}</p>}
        </form>
      </div>
    </main>
  );
}
