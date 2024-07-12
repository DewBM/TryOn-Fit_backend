import { Router } from "express";
import * as EmployeeController from "../controllers/EmployeeController"

const EmployeeRouter = Router();

EmployeeRouter.get('/', EmployeeController.doGet);
EmployeeRouter.post('/', EmployeeController.doPost);

export default EmployeeRouter;