import { Router } from "express";
import * as authController from '../controllers/AuthController';

const authRouter = Router();

authRouter.post('/signup', authController.doSignup);

export default authRouter;