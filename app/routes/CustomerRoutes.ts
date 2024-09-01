import { Router } from "express";
import * as CustomerContoller from "../controllers/CustomerContoller"

const CustomerRouter = Router();

CustomerRouter.get('/', CustomerContoller.doGet);

export default CustomerRouter;





