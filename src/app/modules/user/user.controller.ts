import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';
import httpStatus from 'http-status';
import { IUser } from './user.interface';
import { jwtHelper } from '../../../helper/jwtHelper';
import config from '../../../config';

// Create user
const createUser = catchAsync(async (req: Request, res: Response) => {
  const { ...user } = req.body;
  const createdUser = await UserService.createUser(user);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successful',
    data: createdUser,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.params;
  console.log('hello');

  const user = await UserService.getSingleUser(email);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User fatched successfull',
    data: user,
  });
});

const getUserCredential = catchAsync(async (req: Request, res: Response) => {
  const accessToken = req.headers.authorization;

  const verifiedToken = jwtHelper.verifyToken(
    accessToken as string,
    config.access_token_secret as string,
  );

  const { phoneNumber } = verifiedToken;

  const credential = await UserService.getUserCredential(phoneNumber);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Credential fatched successfull',
    data: credential,
  });
});

export const UserController = {
  createUser,
  getSingleUser,
  getUserCredential,
};
