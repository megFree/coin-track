import { CurrencyType } from 'src/_utils/types';

export interface AccountDto {
  id?: number;
  title?: string;
  amount?: number;
  user?: number;
  currency?: CurrencyType;
  uin?: number;
}
