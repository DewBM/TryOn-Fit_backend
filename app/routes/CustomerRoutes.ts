import { Router } from "express";
import * as CustomerContoller from "../controllers/CustomerContoller"
import { authenticate, passporthMiddleware } from "../middleware/authMiddleware";

const CustomerRouter = Router();

CustomerRouter.get('/', CustomerContoller.doGet);



//measusrement 
CustomerRouter.post('/measurements', passporthMiddleware, CustomerContoller.addMeasurements);

export default CustomerRouter;





