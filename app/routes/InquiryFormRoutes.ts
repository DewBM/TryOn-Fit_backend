import { Router } from "express"
import * as InquiryFormController from "../controllers/InquiryFormController"

const inquiryFormRouter = Router();

inquiryFormRouter.post('/', InquiryFormController.doPost);
inquiryFormRouter.get('/', InquiryFormController.doGet);

export default inquiryFormRouter;