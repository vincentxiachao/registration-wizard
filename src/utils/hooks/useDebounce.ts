import { useRef } from 'react';

export const useDebounce = (cb: (args?: any) => void, delay: number = 500) => {
  const timerRef = useRef<number | null>(null);
  const debounceCb = (...args: any) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      cb(...args);
    }, delay);
  };

  return debounceCb;
};
