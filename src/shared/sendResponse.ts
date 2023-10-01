import { Response } from 'express';

type IApiResponse<G> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
  data: G | null | undefined;
};

const sendResponse = <G>(res: Response, data: IApiResponse<G>): void => {
  const responseData: IApiResponse<G> = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message || null,
    meta: data.meta || null || undefined,
    data: data.data || null || undefined,
  };
  res.status(data.statusCode).json(responseData);
};

export default sendResponse;
