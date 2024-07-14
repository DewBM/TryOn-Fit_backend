import { Router } from "express";
import * as EmployeeController from "../controllers/EmployeeController"

const EmployeeRouter = Router();

EmployeeRouter.get('/', EmployeeController.doGet);
EmployeeRouter.post('/', EmployeeController.doPost);
EmployeeRouter.put('/', EmployeeController.doPut);
EmployeeRouter.delete('/',EmployeeController.doDel)
export default EmployeeRouter;