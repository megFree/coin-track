'use client';

import './page.scss';
import BaseButton from '@/components/_base/Button/Button';
import BaseInput from '@/components/_base/Input/Input';
import BaseNotice from '@/components/_base/Notice/Notice';
import { setAuthField, setAuthenticationMethodError } from '@/redux/features/auth/authSlice';
import { signUp } from '@/redux/features/auth/thunks';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { useState } from 'react';

export default function SingUp() {
  const signUpState = useAppSelector((state) => state.auth.singUp);
  const passwordField = signUpState.fields.password;
  const usernameField = signUpState.fields.username;
  const repeatPasswordField = signUpState.fields.password_repeat;
  const signUpError = signUpState.errorMessage;
  const dispatch = useAppDispatch();
  const [isRequesting, setIsRequesting] = useState(false);

  const isFormValid = passwordField?.isValid && usernameField?.isValid && repeatPasswordField?.isValid;
  const isFormDirty = passwordField?.isDirty || usernameField?.isDirty || repeatPasswordField?.isDirty;

  const setNickname = (value: string) => {
    dispatch(setAuthField({
      regType: 'singUp',
      fieldType: 'username',
      value,
    }));
  };

  const setPassword = (value: string) => {
    dispatch(setAuthField({
      regType: 'singUp',
      fieldType: 'password',
      value,
    }));
  };

  const setRepeatedPassword = (value: string) => {
    dispatch(setAuthField({
      regType: 'singUp',
      fieldType: 'password_repeat',
      value,
    }));
  };

  const makeSignUp = async () => {
    if (!isFormDirty && !isFormValid) {
      // touch form
      setNickname('');
      setPassword('');
      setRepeatedPassword('');
      return;
    }
    setIsRequesting(true);
    dispatch(setAuthenticationMethodError({ authenticationMethod: 'singUp', errorMessage: '' }));
    await dispatch(signUp());
    setIsRequesting(false);
  }

  return (
    <div className='singup-page'>
      {signUpError && 
        <BaseNotice
          className='signup-page__error-notice'
          status='error'
        >
          {signUpError}
        </BaseNotice>
      }
      <form action="#">
        <div className="signup-page__inputs">
          <BaseInput 
            className="signup-page__input" 
            placeholder='Никнейм'
            initialValue={usernameField?.value}
            error={{
              isError: Boolean(!usernameField?.isValid && usernameField?.isDirty),
              messages: usernameField?.errors,
            }}
            onChange={(value) => setNickname(value.toString())}
          />
          <BaseInput 
            className="signup-page__input" 
            type='password' 
            placeholder='Пароль'
            initialValue={passwordField?.value}
            error={{
              isError: Boolean(!passwordField?.isValid && passwordField?.isDirty),
              messages: passwordField?.errors,
            }}
            onChange={(value) => setPassword(value.toString())}
          />
          <BaseInput 
            className="signup-page__input" 
            type='password' 
            placeholder='Повтори пароль' 
            initialValue={repeatPasswordField?.value}
            error={{
              isError: Boolean(!repeatPasswordField?.isValid && repeatPasswordField?.isDirty),
              messages: repeatPasswordField?.errors,
            }}
            onChange={(value) => setRepeatedPassword(value.toString())}
          />
        </div>
        <div className="signup-page__buttons">
          <BaseButton 
            className="signup-page__button" 
            href='/auth'
            size='small'
          >
            Назад
          </BaseButton>
          <BaseButton 
            className="signup-page__button" 
            size='small'
            onClick={makeSignUp}
            disabled={!isFormValid && isFormDirty || isRequesting}
            loading={isRequesting}
          >
            Регистрация
          </BaseButton>
        </div>
      </form>
    </div>
  );
}
