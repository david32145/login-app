import axios, { AxiosError } from "axios";

const ApiService = axios.create({
  baseURL: process.env.REACT_APP_API_URI,
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

export default ApiService;
