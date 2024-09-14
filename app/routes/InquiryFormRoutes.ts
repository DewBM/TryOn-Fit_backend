import { Router } from "express"
import * as InquiryFormController from "../controllers/InquiryFormController"

const inquiryFormRouter = Router();

inquiryFormRouter.post('/', InquiryFormController.doPost);
inquiryFormRouter.get('/', InquiryFormController.doGet);
inquiryFormRouter.put('/', InquiryFormController.doPut);
inquiryFormRouter.delete('/', InquiryFormController.doDel);

export default inquiryFormRouter;