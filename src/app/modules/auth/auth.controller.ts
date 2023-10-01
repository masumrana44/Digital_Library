import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { AuthService } from './auth.service';
import sendResponse from '../../../shared/sendResponse';
import { IAuthLoginResponse } from './auth.interface';
import httpStatus from 'http-status';
import config from '../../../config';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthService.loginUser(loginData);
  const { accessToken, refreshToken } = result;

  //   fur security
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  // set refresh token into cookie
  res.cookie('refreshToken', refreshToken, cookieOptions);
  sendResponse<IAuthLoginResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'UserLogin Successful',
    data: { accessToken },
  });
});

export const AuthController = {
  loginUser,
};
