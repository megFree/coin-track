import { AppDispatch, RootState } from '@/redux/store';
import { AppField, AppFieldType, PartialRecord, AuthenticationType, ReduxUser } from '@/types';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

type AuthenticationState = Record<AuthenticationType, {
  isValid: boolean;
  errorMessage: string;
  fields: PartialRecord<AppFieldType, AppField>
}> & { 
  authenticationPageLoaded: boolean;
  me: {
    id: number | null;
    username: string | null;
  },
}

const initialState: AuthenticationState = {
  authenticationPageLoaded: false,
  me: {
    id: null,
    username: null,
  },
  singIn: {
    isValid: true,
    errorMessage: '',
    fields: {
      username: {
        value: '',
        isValid: false,
        errorMessage: '',
        isDirty: false,
      },
      password: {
        value: '',
        isValid: false,
        errorMessage: '',
        isDirty: false,
      },
    },
  },
  singUp: {
    isValid: true,
    errorMessage: '',
    fields: {
      username: {
        value: '',
        isValid: false,
        errorMessage: '',
        isDirty: false,
      },
      password: {
        value: '',
        isValid: false,
        errorMessage: '',
        isDirty: false,
      },
      password_repeat: {
        value: '',
        isValid: false,
        errorMessage: '',
        isDirty: false,
      },
    },
  }
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * Выставляет значение поля авторизации и регистрации
     * @param state
     * @param action
     */
    setAuthField(
      state,
      action: PayloadAction<{
        regType: AuthenticationType,
        fieldType: AppFieldType,
        value: any 
      }>,
    ) {
      const { payload } = action;
      const { regType, fieldType, value } = payload;
      const actualField = state[regType].fields[fieldType];
      if (actualField) {
        actualField.value = value;
        actualField.isDirty = true;
      }
    },

    /**
     * Ставит текущего пользователя
     * @param state
     * @param action
     */
    setUser(state, action: PayloadAction<ReduxUser>) {
      state.me.id = action.payload.id;
      state.me.username = action.payload.username;
    },

    /**
     * Выставляет ошибку на метод аутентификации
     * @param state 
     * @param action 
     */
    setAuthenticationMethodError(state, action: PayloadAction<{
      authenticationMethod: AuthenticationType,
      errorMessage: string,
      isValid: boolean,
    }>) {
      state[action.payload.authenticationMethod].isValid = action.payload.isValid;
      state[action.payload.authenticationMethod].errorMessage = action.payload.errorMessage;
    },

    setAuthenticationPageLoadStatus(state, action: PayloadAction<boolean>) {
      state.authenticationPageLoaded = action.payload;
    },
  },
});

export const { setAuthField, setUser, setAuthenticationMethodError, setAuthenticationPageLoadStatus } = authSlice.actions;
export default authSlice.reducer;
