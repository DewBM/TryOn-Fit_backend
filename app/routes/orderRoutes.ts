import { Router } from 'express';
import * as OrderController from '../controllers/OrderController';
import { authenticate, passporthMiddleware } from "../middleware/authMiddleware";
const OrderRouter = Router();


// OrderRouter.get('/',  OrderController.doGet);
// OrderRouter.post('/',  OrderController.doPost);
OrderRouter.get('/', passporthMiddleware, OrderController.doGet);
OrderRouter.get('/getstatus', passporthMiddleware, OrderController. getstatus);
OrderRouter.get('/getorderId', passporthMiddleware, OrderController.getorderId);
OrderRouter.post('/',  OrderController.doPost);




export default OrderRouter;