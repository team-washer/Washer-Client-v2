export const APP_ERROR_TYPE = {
    AUTHENTICATION: "AUTHENTICATION",
    FORBIDDEN: "FORBIDDEN",
    SERVER: "SERVER",
    NETWORK: "NETWORK",
    VALIDATION: "VALIDATION",
    UNKNOWN: "UNKNOWN",
  } as const;
  
  export type AppErrorType =
    (typeof APP_ERROR_TYPE)[keyof typeof APP_ERROR_TYPE];
  
  type AppErrorOptions = {
    type: AppErrorType;
    message: string;
    status?: number;
    cause?: unknown;
  };
  
  export class AppError extends Error {
    readonly type: AppErrorType;
    readonly status?: number;
    readonly cause?: unknown;
  
    constructor({ type, message, status, cause }: AppErrorOptions) {
      super(message);
  
      this.name = "AppError";
      this.type = type;
      this.status = status;
      this.cause = cause;
    }
  }