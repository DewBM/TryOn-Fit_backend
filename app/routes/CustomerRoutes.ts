import { Router } from "express";
import * as CustomerContoller from "../controllers/CustomerContoller"
import { authenticate, passporthMiddleware } from "../middleware/authMiddleware";

const CustomerRouter = Router();

CustomerRouter.get('/', CustomerContoller.doGet);
// EmployeeRouter.get('/', EmployeeController.doGet);


//  CustomerRouter.put('/', CustomerContoller.doPut);



//measusrement 
CustomerRouter.post('/measurements', passporthMiddleware, CustomerContoller.addMeasurements);

CustomerRouter.get('/doGetCustomerId', passporthMiddleware, CustomerContoller.doGetCustomerId);

export default CustomerRouter;





