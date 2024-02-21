import { useEffect, useRef } from 'react';

export function useOutsideClick(action: () => void) {
  const ref = useRef<Element>(null);

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  });

  function handleOutsideClick(event: Event) {
    if (ref.current && !ref.current.contains(event.target as Element)) {
      action();
    }
  }

  return { ref };
}
