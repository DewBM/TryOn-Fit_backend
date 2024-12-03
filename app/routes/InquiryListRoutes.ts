import { Router } from "express"
import * as InquiryController from "../controllers/InquiryListController"

const inquiryRouter = Router();


inquiryRouter.get('/', InquiryController.doGet);


export default inquiryRouter;