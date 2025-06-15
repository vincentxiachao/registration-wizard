import { renderHook } from '@testing-library/react';
import { useDebounce } from '@utils/hooks/useDebounce';
import { vi } from 'vitest';

describe('useDebounce', () => {
  afterEach(() => {
    vi.clearAllTimers();
    vi.clearAllMocks();
  });
  it('should debounce the value', async () => {
    vi.useFakeTimers();
    const delay = 500;
    const callBackSpy = vi.fn();
    const { result } = renderHook(({ cb, delay }) => useDebounce(cb, delay), {
      initialProps: { cb: callBackSpy, delay: delay },
    });
    expect(result.current).toBeDefined();
    result.current();
    expect(callBackSpy).not.toHaveBeenCalled();
    vi.advanceTimersByTime(delay + 100);
    expect(callBackSpy).toHaveBeenCalled();
  });
});
