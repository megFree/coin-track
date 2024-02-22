import { Currency } from '@/types';
import './TotalAmount.scss';
import classNames from 'classnames';
import { formatSumToString } from '@/lib/utils';

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

  const fundsJsx = <>
    {Object.keys(funds).map((key, index) => (
      <div 
        className='total-amount__item'
        key={`${key}-${index}`} 
      >
        {formatSumToString(funds[key], key)}
      </div>
    ))}
  </>

  return (
    <div className={classes}>
      {fundsJsx}
    </div>
  );
}
