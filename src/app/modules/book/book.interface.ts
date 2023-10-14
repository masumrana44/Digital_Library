/* eslint-disable @typescript-eslint/ban-types */
import { Model, Types } from 'mongoose';
import { IName, IUser } from '../user/user.interface';

export type IBook = {
  title: string;
  author: string;
  genre:
    | 'Comedy'
    | 'Fiction'
    | 'Non-Fiction'
    | 'Romance'
    | 'Mystery'
    | 'Thriller'
    | 'Horror'
    | 'Science Fiction'
    | 'Fantasy'
    | 'Historical fiction'
    | 'Young adult';
  price: string;
  bookPhotoUrl: string;
  publicationData: string;
  bookSummary: string;
  publisher: Types.ObjectId | IUser;
  reviews?: [];
};

export type IReview = {
  name: IName;
  photoUrl: string;
  comment: string;
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
