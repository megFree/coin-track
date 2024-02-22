'use client';

import './page.scss';
import Image from 'next/image';
import Arrow from '@/assets/arrow.svg';
import BaseButton from '@/components/_base/Button/Button';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { PopupOpenParams, popupOpen } from '@/redux/features/popups/popupsSlice';
import { useEffect, useState } from 'react';
import { getAccounts } from '@/redux/features/main/thunks';
import { formatSumToString } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export default function AccountPage(props: { params: { id: string} }) { 
  const dispatch = useAppDispatch();
  const accounts = useAppSelector((state) => state.main.accounts);
  const exactAccount = accounts.find((account) => Number(account.uin) === Number(props.params.id));
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (exactAccount) {
      setIsLoading(false);
      return;
    }

    dispatch(getAccounts()).then(async () => {
      if (!exactAccount) {
        return router.replace('/');
      }
      setIsLoading(false);
    });
  }, []);

  const openChangeAccountPopup = (type: 'consumption' | 'income') => {
    const PopupParams: PopupOpenParams = {
      name: '',
      data: {
        accountId: exactAccount?.id,
      },
    };
    if (type === 'consumption') {
      PopupParams.name = 'AddConsumptionPopup';
      PopupParams.title = 'Добавить расход';
    }
    if (type === 'income') {
      PopupParams.name = 'AddIncomePopup';
      PopupParams.title = 'Добавить доход';
    }
    if (PopupParams.name) {
      dispatch(popupOpen(PopupParams));
    }
  };

  if (isLoading) {
    return '...загрузка';
  }

  return (
    <div className="account-page">
      <div className="account-page__header">
        <Link href='/'><Image src={Arrow} alt='На главную' className="account-page__back" /></Link>
        <div className="account-page__title">{exactAccount?.title}</div>
      </div>
      <div className="account-page__content">
        <div className="account-page__amount">
          {formatSumToString(exactAccount?.amount, exactAccount?.currency)}
        </div>
        <div className="account-page__buttons">
          <BaseButton 
            className='account-page__button' 
            color='colored' 
            size='large' 
            onClick={() => openChangeAccountPopup('consumption')}>Расход</BaseButton>
          <BaseButton 
            className='account-page__button' 
            color='colored' 
            size='large' 
            onClick={() => openChangeAccountPopup('income')}>Доход</BaseButton>
        </div>
      </div>
    </div>
  );
};
