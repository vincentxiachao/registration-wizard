import { describe, it, expect, beforeEach, vi } from 'vitest';
import { get, post, put, patch } from '@utils/apiClientWithInterceptors';

const mocks = vi.hoisted(() => ({
  get: vi.fn().mockResolvedValue({ data: 'mock get response' }),
  post: vi.fn().mockResolvedValue({ data: 'mock post response' }),
  put: vi.fn().mockResolvedValue({ data: 'mock put response' }),
  patch: vi.fn().mockResolvedValue({ data: 'mock patch response' }),
  delete: vi.fn().mockResolvedValue({ data: 'mock delete response' }),
}));

vi.mock('axios', async (importActual) => {
  const actual = await importActual<typeof import('axios')>();
  const mockAxios = {
    default: {
      ...actual.default,
      create: vi.fn(() => ({
        ...actual.default.create(),
        get: mocks.get,
        post: mocks.post,
        put: mocks.put,
        patch: mocks.patch,
      })),
    },
  };
  return mockAxios;
});

describe('apiInterceptor 添加 header 功能测试', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call axios.get correctly', async () => {
    const url = '/test';
    const result = await get(url, {
      params: 'MockParams',
    });
    expect(result).toBe('mock get response');
  });
  it('should call axios.post correctly', async () => {
    const url = '/test';
    const result = await post(url, {
      params: 'MockParams',
    });
    expect(result).toBe('mock post response');
  });
  it('should call axios.put correctly', async () => {
    const url = '/test';
    const result = await put(url, {
      params: 'MockParams',
    });
    expect(result).toBe('mock put response');
  });
  it('should call axios.patch correctly', async () => {
    const url = '/test';
    const result = await patch(url, {
      params: 'MockParams',
    });
    expect(result).toBe('mock patch response');
  });
});
