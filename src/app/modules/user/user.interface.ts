/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

type IName = {
  firstName: string;
  lastName?: string;
};

export type IUser = {
  name: IName;
  role?: 'admin' | 'normalUser';
  email: string;
  phoneNumber: number;
  password: string;
};

export type UserModel = {
  isUserExist(email: string): Promise<IUser | null>;
  isPasswordMatch(
    inputPassword: string,
    savedPassword: string,
  ): Promise<boolean | null>;
} & Model<IUser>;
