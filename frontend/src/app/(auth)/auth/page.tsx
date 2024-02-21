'use client';

import './page.scss';
import BaseButton from '@/components/_base/Button/Button';
import { useRouter } from 'next/navigation';

export default function Auth() {
  const router = useRouter();

  return (
    <main className="auth-page">
      <div className="auth-page__buttons">
        <BaseButton 
          className='auth-page__button' 
          size='large' 
          href='/auth/signin'
        >
          Авторизация
        </BaseButton>
        <BaseButton 
          className='auth-page__button' 
          size='large' 
          href='/auth/signup'
        >
          Регистрация
        </BaseButton>
      </div>
    </main>
  );
}
