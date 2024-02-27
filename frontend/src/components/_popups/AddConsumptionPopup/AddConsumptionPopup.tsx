import './AddConsumptionPopup.scss';
import BaseButton from '@/components/_base/Button/Button';
import BaseInput from '@/components/_base/Input/Input';
import { getAccounts, updateAccount } from '@/redux/features/main/thunks';
import { popupClose } from '@/redux/features/popups/popupsSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useState } from 'react';

export default function AddConsumptionPopup() {
  const dispatch = useAppDispatch();
  const [sum, setSum] = useState<undefined | number | string>();
  const [isRequesting, setIsRequesting] = useState(false);
  const accountId = useAppSelector((state) => state.popups.data.accountId);
  const account = useAppSelector((state) => state.main.accounts.find((account) => account.id === accountId));
  const newSum = (account?.amount || 0) - (parseInt('' + sum) || 0);

  const error = {
    isError: false,
    message: ''
  };

  if (newSum < 0) {
    error.isError = true;
    error.message = 'Недостаточно средств для списания';
  }

  const saveButtonHandler = async () => {
    setIsRequesting(true);
    await dispatch(updateAccount({
      ...account,
      amount: newSum,
    }));
    await dispatch(getAccounts());
    setIsRequesting(false);
    dispatch(popupClose());
  };

  return (
    <div className="add-consumption-popup">
      <BaseInput 
        className='add-consumption-popup__input' 
        type='number' 
        label='Сумма' 
        initialValue={sum} 
        autoFocus={true}
        error={error}
        onChange={(val) => setSum(val)}
      />
      <BaseButton 
        className='add-consumption-popup__button'
        size='small'
        color='colored'
        disabled={error.isError || isRequesting}
        onClick={saveButtonHandler}
        loading={isRequesting}
      >Сохранить</BaseButton>
    </div>
  );
};
