import { Router } from "express";
import * as SearchController from "../controllers/SearchController";

const searchRouter = Router();

searchRouter.get('/', SearchController.doGet);

export default searchRouter;