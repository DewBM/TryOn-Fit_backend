import { Router } from 'express';
import * as OrderDistributionController from '../controllers/OrderDistributionController';

const OrderDistributionRouter = Router();

OrderDistributionRouter.put('/updateStatus', OrderDistributionController.doPut);  
OrderDistributionRouter.get('/getOrdersByStatus', OrderDistributionController.doGet);

// Route to fetch all orders
OrderDistributionRouter.get('/getOrdersById/:id', OrderDistributionController.doGetOrderDetailsById);


export default OrderDistributionRouter;


