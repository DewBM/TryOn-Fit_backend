import { Router } from "express";
import * as EmployeeController from "../controllers/EmployeeController"

const EmployeeRouter = Router();

EmployeeRouter.get('/', EmployeeController.doGet);

export default EmployeeRouter;