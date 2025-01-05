import { Router } from 'express';
import * as OrderDistributionController from '../controllers/OrderDistributionController';

const OrderDistributionRouter = Router();

OrderDistributionRouter.put('/updateStatus', OrderDistributionController.doPut);  
OrderDistributionRouter.get('/getOrdersByStatus', OrderDistributionController.doGet);
OrderDistributionRouter.get('/getAllOrders', OrderDistributionController.getAllOrders);
OrderDistributionRouter.get('/getOrderDetailsByOrderId/:order_id', OrderDistributionController.getOrderDetailsByOrderId);





// Route to fetch all orders
OrderDistributionRouter.get('/getOrdersById/:id', OrderDistributionController.doGetOrderDetailsById);


export default OrderDistributionRouter;


