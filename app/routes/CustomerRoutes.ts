import { Router } from "express";
import * as CustomerContoller from "../controllers/CustomerContoller"

const CustomerRouter = Router();

CustomerRouter.get('/', CustomerContoller.doGet);
 CustomerRouter.put('/', CustomerContoller.doPut);

export default CustomerRouter;





