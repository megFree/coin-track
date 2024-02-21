'use client';

import { init } from '@/redux/features/main/thunks';
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthGuardComponent({
  children,
}: {
  children: React.ReactNode
}) {
  const me = useAppSelector((state) => state.auth.me);
  const path = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const loaded = useAppSelector((state) => state.main.loaded);

  useEffect(() => { 
    dispatch(init()); // todo: убрать это и вынести куда-то в инициализацию
  }, []);

  useEffect(() => {
    if (loaded) {
      if (path.includes('auth') && me.id) {
        return router.push('/');
      }
  
      if (!path.includes('auth') && !me.id) {
        return router.push('/auth')
      }
    }
  }, [loaded, me.id, path, router])

  return (
    <>{children}</>
  )
}
