'use client';

import { usePathname } from 'next/navigation';
import './layout.scss';
import classnames from 'classnames';
import Image from 'next/image';
import Logo from '@/assets/logo.svg';
import { useAppSelector } from '@/redux/hooks';
import React from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const appLoaded = useAppSelector((state) => state.main.loaded);

  const layoutClasses = classnames([
    'auth-layout',
    {'auth-layout--bg-left-edge': pathname === '/auth'},
    {'auth-layout--bg-right-edge': pathname !== '/auth'}
  ]);

  return (
    <div className={layoutClasses}>
      <div className="auth-layout__logo">
        <Image
          src={Logo} 
          alt='Logo'
          priority={true}
        />
      </div>
      {
        !appLoaded ? 
          'loading' :
          <div className='auth-layout__content'>
            {children}
          </div>
      }
    </div>
  );
}
