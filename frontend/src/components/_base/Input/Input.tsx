import classNames from 'classnames';
import './Input.scss';
import { HTMLInputTypeAttribute, useState } from 'react';

export default function BaseInput({
  className = '',
  type = 'text',
  placeholder = '',
  initialValue = '',
  label = '',
  onChange = () => {},
  autoFocus,
}: {
  className?: string,
  type?: HTMLInputTypeAttribute,
  placeholder?: string,
  initialValue?: string | number;
  label?: string;
  autoFocus?: boolean; 
  onChange?: (value: string | number) => unknown,
}) {
  const [value, setValue] = useState(initialValue);

  const classes = classNames([
    'base-input',
    className,
  ]);

  const exactInput = (
    <input 
      className='base-input__exact'
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(ev) => { 
        onChange(ev.target.value);
        setValue(ev.target.value)
      }}
      autoFocus={autoFocus}
    />
  );

  return (
    <div className={classes}>
      <label className='base-input__label'>
        {label &&
          <span className='base-input__label-text'>{label}</span>}
        {exactInput}
      </label>
    </div>
  )
}
