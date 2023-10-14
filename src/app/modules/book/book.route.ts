import express from 'express';
import ValidateRequest from '../../middleware/ValidateRequest';
import { BookValidation } from './book.validation';
import { BookController } from './book.controller';

const router = express.Router();

// Create Book
router.post(
  '/create-book',
  ValidateRequest(BookValidation.createBookValidation),
  BookController.createBook,
);

// post comment
router.post('/review/:id', BookController.postReview);
// get all book
router.get('/', BookController.getAllBook);

// get  Specific all book
router.get('/mybooks', BookController.getSpecificUserBooks);
// get single book
router.get('/:id', BookController.getSingleBook);
// update book
router.patch('/:id', BookController.updateBook);
// delete book
router.delete('/:id', BookController.deleteBook);

export const bookRoutes = router;
