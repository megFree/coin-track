import { AppDispatch, RootState } from '@/redux/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setUser, setAuthenticationMethodError } from './authSlice';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const singIn = createAsyncThunk<any, void, { state: RootState, dispatch: AppDispatch }> (
  'auth/singIn',
  async (_, { getState, dispatch }) => {
    // @todo: тут валидацию прикрутить
    const authState = getState().auth;
    const username = authState.singIn.fields.username?.value;
    const password = authState.singIn.fields.password?.value;
    const isValid = authState.singIn.isValid;

    if (!isValid) {
      return;
    }

    try {
      // @todo: вынести прямой путь в .env
      // @todo: сделать API модуль
      const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
        credentials: 'include',
      });
      
      if (response.status === 200) {
        const responseJson = await response.json();

        dispatch(setUser({
          id: responseJson.id,
          username: responseJson.username,
        }));
      }

      if (response.status === 401) {
        dispatch(setAuthenticationMethodError({
          authenticationMethod: 'singIn',
          isValid: false,
          errorMessage: 'Никнейм или пароль введены неверно.',
        }));
      }
    } catch (e) {
      dispatch(setAuthenticationMethodError({
        authenticationMethod: 'singIn',
        isValid: true,
        errorMessage: 'Что-то пошло не так, попробуйте позже.',
      }))
    }
  }
);

export const signUp = createAsyncThunk<any, void, { state: RootState, dispatch: AppDispatch }>(
  'auth/signUp',
  async(_, {getState,dispatch}) => {
    const authState = getState().auth;
    const username = authState.singUp.fields.username?.value;
    const password = authState.singUp.fields.password?.value;
    const isValid = authState.singUp.isValid;

    if (!isValid) {
      return;
    }

    try {
      // @todo: вынести прямой путь в .env
      // @todo: сделать API модуль
      const response = await fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
        credentials: 'include',
      });
      
      if (response.status === 200) {
        const responseJson = await response.json();

        dispatch(setUser({
          id: responseJson.id,
          username: responseJson.username,
        }));
      }

      if (response.status === 401) {
        dispatch(setAuthenticationMethodError({
          authenticationMethod: 'singIn',
          isValid: false,
          errorMessage: 'Никнейм или пароль введены неверно.',
        }));
      }
    } catch (e) {
      dispatch(setAuthenticationMethodError({
        authenticationMethod: 'singIn',
        isValid: true,
        errorMessage: 'Что-то пошло не так, попробуйте позже.',
      }))
    }
  }
)

export const getMe = createAsyncThunk(
  'auth/getMe',
  async (_, { dispatch }) => {
    try {
      const response = await fetch(`${apiUrl}/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (response.status === 200) {
        const responseJson = await response.json();
        dispatch(setUser({
          id: responseJson.id,
          username: responseJson.username,
        }));
      }
    } catch(e) {
      console.error('Ошибка при запросе текущего пользователя');
    }
  }
);
