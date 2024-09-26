/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import { ErrorRequestHandler } from 'express';
import config from '../../config';
import { ZodError } from 'zod';
import handleValidationError from '../../errors/HandleValidationError';
import handleCastError from '../../errors/HandleCastError';
import handleZodError from '../../errors/HandleZodError';
import { IGenericErrorMessage } from '../../interfaces/error';
import ApiError from '../../errors/ApiError';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  config.env === 'development' && console.log('😉 GlobalErrorHandler ~', error);

  let statusCode = 500;
  let message = 'Something went wrong !';
  let errrorMessages: IGenericErrorMessage[] = [];

  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errrorMessages = simplifiedError.errorMessages;
  } else if (error?.name === 'CastError') {
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errrorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    console.log('simplifiedError', simplifiedError);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errrorMessages = simplifiedError.errorMessages;
  } else if (error instanceof Error) {
    message = error?.message;
    errrorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errrorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errrorMessages,
    stack: config.env !== 'production' ? error.stack : undefined,
  });
};

export default globalErrorHandler;
