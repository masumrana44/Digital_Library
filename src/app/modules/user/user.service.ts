import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';

// create User
const createUser = async (user: IUser): Promise<IUser | null> => {
  const result = await User.create(user);
  return result;
};

// get Single User
const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById({ _id: id });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not Found');
  }
  // console.log(result);
  return result;
};
export const UserService = {
  createUser,
  getSingleUser,
};
