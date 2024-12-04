import { Router } from 'express';
import * as OrderController from '../controllers/OrderController';
import { authenticate, passporthMiddleware } from "../middleware/authMiddleware";
const OrderRouter = Router();


// OrderRouter.get('/', passporthMiddleware, OrderController.doGet);
// OrderRouter.post('/', passporthMiddleware, OrderController.doPost);
// OrderRouter.put('/', passporthMiddleware, OrderController.doPut);
// OrderRouter.delete('/', passporthMiddleware, OrderController.doDel);

export default OrderRouter;