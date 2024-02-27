import './Notice.scss';
import classNames from 'classnames';

export default function BaseNotice({
  children,
  className = '',
  status = 'neutral',
}: {
  children?: React.ReactNode,
  className?: string,
  status?: 'success' | 'neutral' | 'error',
}) {
  const classes = classNames([
    'base-notice',
    `base-notice--${status}`,
    className,
  ]);

  return (
    <div className={classes}>
      {children}
    </div>
  );
};
