import classNames from 'classnames';
import './Header.scss';
import { useAppSelector } from '@/redux/hooks';

export default function Header({
  className = '',
}: {
  className?: string;
}) {
  const name = useAppSelector((state) => state.auth.me.username);

  const classes = classNames([
    'header',
    className,
  ]);

  return (
    <div className={classes}>
      <div className="header__user">
        {name}
      </div>
    </div>
  )
}
