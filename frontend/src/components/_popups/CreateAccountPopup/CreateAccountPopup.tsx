import './CreateAccountPopup.scss';
import BaseButton from '@/components/_base/Button/Button';
import BaseInput from '@/components/_base/Input/Input';
import BaseSelect, { SelectOption } from '@/components/_base/Select/Select';
import { nanoid } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { popupClose } from '@/redux/features/popups/popupsSlice';
import { useEffect, useState } from 'react';
import { createAccount, getAccounts, getCurrencies } from '@/redux/features/main/thunks';
import { AppField, AppFieldType, PartialRecord } from '@/types';
import { FieldValidator } from '@/lib/FieldValidator';

interface TypedAppField extends AppField {
  type: AppFieldType,
}

export default function CreateAccountPopup() {
  const dispatch = useAppDispatch();

  const [isRequesting, setIsRequesting] = useState(false);

  const currencies = useAppSelector((state) => state.main.currencies);

  const [accountTitleField, setAccountTitleField] = useState<TypedAppField>({
    value: '',
    isValid: false,
    isDirty: false,
    errorMessage: '',
    type: 'account_title',
  });
  const [accountSumField, setAccountSumField] = useState<TypedAppField>({
    value: null,
    isValid: false,
    isDirty: false,
    errorMessage: '',
    type: 'account_sum',
  });
  const [currencyField, setCurrencyField] = useState<TypedAppField>({
    value: null,
    isValid: false,
    isDirty: false,
    errorMessage: '',
    type: 'currency',
  });

  useEffect(() => {
    dispatch(getCurrencies());
  }, []);

  const fields = [
    accountTitleField,
    accountSumField,
    currencyField,
  ];

  const isFormDirty = !!fields.find((field) => field.isDirty);
  const isFormValid = !fields.find((field) => !field.isValid);
  const isAllFieldsDirty = !fields.find((field) => !field.isDirty);

  const setFieldValue = (fieldType: AppFieldType, value: any) => {
    const field = {
      ...fields.find((field) => field.type === fieldType),
      value,
      isDirty: true,
    } as TypedAppField;

    const validatedField = FieldValidator.validate(fieldType, field, true);

    switch(fieldType) {
      case 'account_title': 
        setAccountTitleField({
          ...accountTitleField,
          ...validatedField,
        });
        break;
      case 'account_sum':
        setAccountSumField({
          ...accountSumField,
          ...validatedField,
        });
        break;
      case 'currency':
        setCurrencyField({
          ...currencyField,
          ...validatedField,
        });
        break;
    }
  }

  const currenciesOptions: SelectOption[] = currencies.map((currency) => ({
    id: nanoid(),
    placeholder: currency,
  }));

  const touchAllFields = () => {
    setAccountTitleField({ 
      ...FieldValidator.validate('account_title', accountTitleField, true),
      isDirty: true,
    });
    setCurrencyField({
      ...FieldValidator.validate('currency', currencyField, true),
      isDirty: true,
    });
    setAccountSumField({
      ...FieldValidator.validate('account_sum', accountSumField, true),
      isDirty: true,
    })
  }

  const create = async () => {
    if (!isFormValid) {
      return touchAllFields();
    }
    setIsRequesting(true);
    await dispatch(createAccount({
      title: accountTitleField.value,
      amount: accountSumField.value,
      currency: currencyField.value,
    }));
    await dispatch(getAccounts());
    setIsRequesting(false);
    dispatch(popupClose());
  }

  return (
    <div className="create-account-popup">
      <div className="create-account-popup__inputs">
        <BaseInput 
          className='create-account-popup__input'
          label='Введите название счёта'
          onChange={(value) => setFieldValue('account_title', value)}
          error={{
            isError: !accountTitleField.isValid && accountTitleField.isDirty,
            message: accountTitleField.errorMessage,
          }}
        />
        <BaseSelect
          className='create-account-popup__input'
          initOptions={currenciesOptions}
          key={`force-rerender-currency-${currenciesOptions.length}`}
          onChange={(option) => setFieldValue('currency', option.placeholder)}
          label='Валюта'
          error={{
            isError: !currencyField.isValid && currencyField.isDirty,
            message: currencyField.errorMessage,
          }}
        />
        <BaseInput 
          className='create-account-popup__input'
          label='Сумма'
          type='number'
          onChange={(value) => setFieldValue('account_sum', value)}
          error={{
            isError: !accountSumField.isValid && accountSumField.isDirty,
            message: accountSumField.errorMessage,
          }}
        />
      </div>
      <div className="create-account-popup__buttons">
        <BaseButton
          color='colored'
          size='small'
          onClick={() => dispatch(popupClose())}
        >
          Отмена
        </BaseButton>
        <BaseButton
          color='colored'
          size='small'
          onClick={() => create()}
          disabled={isAllFieldsDirty && !isFormValid || isRequesting}
          loading={isRequesting}
        >
          Создать
        </BaseButton>
      </div>
    </div>
  );
};
