import { Router } from 'express';
import * as OrderDistributionController from '../controllers/OrderDistributionController';

const OrderDistributionRouter = Router();

OrderDistributionRouter.put('/updateStatus', OrderDistributionController.doPut);  // Adjust the route as needed
OrderDistributionRouter.get('/getOrdersByStatus', OrderDistributionController.getOrdersByStatus);



export default OrderDistributionRouter;


