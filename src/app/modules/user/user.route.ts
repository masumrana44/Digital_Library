import express from 'express';
import { UserController } from './user.controller';
import ValidateRequest from '../../middleware/ValidateRequest';
import { UserZodValidation } from './user.validation';

const router = express.Router();

router.post(
  '/create-user',
  ValidateRequest(UserZodValidation.createUserZodSchema),
  UserController.createUser,
);

export const userRoutes = router;
