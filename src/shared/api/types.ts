export type ApiResponse<T> = {
    status: string;
    code: number;
    message: string;
    data: T;
  };