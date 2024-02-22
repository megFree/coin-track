import './Select.scss';
import Image from 'next/image';
import Shevron from '@/assets/chevron.svg';
import classNames from 'classnames';
import { useState } from 'react';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import BaseTooltip from '@/components/_base/Tooltip/Tooltip';

export type SelectOption = {
  id: string;
  placeholder: string;
  value?: any;
};

export default function BaseSelect({
  className = '',
  placeholder = 'Выберите значение',
  onChange = () => {},
  initOptions = [],
  label = '',
  error = {
    isError: false,
    message: '',
  }
}: {
  label?: string;
  className?: string;
  placeholder?: string;
  onChange?: (opt: SelectOption) => void;
  initOptions?: SelectOption[],
  error?: {
    isError: boolean;
    message: string;
  }
}) {
  const [isOpened, setIsOpened] = useState(false);
  const [options] = useState<SelectOption[]>(initOptions);
  const [currentOptionId, setCurrentOptionId] = useState<string>('');
  const outsideClick = useOutsideClick(() => setIsOpened(false));

  const currentOption = options.find((options) => options.id === currentOptionId);
  const classes = classNames([
    'base-select',
    className,
    {'base-select--focused': isOpened},
    {'base-select--empty': !currentOptionId},
    {'base-select--error': error.isError},
  ]);

  return (
    <div className={classes} onClick={() => setIsOpened(!isOpened)}>
      {label &&
        <div className="base-select__label">
          {label}
        </div>
      }

      <div className="base-select__main-container">
        <div className="base-select__main">
          <span className="base-select__main-text">
            {currentOption?.placeholder || placeholder}
          </span>
          <Image className='base-select__arrow' src={Shevron} alt='Открыть/закрыть опции' />
        </div>
        <div className="base-select__options">
          {options.map((option) => (
            <div 
              className="base-select__option" 
              key={option.id}
              ref={outsideClick.ref} // @todo: разобраться с типизацией рефов
              onClick={(e) => {
                e.stopPropagation();
                setCurrentOptionId(option.id);
                setIsOpened(false);
                onChange(option);
              }}
            >
              {option.placeholder}
            </div>
          ))}
        </div>
        <BaseTooltip className='base-select__tooltip'>{error.message}</BaseTooltip>
      </div>
    </div>
  )
};
