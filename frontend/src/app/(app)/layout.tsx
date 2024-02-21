'use client';

import './layout.scss';
import Header from '@/components/Header/Header';

export default function AppLayout(props: Readonly<{
  children: React.ReactNode;
  accounts: React.ReactNode;
}>) {
  return (
    <div className='app-layout'>
      <Header className='app-layout__header'/>
      {props.children}
    </div>
  );
}
