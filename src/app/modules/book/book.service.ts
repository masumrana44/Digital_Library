import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IBook, IBookFilterOption, IReview } from './book.interface';
import { Book } from './book.model';
import { IPaginationOption } from '../../../interfaces/pagination';
import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helper/paginationHelper';
import { bookSearchrableFiled } from './book.constant';
import { IGenericResponse } from '../../../interfaces/common';
import { User } from '../user/user.model';

// Create book
const createBook = async (payLoad: IBook): Promise<IBook | null> => {
  const createdBook = await Book.create(payLoad);
  return createdBook;
};

// post review
const postReview = async (
  review: IReview,
  bookId: string,
): Promise<IBook | null> => {
  const isExistedBook = await Book.findById(bookId);
  if (!isExistedBook) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Book Not found');
  }

  const result = await Book.findByIdAndUpdate(bookId, {
    $push: { reviews: review },
  });
  return result;
};

// update book
const updateBook = async (
  payLoad: IBook,
  id: string,
): Promise<IBook | null> => {
  const updatedBook = await Book.findByIdAndUpdate({ _id: id }, payLoad, {
    new: true,
  });
  if (!updateBook) {
    throw new ApiError(httpStatus.NOT_EXTENDED, 'Failed to update book ');
  }
  return updatedBook;
};

// get all book
const getAllBook = async (
  paginationOptions: IPaginationOption,
  filtersOptions: Partial<IBookFilterOption>,
): Promise<IGenericResponse<IBook[]>> => {
  const { searchTerm, ...filterData } = filtersOptions;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: bookSearchrableFiled.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filterData).length) {
    andConditions.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Book.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .populate('publisher');
  const total = await Book.countDocuments(whereCondition);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// get all book
const getSpecificUserBooks = async (
  phoneNumber: number,
  paginationOptions: IPaginationOption,
): Promise<IBook[]> => {
  const { sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  // checkin isUser exist
  const getUser = await User.findOne({ phoneNumber: phoneNumber });

  if (!getUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const result = await Book.find({ publisher: getUser?._id })
    .populate('publisher')
    .sort(sortConditions);

  return result;
};

// get Single Book
const getSingleBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findById(id).populate('publisher');
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
  }
  return result;
};

// delete book
const deleteBook = async (id: string): Promise<IBook | null> => {
  const deletedBook = await Book.findByIdAndDelete(id);
  if (!deleteBook) {
    throw new ApiError(httpStatus.NOT_EXTENDED, 'Failed to delete book ');
  }
  return deletedBook;
};

export const BookService = {
  createBook,
  updateBook,
  deleteBook,
  getAllBook,
  getSingleBook,
  postReview,
  getSpecificUserBooks,
};
