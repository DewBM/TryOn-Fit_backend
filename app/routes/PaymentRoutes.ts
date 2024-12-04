import { Router } from "express"
import * as paymentController from "../controllers/paymentController"

const PaymentRouter = Router();

PaymentRouter.post('/', paymentController.doPost);

export default PaymentRouter;