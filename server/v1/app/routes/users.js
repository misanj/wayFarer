import express from 'express';
import InputValidator from '../middlewares/inputValidator';
import UserController from '../controllers/userController';

const userRoutes = express.Router();

userRoutes.post('/signup', InputValidator.validateUser, UserController.signUp);

export default userRoutes;
