/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';

// create User
const createUser = async (user: IUser): Promise<IUser | null> => {
  const result = await User.create(user);
  return result;
};

const getSingleUser = async (email: string): Promise<IUser | null> => {
  const result = await User.findOne({ email: email }, { name: 1 });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not Found');
  }
  return result;
};

const getUserCredential = async (
  phoneNumber: number,
): Promise<IUser | null> => {
  const result = await User.findOne(
    { phoneNumber: phoneNumber },
    { password: 0 },
  );
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not Found');
  }
  return result;
};
export const UserService = {
  createUser,
  getSingleUser,
  getUserCredential,
};
