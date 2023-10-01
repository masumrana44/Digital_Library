/* eslint-disable @typescript-eslint/ban-types */
import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';

export type IBook = {
  title: string;
  author: string;
  genre: string;
  price: string;
  bookPhotoUrl: string;
  publicationData: string;
  bookSummary: string;
  publisher: Types.ObjectId | IUser;
  reviews?: [];
};

export type IBookFilterOption = {
  searchTerm: string;
  title: string;
  author: string;
  genre: string;
  price: string;
  publicationData: string;
};

export type bookModel = {} & Model<IBook>;
