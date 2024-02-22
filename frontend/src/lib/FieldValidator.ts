import { AppField, AppFieldType } from '@/types';
import { CURRENCIES } from './const';

export class FieldValidator {
  public static validate<T extends AppField>(type: AppFieldType, field: T, required: boolean = false): T {
    if (required && !field.value) {
      return {
        ...field,
        isValid: false,
        errorMessage: 'Заполните поле',
      };
    }

    switch(type) {
      case 'account_sum':
        return FieldValidator.validateAccountSum(field);
      case 'account_title':
        return FieldValidator.validateAccountTitle(field);
      case 'currency':
        return FieldValidator.validateCurrency(field);
      default:
        return field;
    }
  }

  private static validateAccountSum<T extends AppField>(field: T): T {
    let isValid = true;
    let errorMessage = '';
    const isNegative = Number(field.value) < 0;
    if (isNegative) {
      isValid = false;
      errorMessage = 'Отрицательное значение невозможно';
    }
    return {
      ...field,
      isValid,
      errorMessage,
    };
  }

  private static validateAccountTitle<T extends AppField>(field: T): T {
    let isValid = true;
    let errorMessage = '';
    const maxLength = 100;
    if (field.value.length > maxLength) {
      isValid = false;
      errorMessage = 'Слишком длинное название счёта';
    }
    return {
      ...field,
      isValid,
      errorMessage,
    };
  }

  private static validateCurrency<T extends AppField>(field: T): T {
    let isValid = true;
    let errorMessage = '';
    const found = !!CURRENCIES.find((currency) => currency === field.value.toUpperCase());
    if (!found) {
      isValid = false;
      errorMessage = 'Недоступная валюта';
    }
    return {
      ...field,
      isValid,
      errorMessage,
    };
  }
}