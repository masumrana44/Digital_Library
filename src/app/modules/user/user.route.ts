import express from 'express';
import { UserController } from './user.controller';
import ValidateRequest from '../../middleware/ValidateRequest';
import { UserZodValidation } from './user.validation';

const router = express.Router();

// Create User
router.post(
  '/create-user',
  ValidateRequest(UserZodValidation.createUserZodSchema),
  UserController.createUser,
);

// getSingle USer
router.get('/:id', UserController.getSingleUser);

export const userRoutes = router;
