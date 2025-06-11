import { useRef } from 'react';

export const useDebounce = <T>(cb: (args?: T) => void, delay: number = 500) => {
  const timerRef = useRef<number | null>(null);
  const debounceCb = <U extends T>(...args: U[]) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      cb(...args);
    }, delay);
  };

  return debounceCb;
};
