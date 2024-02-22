import { Currency } from '@/types';
import './TotalAmount.scss';
import classNames from 'classnames';
import { formatSumToString } from '@/lib/utils';
import { pickBy } from 'lodash';

export default function TotalAmount({
  className = '',
  funds = {
    'EUR': 0,
    'RUB': 0,
    'USD': 0,
  },
}: {
  className?: string;
  funds: Record<Currency, number>;
}) {
  const classes = classNames([
    'total-amount',
    className,
  ]);

  const notEmptyFunds = 
    Object.entries(pickBy(funds, (val) => val > 0))
      .map(
        ([currency, amount], index) => (
          <div 
            key={`${currency}-${index}`}
            className='total-amount__item'
          >
            {formatSumToString(amount, currency)}
          </div>
        )
      );

  return (
    <div className={classes}>
      {notEmptyFunds}
    </div>
  );
}
