import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

// get single user
router.get('/:id', UserController.getSingleUser);

export const userRoutes = router;
