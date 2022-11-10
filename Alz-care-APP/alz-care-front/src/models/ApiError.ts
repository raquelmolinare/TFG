import { AxiosError } from "axios";

export class ApiError {
  /**
   * Error code from the backend
   */
  errorCode: number;

  /**
   * Error message from the backend
   */
  message: string;

  constructor(errorCode: number, message: string) {
    this.errorCode = errorCode;
    this.message = message;
  }

  /**
   * Gets an HTTP Response object and creates an ApiError instance with the properties filled
   *
   * @param httpError
   * @return an ApiError instance
   */
  static async load(httpError: AxiosError): Promise<ApiError> {
    // @ts-ignore
    if (httpError.response.status == 500) {
      return new ApiError(500, "Internal Server Error");
    } else {
      let errorMessage = httpError.response?.data
        ? httpError.response.data.toString()
        : httpError.response?.statusText;
      if (!errorMessage) {
        errorMessage = "Internal Server Error";
      }
      // @ts-ignore
      const errorCode = httpError.response.status;
      return new ApiError(errorCode, errorMessage);
    }
  }
}
