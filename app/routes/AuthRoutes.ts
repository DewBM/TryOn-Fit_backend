import { Router } from "express";
import * as AuthController from '../controllers/AuthController';

const authRouter = Router();

authRouter.post('/signup', AuthController.doSignup);
authRouter.post('/signin', AuthController.doSignin);

export default authRouter;