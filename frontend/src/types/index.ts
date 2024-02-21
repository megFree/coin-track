import { AppDispatch, RootState } from '@/redux/store';

export type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T;
};

export type AuthenticationType = 'singIn' | 'singUp';

export type Currency = 'RUB' | 'USD' | 'EUR';

export type AppFieldType = 'username' | 'password' | 'password_repeat';

export interface AppField {
  value: string;
  isValid: boolean;
  errorMessage: string;
  isDirty: boolean;
}

export interface ReduxUser {
  id: number;
  username: string;
}

export interface APIAccount {
  id?: number;
  user?: number;
  currency?: Currency;
  amount?: number;
  title?: string;
  uin?: number;
}

export interface ThunkContext { 
  state: RootState;
  dispatch: AppDispatch;
}
