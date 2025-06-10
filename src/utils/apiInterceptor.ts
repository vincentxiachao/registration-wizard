import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
const baseURL = 'http://localhost:3000';
const apiClient = axios.create({ baseURL: baseURL });
function configInterceptors() {
  const requestInterceptor = (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('payoneer-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  };
  const responseInterceptor = (response: AxiosResponse) => {
    return response;
  };
  const errorInterceptor = (error: any) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('payoneer-token');
      window.location.href = '/error';
    } else {
      return Promise.reject(error);
    }
  };
  apiClient.interceptors.request.use(requestInterceptor);
  apiClient.interceptors.response.use(responseInterceptor, errorInterceptor);
}
configInterceptors();
export const get = async <T>(url: string, params?: Record<string, any>) => {
  const res = await apiClient.get<T>(url, { params: params });
  return res.data;
};
export const post = async (url: string, data: Record<any, any>) => {
  const res = await apiClient.post(url, data);
  return res.data;
};
export const put = async (url: string, data: Record<any, any>) => {
  const res = await apiClient.put(url, data);
  return res.data;
};
export const patch = async (url: string, data: Record<any, any>) => {
  const res = await apiClient.patch(url, data);
  return res.data;
};
