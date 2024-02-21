import { APIAccount } from '@/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type MainState = {
  loaded: boolean;
  accounts: APIAccount[];
  currencies: string[];
};

const initialState: MainState = {
  loaded: false,
  accounts: [],
  currencies: [],
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setLoaded(state, action: PayloadAction<boolean>) {
      state.loaded = action.payload;
    },
    setAccounts(state, action: PayloadAction<APIAccount[]>) {
      state.accounts = action.payload;
    },
    setCurrencies(state, action: PayloadAction<string[]>) {
      state.currencies = action.payload;
    }
  },
});

export const { setLoaded, setAccounts, setCurrencies } = mainSlice.actions;
export default mainSlice.reducer;
