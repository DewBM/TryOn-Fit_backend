import { Router } from "express"
import * as InquiryCardsController from "../controllers/InquiryCardsController"

const inquiryRouter = Router();


inquiryRouter.get('/', InquiryCardsController.doGet);


export default inquiryRouter;