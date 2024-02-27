import { FieldValidator } from '@/lib/FieldValidator';
import { AppField, AppFieldType, PartialRecord, AuthenticationType, ReduxUser } from '@/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type AuthenticationState = Record<AuthenticationType, {
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
    errorMessage: '',
    fields: {
      username: {
        value: '',
        isValid: false,
        isDirty: false,
        errors: [],
      },
      password: {
        value: '',
        isValid: false,
        errors: [],
        isDirty: false,
      },
    },
  },
  singUp: {
    errorMessage: '',
    fields: {
      username: {
        value: '',
        isValid: false,
        errors: [],
        isDirty: false,
      },
      password: {
        value: '',
        isValid: false,
        errors: [],
        isDirty: false,
      },
      password_repeat: {
        value: '',
        isValid: false,
        errors: [],
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
        value: any,
      }>,
    ) {
      const { payload } = action;
      const { regType, fieldType, value } = payload;
      const newField = {
        ...state[regType].fields[fieldType],
        value,
      } as AppField;
      const additionalValidationContext = fieldType === 'password_repeat' ? { password: state.singUp.fields.password } : undefined;
      const validatedField = FieldValidator.validate(fieldType, newField, true, additionalValidationContext);
      state[regType].fields[fieldType] = {
        ...state[regType].fields[fieldType],
        ...validatedField,
        isDirty: true,
      };
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
    }>) {
      state[action.payload.authenticationMethod].errorMessage = action.payload.errorMessage;
    },

    setAuthenticationPageLoadStatus(state, action: PayloadAction<boolean>) {
      state.authenticationPageLoaded = action.payload;
    },
  },
});

export const { setAuthField, setUser, setAuthenticationMethodError, setAuthenticationPageLoadStatus } = authSlice.actions;
export default authSlice.reducer;
