import { Router } from 'express';
import * as CartController from '../controllers/CartController';
import { authenticate, passporthMiddleware } from "../middleware/authMiddleware";
const CartRouter = Router();


CartRouter.get('/', passporthMiddleware, CartController.doGet);
CartRouter.post('/', passporthMiddleware, CartController.doPost);
CartRouter.put('/', passporthMiddleware, CartController.doPut);
CartRouter.delete('/', passporthMiddleware, CartController.doDel);

export default CartRouter;
