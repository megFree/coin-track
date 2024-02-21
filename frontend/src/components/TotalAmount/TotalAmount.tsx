import './TotalAmount.scss';
import classNames from 'classnames';

export default function TotalAmount({
  className = '',
  amount,
}: {
  className?: string;
  amount: number;
}) {
  const classes = classNames([
    'total-amount',
    className,
  ]);

  return (
    <div className={classes}>
      {amount}
    </div>
  );
}
