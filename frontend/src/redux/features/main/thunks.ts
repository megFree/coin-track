import { AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';
import { getMe } from '../auth/thunks';
import { setAccounts, setCurrencies, setLoaded } from './mainSlice';
import { APIAccount, Currency, ThunkContext } from '@/types';
import { debounce } from 'lodash';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const init = createAsyncThunk<any, void, ThunkContext>(
  'main/init',
  async (_, { dispatch }) => {
    await dispatch(getMe());
    dispatch(setLoaded(true));
  }
)

const getAccountsHandler: AsyncThunkPayloadCreator<any, any> = async (_, { dispatch }) => {
  try {
    const response = await fetch(`${apiUrl}/accounts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    });

    if (response.status === 200) {
      const responseJson = await response.json();
      dispatch(setAccounts(responseJson));
    }
  } catch(e) {
    console.error('Ошибка при запросе за счетами');
  }
}

const debouncedGetAccoundsHandler = debounce(getAccountsHandler);

export const getAccounts = createAsyncThunk<any, void, ThunkContext>(
  'main/getAccounts', 
  debouncedGetAccoundsHandler,
);

export const getCurrencies = createAsyncThunk<any, void, ThunkContext>(
  'main/getCurrencies',
  async (_, { dispatch }) => {
    try {
      const response = await fetch(`${apiUrl}/currencies`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (response.status === 200) {
        const responseJson = await response.json();
        dispatch(setCurrencies(responseJson));
      }
    } catch(e) {
      console.error('Ошибка при запросе за валютами');
    }
  },
);

export const createAccount = createAsyncThunk<
  any, 
  { title: string; amount: number; currency: Currency }, 
  ThunkContext
>(
  'main/createAccount',
  async (payload) => {
    try {
      await fetch(`${apiUrl}/createAccount`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: payload.title,
          amount: payload.amount,
          currency: payload.currency,
        }),
        credentials: 'include'
      });
    } catch(e) {
      console.error('Ошибка при создании счёта');
    }
  }
)

interface DeleteAccountParams {
  id: number;
}

const deleteAccountHandler: AsyncThunkPayloadCreator<any, DeleteAccountParams> = async (payload) => {
  try {
    await fetch(`${apiUrl}/deleteAccount`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: payload.id
      }),
      credentials: 'include'
    });
  } catch(e) {
    console.error('Ошибка при удалении счёта');
  }
};

export const deleteAccount = createAsyncThunk
  <any, DeleteAccountParams, ThunkContext>(
    'main/deleteAccount', deleteAccountHandler
);

export const updateAccount = createAsyncThunk<any, APIAccount, ThunkContext>(
  'main/updateAccount',
  async (payload) => {
    try {
      await fetch(`${apiUrl}/updateAccount`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        credentials: 'include'
      });
    } catch(e) {
      console.error('Ошибка при обновлении счёта');
    }
  }
)
