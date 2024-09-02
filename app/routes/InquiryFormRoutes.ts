import { Router } from "express"
import * as InquiryFormController from "../controllers/InquiryFormController"

const inquiryFormRouter = Router();

inquiryFormRouter.post('/', InquiryFormController.doPost);

export default inquiryFormRouter;