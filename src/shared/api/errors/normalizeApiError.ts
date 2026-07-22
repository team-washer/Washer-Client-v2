import axios from "axios";
import { ZodError } from "zod";
import { APP_ERROR_TYPE, AppError } from "./appError";

type ErrorResponse = {
  message?: string;
};

const getServerErrorMessage = (
  data: unknown,
  fallbackMessage: string,
): string => {
  if (
    typeof data === "object" &&
    data !== null &&
    "message" in data
  ) {
    const { message } = data as ErrorResponse;

    if (typeof message === "string") {
      return message;
    }
  }

  return fallbackMessage;
};

export const normalizeApiError = (error: unknown): AppError => {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof ZodError) {
    return new AppError({
      type: APP_ERROR_TYPE.VALIDATION,
      message: "서버 응답 형식이 올바르지 않습니다.",
      cause: error,
    });
  }

  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const responseData: unknown = error.response?.data;

    if (!error.response) {
      return new AppError({
        type: APP_ERROR_TYPE.NETWORK,
        message: "서버에 연결할 수 없습니다.",
        cause: error,
      });
    }

    if (status === 401) {
      return new AppError({
        type: APP_ERROR_TYPE.AUTHENTICATION,
        message: getServerErrorMessage(
          responseData,
          "로그인이 만료되었거나 유효하지 않습니다.",
        ),
        status,
        cause: error,
      });
    }

    if (status === 403) {
      return new AppError({
        type: APP_ERROR_TYPE.FORBIDDEN,
        message: getServerErrorMessage(
          responseData,
          "요청한 기능에 접근할 권한이 없습니다.",
        ),
        status,
        cause: error,
      });
    }

    if (status === 400 || status === 422) {
      return new AppError({
        type: APP_ERROR_TYPE.BAD_REQUEST,
        message: getServerErrorMessage(
          responseData,
          "요청한 정보를 확인해주세요.",
        ),
        status,
        cause: error,
      });
    }

    if (status === 404) {
      return new AppError({
        type: APP_ERROR_TYPE.NOT_FOUND,
        message: getServerErrorMessage(
          responseData,
          "요청한 정보를 찾을 수 없습니다.",
        ),
        status,
        cause: error,
      });
    }

    if (status === 409) {
      return new AppError({
        type: APP_ERROR_TYPE.CONFLICT,
        message: getServerErrorMessage(
          responseData,
          "현재 상태에서는 요청을 처리할 수 없습니다.",
        ),
        status,
        cause: error,
      });
    }

    if (status !== undefined && status >= 500) {
      return new AppError({
        type: APP_ERROR_TYPE.SERVER,
        message: getServerErrorMessage(
          responseData,
          "서버에서 요청을 처리하지 못했습니다.",
        ),
        status,
        cause: error,
      });
    }

    return new AppError({
      type: APP_ERROR_TYPE.UNKNOWN,
      message: getServerErrorMessage(
        responseData,
        "API 요청 중 오류가 발생했습니다.",
      ),
      status,
      cause: error,
    });
  }

  if (error instanceof Error) {
    return new AppError({
      type: APP_ERROR_TYPE.UNKNOWN,
      message: error.message,
      cause: error,
    });
  }

  return new AppError({
    type: APP_ERROR_TYPE.UNKNOWN,
    message: "알 수 없는 오류가 발생했습니다.",
    cause: error,
  });
};