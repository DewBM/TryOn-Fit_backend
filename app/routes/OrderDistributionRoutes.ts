import { Router } from 'express';
import * as OrderDistributionController from '../controllers/OrderDistributionController';

const OrderDistributionRouter = Router();

OrderDistributionRouter.put('/updateStatus', OrderDistributionController.doPut);  
OrderDistributionRouter.get('/getOrdersByStatus', OrderDistributionController.doGet);



export default OrderDistributionRouter;


