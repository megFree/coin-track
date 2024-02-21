import './CreateAccountPopup.scss';
import BaseButton from '@/components/_base/Button/Button';
import BaseInput from '@/components/_base/Input/Input';
import BaseSelect, { SelectOption } from '@/components/_base/Select/Select';
import { nanoid } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { popupClose } from '@/redux/features/popups/popupsSlice';
import { useEffect, useState } from 'react';
import { createAccount, getAccounts, getCurrencies } from '@/redux/features/main/thunks';

export default function CreateAccountPopup() {
  const dispatch = useAppDispatch();
  const currencies = useAppSelector((state) => state.main.currencies);
  const [form, setForm] = useState({
    title: '',
    sum: undefined,
    currency: '',
  });
  
  useEffect(() => {
    dispatch(getCurrencies());
  }, []);

  const currenciesOptions: SelectOption[] = currencies.map((currency) => ({
    id: nanoid(),
    placeholder: currency,
  }));  

  const create = async () => {
    await dispatch(createAccount({ title: form.title, amount: form.sum, currency: form.currency }));
    await dispatch(getAccounts());
    dispatch(popupClose());
  }

  return (
    <div className="create-account-popup">
      <div className="create-account-popup__inputs">
        <BaseInput 
          className='create-account-popup__input'
          label='Введите название счёта'
          onChange={(value) => {
            setForm({
              ...form,
              title: value,
            });
          }}
        />
        <BaseSelect
          className='create-account-popup__input'
          initOptions={currenciesOptions}
          key={`force-rerender-currency-${currenciesOptions.length}`}
          onChange={(option) => {
            setForm({
              ...form,
              currency: option.placeholder,
            });
          }}
          label='Валюта'
        />
        <BaseInput 
          className='create-account-popup__input'
          label='Сумма'
          type='number'
          onChange={(value) => {
            setForm({
              ...form,
              sum: value,
            });
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
        >
          Создать
        </BaseButton>
      </div>
    </div>
  );
};
