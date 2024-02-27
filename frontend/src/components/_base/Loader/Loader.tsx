import classNames from 'classnames';
import Image from 'next/image';
import Loader from '@/assets/loader.svg';
import './Loader.scss';

export default function BaseLoader({
  className = '',
}: {
  className?: string;
}) {
  const classes = classNames([
    'base-loader',
    className,
  ]);

  return (
    <div className={classes}>
      <Image src={Loader} alt='Иконка загрузки' />
    </div>
  )
};
