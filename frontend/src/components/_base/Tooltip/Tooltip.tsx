import classNames from 'classnames';
import './Tooltip.scss';

export default function BaseTooltip({
    children,
    className,
  }: { 
    children?: React.ReactNode, 
    className?: string 
  }) {
  const classes = classNames([
    'base-tooltip',
    className,
  ]);

  return (
    <div className={classes}>
      {children}
    </div>
  )
};
