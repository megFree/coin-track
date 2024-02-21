'use client';

import './Modal.scss';
import Image from 'next/image';
import Close from '@/assets/close.svg';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useEffect } from 'react';

export default function Modal({ 
  children,
  onClose = () => {},
  title,
}: {
  children?: React.ReactNode;
  onClose?: () => void;
  title?: string;
}) {
  useEffect(() => {
    const x = window.scrollX;
    const y = window.scrollY;
    const scrollHandler = () => window.scrollTo(x, y);
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  });
  const outsideClick = useOutsideClick(onClose);

  const titleBlock = title ? 
    <div className="modal__title">{title}</div> :
    null;

  return (
    <div className="modal">
      <div className="modal__content" ref={outsideClick.ref}> { /* todo: разобраться с типизированием рефов */ }
        {titleBlock}
        <Image 
          className='modal__close-btn'
          src={Close} 
          alt='Закрыть попап' 
          onClick={() => onClose()}
        />
        {children || null}
      </div>
    </div>
  );
};
