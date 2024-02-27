'use client';

import Link from 'next/link';
import './AccountList.scss';
import Account from '../Account/Account';
import classNames from 'classnames';
import { APIAccount } from '@/types';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { deleteAccount, getAccounts } from '@/redux/features/main/thunks';
import { debounce } from 'lodash';

export default function AccountList({
  className = '',
}:{
  className?: string;
}) {
  const accounts = useAppSelector((state) => state.main.accounts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAccounts());
  }, []);

  const classes = classNames([
    'account-list',
    className,
  ]);

  const deleteAccountHandler = debounce(async (id: number) => {
    await dispatch(deleteAccount({ id }));
    await dispatch(getAccounts());
  }, 1000, { trailing: false, leading: true });

  return (
    <div className={classes}>
      {accounts.map((account, index) => (
        <Link
          href={`/accounts/${account.uin}`}
          key={account.id + 'index-' + index}
          className='account-list__account'
        >
          <Account
            account={account}
            onClose={async () => deleteAccountHandler(account.id)}
          />
        </Link>
      ))}
    </div>
  )
}