import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

// get single user
// router.get('/:email', UserController.getSingleUser);

router.get('/credential', UserController.getUserCredential);

export const userRoutes = router;
