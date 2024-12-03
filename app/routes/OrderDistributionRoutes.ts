import { Router } from 'express';
import * as OrderDistributionController from '../controllers/OrderDistributionController';

const OrderDistributionRouter = Router();

OrderDistributionRouter.put('/updateStatus', OrderDistributionController.doPut);  
OrderDistributionRouter.get('/getOrdersByStatus', OrderDistributionController.doGet);
//OrderDistributionRouter.get('/order/items', OrderDistributionController.fetchOrderItemsWithDetails);
OrderDistributionRouter.get('/order/items',OrderDistributionController.fetchOrderItemsWithDetails);



export default OrderDistributionRouter;


