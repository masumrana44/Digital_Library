import { z } from 'zod';

const createBookValidation = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required',
    }),
    author: z.string({
      required_error: 'author is required',
    }),
    price: z.number({
      required_error: 'price is required',
    }),
    bookPhotoUrl: z.string({
      required_error: 'bookPhotoUrl is required',
    }),
    publicationData: z.string({
      required_error: 'publicationData is required',
    }),
    bookSummary: z.string({
      required_error: 'bookSummary is required',
    }),
    publisher: z.string({
      required_error: 'publisher object _id is required',
    }),
  }),
});

export const BookValidation = {
  createBookValidation,
};
