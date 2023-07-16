import { AxiosInstance, AxiosStatic } from "axios";

export const getApiClient = (Axios: AxiosStatic, baseURL: string) =>
  Axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

export const addConfigAxiosInstance = (axiosInstance: AxiosInstance) =>
  axiosInstance.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      const message = error.response?.data?.message || error.message;
      console.error(message);
      return Promise.reject(error);
    }
  );
