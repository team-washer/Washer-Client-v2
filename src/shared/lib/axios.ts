import axios from "axios";
import { COOKIE_KEYS } from "../constants/cookies";
import { getCookie, setCookie } from "../utils/cookies";

export const axiosInstance = axios.create({
  baseURL: "/",
});

type RefreshResponse = {
  data: {
    accessToken: string;
    expiresIn: number;
    refreshToken: string;
  };
};

axiosInstance.interceptors.request.use((config) => {
  const accessToken = getCookie(COOKIE_KEYS.ACCESS_TOKEN);
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const onTokenRefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => {
    callback(token);
  });
  refreshSubscribers = [];
};

const addRefreshSubscriber = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = getCookie(COOKIE_KEYS.REFRESH_TOKEN);

      if (!refreshToken) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve) => {
          addRefreshSubscriber((token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(axiosInstance(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        const response: RefreshResponse = await axiosInstance.post(
          "/api/v2/auth/refresh",
          {
            refreshToken,
          },
        );

        const newAccessToken = response.data.accessToken;
        const newRefreshToken = response.data.refreshToken;

        setCookie(COOKIE_KEYS.ACCESS_TOKEN, newAccessToken);
        setCookie(COOKIE_KEYS.REFRESH_TOKEN, newRefreshToken);

        onTokenRefreshed(newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);
      } catch (error) {
        console.error(error);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
