import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
const baseURL = import.meta.env.VITE_API_URL;
const apiClient = axios.create({ baseURL: baseURL });
function configInterceptors() {
  const requestInterceptor = (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('registration-wizard-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  };
  const responseInterceptor = (response: AxiosResponse) => {
    return response;
  };
  const errorInterceptor = <T extends { response: { status: number } }>(
    error: T
  ) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('registration-wizard-token');
      window.location.href = '/error';
    } else {
      return Promise.reject(error);
    }
  };
  apiClient.interceptors.request.use(requestInterceptor);
  apiClient.interceptors.response.use(responseInterceptor, errorInterceptor);
}
configInterceptors();
export const get = async <T, P extends string | number | boolean>(
  url: string,
  params?: Record<string, P>
) => {
  const res = await apiClient.get<T>(url, { params: params });
  return res.data;
};
export const post = async (url: string, data?: Record<string, unknown>) => {
  const res = await apiClient.post(url, data);
  return res.data;
};
export const put = async (url: string, data?: Record<string, unknown>) => {
  const res = await apiClient.put(url, data);
  return res.data;
};
export const patch = async (url: string, data?: Record<string, unknown>) => {
  const res = await apiClient.patch(url, data);
  return res.data;
};

// const abortControllers = new Map<string, AbortController>();
// const token = localStorage.getItem('registration-wizard-token');
// if (token) {
//   apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
// }

// async function makeRequest(
//   method: 'get' | 'post' | 'put' | 'patch' | 'delete',
//   url: string,
//   data?: any
// ) {
//   if (abortControllers.has(url)) {
//     abortControllers.get(url)!.abort();
//   }

//   // 创建新的 AbortController 实例
//   const controller = new AbortController();
//   abortControllers.set(url, controller);

//   try {
//     let response;
//     switch (method) {
//       case 'get':
//         response = await apiClient.get(url, { signal: controller.signal });
//         break;
//       case 'post':
//         response = await apiClient.post(url, data, {
//           signal: controller.signal,
//         });
//         break;
//       case 'put':
//         response = await apiClient.put(url, data, {
//           signal: controller.signal,
//         });
//         break;
//       case 'patch':
//         response = await apiClient.patch(url, data, {
//           signal: controller.signal,
//         });
//         break;
//       case 'delete':
//         response = await apiClient.delete(url, { signal: controller.signal });
//         break;
//     }

//     // 请求成功后，从 map 中移除对应的 AbortController
//     abortControllers.delete(url);
//     return response.data;
//   } catch (error) {
//     if (axios.isCancel(error)) {
//       console.log('请求已被取消:', error.message);
//     } else {
//       console.error('请求出错:', error);
//     }
//   }
// }
