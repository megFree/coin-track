'use client';

import './page.scss';
import BaseButton from '@/components/_base/Button/Button';
import BaseInput from '@/components/_base/Input/Input';
import BaseNotice from '@/components/_base/Notice/Notice';
import { setAuthField, setAuthenticationMethodError } from '@/redux/features/auth/authSlice';
import { singIn } from '@/redux/features/auth/thunks';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useState } from 'react';

export default function SingIn() {
  const singInState = useAppSelector((state) => state.auth.singIn);
  const signInError = singInState.errorMessage;
  const usernameField = singInState.fields.username;
  const passwordField = singInState.fields.password;
  const dispatch = useAppDispatch();
  const [isRequestInProgress, setIsRequestInProgress] = useState(false);

  const isFormDirty = Boolean(usernameField?.isDirty || passwordField?.isDirty);
  const isFormValid = Boolean(usernameField?.isValid && passwordField?.isValid);

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
    if (!isFormValid && !isFormDirty) {
      // touch fields
      setNickname('');
      setPassword('');
      return;
    }
    setIsRequestInProgress(true);
    dispatch(setAuthenticationMethodError({ authenticationMethod:'singIn', errorMessage: '' }));
    await dispatch(singIn());
    setIsRequestInProgress(false);
  };

  return (
    <div className='singin-page'>
      {signInError && 
        <BaseNotice
          className='signin-page__error-notice'
          status='error'
        >
          {signInError}
        </BaseNotice>
      }
      <form action="#">
        <div className="singin-page__inputs">
          <BaseInput 
            className='singin-page__input'
            placeholder='Никнейм'
            initialValue={usernameField?.value}
            error={{
              isError: Boolean(!usernameField?.isValid && usernameField?.isDirty),
              messages: usernameField?.errors || [],
            }}
            onChange={(value) => { setNickname(value.toString()) }}
          />
          <BaseInput
            className='singin-page__input'
            type='password'
            placeholder='Пароль'
            initialValue={passwordField?.value}
            error={{
              isError: Boolean(!passwordField?.isValid && passwordField?.isDirty),
              messages: passwordField?.errors || []
            }}
            onChange={(value) => { setPassword(value.toString()) }}
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
            disabled={isFormDirty && !isFormValid || isRequestInProgress}
            loading={isRequestInProgress}
            onClick={() => makeSingIn()} 
          />
        </div>
      </form>
    </div>
  );
}
