import type { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import baseService from "./baseService";

const apiService = {
  fetchData<Response = unknown, Request = Record<string, unknown>>(
    param: AxiosRequestConfig<Request>
  ) {
    return new Promise<AxiosResponse<Response>>((resolve, reject) => {
      baseService(param)
        .then((response: AxiosResponse<Response>) => {
          resolve(response);
        })
        .catch((errors: AxiosError) => {
          reject(new Error(errors.message));
        });
    });
  },
};

export default apiService;
