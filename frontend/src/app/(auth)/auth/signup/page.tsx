'use client';

import './page.scss';
import BaseButton from '@/components/_base/Button/Button';
import BaseInput from '@/components/_base/Input/Input';
import { setAuthField } from '@/redux/features/auth/authSlice';
import { signUp } from '@/redux/features/auth/thunks';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';

export default function SingUp() {
  const signUpState = useAppSelector((state) => state.auth.singUp);
  const passwordValue = signUpState.fields.password?.value;
  const usernameValue = signUpState.fields.username?.value;
  const repeatPasswordValue = signUpState.fields.password_repeat?.value;
  const dispatch = useAppDispatch();

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

  return (
    <div className='singup-page'>
      <form action="#">
        <div className="signup-page__inputs">
          <BaseInput 
            className="signup-page__input" 
            placeholder='Никнейм'
            initialValue={usernameValue}
            onChange={setNickname}
          />
          <BaseInput 
            className="signup-page__input" 
            type='password' 
            placeholder='Пароль'
            initialValue={passwordValue}
            onChange={setPassword}
          />
          <BaseInput 
            className="signup-page__input" 
            type='password' 
            placeholder='Повтори пароль' 
            initialValue={repeatPasswordValue}
            onChange={setRepeatedPassword}
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
            onClick={() => { dispatch(signUp()) }}
          >
            Регистрация
          </BaseButton>
        </div>
      </form>
    </div>
  );
}
