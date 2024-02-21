'use client';

import './page.scss';
import BaseButton from '@/components/_base/Button/Button';
import BaseInput from '@/components/_base/Input/Input';
import { setAuthField } from '@/redux/features/auth/authSlice';
import { singIn } from '@/redux/features/auth/thunks';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';

export default function SingIn() {
  const me = useAppSelector((state) => state.auth.me);
  const singInState = useAppSelector((state) => state.auth.singIn);
  const passwordValue = singInState.fields.password?.value;
  const usernameValue = singInState.fields.username?.value;
  const router = useRouter();
  const dispatch = useAppDispatch();

  const setNickname = (value: string) => {
    dispatch(setAuthField({
      regType: 'singIn',
      fieldType: 'username',
      value,
    }));
  };

  const setPassword = (value: string) => {
    dispatch(setAuthField({
      regType: 'singIn',
      fieldType: 'password',
      value,
    }));
  };

  const makeSingIn = async () => {
    await dispatch(singIn());
  };

  return (
    <div className='singin-page'>
      <form action="#">
        <div className="singin-page__inputs">
          <BaseInput 
            className='singin-page__input'
            placeholder='Никнейм'
            initialValue={usernameValue}
            onChange={(value) => { setNickname(value) }}
          />
          <BaseInput
            className='singin-page__input'
            type='password'
            placeholder='Пароль'
            initialValue={passwordValue}
            onChange={(value) => { setPassword(value) }}
          />
        </div>
        <div className="signin-page__buttons">
          <BaseButton 
            className='signin-page__button' 
            href='/auth'
            size='small'
          >
            Назад
          </BaseButton>
          <BaseButton 
            className='signin-page__button'
            size='small'
            submit={{
              isSubmit: true,
              value: 'Войти',
            }}
            onClick={() => makeSingIn()} 
          >
            Войти
          </BaseButton>
        </div>
      </form>
    </div>
  );
}
