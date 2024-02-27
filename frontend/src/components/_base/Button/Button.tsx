import classNames from 'classnames';
import './Button.scss';
import Link from 'next/link';
import BaseLoader from '@/components/_base/Loader/Loader';

export default function BaseButton(
  {
    children,
    className = '',
    onClick = () => {},
    href,
    submit = {
      isSubmit: false,
      value: '',
    },
    color = 'bw',
    size = 'medium',
    disabled = false,
    loading = false,
  }: { 
    children?: React.ReactNode,
    className?: string,
    onClick?: () => void,
    href?: string,
    submit?: {
      isSubmit: boolean,
      value: string,
    },
    color?: 'bw' | 'colored',
    size?: 'small' | 'medium' | 'large',
    disabled?: boolean;
    loading?: boolean;
  }
) {
  const classes = classNames([
    'base-button',
    className,
    `base-button--${color}`,
    `base-button--${size}`,
    { disabled },
  ]);

  // todo: переделать на декоратор c ev.preventDefault()
  const action = (ev: React.MouseEvent) => {
    ev.preventDefault();
    onClick();
  }

  let tsx;
  if (href) {
    tsx = (
      <Link 
        className={classes} 
        href={href}
      >
        {loading ? <BaseLoader className='base-button__loader' /> : children}
      </Link>);
  } else if (submit.isSubmit) {
    tsx = (
      <input 
        className={classes} 
        disabled={disabled} 
        type="submit" 
        value={submit.value} 
        onClick={(ev) => {action(ev)}} 
      />
    )
  } else {
    tsx = (
      <button
        className={classes} 
        disabled={disabled}
        onClick={(ev) => {action(ev)}}
      >
        {loading ? <BaseLoader className='base-button__loader' /> : children}
      </button>
    );
  }

  return tsx;
}
