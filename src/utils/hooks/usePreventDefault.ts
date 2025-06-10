import { useCallback } from 'react';
export const usePreventDefault = <E extends React.SyntheticEvent>(
  handler?: (e: E) => void
) => {
  return useCallback(
    (e: E) => {
      e.preventDefault();
      e.stopPropagation();
      handler && handler(e);
    },
    [handler]
  );
};
