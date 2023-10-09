import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';
import httpStatus from 'http-status';
import { IUser } from './user.interface';

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
  const id = req.params.id;
  const user = UserService.getSingleUser(id);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User fatched successfull',
    user: user,
  });
});

export const UserController = {
  createUser,
  getSingleUser,
};
