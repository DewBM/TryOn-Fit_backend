import { Router } from "express";
import * as CustomerContoller from "../controllers/CustomerContoller";

const CustomerRouter = Router();

CustomerRouter.get("/", CustomerContoller.doGet);
CustomerRouter.post("/", CustomerContoller.doPost);
CustomerRouter.put("/", CustomerContoller.doPut);

export default CustomerRouter;
