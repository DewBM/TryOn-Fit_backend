import { Router } from "express"
import * as InquiryListController from "../controllers/InquiryListController"

const inquiryListRouter = Router();


inquiryListRouter.get('/', InquiryListController.doGet);


export default inquiryListRouter;