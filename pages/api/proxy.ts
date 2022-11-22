import axios, { AxiosRequestConfig } from "axios";

const BASE_URL = "http://49.164.100.253:8080/api/";

const axiosConfig: AxiosRequestConfig = {
  baseURL: BASE_URL,
};

const _proxy = axios.create(axiosConfig);

// 요청 인터셉터
_proxy.interceptors.request.use(
  function (config) {
    console.log(config);
    // 요청을 보내기 전에 수행할 일
    // ...
    return config;
  },
  function (error) {
    console.log(error);
    // 오류 요청을 보내기전 수행할 일
    // ...
    return Promise.reject(error);
  }
);

// 응답 인터셉터
_proxy.interceptors.response.use(
  function (response) {
    console.log(response);

    // 응답 데이터를 가공
    // ...
    return response;
  },
  function (error) {
    console.log(error);

    // 오류 응답을 처리
    // ...
    return Promise.reject(error);
  }
);

export const proxy = {
  ..._proxy,
  get: (url: string, config?: AxiosRequestConfig) =>
    _proxy.get(url, config).then((res) => res?.data),
  post: (url: string, data?: any, config?: AxiosRequestConfig) =>
    _proxy.post(url, data, config).then((res) => res?.data),
  put: (url: string, data?: any, config?: AxiosRequestConfig) =>
    _proxy.put(url, data, config).then((res) => res?.data),
  patch: (url: string, data?: any, config?: AxiosRequestConfig) =>
    _proxy.patch(url, data, config).then((res) => res?.data),
  delete: (url: string, config?: AxiosRequestConfig) =>
    _proxy.delete(url, config).then((res) => res?.data),
};
