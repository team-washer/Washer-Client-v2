export interface BaseResponseType<T> {
  status: string;
  code: number;
  message: string;
  data: T;
}

