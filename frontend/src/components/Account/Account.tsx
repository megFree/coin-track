import './Account.scss';
import Image from 'next/image';
import Close from '@/assets/close.svg';
import Loader from '@/assets/loader.svg';
import { APIAccount } from '@/types';
import classNames from 'classnames';
import { useState } from 'react';
import { formatSumToString } from '@/lib/utils';
import BaseLoader from '@/components/_base/Loader/Loader';

export default function Account({
  className = '',
  account,
  onClose = async () => {},
}: {
  className?: string;
  account: APIAccount;
  onClose?: () => Promise<void>;
}) {
  const [isCloseLoading, setIsCloseLoading] = useState(false);

  const classes = classNames([
    'account',
    className,
  ]);

  const onCloseHandler = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsCloseLoading(true);
    await onClose(); //@todo: НЕ РАБОАТЕТ ЛОАДЕР СУКА ПОЧЕМУ!
    setIsCloseLoading(false);
  };

  return (
    <div className={classes}>
      <div className="account__delete-btn" onClick={(e) => onCloseHandler(e)}>
        {
          isCloseLoading ? 
            <BaseLoader /> :
            <Image src={Close} alt='закрыть счёт'/>
        }
      </div>
      <div className="account__header">
        <div className="account__color" />
        <div className="account__title">
          {account.title}
        </div>
      </div>
      <div className="account__amount">
        {formatSumToString(account.amount, account.currency)}
      </div>
    </div>
  )
}