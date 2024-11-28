import { Router } from "express";
import * as CustomerContoller from "../controllers/CustomerContoller"
import { authenticate, passporthMiddleware } from "../middleware/authMiddleware";

const CustomerRouter = Router();

CustomerRouter.get('/', CustomerContoller.doGet);
 CustomerRouter.put('/', CustomerContoller.doPut);



//measusrement 
CustomerRouter.post('/measurements', passporthMiddleware, CustomerContoller.addMeasurements);

export default CustomerRouter;





