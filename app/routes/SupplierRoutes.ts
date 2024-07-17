import { Router } from "express"
import * as SupplierController from "../controllers/SupplierController"

const supplierRouter = Router();

supplierRouter.get('/', SupplierController.doGet);
supplierRouter.post('/', SupplierController.doPost);
supplierRouter.put('/', SupplierController.doPut);

export default supplierRouter;