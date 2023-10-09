import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';

// create User
const createUser = async (user: IUser): Promise<IUser | null> => {
  const result = await User.create(user);
  return result;
};

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not Found');
  }
  return result;
};
export const UserService = {
  createUser,
  getSingleUser,
};
