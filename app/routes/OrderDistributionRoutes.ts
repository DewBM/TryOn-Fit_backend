import { Router } from 'express';
import * as OrderDistributionController from '../controllers/OrderDistributionController';

const OrderDistributionRouter = Router();

OrderDistributionRouter.put('/updateStatus', OrderDistributionController.doPut);  
OrderDistributionRouter.get('/getOrdersByStatus', OrderDistributionController.doGet);
OrderDistributionRouter.get('/getAllOrders', OrderDistributionController.getAllOrders);
OrderDistributionRouter.get('/getOrderDetailsByOrderId/:order_id', OrderDistributionController.getOrderDetailsByOrderId);





// Route to fetch all orders
OrderDistributionRouter.get('/getOrdersById/:id', OrderDistributionController.doGetOrderDetailsById);

// new oder view part

OrderDistributionRouter.get('/fetchOrderDetails/:orderId', OrderDistributionController.fetchOrderDetails);

// Total orders - Today

OrderDistributionRouter.get('/getTotalOrdersToday', OrderDistributionController.getTotalOrdersToday);

// order status- confirmed
OrderDistributionRouter.get('/getTotalConfirmedOrders', OrderDistributionController.getTotalConfirmedOrders);

// order status- processing
OrderDistributionRouter.get('/getTotalProcessingOrders', OrderDistributionController.getTotalProcessingOrders);

// order status- shipped
OrderDistributionRouter.get('/getTotalShippedOrders', OrderDistributionController.getTotalShippedOrders);

export default OrderDistributionRouter;


