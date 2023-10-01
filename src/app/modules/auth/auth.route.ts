import express from 'express';
import ValidateRequest from '../../middleware/ValidateRequest';
import { AuthZodValidation } from './authValidation';
import { AuthController } from './auth.controller';

const router = express.Router();

router.post(
  '/login',
  ValidateRequest(AuthZodValidation.authUserValidationZodSchema),
  AuthController.loginUser,
);

router.get('/refresh-token', AuthController.getAccessTokenByRefreshToken);

export const authRoutes = router;
