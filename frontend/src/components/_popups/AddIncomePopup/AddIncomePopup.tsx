'use client';

import './AddIncomePopup.scss';
import BaseButton from '@/components/_base/Button/Button';
import BaseInput from '@/components/_base/Input/Input';
import { getAccounts, updateAccount } from '@/redux/features/main/thunks';
import { popupClose } from '@/redux/features/popups/popupsSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useRef, useState } from 'react';

export default function AddIncomePopup() {
  const dispatch = useAppDispatch();
  const [sum, setSum] = useState<undefined | number | string>();
  const accountId = useAppSelector((state) => state.popups.data.accountId);
  const account = useAppSelector((state) => state.main.accounts.find((account) => account.id === accountId));
  const newSum = (account?.amount || 0) + (parseInt('' + sum) || 0);

  const saveButtonHandler = async () => {
    await dispatch(updateAccount({
      ...account,
      amount: newSum,
    }));
    await dispatch(getAccounts());
    dispatch(popupClose());
  }

  return (
    <div className="add-income-popup">
      <BaseInput 
        className='add-income-popup__input' 
        type='number' 
        label='Сумма'
        autoFocus={true}
        initialValue={sum}
        onChange={(val) => setSum(val)}
      />
      <BaseButton 
        className='add-income-popup__button' 
        size='small' 
        color='colored'
        submit={{
          isSubmit: true,
          value: 'Сохранить',
        }}
        onClick={saveButtonHandler}
      />
    </div>
  );
};
