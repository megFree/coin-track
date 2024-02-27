import { AppField, AppFieldType, PartialRecord } from '@/types';
import { CURRENCIES } from './const';

export class FieldValidator {
  public static validate<T extends AppField>(
    type: AppFieldType, 
    field: T, 
    required: boolean = false,
    additionalContext?: PartialRecord<AppFieldType, T>,
  ): T {
    if (required && !field.value) {
      return {
        ...field,
        isValid: false,
        errorMessage: 'Заполните поле',
        errors: ['Заполните поле'],
      };
    }

    switch(type) {
      case 'account_sum':
        return FieldValidator.validateAccountSum(field);
      case 'account_title':
        return FieldValidator.validateAccountTitle(field);
      case 'currency':
        return FieldValidator.validateCurrency(field);
      case 'password':
        return FieldValidator.validatePassword(field);
      case 'password_repeat':
        return FieldValidator.validateRepeatedPassword(field, additionalContext?.password);
      case 'username':
        return FieldValidator.validateUsername(field);
      default:
        return field;
    }
  }

  private static validateAccountSum<T extends AppField>(field: T): T {
    let isValid = true;
    let errorMessage = '';
    const errors: string[] = [];

    const isNegative = Number(field.value) < 0;
    if (isNegative) {
      isValid = false;

      const error = 'Отрицательное значение невозможно'
      errorMessage = error;
      errors.push(error);
    }
    return {
      ...field,
      isValid,
      errorMessage,
      errors,
    };
  }

  private static validateAccountTitle<T extends AppField>(field: T): T {
    let isValid = true;
    let errorMessage = '';
    const errors: string[] = [];

    const maxLength = 100;
    if (field.value.length > maxLength) {
      isValid = false;

      const error = 'Слишком длинное название счёта';
      errorMessage = error;
      errors.push(error);
    }
    return {
      ...field,
      isValid,
      errorMessage,
      errors,
    };
  }

  private static validateCurrency<T extends AppField>(field: T): T {
    let isValid = true;
    let errorMessage = '';
    const errors: string[] = [];

    const found = !!CURRENCIES.find((currency) => currency === field.value.toUpperCase());
    if (!found) {
      isValid = false;

      const error = 'Недоступная валюта'
      errorMessage = error;
      errors.push(error);
    }
    return {
      ...field,
      isValid,
      errorMessage,
      errors,
    };
  }

  private static validatePassword<T extends AppField>(field: T): T {
    let isValid = true;
    let errorMessage = '';
    const errors: string[] = [];

    const hasSpaces = field.value.indexOf(' ') >= 0;
    if (hasSpaces) {
      isValid = false;

      const error = 'Недопустимые символы'
      errorMessage = error;
      errors.push(error);
    }

    const minLength = 6;
    const tooShort = field.value.length < minLength;
    if (tooShort) {
      isValid = false;

      const error = 'Пароль слишком короткий';
      errorMessage = error;
      errors.push(error);
    }

    const maxLength = 50;
    const tooLong = field.value.length > maxLength;
    if (tooLong) {
      isValid = false;

      const error = 'Пароль слишком длинный';
      errorMessage = error;
      errors.push(error);
    }

    return {
      ...field,
      isValid,
      errorMessage,
      errors,
    };
  }

  private static validateRepeatedPassword<T extends AppField>(field: T, original?: T): T {
    let isValid = true;
    let errorMessage = '';
    const errors: string[] = [];

    if (!original?.value || field.value !== original.value) {
      isValid = false;

      const error = 'Пароль не совпадают';
      errorMessage = error;
      errors.push(error);
    }

    return {
      ...field,
      isValid,
      errorMessage,
      errors,
    };
  }

  private static validateUsername<T extends AppField>(field: T): T {
    let isValid = true;
    let errorMessage = '';
    const errors: string[] = [];

    const minLength = 3;
    if (field.value.length < minLength) {
      isValid = false;

      const error = 'Слишком короткое имя пользователя';
      errorMessage = error;
      errors.push(error);
    }

    const maxLength = 30;
    if (field.value.length > maxLength) {
      isValid = false;

      const error = 'Слишком длинное имя пользователя';
      errorMessage = error;
      errors.push(error);
    }

    const onlyEnglishSymbols = /^[a-z0-9]*$/i;
    if (!onlyEnglishSymbols.test(field.value)) {
      isValid = false;

      const error = 'Недопустимые символы. Разрешены только цифры и английские буквы';
      errorMessage = error;
      errors.push(error);
    }

    return {
      ...field,
      isValid,
      errorMessage,
      errors,
    };
  }
}