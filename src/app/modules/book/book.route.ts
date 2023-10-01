import express from 'express';
import ValidateRequest from '../../middleware/ValidateRequest';
import { BookValidation } from './book.validation';
import { BookController } from './book.controller';

const router = express.Router();

router.post(
  '/create-book',
  ValidateRequest(BookValidation.createBookValidation),
  BookController.createBook,
);

router.get('/', BookController.getAllBook);
router.get('/:id', BookController.getSingleBook);
router.put('/:id', BookController.updateBook);

router.delete('/:id', BookController.deleteBook);

export const bookRoutes = router;
