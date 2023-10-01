import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { BookService } from './book.service';
import sendResponse from '../../../shared/sendResponse';
import { IBook } from './book.interface';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constant/pagination';
import { bookFilterableFiled } from './book.constant';

// create book
const createBook = catchAsync(async (req: Request, res: Response) => {
  const { ...bookData } = req.body;
  const result = await BookService.createBook(bookData);
  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book created Successful',
    data: result,
  });
});

// update book
const updateBook = catchAsync(async (req: Request, res: Response) => {
  const { ...updatedData } = req.body;
  const id = req.params.id;
  const result = await BookService.updateBook(updatedData, id);
  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book updated Successful',
    data: result,
  });
});

// get All Book
const getAllBook = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const paginationOptions = pick(query, paginationFields);
  const filtersOptions = pick(query, bookFilterableFiled);
  const result = await BookService.getAllBook(
    paginationOptions,
    filtersOptions,
  );
  sendResponse<IBook[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book are fetched successful',
    meta: result.meta,
    data: result.data,
  });
});

// get Single Book
const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await BookService.getSingleBook(id);
  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book are fetched successful',
    data: result,
  });
});

// delete book
const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await BookService.deleteBook(id);
  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book deleted Successful',
    data: result,
  });
});

export const BookController = {
  createBook,
  updateBook,
  deleteBook,
  getAllBook,
  getSingleBook,
};
