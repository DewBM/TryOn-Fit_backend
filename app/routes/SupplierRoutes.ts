import { Router } from "express"
import * as SupplierController from "../controllers/SupplierController"

const supplierRouter = Router();

supplierRouter.get('/', SupplierController.doGet);
supplierRouter.post('/', SupplierController.doPost);
supplierRouter.put('/', SupplierController.doPut);
supplierRouter.delete('/',SupplierController.doDelete);

//Total suppliers
supplierRouter.get("/fetchTotalSuppliers", SupplierController.fetchTotalSuppliers);

export default supplierRouter;