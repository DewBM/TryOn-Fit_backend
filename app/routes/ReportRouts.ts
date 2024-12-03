import { Router } from "express";
import * as ReportController from "../controllers/ReportController"
 

const ReportRouter = Router();

ReportRouter.get('/', ReportController.doGet);

export default ReportRouter;