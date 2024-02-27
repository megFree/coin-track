import classNames from 'classnames';
import './Input.scss';
import { HTMLInputTypeAttribute, useState } from 'react';
import BaseTooltip from '../Tooltip/Tooltip';

export default function BaseInput({
  className = '',
  type = 'text',
  placeholder = '',
  initialValue = '',
  label = '',
  onChange = () => {},
  autoFocus,
  error = {
    isError: false,
    message: '',
    messages: [],
  },
}: {
  className?: string,
  type?: HTMLInputTypeAttribute,
  placeholder?: string,
  initialValue?: string | number;
  label?: string;
  autoFocus?: boolean; 
  onChange?: (value: string | number) => unknown,
  error?: { 
    isError: boolean; 
    /**
     * @deprecated use "messages" prop instead
     */
    message?: string; 
    messages?: string[] 
  }
}) {
  const [value, setValue] = useState(initialValue);

  const classes = classNames([
    'base-input',
    className,
    {'base-input--error': error.isError},
  ]);

  const errorTooltipContent = () => {
    if (!error.messages?.length) {
      return error.message || '';
    }

    if (error.messages.length === 1) {
      return error.messages[0];
    }

    return (
      <ul className='base-input__tooltip-list'>
        {error.messages.map((error, index) => (
          <li
            className='base-input__tooltip-list-item' 
            key={`${index}-${error}`}
          >
            {error}
          </li>
        ))}
      </ul>
    )
  };

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
      <BaseTooltip className='base-input__tooltip'>{errorTooltipContent()}</BaseTooltip>
    </div>
  )
}
