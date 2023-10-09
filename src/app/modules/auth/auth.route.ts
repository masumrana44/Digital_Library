import express from 'express';
import ValidateRequest from '../../middleware/ValidateRequest';
import { AuthZodValidation } from './authValidation';
import { AuthController } from './auth.controller';
import { UserController } from '../user/user.controller';
import { UserZodValidation } from '../user/user.validation';

const router = express.Router();

// login user
router.post(
  '/login',
  ValidateRequest(AuthZodValidation.authUserValidationZodSchema),
  AuthController.loginUser,
);

// register user
router.post(
  '/register',
  ValidateRequest(UserZodValidation.createUserZodSchema),
  UserController.createUser,
);

// get refresh Token
router.get('/refresh-token', AuthController.getAccessTokenByRefreshToken);

export const authRoutes = router;
