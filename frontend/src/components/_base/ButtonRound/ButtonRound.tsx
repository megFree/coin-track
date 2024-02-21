import './ButtonRound.scss';
import classNames from 'classnames';

export default function ButtonRound({
  className = '',
  children = <></>,
  onClick = () => {},
}: {
  className?: string;
  children?: React.ReactNode;
  onClick?: Function, // @todo: разобраться как делать типизирование функций в пропсы
}) {
  const classes = classNames([
    'button-round',
    className,
  ]);

  return (
    <button className={classes} onClick={(ev) => onClick(ev)}>
      {children}
    </button>
  )
}