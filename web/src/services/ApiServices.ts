import axios, { AxiosError } from "axios";
import LoginService from "./LoginService";

const ApiService = axios.create({
  baseURL: "http://localhost:3333",
});

export class ApiError extends Error {
  public message: string;

  public error: string;

  public constructor(message: string, error: string) {
    super("ApiError");
    this.message = message;
    this.error = error;
  }
}

function isAxiosError(err: any): err is AxiosError {
  if (err.response) return true;
  return false;
}

ApiService.interceptors.response.use(
  (response) => response,
  (err) => {
    if (isAxiosError(err)) {
      const { message, error } = err.response?.data;
      return Promise.reject(new ApiError(String(message), String(error)));
    }

    return Promise.reject(
      new ApiError("Without connection with server", "CONNECTION_REFUSED")
    );
  }
);

ApiService.interceptors.request.use((request) => {
  if (LoginService.isLogged()) {
    request.headers.authorization = `Bearer ${LoginService.getToken()}`;
  }
  return request;
});

export default ApiService;
