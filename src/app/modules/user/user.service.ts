import { IUser } from './user.interface';
import { User } from './user.model';

// create User
const createUser = async (user: IUser): Promise<IUser | null> => {
  const result = await User.create(user);
  return result;
};

export const UserService = {
  createUser,
};
