'use client';

import './Home.scss';
import AccountList from '@/components/AccountList/AccountList';
import TotalAmount from '@/components/TotalAmount/TotalAmount';
import ButtonRound from '@/components/_base/ButtonRound/ButtonRound';
import Plus from '@/assets/plus.svg';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { popupOpen } from '@/redux/features/popups/popupsSlice';
import { useEffect } from 'react';
import { getAccounts } from '@/redux/features/main/thunks';

export default function Home() {
  const accounts = useAppSelector((state) => state.main.accounts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAccounts());
  }, [])

  const openCreateAccountPopup = () => {
    dispatch(popupOpen({ name: 'CreateAccountPopup', title: 'Создать счёт' }));
  }

  const totalFunds = accounts.reduce((sum, account) => sum += account.amount, 0);

  return (
    <main className='main-page'>
      <TotalAmount className='main-page__total-amount' amount={totalFunds} />
      <div className='main-page__accounts-list'>
        <AccountList />
      </div>
      <ButtonRound 
        className='main-page__add-account-button'
        onClick={() => openCreateAccountPopup()}
      >
        <Image src={Plus} alt='Добавить счет' />
      </ButtonRound>
    </main>
  );
}
