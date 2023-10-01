import { Schema, model } from 'mongoose';
import { IBook, bookModel } from './book.interface';

const bookSchema = new Schema<IBook, bookModel>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    bookPhotoUrl: {
      type: String,
      required: true,
    },
    publicationData: {
      type: String,
      required: true,
    },
    bookSummary: {
      type: String,
      required: true,
    },
    publisher: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },

    reviews: {
      type: [],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Book = model<IBook, bookModel>('Book', bookSchema);
